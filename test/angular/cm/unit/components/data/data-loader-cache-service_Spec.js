/**
 * data-data-loader-cache-service.js tests
 * @author jvwong
 * @created 05/12/15
 */
/* START TESTS */
describe('DataLoaderCache', function () {
  var data = [
      {"date":"2001-03-07","SP500":"1262","FTAS":"1065.1289897615197","DAX":"771.2919681680033","CAC":"1010.6405114593681"},
      {"date":"2001-03-08","SP500":"1265","FTAS":"1060.0465746774498","DAX":"762.5017705317626","CAC":"997.0906296515653"},
      {"date":"2001-03-09","SP500":"1233","FTAS":"1052.6052179716012","DAX":"756.5421720575022","CAC":"986.4820134247116"},
      {"date":"2001-03-12","SP500":"1180","FTAS":"1035.0115493613664","DAX":"737.6344105992034","CAC":"963.4576527228077"},
      {"date":"2001-03-13","SP500":"1198","FTAS":"1014.5682231902014","DAX":"725.7484783160294","CAC":"951.2003182258322"},
      {"date":"2001-03-14","SP500":"1167","FTAS":"987.1224306403984","DAX":"693.7263352763265","CAC":"922.9424910785696"},
      {"date":"2001-03-15","SP500":"1174","FTAS":"1000.6774569983606","DAX":"702.2905269375395","CAC":"930.246352859332"},
      {"date":"2001-03-16","SP500":"1151","FTAS":"969.9531311714197","DAX":"675.0575138699395","CAC":"905.5516949412206"},
      {"date":"2001-03-19","SP500":"1171","FTAS":"964.7417779706849","DAX":"664.2150264573373","CAC":"893.2279469968319"},
      {"date":"2001-03-20","SP500":"1143","FTAS":"972.9131998186591","DAX":"679.9515695770892","CAC":"910.3919472273318"},
    ],

    data2 = [
      {"date":"2011-01-03","S&P500":"1272","FTAS (rebased to S&P 500 & US$)":"1272","DAX (rebased to S&P500 & US$)":"1272","CAC 40 (rebased to S&P500 & US$)":"1272"},
      {"date":"2011-01-04","S&P500":"1270","FTAS (rebased to S&P 500 & US$)":"1287.7830030889777","DAX (rebased to S&P500 & US$)":"1265.4730178703844","CAC 40 (rebased to S&P500 & US$)":"1273.0708858764522"},
      {"date":"2011-01-05","S&P500":"1277","FTAS (rebased to S&P 500 & US$)":"1296.0654260528895","DAX (rebased to S&P500 & US$)":"1261.0121308033808","CAC 40 (rebased to S&P500 & US$)":"1271.3995625078971"},
      {"date":"2011-01-06","S&P500":"1274","FTAS (rebased to S&P 500 & US$)":"1291.932067605917","DAX (rebased to S&P500 & US$)":"1258.0101681748586","CAC 40 (rebased to S&P500 & US$)":"1271.3995625078971"}
    ],

    ctrl,
    mockBackend,
    error,

    backend = 'http://testserver/',

    path1 = 'query1.php',
    path2 = 'query2.php',

    url1 = backend + path1,
    url2 = backend + path2,

    postData1 = {
      sect: 'Basic Materials',
      coy: 'bas_de'
    };
  postData2 = {
    sect: 'Technology',
    coy: 'aapl'
  };

  error = {
    msg: 'Not Found'
  };

  describe('basic caching', function(){
    var dataCache,
      result,
      fetched;

    beforeEach(module('cmApp'));
    beforeEach(inject(function(DataLoaderCacheService){
      dataCache = DataLoaderCacheService;
      spyOn(dataCache, 'put').and.callThrough();
      spyOn(dataCache, 'get').and.callThrough();
      result = dataCache.put(url1, postData1, data);
      fetched = dataCache.get(url1, postData1);
    }));

    it('should PUT successfully', function(){
      expect(dataCache).toBeDefined();
      expect(dataCache.put).toHaveBeenCalledWith(url1, postData1, data);
    });

    it('PUT should return encoded url', function(){
      expect(result).toEqual(url1 + $.param(postData1));
    });

    it('should GET successfully', function(){
      expect(dataCache).toBeDefined();
      expect(dataCache.get).toHaveBeenCalledWith(url1, postData1);
    });

    afterEach(function(){
      expect(fetched).toEqual(data);
    });

  });


  describe('postData', function(){

    beforeEach(module('cmApp'));
    beforeEach(function(){
      angular.module('dataAppTest', ['cmApp'])
        .controller('testCtrl', ['DataLoaderPromise', function(DataLoaderPromise) {
          var self;

          self = this;
          self.data = [];
          self.data2 = [];

          self.postData = postData1;

          DataLoaderPromise.postData(url1, self.postData).then(
            function(response) {
              self.data = response.data;
            },
            function(errResponse) {
              self.errorMessage = errResponse.data.msg;
            }
          );

          DataLoaderPromise.postData(url1, self.postData).then(
            function(response) {
              self.data2 = response.data;
            },
            function(errResponse) {
              self.errorMessage = errResponse.data.msg;
            }
          );
        }]);
    });
    beforeEach(module('dataAppTest'));

    describe('call and cache', function(){
      var dataCache;
      beforeEach(inject(function($controller, $httpBackend, DataLoaderCacheService){
        ctrl = $controller('testCtrl');
        mockBackend = $httpBackend;
        dataCache = DataLoaderCacheService;

        //instruct the mock server response
        mockBackend.expectPOST(url1, $.param(postData1), function(data, headers){
          return data;
        }).respond(data);

        mockBackend.expectPOST(url1, $.param(postData1), function(data, headers){
          return data;
        }).respond(data);
      }));

      it('should not be cached before POST', function(){
        var cached;
        cached = dataCache.get(url1, postData1);
        mockBackend.flush(1);
        //console.log(cached);
        expect(cached).not.toBeDefined();
        mockBackend.flush(1);
      });

      it('should be cached after POST', function(){
        var cached;
        mockBackend.flush(1);
        cached = dataCache.get(url1, postData1);
        //console.log(cached);
        expect(cached).toBeDefined();
        expect(cached).toEqual(data);
        mockBackend.flush(1);
      });

      it('should not be cached with different params after POST', function(){
        var cached;
        mockBackend.flush(1);
        cached = dataCache.get(url1, postData2);
        //console.log(cached);
        expect(cached).not.toBeDefined();
        mockBackend.flush(1);
      });

      afterEach(function(){
        mockBackend.verifyNoOutstandingExpectation(); //expectX calls
        mockBackend.verifyNoOutstandingRequest(); //flush calls
      });

    }); /* END  success response */

  }); /* END postData */

}); /* END  DataLoaderCache */

