/**
 * Spec for TokenStorageService
 * @author jvwong
 * @created 09/11/15
 */

/* START TESTS */
describe('token-storage-service', function () {

  var tokenStorageService;

  beforeEach(module(cms.components.security.name));
  beforeEach(inject(function(TokenStorageService){
    tokenStorageService = TokenStorageService;
  }));

  it('should be defined on load', function() {
    expect(tokenStorageService).toBeDefined();
  });

  describe('store', function() {

    var
      setted,
      valid = "sometoken",
      invalid = 28;

    beforeEach(inject(function(){
      spyOn(tokenStorageService, 'store').and.callThrough();
    }));

    it('should be defined on load', function() {
      expect(tokenStorageService.store).toBeDefined();
    });

    it('should store a valid string token', function() {
      setted = tokenStorageService.store(valid);
      expect(tokenStorageService.store).toHaveBeenCalledWith(valid);
      expect(setted).toBeTruthy();
    });

    it('should not store invalid value', function() {
      setted = tokenStorageService.store(invalid);
      expect(tokenStorageService.store).toHaveBeenCalledWith(invalid);
      expect(setted).toBeFalsy();
    });


    it('should not store an invalid token type', function() {
      setted = tokenStorageService.store(invalid);
      expect(setted).toBeFalsy();
    });

  });

  describe('retrieve', function() {

    var
      setted,
      fetched,
      valid = "sometoken";

    beforeEach(inject(function(){
      spyOn(tokenStorageService, 'retrieve').and.callThrough();
    }));

    it('should be defined on load', function() {
      expect(tokenStorageService.retrieve).toBeDefined();
    });

    it('should store and return a valid string token', function() {
      setted = tokenStorageService.store(valid);
      fetched = tokenStorageService.retrieve();
      expect(setted).toBeTruthy();
      expect(tokenStorageService.retrieve).toHaveBeenCalled();
      expect(fetched).not.toBe(null);
    });

  });

  describe('clear', function() {

    var
      setted,
      fetched,
      fetchedPostClear,
      valid = "sometoken";

    beforeEach(inject(function(){
      spyOn(tokenStorageService, 'clear').and.callThrough();
      setted = tokenStorageService.store(valid);
      fetched = tokenStorageService.retrieve();
    }));

    it('should be defined on load', function() {
      expect(tokenStorageService.clear).toBeDefined();
    });

    it('should clear a valid string token', function() {
      tokenStorageService.clear();
      fetchedPostClear = tokenStorageService.retrieve();
      expect(tokenStorageService.clear).toHaveBeenCalled();
      expect(fetched).not.toBe(null);
      expect(fetchedPostClear).toBe(null);
    });

  });

}); /* END token-storage-service */
/* END TESTS */
