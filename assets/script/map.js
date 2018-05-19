function myMap() {
    //Default center position (London)
    var lat = 51.508742;
    var lng = -0.120850;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    }
    
    
    var mapProp = {
        center: new google.maps.LatLng(lat, lng), //London
        zoom: 6,
    };
    var map = new google.maps.Map(document.getElementById("map"), mapProp);
}

function setPosition(position) {
    console.log(position.coords.latitude + ", " + position.coords.longitude);
}