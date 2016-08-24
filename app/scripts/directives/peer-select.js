/*
 * The MIT License
 *
 * Copyright 2016 Kirill Scherba <kirill@scherba.ru>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

angular.module('teonetWebkitApp')
.directive('peerSelect', function () {
  return {
    restrict: 'AE',
    replace:  'true',
    scope: {
      appType: '@type',
      execFn: '&exec'
    },
    templateUrl: 'views/peer-select.html',
    controller: ['$scope', '$localStorage', 'teonet',
        function ($scope, $localStorage, teonet) {

        // This is Teonet based controller, exit if teonet undefined
        if(!teonet || teonet.notLoaded) { return; }

        // Set peers
        $scope.peerItems = teonet.appTypes[$scope.appType];
        if(!$scope.peerItems) { $scope.peerItems = []; }

        // Get selected peer from Local Storage
        if(!$localStorage.peerSelect) { $localStorage.peerSelect = {}; }
        if(!$localStorage.peerSelect.selected) {
            $localStorage.peerSelect.selected = { 
                name: $scope.peerItems[0] 
            };
        }
        $scope.peerSelected = $localStorage.peerSelect.selected;

        $scope.selectPeer = function(db) {

            // Set selected peer and execute function from trag exec atributte
            $scope.peerSelected.name = db.name;
            $scope.execFn({name: db.name});
        };
    }]
  };
});
