'use strict';

describe('Directive: peersCount', function () {

  // load the directive's module
  beforeEach(module('teonetWebkitApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<peers-count></peers-count>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the peersCount directive');
  }));
});
