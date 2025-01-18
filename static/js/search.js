console.log("검색창 관련 js 로드!");

//  검색창 스크립트 (엔터키, 돋보기)
document.addEventListener("DOMContentLoaded", () => {
	const searchInput = document.getElementById("search");
	const searchButton = document.getElementById("searchButton");

	function performSearch() {
		const searchText = searchInput.value.trim();
		if (searchText) {
			window.location.href = `index?searchText=${encodeURIComponent(searchText)}`;
		}
	}

	// 엔터키 검색 이벤트
	searchInput.addEventListener("keypress", function (e) {
		if (e.key === "Enter") {
			performSearch();
		}
	});

	// 돋보기 버튼 클릭으로 검색
	searchButton.addEventListener("click", () => {
		performSearch();
	});

	// 첫 번째 드롭다운
	const dropdownButton1 = document.getElementById("dropdownDefaultButton1");
	const dropdownMenu1 = document.getElementById("dropdown1");
	const dropdownArrow1 = document.getElementById("dropdownArrow1");
	dropdownButton1.addEventListener("click", () => {
		const isHidden = dropdownMenu1.classList.contains("hidden");
		dropdownMenu1.classList.toggle("hidden");
		dropdownArrow1.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
	});

	// 두 번째 드롭다운
	const dropdownButton2 = document.getElementById("dropdownDefaultButton2");
	const dropdownMenu2 = document.getElementById("dropdown2");
	const dropdownArrow2 = document.getElementById("dropdownArrow2");
	dropdownButton2.addEventListener("click", () => {
		const isHidden = dropdownMenu2.classList.contains("hidden");
		dropdownMenu2.classList.toggle("hidden");
		dropdownArrow2.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
	});
});

// 반경 버튼 클릭 이벤트 핸들러
document.querySelectorAll(".btn-wrap button").forEach(function (button) {
	button.addEventListener("click", function () {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				const lat = position.coords.latitude;
				const lng = position.coords.longitude;

				// 버튼 텍스트에서 숫자만 추출 (예: "반경 5km" -> 5)
				const radius = parseInt(button.textContent.match(/\d+/)[0]);

				// URL 파라미터 설정
				const currentUrl = new URL(window.location.href);
				currentUrl.searchParams.set("lat", lat);
				currentUrl.searchParams.set("lng", lng);
				currentUrl.searchParams.set("radius", radius);

				// 페이지 새로고침
				window.location.href = currentUrl.toString();
			});
		}
	});
});
