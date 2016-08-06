'use strict';

describe('Service: teonet', function () {

  // load the service's module
  beforeEach(module('teonetWebkitApp'));

  // instantiate service
  var teonet;
  beforeEach(inject(function (_teonet_) {
    teonet = _teonet_;
  }));

  it('should do something', function () {
    expect(!!teonet).toBe(true);
  });

});
