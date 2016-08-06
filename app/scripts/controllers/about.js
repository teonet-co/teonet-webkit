/* global nw */

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
    try {
        var os = require('os');
//        var nw = require('nw.gui');

        console.log(nw.App.argv);
        $scope.argv = nw.App.argv;
            
        //if(nw && os) {
            //console.log(os);
            $scope.os = {};
            $scope.os.platform = 'You are running on ' + os.platform() + '.';
            //$scope.teonet_ver = teonet_ver;
        //}
    }
    catch(err) {
        
    }
    
  });
