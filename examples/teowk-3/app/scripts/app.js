'use strict';

/**
 * @ngdoc overview
 * @name teonetWebkitApp
 * @description
 * # teonetWebkitApp
 *
 * Main module of the application.
 */
angular
  .module('teonetWebkitApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])

  .constant('teonetAppApi',

    /**
     * This application Teonet API commands
     */
    {
        CMD_ECHO_ANSWER: 66, ///< Echo answer system command
        CMD_USER: 129 ///< First user command
    }
  )

  .config(function (/*$locationProvider, */$routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/peers', {
        templateUrl: 'views/peers.html',
        controller: 'PeersCtrl',
        controllerAs: 'peers'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/test', {
        templateUrl: 'views/test.html',
        controller: 'TestCtrl',
        controllerAs: 'test'
      })
      .when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl',
        controllerAs: 'contacts'
      })
      .when('/navbar-main', {
        templateUrl: 'views/navbar-main.html',
        controller: 'NavbarMainCtrl',
        controllerAs: 'navbarMain'
      })
      .when('/test-2', {
        templateUrl: 'views/test-2.html',
        controller: 'Test2Ctrl',
        controllerAs: 'test2'
      })
      .otherwise({
        redirectTo: '/home'
      });
//      $locationProvider.html5Mode(true,"#");
  })

  .run(function(teonet){

    console.log(teonet.version);    
  });
