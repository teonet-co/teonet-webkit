'use strict';

/**
 * @ngdoc function
 * @name teonetWebkitApp.controller:AjaxDbCtrl
 * @description
 * # AjaxDbCtrl
 * Controller of the teonetWebkitApp
 */
angular.module('teonetWebkitApp')

.controller('AjaxDbCtrl', function ($scope, $http, $localStorage, teonet) {

  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
 
  /**
   * Set LocalStorage Defaults
   * @returns {undefined}
   */
  (function () {
    if(!$localStorage.restapi) { $localStorage.restapi = {}; }
    if(!$localStorage.restapi.req) { 
        $localStorage.restapi.req = {
            peer: 'teo-db',
            cmd: 129,
            data: null
        };
    }
    $scope.req = $localStorage.restapi.req;
  })();

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

  /**
   * Form click function
   * 
   * @param {type} req
   * @returns {undefined}
   */
  $scope.doClick = function(req /*item, event*/) {

      // Check and convert request data
      var undefiedStr = 'undefied';
      var data = checkReq(req);
      
//      // Test direct teonet request
//      teonet.sendCmdTo(
//            teonet.kePtr,
//            req.peer ? req.peer : undefiedStr, 
//            Number(req.cmd ? req.cmd : 129), 
//            data ? data : undefiedStr
//      );
////      teonet.sendCmdTo(teonet.kePtr, 'teo-nw-ser', teonet.api.CMD_USER, data);
//      
//      console.log((req.peer ? req.peer : undefiedStr) + '/' + 
//            (req.cmd ? req.cmd : 129) + '/' + 
//            (data ? data : undefiedStr)
//      );

      // Send GET request
      $http.get(

        'http://localhost:8181/api/' + 
            (req.peer ? req.peer : undefiedStr) + '/' + 
            (req.cmd ? req.cmd : undefiedStr) + '/' + 
            (data ? data : undefiedStr)

      ).success(function(data/*, status, headers, config*/) {

        angular.extend($scope.req, req);
        $scope.res = { 'data': data };

      }).error(function(/*data, status, headers, config*/) {

        //alert('AJAX failed!');

      });
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

      //console.log('AjaxDbCtrl: Custom event callback called');

      var rd;

      switch (ev) {

          // EV_K_RECEIVED #5 This host Received a data
          case teonet.ev.EV_K_RECEIVED:

              rd = new teonet.packetData(data);

              // Command
              switch (rd.cmd) {

                  // Process Echo answer #66 command
                  case teonet.api.CMD_ECHO_ANSWER:
                      //console.log('AjaxDbCtrl: Echo answer command event received');
                      break;

                  // Process User #129 command
                  case teonet.api.CMD_USER:
                      //console.log('AjaxDbCtrl: User #1 command received');
                      break;
                      
                  // Process CMD_D_LIST_ANSWER #133 command
                  
                  case teonet.api.CMD_D_LIST_ANSWER:
                  case teonet.api.CMD_D_LIST_RANGE_ANSWER:
                      console.log('AjaxDbCtrl: CMD #' + rd.cmd + ' command received, data: ' + rd.data);
                      teonet.res.send(JSON.stringify(rd.data));
                      break;  
                      
                  // Process CMD_D_LIST_LENGTH_ANSWER #135 command
                  case teonet.api.CMD_D_LIST_LENGTH_ANSWER:
                      console.log('AjaxDbCtrl: CMD_D_LIST_LENGTH_ANSWER #135 command received, data: ' + rd.data);
                      teonet.res.send(JSON.stringify(rd.data));
                      break;  

                  default: break;
              }
              break;

          // EV_A_INTERVAL #27 Angular interval event happened
          case teonet.ev.EV_A_INTERVAL:

              //console.log('AjaxDbCtrl: Interval event received');
//              teonet.sendCmdTo(
//                    ke,
//                    'teo-nw-ser',
//                    129, 
//                    ''
//              );
              break;

          default: break;
      }

      return 0;
  }
  
  // RestAPI server object
  var server;
  var serverPort = 8181;
  
  // Start processing teonet controller
  teonet.processing($scope, eventCb, 1000, 
  
    // Initialize callback (calls after teonet initialized)
    function() {
      
        console.log('AjaxDbCtrl: Start processing teonet controller');

        // Start and process RestAPI server 
        try {

          var express = require('express');
          var app = express();

          // Get data from TeoDB
          app.get('/api/:peer/:cmd/:data', function (req, res) {

              // Check params
              console.log( 'peer: ' + req.params.peer + ', cmd: ' + req.params.cmd + ', data: ' + req.params.data );

              // \todo Execute teonet callback here
              teonet.res = res;
              teonet.sendCmdTo(teonet.kePtr,req.params.peer, Number(req.params.cmd), req.params.data);

              // Prepare responce data
              //var data = { request: req.params, data: {} };

              // Send responce with data
              //res.send(JSON.stringify(data));
          });

          server = app.listen(serverPort, function () {

              var host = server.address().address;
              var port = server.address().port;
              console.log('Ajax data server listening at http://' + host + ':' + port);
          });
        }
        catch(err) {
          console.log('Can\'t load Express module');
        }    
    }, 
    
    // Destroy callback (calls after teonet destroyed)
    function() {
      
        console.log('AjaxDbCtrl: Stop processing teonet controller');
        if(server) { 
          server.close(function() {
            console.log('Ajax data server closed.');
          });
        }
    }
  );

});
