/* global expect */

'use strict';

describe('Controller: PeersCountCtrl', function () {

  // load the controller's module
  beforeEach(module('teonetWebkitApp'));

  var PeersCountCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PeersCountCtrl = $controller('PeersCountCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PeersCountCtrl.awesomeThings.length).toBe(3);
  });
});
