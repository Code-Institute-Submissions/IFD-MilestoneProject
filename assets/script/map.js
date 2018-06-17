const apiKey = 'AIzaSyDWbbDURuiYEUVmvnTRol3xbTq4BDuK5aE';

var map;

var circle = [];

var accommodations = document.getElementById('accommodations');
var dining = document.getElementById('dining');

var searchType;

var poiMarkers = [];
var accommodationsMarkers = [];
var diningMarkers = [];

//Icon image for different marker type.
var poi_pin = 'assets/icon/poi_pin.png';
var accommodations_pin = 'assets/icon/accommodations_pin.png';
var dining_pin = 'assets/icon/dining_pin.png';

//Default center position (London)
var lat = 51.508742;
var lng = -0.120850;
var zoom = 15;

function defaultLocation() {
  // If user premits use of geolocation, the map will be centered based on that, otherwise map will be rendered with default values.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        zoom = 15;
        drawMap();
      },

      function() {
        drawMap();
      }
    );
  } else {
    drawMap();
  }
}

function drawMap() {
  var mapProp = {
    center: new google.maps.LatLng(lat, lng),
    zoom: zoom,
  };
  map = new google.maps.Map(document.getElementById("map"), mapProp);

  // Code taken from https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    resetUI();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    //End of referenced code.

    map.fitBounds(bounds);
    map.setZoom(15);
  });
}

//Visualize search radius on map.
function showSearchRadius() {
  clearCircle();
  circle.push(new google.maps.Circle({
    map: map,
    center: map.getCenter(),
    radius: parseInt(slider.value),
    strokeColor: "#99C0FF",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#99C0FF",
    fillOpacity: 0.4
  }));
}

//Clear any existing circles on the map.
function clearCircle() {
  for (var i = 0; i < circle.length; i++) {
    circle[i].setMap(null);
  }
  circle.length = 0;
}

//Dynamically update search result when user moves slider.
function updateSearch() {
  showSearchRadius();
  resetMarkers();
<<<<<<< HEAD
  if (poi.checked) {
    placeSearch(poi, poi_type);
  }
  if (accommodations.checked) {
    placeSearch(accommodations, accommodations_type);
  }
  if (dining.checked) {
    placeSearch(dining, dining_type);
=======
  resetToolbar();
}

//Checks what option from tourist attractions drop down menu has been selected and carries out multiple place searches
// base on the array poiOptions.
function poiSearch(poiOptions) {
  if (poiOptions.length > 0) {
    removeMarkers(poiMarkers);
    searchType = 1;
    for (var i = 0; i < poiOptions.length; i++) {
      placeSearch(poiOptions[i]);
    }
  } else {
    removeMarkers(poiMarkers);
    poiMarkers = [];
>>>>>>> poi-v2
  }
}

//Checks which button in the toolbar has been clicked(checked) and performs a nearby search with corresponding place type.
// Markers will be added using results from nearby search. If a button has been unchecked, corresponding markers will be removed.
// This function only handles Accomdations and Restaurants related search.
function nonPOISearch(searchID) {
  var pType;
  if (searchID == accommodations) {
    pType = 'lodging';
    searchType = 2;
  } else if (searchID == dining) {
    pType = 'restaurant';
    searchType = 3;
  }

  if (searchID.checked) {
    placeSearch(pType);
  } else {
<<<<<<< HEAD
    if (searchID == poi) {
      removeMarkers(poiMarkers);
    } else if (searchID == accommodations) {
=======
    if (searchID == accommodations) {
>>>>>>> poi-v2
      removeMarkers(accommodationsMarkers);
      accommodationsMarkers = [];
    } else if (searchID == dining) {
      removeMarkers(diningMarkers);
      diningMarkers = [];
    }

    //Only removes circle when no option has been selected.
    if (!poi.checked && !accommodations.checked && !dining.checked) {
      clearCircle();
    }
  }
}

function placeSearch(placeType) {
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: map.getCenter(),
    radius: parseInt(slider.value),
    type: [placeType]
  }, returnSearch);
}

