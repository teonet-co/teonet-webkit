'use strict';

/**
 * @ngdoc function
 * @name teonetWebkitApp.controller:TeoDbCtrl
 * @description
 * # TeoDbCtrl
 * Controller of the teonetWebkitApp
 * @param $scope
 * @param $localStorage
 * @param teonetRestApi
 */
angular.module('teonetWebkitApp')

.controller('TeoDbCtrl', function ($scope, $localStorage, teonetRestApi) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    var range = 100;

    if(!teonetRestApi || !teonetRestApi.start) { return; }

    // Execute TeoDB data request
    $scope.exec = function (peer) {
        
        console.log('$scope.exec, peer: ' + peer);
        
        function getData(data, key, from, to/*, listLen*/) {
            
            // Get list data
            teonetRestApi.exec(peer, 136, JSON.stringify({ key: key, from: from, to: to }), 
              function(err, res) {

                if(err) {
                    return;
                }

                //console.log('getData, data: ' + JSON.stringify(res));
                $scope.data = data.concat(res.data);
//                if(to < listLen) {
//                    getData($scope.data, key, to, to + range, listLen);
//                }
              }
            );
        }
        
        // Get list length
        teonetRestApi.exec(peer, 134, JSON.stringify({ key: '' }), 
          function(err, res) {
            
            if(err) {
                return;
            }
            
            $scope.listLen = res.data.listLen;
            $scope.data = [];
        
            // Get list data
            getData($scope.data, '', 0, range, $scope.listLen);
          }
        );
    };
    
    // Start RestAPI server
    teonetRestApi.start($scope, function(err/*, success*/) {
        
        if(err) {
            console.log(err);
            return;
        }
        
        console.log('teonetRestApi started');
        $scope.exec($localStorage.peerSelect.selected.name);
    });    
})

;
