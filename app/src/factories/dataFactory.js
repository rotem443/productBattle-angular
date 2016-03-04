/**
 * Created by n on 19/02/2016.
 */
angular.module('ProductBattleApp').
    factory('dataFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:3000/api/v1/';
    var objData = {};

    objData.getAllProducts = function() {
      return $http.get(urlBase + 'products');
    };

    objData.insertProduct = function(product) {
        return $http.post(urlBase + 'products', {
            "product" : product
        });
    };

    objData.deleteProduct = function(product) {
        return $http.post(urlBase + 'products/destroy-many', {
            "delete_list" : product
        });
    };

    objData.insertBattle = function(battle) {
        return $http.post('http://localhost:3000/api/v1/battles',
            {'battle' : battle} , {'headers' : {'Access-Token' : '1YNpnbKbhbgCMn_aKzDVzw',
                'Client' : 'pVrjC3_61efXchLENdLoJQ',
                'Expiry': '1488309835',
                'Uid': 'rotem@walla.com'}}
        );
    };

    return objData;
}]);