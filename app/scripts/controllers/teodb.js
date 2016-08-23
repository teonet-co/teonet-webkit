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
 * @param scopes
 */
angular.module('teonetWebkitApp')

.controller('TeoDbCtrl', function ($scope, $localStorage, teonetRestApi, scopes) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    if(!teonetRestApi || !teonetRestApi.start) { return; }

    scopes.set('TeoDbCtrl', $scope);

    // Execute TeoDB data request
    $scope.exec = function (peer) {
        
        console.log('$scope.exec, peer: ' + peer);
        
        function getData(key, from, to/*, listLen*/) {
            
            // Get list data
            teonetRestApi.exec(peer, 136, JSON.stringify({ key: key, from: from, to: to }), 
                function(err, res) {

                    if(err) {
                        return;
                    }
                    
                    console.log('getData, data: ' + JSON.stringify(res));
                    //$scope.data = data.concat(res.data);
                    //$scope.data = 
                    
                    //$scope.data.push(res.data);                    
                    $scope.data = res.data;
                    
                    //$scope.$apply();
//                    if(to < listLen) {
//                        getData(data, key, to, to + 25, listLen);
//                    }
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
            getData('', 0, 25, $scope.listLen);
//            teonetRestApi.exec(peer, 136, JSON.stringify({ key: '', from: 0, to: 25 }), 
//            function(err, res) {
//                
//                if(err) {
//                    return;
//                }
//                $scope.data = $scope.data.concat(res.data);
//            });
        });
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
