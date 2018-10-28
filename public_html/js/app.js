//import { Router } from '@angular/router';

var mainApp = angular.module('MainApp', ["ngRoute"]);

mainApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html"
    })
    .when("/search/:q", {
        templateUrl : "search.html"
    })
    .when("/weather/:woeid", {
        templateUrl : "weather.html"
    });
});


mainApp.controller('HomeController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {


    $scope.URL_SEARCH_FOR_LOCATION   = 'http://localhost/codelineangular/public_html/weather.php?command=search&keyword=';
    $scope.URL_WEATHER_FOR_LOCATION   = 'http://localhost/codelineangular/public_html/weather.php?command=location&woeid=';
    
    $scope.search_q = '';
    
    $scope.locations = [];
    
    $scope.search_for_location = function() {
        $scope.weathers = [];
        $http.get($scope.URL_SEARCH_FOR_LOCATION + $scope.search_q).
        then(function(response) {
            $scope.locations = response.data;
            alert(JSON.stringify($scope.locations));
            for(var i = 0; i < $scope.locations.length; i++) {
                var woeid = $scope.locations[i].woeid;
//                alert(JSON.stringify(woeid));
                $scope.weather_for_location(woeid);
            }
//            alert(JSON.stringify($scope.locations[0].woeid));
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
        });
    }
    
    $scope.weather_for_one = null;
    $scope.get_weather_for_one_location = function(woeid) {
        $http.get($scope.URL_WEATHER_FOR_LOCATION + woeid).
        then(function(response) {
            $scope.weather_for_one = response.data;
        });
    }
    
    $scope.weather_for_home_page = function() {
        $scope.weather_for_locations(['2344116', '638242', '44418', '565346', '560743', '9807']);
    }
    
//    $scope.weather_for_locations(['2344116', '638242', '44418', '565346', '560743', '9807']);
    $scope.weather_for_home_page();

    $scope.go_to_search = function() {
        
        $scope.search_for_location();        
        
        $location.path('/search/' + $scope.search_q);
    }
    
    $scope.go_to_weather = function(woeid) {
//        alert(woeid);
        $scope.get_weather_for_one_location(woeid);
//        $location.path('/search/' + $scope.search_q);
        $location.path('/weather/' + woeid);
    }
    
}])
.directive('weatherCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'weather-card.html'
    };
})
.directive('dayWeatherCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'day-weather-card.html'
    };
});


