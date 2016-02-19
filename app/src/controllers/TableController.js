angular.module('ProductBattleApp').
controller('TableController', ['$scope' , '$mdToast', '$rootScope','TableDataStorageFactory', '$http', 'dataFactory' , function($scope, $mdToast, $rootScope, TableDataStorageFactory, $http, dataFactory) {

    $rootScope.bItemsLoad = false;

    $scope.deleteRowCallback = function(rows){

        if (rows[0] != -1) {

            for (var i in $scope.productList) {
                for (var j in rows) {
                    if ($scope.productList[i]["id"] == rows[j]) {
                        $scope.productList.splice(i,1);
                    }
                }
            }

            $mdToast.show(
                $mdToast.simple()
                    .content('Deleted row id : ' + rows)
                    .hideDelay(3000)
            );
        }
        else {
            $mdToast.show(
                $mdToast.simple()
                    .content('There was an error deleting the product(s)')
                    .hideDelay(3000)
            );
        }
    };

    $scope.createBattleCallback = function(rows, event) {

        if (rows.length != 2) {
            $mdToast.show(
            $mdToast.simple()
                .content("Battle must contain 2 products")
                .hideDelay(3000));
        }
        else {
            $scope.toggleLeft(rows);
        }
    };


    // Add the object affter the side_nav has been closed
    $rootScope.$on('sidenav_send', function(event, args) {
        var obj = [
            {
                id: 101,
                name: args.object.product.name,
                price: args.object.product.price,
                url: args.object.product.url,
                image_url: args.object.product.image_url,
                details: args.object.product.details,
                description: args.object.product.description,
                fake_votes: args.object.product.fake_votes
            }];

        var columnsValues = [];

        for (var key in obj[0]) {
            if (obj[0].hasOwnProperty(key) && key != "id") {
                columnsValues.push(obj[0][key])
            }
        }

        TableDataStorageFactory.getInstance().storage.push({
            rowId: obj[0].id,
            optionList: {
                selected: false,
                deleted: false,
                visible: true
            },
            data: columnsValues
        });
    });

    // Load the products
    dataFactory.getAllProducts()
        .then(function(result) {
            $scope.productList = result.data;

            $rootScope.bItemsLoad = true;
        });
}]);