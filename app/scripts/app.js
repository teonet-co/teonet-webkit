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
    'datatables',
    'ngStorage'
  ])

  .constant('teonetAppApi',

    /**
     * This application Teonet API commands
     */
    {
        // System commands
        CMD_ECHO_ANSWER: 66,                ///< #66 Answer to auto replay message command
        CMD_HOST_INFO: 90,                  ///< #90 Request host info, allow JSON in request
        CMD_HOST_INFO_ANSWER: 91,           ///< #91 Host info amswer

        // First user (application) command
        CMD_USER: 129,                      ///< #129 First user command
        
        // TeoDB commands
        CMD_D_LIST: 131,                    ///< #131 List request: { key, id } }
        CMD_D_LIST_ANSWER: 133,             ///< #133 List response:  [ { key, id }, ... ]
        
        CMD_D_LIST_LENGTH: 134,             ///< #134 List length request: { key, id } }
        CMD_D_LIST_LENGTH_ANSWER: 135,      ///< #135 List response:  { listLength, key, id }
        
        CMD_D_LIST_RANGE: 136,              ///< #136 List length request:  { id, key, from, to } }
        CMD_D_LIST_RANGE_ANSWER: 137,       ///< #137 List response:  { listLength, key, ID }
        
        // Last user (application) command
        CMD_USER_LAST: 191                  ///< #191 Last user command
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
      .when('/ajax-db', {
        templateUrl: 'views/ajax-db.html',
        controller: 'AjaxDbCtrl',
        controllerAs: 'ajax-db'
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
  })
  .run(function(DTDefaultOptions) {
    // Display 25 items per page by default
    DTDefaultOptions.setDisplayLength(25);
  });
  
