'use strict';

describe('Controller: NavbarMainCtrl', function () {

  // load the controller's module
  beforeEach(module('teonetWebkitApp'));

  var NavbarMainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavbarMainCtrl = $controller('NavbarMainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NavbarMainCtrl.awesomeThings.length).toBe(3);
  });
});
