'use strict';

describe('Controller: PeersCtrl', function () {

  // load the controller's module
  beforeEach(module('teonetWebkitApp'));

  var PeersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PeersCtrl = $controller('PeersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PeersCtrl.awesomeThings.length).toBe(3);
  });
});
