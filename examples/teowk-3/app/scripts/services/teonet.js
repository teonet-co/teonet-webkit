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

  .factory('teonet', function ($interval, teonetAppApi) {

    // Return this method if Teonet module is not presend in node modules or 
    // can't loaded
    var teonet = {
      /**
       * This method defined if teonet module is unavalable 
       * @returns {Number}
       */  
      notLoaded: function () {
        return 1;
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
    function start(teonet, cb) {

        //var logger = teonet.syslog('teowk-3', module.filename);

        console.log('Teonet module loaded');

        // Peers array
        teonet.peersItems = Object.create(null);

        // Application welcome message
        console.log('Teowk-3 ver. 0.0.9, based on teonet ver. ' + teonet.version());

        /**
         * Teonet event callback
         *
         * Original C function parameters:
         * void roomEventCb(ksnetEvMgrClass *ke, ksnetEvMgrEvents event, void *data, size_t data_len, void *user_data)
         *
         * @param {pointer} ke Pointer to ksnetEvMgrClass, see the http://repo.ksproject.org/docs/teonet/structksnetEvMgrClass.html
         * @param {int} ev Teonet event number, see the http://repo.ksproject.org/docs/teonet/ev__mgr_8h.html#ad7b9bff24cb809ad64c305b3ec3a21fe
         * @param {pointer} data Binary or string (depended on event) data
         * @param {int} dataLen Data length
         * @param {pointer} userData Additional poiner to User data
         */
        function teoEventCb(ke, ev, data, dataLen, userData) {
            
            var rd;

            switch (ev) {

                // EV_K_STARTED #0 Calls immediately after event manager starts
                case teonet.ev.EV_K_STARTED:
                    teonet.kePtr = ke; // Pointer to ksnetEvMgrClass
                    console.log('Teowk-3 started .... ');
                    cb(ke);
                    break;

                // EV_K_CONNECTED #3 New peer connected to host event
                case teonet.ev.EV_K_CONNECTED:
                    rd = new teonet.packetData(data);
                    console.log('Peer "' + rd.from + '" connected');
                    teonet.peersItems[rd.from] = { 'name': rd.from };
                    break;

                // EV_K_DISCONNECTED #4 A peer was disconnected from host
                case teonet.ev.EV_K_DISCONNECTED:
                    rd = new teonet.packetData(data);
                    console.log('Peer "' + rd.from + '" disconnected'/*, arguments*/);
                    delete teonet.peersItems[rd.from];
                    break;

                // EV_K_TIMER #9 Timer event, seted by ksnetEvMgrSetCustomTimer
                case teonet.ev.EV_K_TIMER:
                    break;

                // EV_K_RECEIVED #5 This host Received a data
                case teonet.ev.EV_K_RECEIVED:
                    rd = new teonet.packetData(data);

                    // Command
                    switch (rd.cmd) {
                        case teonet.api.CMD_ECHO_ANSWER:
                            //teonet.peersItems[rd.from] = rd.from;
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
            
            // Execute registered custom event loops
            teonet.customEventCb.processing(ke, ev, data, dataLen, userData);
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
            teonet.setAppType(ke, 'teowk-3');

            // Set application version
            teonet.setAppVersion(ke, '0.0.9');

            // Start Timer event
            teonet.setCustomTimer(ke, 5.000);

            // Start teonet
            teonet.run(ke);

            // Show exit message
            console.log('Teowk-3 application initialization finished ...');

            return ke;
        }

        // Start teonet module
        return teoStart(teonet);
    }

    // Try load Teonet module
    try {

        teonet = require('teonet');
        angular.extend(teonet, {          
          kePtr: null,  
          api: teonetAppApi,
          customEventCb: {

            eventCbAr: [], //new Array(),
            
            /**
             * Register event callback
             *
             * @param {function} eventCb
             * @returns {undefined}
             */
            register: function (eventCb) {
              console.log('Teonet castom event callback registered');
              this.eventCbAr.push(eventCb);
            },

            /**
             * Unregister event callback
             *
             * @param {function} eventCb
             * @returns {undefined}
             */
            unregister: function (eventCb) {
              var index = this.eventCbAr.indexOf(eventCb);
              if (index > -1) {
                  console.log('Teonet caustom event callback unregistered');
                  this.eventCbAr.splice(index, 1);
              }
            },
            
            /**
             * Custom even loops processing
             * 
             * @param {type} ke
             * @param {type} ev
             * @param {type} data
             * @param {type} dataLen
             * @param {type} userData
             * @returns {undefined}
             */
            processing: function (ke, ev, data, dataLen, userData) {
                for (var i = 0, len = this.eventCbAr.length; i < len; i++) {
                    if(this.eventCbAr[i](ke, ev, data, dataLen, userData)) {
                        break;
                    }    
                }
            }
          },
          /**
           * Initialize and start Teonet controller processing and register it destroy
           *
           * @param {function} $scope Current controllers $scope
           * @param {function} eventCb
           * -param {type} intervalCb
           * @param {type} intervalTime
           * @param {funftion|undefined} initCb
           * @returns {undefined}
           */
          processing: function ($scope, eventCb, /*intervalCb, */intervalTime, initCb) {

            var interval;
            var self = this;
            
            /**
             * Destroy this customEventCb
             * 
             * @returns {undefined}
             */
            function destroy() {

                // Ungegister custom event callback
                if(typeof eventCb === 'function') {
                    self.customEventCb.unregister(eventCb);
                }
            }
            
            /**
             * Send interval event to this customEventCb
             * 
             * @returns {undefined}
             */
            function intervalCb () {
                
                if(typeof eventCb === 'function') {
                    eventCb(ke, self.ev.EV_A_INTERVAL, null, 0, null);
                }
            }

            // Registration Destroy and Stop interval on controller destroy or on
            // teonet close(disconnect) event
            $scope.stopFight = function() {
                if (angular.isDefined(interval)) {
                    $interval.cancel(interval);
                    interval = undefined;
                }
                destroy();
            };
            $scope.$on('$destroy', $scope.stopFight);
            $scope.$on('teonet-close', $scope.stopFight);

            // Register custom event callback
            if(typeof eventCb === 'function') {
                this.customEventCb.register(eventCb);
            }

            // Exequte initialized callback
            if(typeof initCb === 'function') { 
                initCb(); 
            }

            // Send peers request immediately and in controllers interval function
            if(/*typeof intervalCb === 'function' && */intervalTime > 0) {
                intervalCb();
                interval = $interval(intervalCb, intervalTime);
            }
          }
        });
        
        // Start Teonet with default event loop
        start(teonet, function(/*ke_ptr*/) {

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
        console.log('Can\'t load Teonet module');
    }

    // Return teonet module or object with someMethod if can't load teomet module
    return teonet;
  });
