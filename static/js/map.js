console.log("카카오 지도 관련 js 로드!");

// 카카오 지도 스크립트
var mapContainer = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var mapOption = {
	//지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
	level: 6, //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(mapContainer, mapOption);

var circle = null;
var radius = 5; // 기본값 5km

// 전역 변수로 마커 배열 추가
var markers = [];

// 모든 마커를 제거하는 함수 추가
function clearMarkers() {
	markers.forEach(function (marker) {
		marker.setMap(null);
	});
	markers = [];
}

// 검색 결과의 모든 캠핑장을 지도에 표시하는 함수
function displayAllCampings() {
	// 기존 마커들을 모두 제거
	clearMarkers();

	// 모든 주소 링크 요소를 선택
	document.querySelectorAll(".address-link").forEach(function (link) {
		var mapX = link.getAttribute("data-mapx");
		var mapY = link.getAttribute("data-mapy");
		var name = link.getAttribute("data-name");

		if (mapX && mapY) {
			var position = new kakao.maps.LatLng(mapY, mapX);
			var marker = new kakao.maps.Marker({
				map: map,
				position: position,
			});

			// 인포윈도우 생성
			var infowindow = new kakao.maps.InfoWindow({
				content: '<div style="padding:5px;">' + name + "</div>",
				removable: true,
			});

			// 마커 클릭 이벤트
			kakao.maps.event.addListener(marker, "click", function () {
				infowindow.open(map, marker);
			});

			// 마커를 배열에 추가
			markers.push(marker);
		}
	});

	// 모든 마커가 보이도록 지도 범위 재설정
	if (markers.length > 0) {
		var bounds = new kakao.maps.LatLngBounds();
		markers.forEach(function (marker) {
			bounds.extend(marker.getPosition());
		});
		map.setBounds(bounds);
	}
}

// 현재 위치 마커와 인포윈도우를 저장할 변수
var currentLocationMarker = null;
var currentLocationInfowindow = null;

// 캠핑장 마커와 인포윈도우를 저장할 변수
var campingMarker = null;
var campingInfowindow = null;

// 마커 표시 함수
function displayMarker(locPosition, message, isCurrentLocation) {
	var marker, infowindow;

	if (isCurrentLocation) {
		// 현재 위치 마커 생성 또는 위치 업데이트
		if (currentLocationMarker) {
			currentLocationMarker.setPosition(locPosition);
		} else {
			marker = new kakao.maps.Marker({
				map: map,
				position: locPosition,
			});
			currentLocationMarker = marker;
		}

		// 현재 위치 인포윈도우 생성 또는 내용 업데이트
		if (currentLocationInfowindow) {
			currentLocationInfowindow.setContent(message);
		} else {
			infowindow = new kakao.maps.InfoWindow({
				content: message,
				removable: true,
			});
			currentLocationInfowindow = infowindow;
		}
		currentLocationInfowindow.open(map, currentLocationMarker);
	} else {
		// 기존 캠핑장 마커와 인포윈도우가 있다면 제거
		if (campingMarker) {
			campingMarker.setMap(null);
		}
		if (campingInfowindow) {
			campingInfowindow.close();
		}

		// 새 캠핑장 마커 생성
		marker = new kakao.maps.Marker({
			map: map,
			position: locPosition,
		});

		infowindow = new kakao.maps.InfoWindow({
			content: message,
			removable: true,
		});

		infowindow.open(map, marker);

		// 캠핑장 마커와 인포윈도우 업데이트
		campingMarker = marker;
		campingInfowindow = infowindow;
	}

	// 지도 중심 이동
	map.panTo(locPosition);
}

var MyCurrentPosition = {
	WSG84: {
		x: 126.570667,
		y: 33.450701,
	},
	WCONGNAMUL: {
		x: 0,
		y: 0,
	},
};

// 위치 정보 처리를 위한 단일 함수
function handleGeolocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function (position) {
				const lat = position.coords.latitude;
				const lng = position.coords.longitude;

				// 전역 변수 업데이트
				MyCurrentPosition.WSG84.x = lng;
				MyCurrentPosition.WSG84.y = lat;

				// URL 파라미터 체크
				const urlParams = new URLSearchParams(window.location.search);
				if (!urlParams.has("lat") && !urlParams.has("lng") && !urlParams.has("searchText")) {
					// URL 파라미터에 현재 위치 추가 및 페이지 새로고침
					const currentUrl = new URL(window.location.href);
					currentUrl.searchParams.set("lat", lat);
					currentUrl.searchParams.set("lng", lng);
					window.location.href = currentUrl.toString();
				} else {
					// 이미 위치 정보가 있다면 지도만 업데이트
					geoTransCoord(MyCurrentPosition.WSG84, function (result) {
						if (result.ok) {
							MyCurrentPosition.WCONGNAMUL = result.data;
							drawKakaoMap('<div style="padding:5px;">나의 현재 위치</div>');
						}
					});
				}
			},
			function (error) {
				console.error("위치 정보를 가져오는데 실패했습니다:", error);
			},
		);
	}
}

// circle 함수
function drawKakaoMap(message) {
	console.log("나의 현재 위치 : ", MyCurrentPosition);

	let locPosition = new kakao.maps.LatLng(MyCurrentPosition.WSG84.y, MyCurrentPosition.WSG84.x);

	// 기존 원이 있다면 제거
	if (circle) {
		circle.setMap(null);
	}

	// 현재 radius 값을 사용하여 원 생성
	circle = new kakao.maps.Circle({
		center: locPosition,
		radius: radius * 1000, // km를 미터로 변환 (5km -> 5000m)
		strokeWeight: 2,
		strokeColor: "#FF4500",
		strokeOpacity: 0.8,
		fillColor: "#FF4500",
		fillOpacity: 0.2,
	});

	// 지도에 원 표시
	circle.setMap(map);

	displayMarker(locPosition, message, true);
}
