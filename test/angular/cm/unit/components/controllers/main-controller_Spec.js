/**
 * main-controllerchart-directive.js tests
 * @author jvwong
 * @created 09/11/15
 */

/* START TESTS */
describe('main-controller', function () {

    var ctrl, scope;

    beforeEach(function() {
        module('cmApp');

        //Mock out the user during boostrap
        module('cmApp', function($provide) {
            $provide.constant('user', { "username": "fake"});
        });
    });

    beforeEach(inject(function($controller){
        ctrl = $controller('cmMainCtrl');

    }));

    it('should have a user attribute available on load', function() {
        expect(ctrl).toBeDefined();
        expect(ctrl.user).toBeDefined();
    });

}); /* END main-controller */
/* END TESTS */
