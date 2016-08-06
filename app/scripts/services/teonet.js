/* global nw */

'use strict';

/**
 * @ngdoc service
 * @name teonetWebkitApp.teonet
 * @description
 * # teonet
 * Factory in the teonetWebkitApp.
 */
angular.module('teonetWebkitApp')
  .factory('teonet', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;
    var teonet = {
      someMethod: function () {
        return meaningOfLife;
      }
    };
    
    function teonetDefault(teonet) {
        
        //var logger = teonet.syslog('<%= name %>', module.filename);

        console.log('Teonet module loaded');

        /**
         * This application API commands
         */
        var teoApi = {
            CMD_ECHO_ANSWER: 66
        };

        var _ke; // right pointer to ksnetEvMgrClass
        var peers = Object.create(null);

        // Application welcome message
        console.log('<%= name_capitalize %> ver. <%= version %>, based on teonet ver. ' + teonet.version());

        /**
         * Teonet event callback
         *
         * Original C function parameters:
         * void roomEventCb(ksnetEvMgrClass *ke, ksnetEvMgrEvents event, void *data, size_t data_len, void *user_data)
         *
         * @param {pointer} ke Pointer to ksnetEvMgrClass, see the http://repo.ksproject.org/docs/teonet/structksnetEvMgrClass.html
         * @param {int} ev Teonet event number, see the http://repo.ksproject.org/docs/teonet/ev__mgr_8h.html#ad7b9bff24cb809ad64c305b3ec3a21fe
         * @param {pointer} data Binary or string (depended on event) data
         * -param {int} data_len Data length
         * -param {pointer} user_data Additional poiner to User data
         */
        function teoEventCb(ke, ev, data) { //, data_len, user_data) {
            var rd;

            switch (ev) {

                // EV_K_STARTED #0 Calls immediately after event manager starts
                case teonet.ev.EV_K_STARTED:
                    _ke = ke;
                    console.log('<%= name_capitalize %> started .... ');
                    break;

                // EV_K_CONNECTED #3 New peer connected to host event
                case teonet.ev.EV_K_CONNECTED:
                    rd = new teonet.packetData(data);
                    console.log('Peer "' + rd.from + '" connected');
                    peers[rd.from] = 0;
                    break;

                // EV_K_DISCONNECTED #4 A peer was disconnected from host
                case teonet.ev.EV_K_DISCONNECTED:
                    rd = new teonet.packetData(data);
                    console.log('Peer "' + rd.from + '" disconnected'/*, arguments*/);

                    delete peers[rd.from];
                    break;

                // EV_K_TIMER #9 Timer event, seted by ksnetEvMgrSetCustomTimer   
                case teonet.ev.EV_K_TIMER:
                    break;

                // EV_K_RECEIVED #5 This host Received a data    
                case teonet.ev.EV_K_RECEIVED:
                    rd = new teonet.packetData(data);

                    // Command    
                    switch (rd.cmd) {
                        case teoApi.CMD_ECHO_ANSWER:
                            peers[rd.from] = 0;
                            break;

                        default:
                            break;
                    }
                    break;

                // EV_K_USER #11 User press A hotkey
                case teonet.ev.EV_K_USER:            
                    break;

                case teonet.ev.EV_K_STOPPED:
                    break;

                default:
                    break;
            }
        }

        /**
         * Initialize and start Teonet
         *
         * @param teonet
         * @returns {undefined}
         */
        function teoMain(teonet) {

            // Initialize teonet event manager and Read configuration
            //var ke = teonet.init(teoEventCb, 3);
            var ke = teonet.lib.ksnetEvMgrInit(nw.App.argv.length - 1, nw.App.argv.slice(1), teonet.eventCbPtr(teoEventCb), 3);

            // Set application type
            teonet.setAppType(ke, '<%= name %>');

            // Set application version
            teonet.setAppVersion(ke, '<%= version %>');

            // Start Timer event 
            teonet.setCustomTimer(ke, 5.000);

            // Start teonet
            teonet.run(ke);

            // Show exit message
            console.log('<%= name_capitalize %> application initialization finished ...');
        } 
        
        // Start teonet module
        teoMain(teonet);
    }
    
    try {
        
        teonet = require('teonet');
        teonetDefault(teonet);
    }
    catch(err) {
        
    }

    // Public API here
//    return {
//      someMethod: function () {
//        return meaningOfLife;
//      }
//    };
    return teonet;
  });
