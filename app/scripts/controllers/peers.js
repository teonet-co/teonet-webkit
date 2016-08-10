'use strict';

/**
 * @ngdoc function
 * @name teonetWebkitApp.controller:PeersCtrl
 * @description
 * # PeersCtrl
 * Controller of the teonetWebkitApp
 */
angular.module('teonetWebkitApp')

  .controller('PeersCtrl', ['$scope', 'teonet', function ($scope, teonet) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    // This is Teonet based controller, exit if teonet undefined
    if(!teonet || teonet.someMethod) { return; }

    $scope.master = {};

    $scope.update = function(user) {

      $scope.master = angular.copy(user);

      var userStr = JSON.stringify(user);
      teonet.sendCmdTo(teonet.kePtr, 'teo-nw-ser', 129, userStr);
      console.log('sendCmdTo: ' + userStr);
    };

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
    };

    $scope.reset();

    $scope.var17 = 'Value-17';

    /**
     * Teonet event callback
     *
     * Original C function parameters:
     * void roomEventCb(ksnetEvMgrClass *ke, ksnetEvMgrEvents event, void *data, size_t data_len, void *user_data)
     *
     * -param {pointer} ke Pointer to ksnetEvMgrClass, see the http://repo.ksproject.org/docs/teonet/structksnetEvMgrClass.html
     * -param {int} ev Teonet event number, see the http://repo.ksproject.org/docs/teonet/ev__mgr_8h.html#ad7b9bff24cb809ad64c305b3ec3a21fe
     * -param {pointer} data Binary or string (depended on event) data
     * -param {int} data_len Data length
     * -param {pointer} user_data Additional poiner to User data
     *
     * @returns {int} If true then event is processed and will not send to other
     *                registerredcustom event callbacks
     */
    function eventCb() { // ke, ev, data, data_len, user_data) {

        console.log('Custom event callback called');
        return 0;
    }

    /**
     * Teonet controller interval callback
     *
     * @returns {undefined}
     */
    function intervalCb() {

        console.log('Teonet controller interval callback called');
    }

    // Processing teonet controller
    teonet.processing($scope, eventCb, intervalCb, 1000, function() {
        console.log('Start processing teonet controller');
    });

  }]);
