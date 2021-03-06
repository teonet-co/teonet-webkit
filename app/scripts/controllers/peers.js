'use strict';

/**
 * @ngdoc function
 * @name teonetWebkitApp.controller:PeersCtrl
 * @description
 * # PeersCtrl
 * Controller of the teonetWebkitApp
 * @param $scope
 * @param teonet
 */
angular.module('teonetWebkitApp')

  .controller('PeersCtrl', function ($scope, teonet) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    // This is Teonet based controller, exit if teonet undefined
    if(!teonet || teonet.notLoaded) { return; }


    // Set peer items from teonet factory
    $scope.peersItems = teonet.peersItems;
  
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
//    function eventCb(ke, ev, data) { //, dataLen, userData) {
//
//        //console.log('PeersCtrl: Custom event callback called');
//        
//        var rd;
//
//        switch (ev) {
//            
//            // EV_K_RECEIVED #5 This host Received a data
//            case teonet.ev.EV_K_RECEIVED:
//                
//                rd = new teonet.packetData(data);
//
//                // Command
//                switch (rd.cmd) {
//                    
//                    // Process Echo answer #66 command
//                    case teonet.api.CMD_ECHO_ANSWER:
//                        //console.log('PeersCtrl: Echo answer command event received');
//                        break;
//                    
//                    // Process User #129 command
//                    case teonet.api.CMD_USER:
//                        //console.log('PeersCtrl: Echo answer command event received');
//                        break;
//
//                    default: break;
//                } 
//                break;
//                
//            // EV_A_INTERVAL #27 Angular interval event happened    
//            case teonet.ev.EV_A_INTERVAL:                
//                //console.log('PeersCtrl: Interval event received');
//                break;
//            
//            default: break;
//        }
//        
//        return 0;
//    }

    // Start processing teonet controller
//    teonet.processing($scope, null, 1000, function() {
//        console.log('PeersCtrl: Start processing teonet controller');
//    }); 

  });
