/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	window.onload = function(){
	  console.log('on load..')
	  loadMain();
	}
	
	var loadBucketList = function(){
	  var savedCountries = document.getElementById('saved-countries')
	  savedCountries.innerHTML = ""
	  console.log("In function load bucket list")
	    var request = new XMLHttpRequest();
	    request.open("GET", '/entries');
	    request.onload = function(){
	      if(request.status === 200){
	        console.log("BucketList loaded!")
	        var result = JSON.parse(request.responseText)
	        for(country of result){
	          displayBucketList(country);
	        }
	      }
	    }
	    request.send(null)
	  }
	
	 var displayBucketList = function(country){
	  var savedCountries = document.getElementById('saved-countries');
	  divBox = document.createElement('div')
	  divBox.id = 'saved-country';
	  var h5 = document.createElement('h5')
	  h5.innerText = "name: " +country.name + "\n" + "language: " + country.languages  + "\n" + "capital: " + country.capital  + "\n" + "continent: " + country.region  + "\n" + "currency: " + country.currencies  + "\n"
	  var button = document.createElement('button')
	  button.innerText = 'Delete';
	
	  button.onclick = function(event){
	    var request = new XMLHttpRequest();
	    var url = '/entries/' + country._id
	
	    request.open("DELETE", url);
	    request.setRequestHeader("Content-Type", "application/json");
	    request.onload = function(){
	      if(request.status === 200){
	        console.log("Success! deleted")
	        loadBucketList();
	      }
	    }
	    request.send(null);
	  }
	
	
	
	  divBox.appendChild(h5);
	  divBox.appendChild(button)
	  savedCountries.appendChild(divBox)
	 }
	
	var loadMain =function(){
	  console.log('deciding what to do...')
	  countriesData = localStorage.getItem('countries')
	  if(countriesData){
	    main();
	  }else{
	    loadCountries();
	  }
	}
	
	var loadCountries = function(){
	  console.log('Attemping API load...')
	  var url = 'https://restcountries.eu/rest/v1';
	  var request = new XMLHttpRequest();
	  request.open("GET", url);
	  request.onload = function(){
	    if (request.status === 200){
	      console.log('status ok')
	      var jsonString = request.responseText;
	      localStorage.setItem('countries', jsonString)
	      console.log("Raw string:", jsonString)
	      main();
	    }
	  }
	  request.send(null);
	}
	
	
	
	var main = function(){
	  loadBucketList();
	  console.log('In main and ready to go')
	  // var jsonString = localStorage.getItem('countries');
	  // var countries = JSON.parse(jsonString) || [];
	   var searchBtn = document.getElementById('searchCoutries');
	   searchBtn.onclick = function(){
	
	    var searchValue = document.getElementById('search').value
	    var jsonString = localStorage.getItem('countries');
	    var countries = JSON.parse(jsonString) || [];
	    for(var country of countries){
	      var countryFound = false
	      if(country.name === searchValue){
	      countryFound = true
	      loadResult(country);
	      break;
	      }
	    }
	    if(countryFound === false){
	      showSearchError();
	    }
	   }
	
	}
	
	var clearResults = function(){
	  var resultsBox = document.getElementById('results')
	  resultsBox.innerHTML = ""
	}
	
	var loadResult = function(country){
	  var resultsBox = document.getElementById('results')
	  var errorMsg = document.getElementById('error')
	  errorMsg.innerHTML = ''
	  var p = document.createElement('p')
	  var button = document.createElement('button')
	  button.type = "button"
	  button.innerText = "Add"
	
	  button.onclick = function(event){
	    event.preventDefault();
	    var request = new XMLHttpRequest();
	    request.open("POST", '/entries');
	    request.setRequestHeader("Content-Type", "application/json");
	    request.onload = function(){
	      if(request.status === 200){
	        console.log("Success!")
	        clearResults();
	        loadBucketList();
	      }
	    }
	    request.send(JSON.stringify(country))
	  }
	
	  p.innerText ="country: " + country.name + "\n" + "capital: " + country.capital + "\n" + "region: " + country.region;
	  resultsBox.appendChild(p);
	  resultsBox.appendChild(button)
	
	
	}
	
	var showSearchError = function(){
	  var errorMsg = document.getElementById('error')
	  errorMsg.innerHTML = ''
	  var h3 = document.createElement('h3')
	  h3.innerText = "Sorry no countries found"
	  errorMsg.appendChild(h3)
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map