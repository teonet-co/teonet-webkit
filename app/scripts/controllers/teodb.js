'use strict';

/**
 * @ngdoc function
 * @name teonetWebkitApp.controller:TeoDbCtrl
 * @description
 * # TeoDbCtrl
 * Controller of the teonetWebkitApp
 * @param $scope
 * @param teonet
 */
angular.module('teonetWebkitApp')

.controller('TeoDbCtrl', function ($scope, teonet) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // This is Teonet based controller, exit if teonet undefined
    if(!teonet || teonet.notLoaded) { return; }


    // \todo write yor code here and inside the eventCb function
    

    // ------------------------------------------------------------------------

    /**
     * Teonet event callback
     *
     * Original C function parameters:
     * void roomEventCb(ksnetEvMgrClass *ke, ksnetEvMgrEvents event, void *data, size_t data_len, void *user_data)
     *
     * @param {pointer} ke Pointer to ksnetEvMgrClass, see the http://repo.ksproject.org/docs/teonet/structksnetEvMgrClass.html
     * @param {int} ev Teonet event number, see the http://repo.ksproject.org/docs/teonet/ev__mgr_8h.html#ad7b9bff24cb809ad64c305b3ec3a21fe
     * @param {pointer} data Binary or string (depended on event) data
     * -param {int} dataLen Data length
     * -param {pointer} userData Additional poiner to User data
     *
     * @returns {int} If true then event is processed and will not send to other
     *                registerredcustom event callbacks
     */
    function eventCb(ke, ev, data) { //, dataLen, userData) {

        //console.log('TeoDbCtrl: Custom event callback called');

        var rd;

        switch (ev) {

            // EV_K_RECEIVED #5 This host Received a data
            case teonet.ev.EV_K_RECEIVED:

                rd = new teonet.packetData(data);

                // Command
                switch (rd.cmd) {

                    // Process Echo answer #66 command
                    case teonet.api.CMD_ECHO_ANSWER:
                        //console.log('TeoDbCtrl: Echo answer command event received');
                        break;

                    // Process User #129 command
                    case teonet.api.CMD_USER:
                        //console.log('TeoDbCtrl: Echo answer command event received');
                        break;

                    default: break;
                }
                break;

            // EV_A_INTERVAL #27 Angular interval event happened
            case teonet.ev.EV_A_INTERVAL:

                //console.log('TeoDbCtrl: Interval event received');
                break;

            default: break;
        }

        return 0;
    }

    // Start processing teonet controller
    teonet.processing($scope, eventCb, 1000, function() {
        //console.log('TeoDbCtrl: Start processing teonet controller');
    });
})

.controller('TeoDbSelectCtrl', function($rootScope, $scope, $localStorage, 
    teonet) {

    var vm = this;
    vm.peerItems = teonet.appTypes['teo-db'];
    if(!vm.peerItems) { vm.peerItems = []; }
    
    $rootScope.selectedPeer = $localStorage.restapi.req.peer;

    if(!$rootScope.selectedPeer) {
        $rootScope.selectedPeer = vm.peerItems[0];
    }
    
    $scope.selectPeer = function(db) {
        $rootScope.selectedPeer = db.name;
        
        // \todo use other controller scope to refresh database key list 
        // https://gonzalo123.com/2014/09/08/sharing-scope-between-controllers-with-angularjs/
        
    };
})  
;
