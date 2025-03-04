<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="static/css/style.css" />
  <title>Document</title>
</head>

<body>
  <div class="map_wrap">
    <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>

    <div id="menu_wrap" class="bg_white">
      <div class="option">
        <div>
          <form class="form">
            키워드 : <input type="text" value="" id="keyword" size="15">
            <button type="submit">검색하기</button>
          </form>
        </div>
      </div>
      <hr>
      <ul id="placesList"></ul>
      <div id="pagination"></div>
    </div>
  </div>

  <!-- 검색 결과 클릭 시 iframe이 표시될 위치 -->
  <div id="mapDetails" style="width:100%;height:500px;margin-top:20px;display:block;">
    <iframe id="iframeMap" style="width:100%;height:100%;" frameborder="0" src="https://map.kakao.com/"></iframe>
  </div>

  <script type="text/javascript"
    src="//dapi.kakao.com/v2/maps/sdk.js?appkey=881810a289df580e6c39afea41ce074d&libraries=services"></script>
  <script src="static/js/map.js"></script>
</body>