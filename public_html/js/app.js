//import { Router } from '@angular/router';

var mainApp = angular.module('MainApp', ["ngRoute"]);

mainApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html"
    })
    .when("/search/:q", {
        templateUrl : "search-route.html"
    })
    .when("/weather/:woeid", {
        templateUrl : "weather-route.html"
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
//            alert(JSON.stringify($scope.locations));
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
    
    $scope.get_icon = function(weather_state_abbr) {
        
        var url = "https://www.metaweather.com/static/img/weather/png/64/" + weather_state_abbr + ".png";
        
        return url;
    }
    
    $scope.get_day_of_week = function(dateStr) {
        
        var today = new Date();
        
        if(today.toISOString().substring(0, 10) == dateStr) {
            return "Today";
        }
        else {
            var d = new Date(dateStr);
            var weekdayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var monthArr=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
            var weekday = weekdayArr[d.getDay()];
            
            var month = monthArr[d.getMonth()];
            
            return weekday + ", " + month + " " + d.getDate();
        }
        
    }
    
    
    
}])
.directive('weather', function() {
    return {
        restrict: 'E',
        templateUrl: 'weather.html'
    };
})
.directive('dayWeather', function() {
    return {
        restrict: 'E',
        templateUrl: 'day-weather.html'
    };
});


