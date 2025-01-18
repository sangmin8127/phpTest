<?php 
include $_SERVER['DOCUMENT_ROOT'] . "/dbconfig.php";
?>
<!doctype html>
<html lang="ko">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

  <link rel="icon" href="<?php echo $_SERVER["DOCUMENT_URI"] ?>/static/img/favicon.ico">
  
  <!-- CSS -->
  <link href="<?php echo $_SERVER["DOCUMENT_URI"] ?>/static/css/font.css" rel="stylesheet">
  <link href="<?php echo $_SERVER["DOCUMENT_URI"] ?>/static/css/style.css" rel="stylesheet">
  <!-- JS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" rel="stylesheet" />

  <title>고고캠</title>
</head>

<body>
  <div class="container-wrap">
    <!-- <div class="img-header">
      <img src="<?php echo $_SERVER["DOCUMENT_URI"] ?>/static/img/img-header.png" alt="헤더 이미지">
      <a href="https://programmerdaddy.tistory.com/202" target="_blank">참고 : https://programmerdaddy.tistory.com/202</a>
    </div> -->
    <header>
      <h1 class="text-3xl font-bold">
        <a href="<?php echo $_SERVER["DOCUMENT_URI"] ?>/">
          ⛺ 고고캠 GoGoCam<span><?php echo $_SERVER["SCRIPT_NAME"] ?></span>
        </a>
      </h1>
    </header>
    <div class="cndt-srch flex gap-3">
      <div class="search-container relative flex items-center">
        <input 
          type="text" 
          name="search" 
          id="search" 
          value="<?php echo isset($_GET['searchText']) ? htmlspecialchars($_GET['searchText']) : ''; ?>" 
          placeholder="캠핑장명 또는 주소 검색"
          class="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >

        <!-- 돋보기 버튼 -->
        <button 
          id="searchButton" 
          type="button" 
          class="absolute right-2 p-2 text-gray-500 hover:text-blue-500 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <!-- 정렬 방식 Dropdown menu -->
      <div class="array-alphabetical ml-7">
        <span class="mr-2">정렬 방식</span>
        <button id="dropdownDefaultButton1" data-dropdown-offset-distance="5" data-dropdown-toggle="dropdown1" class="focus:ring-1 focus:ring-blue-300" type="button">
          가나다라 순
          <svg id="dropdownArrow1" class="w-2.5 h-2.5 ms-3 transition-transform duration-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
        <div id="dropdown1" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow min-w-[100px] dark:bg-gray-700 border">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton1">
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">가나다라 순</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">최신등록일자 순</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 지역 검색 Dropdown menu -->
      <div class="array-region">
        <span class="mr-2">지역 검색</span>
        <button id="dropdownDefaultButton2" data-dropdown-offset-distance="5" data-dropdown-toggle="dropdown2" class="focus:ring-1 focus:ring-blue-300" type="button">
          선택
          <svg id="dropdownArrow2" class="w-2.5 h-2.5 ms-3 transition-transform duration-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
        <!-- Dropdown menu -->
        <div id="dropdown2" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow min-w-[100px] dark:bg-gray-700 border">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton2">
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">강원도</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">경기도</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">경기도</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">경상북도</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">경상남도</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">전라북도</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">전라남도</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">충청북도</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">충청남도</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn-wrap">
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">반경 5km</button>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">반경 15km</button>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">반경 50km</button>
      </div>
    </div>

  <script>
    

  </script>