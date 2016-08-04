'use strict';

/**
 * @ngdoc function
 * @name teonetWebkitApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the teonetWebkitApp
 */
angular.module('teonetWebkitApp')
  .controller('AboutCtrl', function ($scope) {
      
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    

    // get the system platform using node.js
//    if(typeof process !== 'undefined' && process.argv[0] === "node") {
////    if(is_it_nodejs()) {
    try {
        var os = require('os');
        if(os) {
            console.log(os);
//            //document.write('You are running on ', os.platform());
            $scope.os = {};
            $scope.os.platform = 'You are running on ' + os.platform() + '.';
        }
    }
    catch(err) {
        
    }
    
  });
