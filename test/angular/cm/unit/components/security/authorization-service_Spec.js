/**
 * authorization-service.js tests
 * @author jvwong
 * @created 18/11/15
 */

/* START TESTS */
describe('authorization-service', function () {

  var
    accessNone = {
      requiresLogin: false,
      permissions: [],
      permissionType: undefined,
      isNotLoggedIn: false
    },
    accessLogin= {
      requiresLogin: true,
      permissions: [],
      permissionType: undefined,
      isNotLoggedIn: false
    },
    accessPerms = {
      requiresLogin: true,
      permissions: ['ROLE_USER', 'ROLE_ADMIN'],
      permissionType: 0, //security.enums.permissionCheckType.atLeastOne
      isNotLoggedIn: false
    },
    accessCombo = {
      requiresLogin: true,
      permissions: ['ROLE_USER', 'ROLE_ADMIN'],
      permissionType: 1, //security.enums.permissionCheckType.combinationRequired
      isNotLoggedIn: false
    },
    accessNotLoggedIn = {
      isNotLoggedIn: true,
      requiresLogin: false,
      permissions: [],
      permissionType: undefined
    },


    authorizationService,
    authenticationService,
    security,
    result,
    userData = {
      id: 'UUID',
      username: 'testUser',
      fullName: 'test user',
      createdDate: '2014-5-5',
      permissions: ['ROLE_USER']
    }
    ;

  beforeEach(module('cmApp'));
  beforeEach(inject(function(AuthorizationService,
                             AuthenticationService,
                             SECURITY){
    authorizationService = AuthorizationService;
    authenticationService = AuthenticationService;
    security = SECURITY;
    spyOn(authorizationService, 'authorize').and.callThrough();

  }));

  describe('authorize', function(){


    it('should authorise an unprotected route', function(){
      spyOn(authenticationService, 'getCurrentLoginUser')
        .and.returnValue(undefined);
      result = authorizationService.authorize(
        accessNone.requiresLogin,
        accessNone.permissions,
        accessNone.permissionType,
        accessNone.isNotLoggedIn
      );
      expect(result).toEqual(security.enums.authorised.authorised);
    });

    it('should pass loginRequired on a protected route', function(){
      spyOn(authenticationService, 'getCurrentLoginUser')
        .and.returnValue(undefined);
      result = authorizationService.authorize(
        accessLogin.requiresLogin,
        accessLogin.permissions,
        accessLogin.permissionType,
        accessLogin.isNotLoggedIn
      );
      expect(result).toEqual(security.enums.authorised.loginRequired);
    });

    it('should authorise a protected route when logged in', function(){
      spyOn(authenticationService, 'getCurrentLoginUser')
        .and.returnValue(userData);
      result = authorizationService.authorize(
        accessLogin.requiresLogin,
        accessLogin.permissions,
        accessLogin.permissionType,
        accessLogin.isNotLoggedIn
      );
      expect(result).toEqual(security.enums.authorised.authorised);
    });

    it('should authorise with at least one of correct permissions', function(){
      spyOn(authenticationService, 'getCurrentLoginUser')
        .and.returnValue(userData);

      result = authorizationService.authorize(
        accessPerms.requiresLogin,
        accessPerms.permissions,
        accessPerms.permissionType,
        accessPerms.isNotLoggedIn
      );
      expect(result).toEqual(security.enums.authorised.authorised);
    });

    it('should not authorise combo when missing a permission', function(){
      spyOn(authenticationService, 'getCurrentLoginUser')
        .and.returnValue(userData);

      result = authorizationService.authorize(
        accessCombo.requiresLogin,
        accessCombo.permissions,
        accessCombo.permissionType,
        accessCombo.isNotLoggedIn
      );
      expect(result).toEqual(security.enums.authorised.notAuthorised);
    });

    it('should not allow a logged in user to access when accessNotLoggedIn', function(){
      spyOn(authenticationService, 'getCurrentLoginUser')
        .and.returnValue(userData);

      result = authorizationService.authorize(
        accessNotLoggedIn.requiresLogin,
        accessNotLoggedIn.permissions,
        accessNotLoggedIn.permissionType,
        accessNotLoggedIn.isNotLoggedIn
      );
      expect(result).toEqual(security.enums.authorised.ignore);
    });
  }); /* END authorize */

}); /* END  data-service: UrlService */

//accessNotLoggedIn = {
//  isNotLoggedIn: true,
//  requiresLogin: false,
//  permissions: [],
//  permissionType: undefined
//},
