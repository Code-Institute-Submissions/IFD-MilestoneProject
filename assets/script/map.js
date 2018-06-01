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

    if (places.length == 0) {
      return;
    }

    toolbarReset();

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

//-----------------------Search for points of interest--------------------------

function poiSearch() {
  if (poi.checked) {
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: map.getCenter(),
      radius: 5000,
      type: poi_type
    }, returnPoi);
  } else {
    for (var i = 0; i < poiMarkers.length; i++) {
      poiMarkers[i].setMap(null);
    }
    poiMarkers = [];
  }
}

function returnPoi(results, status) {
  results.forEach(function(result) {
    poiMarkers.push(new google.maps.Marker({
      map: map,
      position: result.geometry.location
    }));
  });
}

//-----------------------Search for points of interest--------------------------

//-----------------------Search for accommodations--------------------------

function accommodationsSearch() {
  if (accommodations.checked) {
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: map.getCenter(),
      radius: radius,
      type: accommodations_type
    }, returnAccomodations);
  } else {
    for (var i = 0; i < accommodationsMarkers.length; i++) {
      accommodationsMarkers[i].setMap(null);
    }
    accommodationsMarkers = [];
  }
}

function returnAccomodations(results, status) {
  results.forEach(function(result) {
    accommodationsMarkers.push(new google.maps.Marker({
      map: map,
      position: result.geometry.location
    }));
  });
}

//-----------------------Search for accommodations--------------------------

//-----------------------Search for dining place--------------------------

function diningSearch() {
  if (dining.checked) {
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: map.getCenter(),
      radius: radius,
      type: dining_type
    }, returnDining);
  } else {
    for (var i = 0; i < diningMarkers.length; i++) {
      diningMarkers[i].setMap(null);
    }
    diningMarkers = [];
  }
}

function returnDining(results, status) {
  results.forEach(function(result) {
    diningMarkers.push(new google.maps.Marker({
      map: map,
      position: result.geometry.location
    }));
  });
}

//-----------------------Search for dining place--------------------------

function placeSearch(searchID, placeType, resultsArray) {
  if (searchID.checked) {
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: map.getCenter(),
      radius: radius,
      type: placeType
    }, returnSearch);
  } else {
    for (var i = 0; i < resultsArray.length; i++) {
      resultsArray[i].setMap(null);
    }
    resultsArray = [];
  }
}

function returnSearch(results, status) {
  if (poi.checked) {
    addMarkers(results, poiMarkers);
  }
  if (accommodations.checked) {
    addMarkers(results, accommodationsMarkers);
  }
  if (dining.checked) {
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

function checkMarkers() {
  console.log(poiMarkers);
  console.log(accommodationsMarkers);
  console.log(diningMarkers);
}
