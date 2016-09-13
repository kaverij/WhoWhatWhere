
/*serach exact location and there amenities controller*/

routerApp.controller("mainController", function ($scope, $state) {
    $scope.onButtonClick = function (event) {

            $state.go('displayList', {location: $scope.location, item: $scope.item});
    };
});