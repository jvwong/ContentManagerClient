/**
 * auth-controller.js tests
 * @author jvwong
 * @created 09/11/15
 */

/* START TESTS */
describe('auth-controller', function () {

  var ctrl;

  beforeEach(module('cmApp'));

  beforeEach(inject(function($controller){
    ctrl = $controller('cmAuthCtrl');
  }));

  it('should be defined on load', function() {
    expect(ctrl).toBeDefined();
  });

}); /* END auth-controller */
/* END TESTS */
