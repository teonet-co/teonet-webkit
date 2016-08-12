'use strict';

/**
 * @ngdoc function
 * @name teonetWebkitApp.controller:NavbarMainCtrl
 * @description
 * # NavbarMainCtrl
 * Controller of the teonetWebkitApp
 */
angular.module('teonetWebkitApp')
  .controller('NavbarMainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //$templateCache.get('views/navbar-main.html');
    console.log('NavbarMainCtrl');
  });
