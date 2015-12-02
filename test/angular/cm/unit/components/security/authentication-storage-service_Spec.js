/**
 * Spec for AuthStorageService
 * @author jvwong
 * @created 09/11/15
 */

/* START TESTS */
describe('auth-storage-service', function () {

  beforeEach(module(cms.components.security.name));

  var
    authStorageService,
    setted,
    fetched,
    valid = {
      id: 2,
      username: 'testuser',
      fullName: 'Test User',
      createdDate: '2015-19-04',
      permissions: 'ROLE_CMSUSER'
    },
    invalid = 28;

  beforeEach(inject(function(AuthenticationStorageService){
    authStorageService = AuthenticationStorageService;
  }));

  it('should be defined on load', function() {
    expect(authStorageService).toBeDefined();
  });

  describe('store', function() {

    beforeEach(inject(function(){
      spyOn(authStorageService, 'store').and.callThrough();
    }));

    it('should be defined on load', function() {
      expect(authStorageService.store).toBeDefined();
    });

    it('should store a valid object', function() {
      setted = authStorageService.store(valid);
      expect(authStorageService.store).toHaveBeenCalledWith(valid);
      expect(setted).toBeTruthy();
    });

    it('should not store invalid value', function() {
      setted = authStorageService.store(invalid);
      expect(authStorageService.store).toHaveBeenCalledWith(invalid);
      expect(setted).toBeFalsy();
    });

    it('should not store an invalid token type', function() {
      setted = authStorageService.store(invalid);
      expect(setted).toBeFalsy();
    });

  });

  describe('retrieve', function() {

    beforeEach(inject(function(){
      spyOn(authStorageService, 'retrieve').and.callThrough();
    }));

    it('should be defined on load', function() {
      expect(authStorageService.retrieve).toBeDefined();
    });

    it('should store and return a valid string token', function() {
      setted = authStorageService.store(valid);
      fetched = authStorageService.retrieve();
      expect(setted).toBeTruthy();
      expect(authStorageService.retrieve).toHaveBeenCalled();
      expect(fetched).not.toBe(null);
    });

  });

  describe('clear', function() {

    var fetchedPostClear;

    beforeEach(inject(function(){
      spyOn(authStorageService, 'clear').and.callThrough();
      setted = authStorageService.store(valid);
      fetched = authStorageService.retrieve();
    }));

    it('should be defined on load', function() {
      expect(authStorageService.clear).toBeDefined();
    });

    it('should clear a valid string token', function() {
      authStorageService.clear();
      fetchedPostClear = authStorageService.retrieve();
      expect(authStorageService.clear).toHaveBeenCalled();
      expect(fetched).not.toBe(null);
      expect(fetchedPostClear).toBe(null);
    });

  });

}); /* END auth-storage-service */
/* END TESTS */
