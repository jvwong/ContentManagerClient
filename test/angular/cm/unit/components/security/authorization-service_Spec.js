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
      permissionType: undefined
    },
    accessLogin= {
      requiresLogin: true,
      permissions: [],
      permissionType: undefined
    },
    accessPerms = {
      requiresLogin: true,
      permissions: ['ROLE_USER', 'ROLE_ADMIN'],
      permissionType: 0 //security.enums.permissionCheckType.atLeastOne
    },
    accessCombo = {
      requiresLogin: true,
      permissions: ['ROLE_USER', 'ROLE_ADMIN'],
      permissionType: 1 //security.enums.permissionCheckType.combinationRequired
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
        accessNone.permissionType
      );
      expect(result).toEqual(security.enums.authorised.authorised);
    });

    it('should pass loginRequired on a protected route', function(){
      spyOn(authenticationService, 'getCurrentLoginUser')
        .and.returnValue(undefined);
      result = authorizationService.authorize(
        accessLogin.requiresLogin,
        accessLogin.permissions,
        accessLogin.permissionType
      );
      expect(result).toEqual(security.enums.authorised.loginRequired);
    });

    it('should authorise a protected route when logged in', function(){
      spyOn(authenticationService, 'getCurrentLoginUser')
        .and.returnValue(userData);
      result = authorizationService.authorize(
        accessLogin.requiresLogin,
        accessLogin.permissions,
        accessLogin.permissionType
      );
      expect(result).toEqual(security.enums.authorised.authorised);
    });

    it('should authorise with at least one of correct permissions', function(){
      spyOn(authenticationService, 'getCurrentLoginUser')
        .and.returnValue(userData);

      result = authorizationService.authorize(
        accessPerms.requiresLogin,
        accessPerms.permissions,
        accessPerms.permissionType
      );
      expect(result).toEqual(security.enums.authorised.authorised);
    });

    it('should not authorise combo when smissing permission', function(){
      spyOn(authenticationService, 'getCurrentLoginUser')
        .and.returnValue(userData);

      result = authorizationService.authorize(
        accessCombo.requiresLogin,
        accessCombo.permissions,
        accessCombo.permissionType
      );
      expect(result).toEqual(security.enums.authorised.notAuthorised);
    });
  }); /* END authorize */

}); /* END  data-service: UrlService */
