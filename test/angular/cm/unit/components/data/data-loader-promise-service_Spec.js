/**
 * data-data-loader-promise-service.js tests
 * @author jvwong
 * @created 16/11/15
 */

/* START TESTS */
describe('DataLoaderPromise', function () {

  var data = [
    {
      "id": "91a950f6-3d98-494e-a851-c01d868f0e9b",
      "version": null,
      "createdDate": "2015-11-12T16:49:26.886Z",
      "lastModifiedDate": null,
      "createdBy": "ertertert",
      "updatedBy": null,
      "title": "partick lynch",
      "description": "who kjsdlfj ",
      "keywords": "sdlkf sd fsdddd dd ",
      "pages": []
    },
    {
      "id": "2d2ff8b0-e0ca-4360-9065-2ee2b6544dfd",
      "version": null,
      "createdDate": "2015-11-13T00:06:40.875Z",
      "lastModifiedDate": null,
      "createdBy": "ertertert",
      "updatedBy": null,
      "title": "asdasdasd",
      "description": "werwerwerwer",
      "keywords": "dfffff",
      "pages": null
    },
    {
      "id": "7cb4c95e-36e7-4bbc-aee3-02f965c7b614",
      "version": null,
      "createdDate": "2015-11-13T00:10:00.457Z",
      "lastModifiedDate": null,
      "createdBy": "asdasdasd",
      "updatedBy": null,
      "title": "another title",
      "description": "another description",
      "keywords": "another keywods",
      "pages": null
    }
  ];

  var ctrl,
    mockBackend,
    error,
    endPoint = '/api/summary/',
    query = 'query_1',
    url = String() + endPoint + query,
    postData = {
      sect: 'Basic Materials',
      coy: 'bas_de'
    }
    ;

  error = {
    msg: 'Not Found'
  };

  describe('getData', function(){
    beforeEach(function(){
      angular.module('dataAppTest', ['cmApp'])
        .controller('testCtrl', ['DataLoaderPromise', function(DataLoaderPromise) {
          var self;

          self = this;
          self.data = [];

          DataLoaderPromise.getData(url).then(
            function(response) {
              self.data = response.data;
            },
            function(errResponse) {
              //self.errorMessage = errResponse.data.msg;
            }
          );
        }]);
    });

    beforeEach(module('cmApp'));
    beforeEach(module('dataAppTest'));

    describe('success response', function(){
      beforeEach(inject(function($controller, $httpBackend){
        ctrl = $controller('testCtrl');
        mockBackend = $httpBackend;

        //instruct the mock server response
        mockBackend.expectGET(url)
          .respond(data);
      }));

      it('should have data after server call', function(){
        expect(ctrl.data).toEqual([]);
        mockBackend.flush();
        expect(ctrl.data).toEqual(data);
      });

      afterEach(function(){
        mockBackend.verifyNoOutstandingExpectation(); //expectX calls
        mockBackend.verifyNoOutstandingRequest(); //flush calls
      });
    }); /* END  success response */

    describe('error 404 response', function(){

      beforeEach(inject(function($controller, $httpBackend){
        ctrl = $controller('testCtrl');
        mockBackend = $httpBackend;

        //instruct the mock server response
        mockBackend.expectGET(url)
          .respond(404, error);
      }));

      it('should have no data initially', function(){
        expect(ctrl.data).toEqual([]);
        mockBackend.flush();
        expect(ctrl.data).toEqual(error);
      });

      afterEach(function(){
        mockBackend.verifyNoOutstandingExpectation(); //expectX calls
        mockBackend.verifyNoOutstandingRequest(); //flush calls
      });

    }); /* END error 404 response */

  }); /* END getData */


  describe('postData', function(){
    beforeEach(function(){
      angular.module('dataAppTest', ['cmApp'])
        .controller('testCtrl', ['DataLoaderPromise', function(DataLoaderPromise) {
          var self;

          self = this;
          self.data = [];

          self.postData = postData;

          DataLoaderPromise.postData(url, self.postData).then(
            function(response) {
              self.data = response.data;
            },
            function(errResponse) {
              self.errorMessage = errResponse.data.msg;
            }
          );
        }]);
    });

    beforeEach(module('cmApp'));
    beforeEach(module('dataAppTest'));

    describe('success response', function(){
      beforeEach(inject(function($controller, $httpBackend){
        ctrl = $controller('testCtrl');
        mockBackend = $httpBackend;

        //instruct the mock server response
        mockBackend.expectPOST(url, self.postData, function(data, headers){
          return data;
        })
          .respond(data);
      }));

      it('should have data after server call', function(){
        expect(ctrl.data).toEqual([]);
        mockBackend.flush();
        expect(ctrl.data).toEqual(data);
      });

      afterEach(function(){
        mockBackend.verifyNoOutstandingExpectation(); //expectX calls
        mockBackend.verifyNoOutstandingRequest(); //flush calls
      });
    }); /* END  success response */

    describe('error 404 response', function(){

      beforeEach(inject(function($controller, $httpBackend){
        ctrl = $controller('testCtrl');
        mockBackend = $httpBackend;

        //instruct the mock server response
        mockBackend.expectPOST(url, self.postData, function(data, headers){
          return data;
        })
          .respond(404, error);
      }));

      it('should have no data initially', function(){
        expect(ctrl.data).toEqual([]);
        mockBackend.flush();
        expect(ctrl.data).toEqual(error);
      });

      afterEach(function(){
        mockBackend.verifyNoOutstandingExpectation(); //expectX calls
        mockBackend.verifyNoOutstandingRequest(); //flush calls
      });

    }); /* END error 404 response */

  }); /* END postData */


}); /* END DataLoaderPromise */
/* END TESTS */
