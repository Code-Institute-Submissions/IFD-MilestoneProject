var map;

var poi = document.getElementById('poi');
var accommodations = document.getElementById('accommodations');
var dining = document.getElementById('dining');

//Place type consstant for each button in toolbar
const poi_type = [
  'amusement_park',
  'aquarium',
  'art_gallery',
  'casino',
  'church',
  'museum',
  'night_club',
  'park',
  'shopping_mall',
  'spa',
  'stadium',
  'zoo'
];
const accommodations_type = ['lodging'];
const dining_type = ['restaurant', 'bar', 'cafe'];

//Along with place type, radius has been declared as constant as well for easier parameter modification.
const radius = 5000;

var poiMarkers = [];
var accommodationsMarkers = [];
var diningMarkers = [];

//Default center position (London)
var lat = 51.508742;
var lng = -0.120850;
var zoom = 6;

function defaultLocation() {
  // If user premits use of geolocation, the map will be centered based on that, otherwise map will be rendered with default values.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        zoom = 13; // Applies higher zoom if user allows geolocations for a more relavent view to the user.
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

    toolbarReset();
    resetMarkers();

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

    map.fitBounds(bounds);
    map.setZoom(12);
  });
}

//-----------------------------Solution v2-------------------------------

function placeSearch(searchID, placeType) {
  if (searchID.checked) {
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: map.getCenter(),
      radius: radius,
      type: placeType
    }, returnSearch);
  } else {
    if (searchID == poi) {
      removeMarkers(poiMarkers);
    } else if (searchID == accommodations) {
      removeMarkers(accommodationsMarkers);
    } else if (searchID == dining) {
      removeMarkers(diningMarkers);
    } else {
      console.log("An error has occured in placeSearch function!");
    }
  }
}

function returnSearch(results, status) {
  if (poi.checked && poiMarkers.length == 0) {
    addMarkers(results, poiMarkers);
  } else if (accommodations.checked && accommodationsMarkers.length == 0) {
    addMarkers(results, accommodationsMarkers);
  } else if (dining.checked && diningMarkers.length == 0) {
    addMarkers(results, diningMarkers);
  }
}

function addMarkers(results, markerGroup) {
  results.forEach(function(result) {
    markerGroup.push(new google.maps.Marker({
      map: map,
      position: result.geometry.location
    }));
  });
}

// Used to reset all markers when a new search for city takes place.
function resetMarkers() {
  poiMarkers = [];
  accommodationsMarkers = [];
  diningMarkers = [];
}

function removeMarkers(markerGroup) {
  for (var i = 0; i < markerGroup.length; i++) {
    markerGroup[i].setMap(null);
  }
  markerGroup = [];
  if (!poi.checked && poiMarkers.length > 0) {
    poiMarkers = markerGroup;
  } else if (!accommodations.checked && accommodationsMarkers.length > 0) {
    accommodationsMarkers = markerGroup;
  } else if (!dining.checked && diningMarkers.length > 0) {
    diningMarkers = markerGroup;
  } else {
    console.log("An error has occured in removeMarkers function!")
  }
}

//-----------------------------Solution v2-------------------------------
