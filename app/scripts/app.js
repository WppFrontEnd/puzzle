'use strict';

/**
 * @ngdoc overview
 * @name gameCenterApp
 * @description
 * # gameCenterApp
 *
 * Main module of the application.
 */
angular
  .module('gameCenterApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      }).when('/pintu', {
        templateUrl: 'views/game/pintu.html',
        controller: 'puzzle'
      })
      
      .otherwise({
        redirectTo: '/'
      });
      
  });
