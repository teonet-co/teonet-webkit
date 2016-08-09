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

    // Return this method if teoet is not presend in node modules or can't loaded
    var meaningOfLife = 42;
    var teonet = {
      someMethod: function () {
        return meaningOfLife;
      }
    };

    // Teonet identifier
    var ke;

    /**
     * Start Teonet with default event loop
     *
     * @param {type} teonet
     * @param {type} cb Callback called when teonect started
     * @returns {pointer} Pointer to created ksnetEvMgrClass
     */
    function teonetDefault(teonet, cb) {

        //var logger = teonet.syslog('<%= name %>', module.filename);

        console.log('Teonet module loaded');

        /**
         * This application API commands
         */
        var teoApi = {
            CMD_ECHO_ANSWER: 66
        };

        //var _ke; // right pointer to ksnetEvMgrClass
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
                    teonet.kePtr = ke; // Pointer to ksnetEvMgrClass
                    console.log('<%= name_capitalize %> started .... ');
                    cb(ke);
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

                        default: break;
                    }
                    break;

                // EV_K_USER #11 User press A hotkey in CLI
                //case teonet.ev.EV_K_USER:
                //    break;

                // #2 Calls after event manager stopped
                case teonet.ev.EV_K_STOPPED:
                    // Get the current window and close it
                    nw.Window.get().close(true);
                    break;

                default: break;
            }
        }

        /**
         * Initialize and start Teonet
         *
         * @param teonet
         * @returns {pointer} Pointer to created ksnetEvMgrClass
         */
        function teoStart(teonet) {

            // Initialize teonet event manager and Read configuration
            //var ke = teonet.init(teoEventCb, 3);
            ke = teonet.lib.ksnetEvMgrInit(
                    nw.App.argv.length - 1,
                    nw.App.argv.slice(1),
                    teonet.eventCbPtr(teoEventCb),
                    (teonet.opts.READ_ALL + teonet.opts.BLOCK_CLI_INPUT)
            );

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

            return ke;
        }

        // Start teonet module
        return teoStart(teonet);
    }

    // Try load Teonet modyle
    try {

        teonet = require('teonet');
        teonet.kePtr = null;

        teonetDefault(teonet, function(/*ke_ptr*/) {

            // Listen to main window's close event
            nw.Window.get().on('close', function() {

              // Hide the window to give user the feeling of closing immediately
              this.hide();

              // CLose some other windows
              //if (win != null) win.close(true);

              // Stop Teonet
              console.log('Destroy teonet library ...');
              teonet.stop(ke);
              // After teonet stopped if the window should be clouse in stopped event

            });
        });
    }
    catch(err) {

    }

    // Return teonet module or object with someMethod if can't load teomet module
    return teonet;
  });
