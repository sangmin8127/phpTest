console.log("카카오 네비 관련 js 로드!");

// iframe에 카카오맵 경로를 표시하는 함수
function showMapInIframe(destination, transformedX, transformedY) {
	// 현재 나의 위치 가져오기
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var lat = position.coords.latitude,
				lon = position.coords.longitude;

			var geocoder = new kakao.maps.services.Geocoder();
			geocoder.coord2Address(lon, lat, function (result, status) {
				if (status === kakao.maps.services.Status.OK) {
					var detailAddr = result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;

					let detailAddrEnc = encodeURIComponent(detailAddr); // 내 위치
					let destinationEnc = encodeURIComponent(destination); // 목적지

					let fromLabel = encodeURIComponent("내위치");

					console.log("lat : ", lat);
					console.log("lon : ", lon);
					console.log("transformedY : ", transformedY);
					console.log("transformedX : ", transformedX);
					var iframeSrc = `https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt=${MyCurrentPosition.WCONGNAMUL.x},${MyCurrentPosition.WCONGNAMUL.y}%2C${transformedX}%2C${transformedY}&rt1=${fromLabel}&rt2=${destinationEnc}`;

					// alert(detailAddrEnc);
					// alert(destinationEnc);
					// alert(iframeSrc);

					// iframe src 업데이트 및 표시
					var iframe = document.getElementById("iframeMap");
					iframe.src = iframeSrc;

					// iframe이 있는 div를 보여줌
					document.getElementById("mapWrap").style.display = "none";
					document.getElementById("mapDetails").style.display = "block";
				}
			});
		});
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}
