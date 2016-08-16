/* global expect */

'use strict';

describe('Controller: TeoDbCtrl', function () {

  // load the controller's module
  beforeEach(module('teonetWebkitApp'));

  var TeoDbCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TeoDbCtrl = $controller('TeoDbCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TeoDbCtrl.awesomeThings.length).toBe(3);
  });
});
