let map;
var locations = {
    "Locations": [
        { "Latitude": 40.99241571892365, "Longitude": 28.611766521103995 }, 
        { "Latitude": 40.99309595471015, "Longitude":28.6054579659557 },
        { "Latitude": 40.99322552263562, "Longitude": 28.615414325101312 },
        { "Latitude": 40.99652941869759, "Longitude": 28.625928583681805 }, 
        { "Latitude": 40.99727439199014, "Longitude": 28.618847552392904 },  
        { "Latitude": 38.1952078, "Longitude": 29.3868366 },
        { "Latitude": 36.1952078, "Longitude": 27.3868366 },
        { "Latitude": 37.6952078, "Longitude": 28.9868366 },
        { "Latitude": 36.9952078, "Longitude": 28.0868366 },
        { "Latitude": 38.3952078, "Longitude": 28.7868366 },
        { "Latitude": 36.8952078, "Longitude": 28.2868366 },
        { "Latitude": 37.4952078, "Longitude": 27.9868366 }
    ]
};

// Get user's location and show it on the map
function getLocationAndShowMap(map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var userLocation = {
                    Latitude: position.coords.latitude,
                    Longitude: position.coords.longitude
                };

                // Filter locations within 20 km
                var closeLocations = locations.Locations.filter(function (location) {
                    return getDistance(userLocation.Latitude, userLocation.Longitude, location.Latitude, location.Longitude) <= 20;
                });

                // Mark locations within 20 km
                closeLocations.forEach(function (location) {
                    var marker = new google.maps.Marker({
                        position: { lat: location.Latitude, lng: location.Longitude },
                        map: map,
                        title: 'Close Location'
                    });

                    google.maps.event.addDomListener(marker, 'click', function () {
                        //console.log('Marker clicked at: ' + location.lat() + ', ' + location.lng());
                        alert('Marker clicked at: ' + location.Latitude + ', ' + location.Longitude);
                    });
                });

                // Center the map on the user's location
                map.setCenter(new google.maps.LatLng(userLocation.Latitude, userLocation.Longitude));
            },
            function (error) {
                console.error('Unable to get location:', error);
            }
        );
    } else {
        console.error('Your browser does not support geolocation.');
    }
}

 // Calculate distance between two points (Haversine formula)
 function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Earth radius in kilometers
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c; // kilometers
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// Create a map and marker
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.99, lng: 28.61 }, // Center point
        zoom: 11
    });

    // Get user's location and show it on the map
    getLocationAndShowMap(map);
}



// Initialize the map when Google Maps API is loaded
google.maps.event.addDomListener(window, 'load', initMap);

module.exports = {getLocationAndShowMap}