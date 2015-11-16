/**
 * main-controller.js tests
 * @author jvwong
 * @created 09/11/15
 */

/* START TESTS */
describe('main-controller', function () {

    var ctrl;

    beforeEach(module('cmApp'));

    beforeEach(inject(function($controller){
        ctrl = $controller('cmMainCtrl');

    }));

    it('should have a controller defined', function() {
      expect(ctrl).toBeDefined();
    });

}); /* END main-controller */
/* END TESTS */
