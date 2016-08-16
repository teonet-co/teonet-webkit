'use strict';

/**
 * @ngdoc function
 * @name teonetWebkitApp.controller:Test2Ctrl
 * @description
 * # Test2Ctrl
 * Controller of the teonetWebkitApp
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
//    var vm = this;
//    $resource('data.json').query().$promise.then(function(persons) {
//        vm.persons = persons;
//    });

    var vm = this;
    vm.persons = [{
        'id': 860,
        'firstName': 'Superman',
        'lastName': 'Yoda'
    }, {
        'id': 870,
        'firstName': 'Foo',
        'lastName': 'Whateveryournameis'
    }, {
        'id': 590,
        'firstName': 'Toto',
        'lastName': 'Titi'
    }, {
        'id': 803,
        'firstName': 'Luke',
        'lastName': 'Kyle'
    }
    ];


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

        //console.log('Test2Ctrl: Custom event callback called');

        var rd;

        switch (ev) {

            // EV_K_RECEIVED #5 This host Received a data
            case teonet.ev.EV_K_RECEIVED:

                rd = new teonet.packetData(data);

                // Command
                switch (rd.cmd) {

                    // Process Echo answer #66 command
                    case teonet.api.CMD_ECHO_ANSWER:
                        //console.log('Test2Ctrl: Echo answer command event received');
                        break;

                    // Process User #129 command
                    case teonet.api.CMD_USER:
                        //console.log('Test2Ctrl: Echo answer command event received');
                        break;

                    default: break;
                }
                break;

            // EV_A_INTERVAL #27 Angular interval event happened
            case teonet.ev.EV_A_INTERVAL:

                //console.log('Test2Ctrl: Interval event received');
                break;

            default: break;
        }

        return 0;
    }

    // Start processing teonet controller
    teonet.processing($scope, eventCb, 1000, function() {
        //console.log('Test2Ctrl: Start processing teonet controller');
    });

  });