//Call back function to neaby search. First checks if results are returned successfully before checking which type of markers needs
// to be added as well as setting info windows for those markers. If nearby search did not return results successfully, users will be
// warned with a pop up message.
function returnSearch(results, status, type) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    showSearchRadius();
    if (searchType == 1) {
      addMarkers(results, poiMarkers, poi_pin);
      setInfoWindows(results, poiMarkers);
    }
    if (searchType == 2) {
      addMarkers(results, accommodationsMarkers, accommodations_pin);
      setInfoWindows(results, accommodationsMarkers);
    }
    if (searchType == 3) {
      addMarkers(results, diningMarkers, dining_pin);
      setInfoWindows(results, diningMarkers);
    }
  } else {
    alert("Search has failed due to service status: " + status);
    resetUI();
  }
}

//If no pinType has been specified, default marker will be used
//Clicking on marker will open info window, only 1 info can be opened at a time.
function addMarkers(results, markerGroup, pinType) {
  results.forEach(function(result) {
    markerGroup.push(new google.maps.Marker({
      map: map,
      position: result.geometry.location,
      title: result.name,
      icon: pinType,
    }));
  });
}

//Start of chained function----------------------------------------------------
//setInfoWindows and getAddress have to be used together so that detials can be displayed correctly.


//Setting info windows' detail for each marker curretly shown on map. Details include name of location, a streetview photo of said location
// and its address.
function setInfoWindows(results, markerGroup) {
  for (var i = 0; i < markerGroup.length; i++) {
    markerGroup[i].infoWindow = new google.maps.InfoWindow;

    //These constants are put together to produce a snippet of HTML which will be used as content of info window.
    // However this is only the first half because the address is not available yet.
    const location = markerGroup[i].position.lat() + ',' + markerGroup[i].position.lng();
    const param = 'size=200x120' + '&location=' + location;
    const url = 'https://maps.googleapis.com/maps/api/streetview?' + param + '&key=' + apiKey;
    const content = '<img class="info-img" src=' + url + ' />' +
      '<div class="info-detail">' +
      '<h3>' + markerGroup[i].title + '</h3>';

    //The partial HTML snippet will be passed to getAddress where it will be finalized.
    // Reverse geocoding only happens when user clicks on a marker in order to prevent over query limit.
    google.maps.event.addListener(markerGroup[i], 'click', function() {
      closeInfoWindows();
      getAddress(this.position, content, this);
    });
  }
}

function getAddress(location, content, target) {
  var geocoder = new google.maps.Geocoder;

  geocoder.geocode({
    'location': location
  }, function(results, status) {
    if (status === 'OK') {
      //Finalizing HTML snippet here before setting it to info window and finally opening the info window.
      // reverse geocoding will return more than 1 results - using first result returned for most appropriate address.
      var info = content + '<p>' + results[0].formatted_address + '</p>' + '</div>';
      target.infoWindow.setContent(info);
      target.infoWindow.open(map, target);
    } else {
      //Catches and logs any unexpected for analysis.
      console.log('Geocoder failed due to: ' + status);
    }
  });
}
//End of chained function---------------------------------------------

//Close all info window. This is called before user opens another info window to make sure only one info window is opened at a time.
function closeInfoWindows() {
  for (var i = 0; i < poiMarkers.length; i++) {
    poiMarkers[i].infoWindow.close();
  }
  for (var i = 0; i < accommodationsMarkers.length; i++) {
    accommodationsMarkers[i].infoWindow.close();
  }
  for (var i = 0; i < diningMarkers.length; i++) {
    diningMarkers[i].infoWindow.close();
  }
}

//Used to remove a single type of markers from map depending on which button from toolbar has been unchecked.
function removeMarkers(markerGroup) {
  for (var i = 0; i < markerGroup.length; i++) {
    markerGroup[i].setMap(null);
  }
}

// Used to remove all markers at once.
function resetMarkers() {
  removeMarkers(poiMarkers);
  removeMarkers(accommodationsMarkers);
  removeMarkers(diningMarkers);
}

//Reset toolbar state.
function resetToolbarState() {
  accommodations.checked = false;
  dining.checked = false;
}
