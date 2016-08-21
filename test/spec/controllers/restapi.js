/* global expect */

'use strict';

describe('Controller: RestApiCtrl', function () {

  // load the controller's module
  beforeEach(module('teonetWebkitApp'));

  var RestApiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RestApiCtrl = $controller('RestApiCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RestApiCtrl.awesomeThings.length).toBe(3);
  });
});
