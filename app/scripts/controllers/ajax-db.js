'use strict';

/**
 * @ngdoc function
 * @name teonetWebkitApp.controller:AjaxDbCtrl
 * @description
 * # AjaxDbCtrl
 * Controller of the teonetWebkitApp
 */
angular.module('teonetWebkitApp')

.controller('AjaxDbCtrl', function ($scope, $http, teonet) {

  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  $scope.res = { 'data': {} };
  $scope.req = { 'key': '', 'from': 0, 'to': 25 };


  $scope.req.doClick = function(req /*item, event*/) {

      $http.get(

          'http://localhost:8181/getData/"' + req.key + '"/' + 
          req.from + '/' + req.to

      ).success(function(data/*, status, headers, config*/) {

          angular.extend($scope.req, req);
          $scope.res.data = data;

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
                      //console.log('AjaxDbCtrl: Echo answer command event received');
                      break;

                  default: break;
              }
              break;

          // EV_A_INTERVAL #27 Angular interval event happened
          case teonet.ev.EV_A_INTERVAL:

              //console.log('AjaxDbCtrl: Interval event received');
              break;

          default: break;
      }

      return 0;
  }

  // Start processing teonet controller
  teonet.processing($scope, eventCb, 1000, function() {
      console.log('AjaxDbCtrl: Start processing teonet controller');
  });

});

try {

    var express = require('express');
    var app = express();
    //var fs = require('fs');

    var user = {
       'user4' : {
          'name' : 'mohit',
          'password' : 'password4',
          'profession' : 'teacher',
          'id': 4
       }
    };

    // Get data from TeoDB
    app.get('/getData/:key/:from/:to', function (req, res) {
        
        // Check params
        req.params.key = req.params.key.substring(1, req.params.key.length-1);
        console.log( 'key: ' + req.params.key + ', from: ' + req.params.from + ', to: ' + req.params.to );
        
        // Prepare data
        var data = {};
        data.request = req.params;
        data.user4 = user.user4;
        
        // Send responce with data
        //console.log(data.user4.name );
        res.send(JSON.stringify(data));
    });

    var server = app.listen(8181, function () {

        var host = server.address().address;
        var port = server.address().port;
        console.log('Ajax data server listening at http://%s:%s', host, port);
    });
}
catch(err) {
    console.log('Can\'t load Express module');
}
