// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 10
    });
    infoWindow = new google.maps.InfoWindow;


    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);

            //Read into this

            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(pos.lat, pos.lng)
            });

            var request = {
                location: pos,
                radius: 500,
                type: ['restaurant']
            };

            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);

            // Add circle overlay and bind to marker
            var circle = new google.maps.Circle({
                map: map,
                radius: 500, //In metres
                fillColor: '#AA0000'
            });

            circle.bindTo('center', marker, 'position');
            
            createMarker()

            //Read into this

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    }

    else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
