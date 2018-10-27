var mainApp = angular.module('MainApp', ["ngRoute"]);

mainApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html"
    })
    .when("/search", {
        templateUrl : "search.html"
    })
    .when("/weather", {
        templateUrl : "weather.html"
    });
});


mainApp.controller('HomeController', ['$scope', '$http', '$window', function($scope, $http, $window) {


    $scope.URL_SEARCH_FOR_LOCATION   = 'http://localhost/codelineangular/public_html/weather.php?command=search&keyword=';
    $scope.URL_WEATHER_FOR_LOCATION   = 'http://localhost/codelineangular/public_html/weather.php?command=location&woeid=';
    
    $scope.search_for_location = function() {
        $http.get($scope.URL_SEARCH_FOR_LOCATION + "Istanbul").
        then(function(response) {
            alert(JSON.stringify(response.data));
        });
    }
    
    $scope.weathers = [];
    
    $scope.weather_for_locations = function(woeids) {
        $scope.weathers = [];
        for(var i = 0; i < woeids.length; i++) {
            $scope.weather_for_location(woeids[i]);
        }
    }
    
    $scope.weather_for_location = function(woeid) {
        $http.get($scope.URL_WEATHER_FOR_LOCATION + woeid).
        then(function(response) {
            $scope.weathers.push(response.data);
//            alert(JSON.stringify(response.data));
        });
    }
    
    $scope.weather_for_home_page = function() {
        $scope.weather_for_locations(['2344116', '638242', '44418', '565346', '560743', '9807']);
    }
    
//    Istanbul, Berlin, London, Helsinki, Dublin, Vancouver
//    2344116, 638242, 44418, 565346, 560743, 9807
    
//    $scope.search_for_location();
    $scope.weather_for_locations(['2344116', '638242', '44418', '565346', '560743', '9807']);
//    $scope.weather_for_home_page();
}]);

