const apiKey = 'AIzaSyDWbbDURuiYEUVmvnTRol3xbTq4BDuK5aE';

var map;

var slider = document.getElementById("range-slider");
var circle = [];

var poi = document.getElementById('poi');
var accommodations = document.getElementById('accommodations');
var dining = document.getElementById('dining');

//Place type constant for each button in toolbar
const poi_type = ['point_of_interest'];
const accommodations_type = ['lodging'];
const dining_type = ['restaurant'];

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

slider.oninput = function() {
  $("#slider-info").html(slider.value + "m");
  showSearchRadius();
  resetMarkers();
  if (poi.checked) {
    placeSearch(poi, poi_type);
  } else if (accommodations.checked) {
    placeSearch(accommodations, accommodations_type);
  } else if (dining.checked) {
    placeSearch(dining, dining_type);
  }
}

//Checks which button in the toolbar has been clicked(checked) and performs a nearby search with corresponding place type.
// Markers will be added using results from nearby search. If a button has been unchecked, corresponding markers will be removed.
function placeSearch(searchID, placeType) {
  if (searchID.checked) {
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: map.getCenter(),
      radius: parseInt(slider.value),
      type: placeType
    }, returnSearch);
  } else {
    clearCircle();
    if (searchID == poi) {
      removeMarkers(poiMarkers);
    } else if (searchID == accommodations) {
      removeMarkers(accommodationsMarkers);
    } else if (searchID == dining) {
      removeMarkers(diningMarkers);
    }
  }
}

//Call back function to neaby search. First checks if results are returned successfully before checking which type of markers needs
// to be added as well as setting info windows for those markers. If nearby search did not return results successfully, users will be
// warned with a pop up message.
function returnSearch(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    showSearchRadius();
    if (poi.checked && poiMarkers.length == 0) {
      addMarkers(results, poiMarkers, poi_pin);
      setInfoWindows(results, poiMarkers);
    } else if (accommodations.checked && accommodationsMarkers.length == 0) {
      addMarkers(results, accommodationsMarkers, accommodations_pin);
      setInfoWindows(results, accommodationsMarkers);
    } else if (dining.checked && diningMarkers.length == 0) {
      addMarkers(results, diningMarkers, dining_pin);
      setInfoWindows(results, diningMarkers);
    }
  } else {
    resetUI();
    alert("Search has failed due to service status: " + status);
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
  markerGroup.length = 0;
  if (!poi.checked && poiMarkers.length > 0) {
    poiMarkers = markerGroup;
  } else if (!accommodations.checked && accommodationsMarkers.length > 0) {
    accommodationsMarkers = markerGroup;
  } else if (!dining.checked && diningMarkers.length > 0) {
    diningMarkers = markerGroup;
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
  poi.checked = false;
  accommodations.checked = false;
  dining.checked = false;
}

//Completely resets toolbar (both in terms of UI and its actual state).
function toolbarReset() {
  resetToolbarState();
  resetToolbarUI();
}

//Calling a set of functions as a standard method for completely resetting UI.
function resetUI() {
  toolbarReset();
  resetMarkers();
  clearCircle();
}
