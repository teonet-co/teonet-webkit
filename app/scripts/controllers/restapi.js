'use strict';

/**
 * @ngdoc function
 * @name teonetWebkitApp.controller:RestApiCtrl
 * @description
 * # RestApiCtrl
 * Controller of the teonetWebkitApp
 * @param $scope
 * @param $rootScope
 * @param $http
 * @param $localStorage
 * @param teonet
 * @param {type} scopes description
 */
angular.module('teonetWebkitApp')

.controller('RestApiCtrl', function ($scope, $rootScope, $http, $localStorage,
    teonet, scopes) {

  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  var apiServerPort = 8181; ///< Teonet RestAPI server port

  // Save this scope to use in other controllers
  scopes.set('RestApiCtrl', $scope);

  // Set LocalStorage Defaults
  if(!$localStorage.restapi) { $localStorage.restapi = {}; }
  if(!$localStorage.restapi.req) {
    $localStorage.restapi.req = { 
        peer: 'teo-db', 
        cmd: 129, 
        data: null 
    };
  }
  $scope.req = $localStorage.restapi.req;

  /**
   * Check if input string is JSON object
   *
   * @param {type} str JSON string
   *
   * @returns {Array|Object|undefined} Parsed json object or undefined if input
   *                         string can't be parsed
   */
  function isJsonString (str) {

      try {
          return JSON.parse(str);
      } catch (e) {
          return undefined;
      }
  }

  /**
   * Form click function
   *
   * @param {type} peer
   * @param {type} cmd
   * @param {type} dataInput { key, from, to }
   * @param {type} cb
   * @returns {undefined}
   */
  $scope.doClick = function(peer, cmd, dataInput, cb) {

    var req = { 'peer': peer, 'cmd': cmd, 'data': dataInput };

    /**
     * Check and convert request data
     *
     * @param {'object'} req Request object
     * @returns {'string'} Checket and converted data to send
     */
    function checkReq(req) {

      var obj, data;
      if(typeof (obj = req.data) === 'object' ||
         (typeof (data = req.data) === 'string' &&
          typeof (obj = isJsonString(req.data)) === 'object')) {

          if(typeof obj === 'object') { data = 'JSON:' + JSON.stringify(obj); }
          else if(typeof data !== 'string') { data = 'null'; }
      }
      if(req.peer && req.peer.trim === '') { req.peer = undefined; }
      if(req.cmd && req.cmd.trim === '') { req.cmd = undefined; }
      if(data && data.trim === '') { data = undefined; }

      return data;
    }

    // Check and convert request data
    var undefiedStr = 'undefied';
    var data = checkReq(req);

    // Send api server GET request
    $http.get(

      'http://localhost:' + apiServerPort + '/api/' +
          (req.peer ? req.peer : undefiedStr) + '/' +
          (req.cmd ? req.cmd : undefiedStr) + '/' +
          (data ? data : undefiedStr)

    ).success(function(data/*, status, headers, config*/) {

      if(!$rootScope.res) { $rootScope.res = {}; }
      $rootScope.res[data.request.cmd] = data;

      //console.log('success data, res: ' + JSON.stringify($rootScope.res));
      if(typeof cb === 'function') { cb(data); }

    }).error(function(/*data, status, headers, config*/) {

      // alert('AJAX failed!');

    });
  };

  /**
   * Set restApi data field
   *
   * @param {type} key
   * @param {type} from
   * @param {type} to
   * @returns {undefined}
   */
  $scope.setData = function(key, from, to) {
      $scope.req.data = '{"key":"' + key + '","from":' + from + ',"to":' + to + '}';
  };

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

      //console.log('RestApiCtrl: Custom event callback called');

      var rd;

      switch (ev) {

          // EV_K_RECEIVED #5 This host Received a data
          case teonet.ev.EV_K_RECEIVED:

              rd = new teonet.packetData(data);

              // Command
              switch (rd.cmd) {

                  // Process Echo answer #66 command
                  case teonet.api.CMD_ECHO_ANSWER:
                      //console.log('RestApiCtrl: Echo answer command event received');
                      break;

                  // Process User #129 command
                  case teonet.api.CMD_USER:
                      //console.log('RestApiCtrl: User #1 command received');
                      break;

                  // Process CMD_D_LIST_ANSWER #133, #137 command
                  case teonet.api.CMD_D_LIST_ANSWER:
                  case teonet.api.CMD_D_LIST_RANGE_ANSWER:
                      //console.log('RestApiCtrl: CMD #' + rd.cmd + ' command received, data: ' + rd.data);
                      var obj = isJsonString(rd.data);
                      if(obj && obj[0] && obj[0].id) {
                        teonet.cqueSetData(ke, obj[0].id, JSON.stringify(obj));
                        teonet.cqueExec(ke, obj[0].id);
                      }
                      break;

                  // Process CMD_D_LIST_LENGTH_ANSWER #135 command
                  case teonet.api.CMD_D_LIST_LENGTH_ANSWER:
                      console.log('RestApiCtrl: CMD_D_LIST_LENGTH_ANSWER #135 command received, data: ' + rd.data);
                      //teonet.res.send(rd.data);
                      obj = isJsonString(rd.data);
                      if(obj && obj.id) {
                        teonet.cqueSetData(ke, obj.id, JSON.stringify(obj));
                        teonet.cqueExec(ke, obj.id);
                      }
                      break;

                  default: break;
              }
              break;

          // EV_A_INTERVAL #27 Angular interval event happened
          case teonet.ev.EV_A_INTERVAL: break;

          default: break;
      }

      return 0;
  }

  // RestAPI server object
  var server;

  // Start processing teonet controller
  teonet.processing($scope, eventCb, 0,

    /**
     * Initialize callback (calls after teonet initialized)
     *
     * @returns {undefined}
     */
    function() {

        //console.log('RestApiCtrl: Start processing teonet controller');

        // Start and process RestAPI server
        try {

          var express = require('express');
          var JSON_STR = 'JSON:';
          var app = express();

          // Got data from TeoDB
          app.get('/api/:peer/:cmd/:data', function (req, res) {

            // Create callback
            var cqd = teonet.cqueAdd(teonet.kePtr, function (id, type, data) {

                // Send RestAPI response
                if(type === 1) {
                    res.send('{ "request": ' + JSON.stringify(req.params) + ', "type": "' + type + '", "result": "success", "data": ' + data + ' }');
                } else {
                    res.send('{ "request": ' + JSON.stringify(req.params) + ', "type": "' + type + '", "result": "timeout" }');
                }

            }, 2.0, null);

            // Update Id
            if (req.params.data.indexOf(JSON_STR) === 0) {
                var obj = JSON.parse( req.params.data.substring(JSON_STR.length));
                obj.id = teonet.cqueData(cqd).id;
                req.params.data = JSON_STR + JSON.stringify(obj);
            }

            // Send command to peer
            teonet.sendCmdTo(teonet.kePtr,req.params.peer, Number(req.params.cmd), req.params.data);
          });

          server = app.listen(apiServerPort, function () {

              var host = server.address().address;
              var port = server.address().port;
              console.log('RestAPI data server start listening at http://' + host + ':' + port);
              $scope.doClick($scope.req.peer, teonet.api.CMD_D_LIST_LENGTH, $scope.req.data);
              $scope.doClick($scope.req.peer, teonet.api.CMD_D_LIST_RANGE, $scope.req.data);

          });
        }
        catch(err) {
          console.log('Can\'t load Express module');
        }
    },

    /**
     * Destroy callback (calls after teonet destroyed)
     *
     * @returns {undefined}
     */
    function() {

        console.log('RestApiCtrl: Stop processing teonet controller');
        if(server) {
          server.close(function() {
            console.log('RestAPI data server closed.');
            $rootScope.res = undefined;
          });
        }

        // Remove controller from scopes
        scopes.remove('RestApiCtrl');
    }
  );

});
