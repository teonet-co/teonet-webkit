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
    'ngTouch',
    'datatables'
  ])

  .constant('teonetAppApi',

    /**
     * This application Teonet API commands
     */
    {
        CMD_ECHO_ANSWER: 66,        ///< #66 Answer to auto replay message command
        CMD_HOST_INFO: 90,          ///< #90 Request host info, allow JSON in request
        CMD_HOST_INFO_ANSWER: 91,   ///< #91 Host info amswer

        CMD_USER: 129               ///< #129 First user command
    }
  )

  .config(function (/*$locationProvider, */$routeProvider) {
    $routeProvider
      .when('/', {
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
      .when('/teodb', {
        templateUrl: 'views/teodb.html'
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
      .otherwise({
        redirectTo: '/'
      });
//      $locationProvider.html5Mode(true,"#");
  })

  .run(function(teonet){

    console.log(teonet.version);
  });
