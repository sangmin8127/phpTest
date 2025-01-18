console.log("게시판 관련 js 로드!");

// [board] 주소 클릭 이벤트 : 클릭된 캠핑장으로 이동
document.querySelectorAll(".address-link").forEach(function (link) {
	link.addEventListener("click", function (e) {
		e.preventDefault();

		// 클릭된 캠핑장 데이터
		var mapX = this.getAttribute("data-mapx");
		var mapY = this.getAttribute("data-mapy");
		var name = this.getAttribute("data-name");
		var position = new kakao.maps.LatLng(mapY, mapX);

		// 해당 마커로 지도 중심 이동 및 줌
		map.setCenter(position);
		map.setLevel(3); // 더 가깝게 줌

		// 나머지 기존 코드는 유지...
	});
});

// [board] 주소(링크) 클릭 이벤트 처리
document.querySelectorAll(".address-link").forEach(function (link) {
	link.addEventListener("click", function (e) {
		e.preventDefault();
		// 클릭된 링크에서 캠핑장 데이터 가져오기
		var mapX = this.getAttribute("data-mapx");
		var mapY = this.getAttribute("data-mapy");
		var transformedX = this.getAttribute("data-transformedX");
		var transformedY = this.getAttribute("data-transformedY");
		var name = this.getAttribute("data-name");
		var address = this.textContent.trim(); // 주소 텍스트 가져오기
		var tel = this.getAttribute("data-tel"); // 전화번호 가져오기
		var homepage = this.getAttribute("data-homepage"); // 전화번호 가져오기
		var contentId = this.getAttribute("data-contentid"); // 블로그컨텐츠
		var intro = this.getAttribute("data-intro"); // 블로그컨텐츠
		var position = new kakao.maps.LatLng(mapY, mapX);
		var message = '<div style="padding:5px;">' + name + "</div>";

		// 새 캠핑장 마커 표시 (이전 캠핑장 마커는 자동으로 제거됨)
		displayMarker(position, message, false);

		// faclt-detail-wrap 영역 내용 업데이트
		var detailWrap = document.querySelector(".faclt-detail-wrap");
		detailWrap.innerHTML = `
      <div class="faclt-info-wrap">
        <div class="faclt-thumb">
          <div class="img" style="background-image: url('${this.closest("tr").querySelector(".thumbnail").style.backgroundImage.slice(4, -1).replace(/"/g, "")}')"></div>
        </div>
        <div class="faclt-txt">
          <div class="faclt-tit">${name}</div>
          <div class="faclt-addr">주소 : ${address || "정보없음"}</div>
          <div class="faclt-tel">TEL : ${tel || "정보없음"}</div>
          <div class="faclt-tel">H.P : ${homepage || "정보없음"}</div>
        </div>
      </div>
      <div class="faclt-add-txt">
        <div class="txt-wrap">
          <div class="txt">${intro || "정보없음"}</div>
        </div>
      </div>
      <div class="faclt-img-wrap">
        <div class="detail-img" id="imageListWrap">
          <!-- 여기 이미지 목록이 들어갈 예정 -->
        </div>
      </div>
    `;

		// 2) 이미지 API 호출
		var apiImageUrl = "<?php echo $_SERVER['DOCUMENT_URI']; ?>/api/images?contentId=" + contentId;
		fetch(apiImageUrl)
			.then(function (res) {
				return res.json();
			})
			.then(function (data) {
				// data: [{id:1, contentId:..., imageUrl:..., ...}, ...]
				var imgListWrap = document.getElementById("imageListWrap");
				if (!data || data.length === 0) {
					// 이미지가 없으면 기본 no-image
					imgListWrap.innerHTML = `
            <div class="no-image">
              <img src="<?php echo $_SERVER["DOCUMENT_URI"].'/static/img/no-image.png'; ?>" alt="기본 이미지">
            </div>
          `;
				} else {
					// 이미지가 있을 경우 동적으로 HTML 생성. (local_image_path 상대경로 컬럼)
					let html = "";
					data.forEach(function (img) {
						let imageUrl = img.local_image_path ? img.local_image_path : '<?php echo $_SERVER["DOCUMENT_URI"]."/static/img/no-image.png"; ?>';
						html += `
              <div class="faclt-image">
                <img src="${imageUrl}" alt="캠핑장 이미지" onerror="this.onerror=null; this.src='<?php echo $_SERVER["DOCUMENT_URI"]."/static/img/no-image.png"; ?>';">
              </div>
            `;
					});
					imgListWrap.innerHTML = html;
				}
			})
			.catch(function (err) {
				console.error(err);
			});

		// 3) 블로그 API 호출 (기존 코드)
		var apiUrl = "<?php echo $_SERVER['DOCUMENT_URI']; ?>/api/blogs";
		fetch(apiUrl + "?contentId=" + contentId)
			.then(function (response) {
				return response.json();
			})
			.then(
				function (blogData) {
					// blogData가 배열 형태라고 가정: [{id:..., blogTitle:..., ...}, ...]

					// 블로그 글을 HTML로 변환
					let blogHtml = "";
					if (blogData.length > 0) {
						blogData.forEach(function (blog) {
							// 날짜 예쁘게 변환할 수도 있고, XSS 방지 위해 이스케이프 처리도 가능
							blogHtml += `
              <div class="contents-wrap">
                <div class="contents">
                  <!-- 블로그에 썸네일이 없다면, 캠핑장 이미지나 no-image로 대체 -->
                  <img src="${blog.blogThumbnail || this.getAttribute("data-default-image") || '<?php echo $_SERVER["DOCUMENT_URI"]."/static/img/no-image.png"; ?>'}" alt="blog image">
                  <div class="review-wrap">
                    <div class="tit">${blog.blogTitle ? escapeHtml(blog.blogTitle) : "제목 없음"}</div>
                    <div class="txt">${blog.blogDescription ? escapeHtml(blog.blogDescription) : ""}</div>
                    <div class="link">
                      <div class="date">작성일: ${blog.blogPostdate ? escapeAttr(blog.blogPostdate) : "#"}</div>
                      <a href="${blog.blogLink ? escapeAttr(blog.blogLink) : "#"}" target="_blank">블로그 글 바로가기</a>
                    </div>
                  </div>
                </div>
              </div>
            `;
						}, this);
					} else {
						// 블로그 데이터가 없는 경우 표시
						blogHtml = `<p>블로그 리뷰가 없습니다.</p>`;
					}

					// detailWrap에 blogHtml 추가
					detailWrap.innerHTML += `
          <div class="faclt-review-wrap">
            ${blogHtml}
          </div>
        `;
				}.bind(this),
			) // for scope using `this`
			.catch(function (error) {
				console.error(error);
			});
		// iframe에 경로 표시
		showMapInIframe(name, transformedX, transformedY);
	});
});
