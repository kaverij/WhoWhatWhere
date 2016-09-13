/*display list and location controller*/

routerApp.controller("displayLocation", function ($q, $http, $scope, $filter, $stateParams) {
    $scope.getResponseData = [];
    var markers = [];
    var location = $stateParams.location == '' ? 'San+francisco' : $stateParams.location,
        item = $stateParams.item == '' ? 'coffee' : $stateParams.item;

    $http({
        method: 'GET',
        url: '/search?location=' + location + '&term=' + item + ''
    }).then(function successCallback(response) {

        var requestData = response.data.businesses;
        for (var i = 0; i < requestData.length; i++) {
            var imageIcon = requestData[i].image_url == undefined ? '../images/NA_image.png' : requestData[i].image_url;
            $scope.getResponseData.push(
                {
                    name: requestData[i].name,
                    address: requestData[i].location.display_address,
                    rating: requestData[i].rating,
                    image: imageIcon,
                    latitude: requestData[i].location.coordinate.latitude,
                    longitude: requestData[i].location.coordinate.longitude,
                    url: requestData[i].mobile_url
                })
        }

        //show popup on google map
        showInfoPopup();
    }, function errorCallback(response) {
        console.log('search data error', response);
    });

    $scope.$watch('search', function (value) {
        $scope.businessInfo = $filter('filter')($scope.getResponseData, value);
    });

    function showInfoPopup() {
        var locations = $scope.getResponseData;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: new google.maps.LatLng(-33.92, 151.25)
        });

        var infoPopup = new google.maps.InfoWindow(),
            bounds = new google.maps.LatLngBounds(),
            marker, i;

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                id: locations[i].id,
                position: new google.maps.LatLng(locations[i].latitude, locations[i].longitude),
                map: map
            });

            markers.push(marker);
            bounds.extend(marker.position);

            google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
                return function () {
                    infoPopup.setContent('<div style="font-size: 15px;font-family: bold;"><a target="_blank" href="' +
                        locations[i].url + '">' + locations[i].name + '</a></div><div>' +
                        locations[i].address + '</div>');
                    infoPopup.open(map, marker);
                }
            })(marker, i));
        }
        map.fitBounds(bounds);
    }
});