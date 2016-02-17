/**
 * Created by ADMIN on 22/01/16.
 */
angular.module('ProductBattleApp').
    controller('SideNavController', function ($scope, $timeout, $mdSidenav, $log, $rootScope, $http, $mdToast) {

        var vm = this;

        vm.close = function (navID) {
            $mdSidenav(navID).close()
                .then(function () {
                    $log.debug("close "+navID+" is done");
                });
        };

        vm.send = function () {

            var productJson =
            {
                "price": vm.battlePrice,
                "image_url": vm.battleImageURL,
                "name": vm.battleName,
                "description": vm.battleDescription,
                "details": vm.battleDetails,
                "url": vm.battleURL,
                "fake_votes" : vm.fakeVotesProduct,
                "shop_category": "Sports & Outdoors"
            };

            $http.post('http://localhost:3000/api/v1/products' ,  {
                "product" : productJson
            }).then(function(response) {

                if (response.status != 201) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('There was an error creating the product')
                            .hideDelay(3000)
                    );
                }
                else {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('The product successfully created')
                            .hideDelay(3000)
                    );

                    var productJson =
                    {
                        "id" : response.data,
                        "name": vm.battleName,
                        "price": vm.battlePrice,
                        "url": vm.battleURL,
                        "image_url": vm.battleImageURL,
                        "details": vm.battleDetails,
                        "description": vm.battleDescription,
                        "fake_votes" : vm.fakeVotesProduct,
                        "shop_category": "Sports & Outdoors"
                    };


                    $mdSidenav('right').close()
                        .then(function () {
                            var sendObj = {
                                "product" : productJson
                            };

                            $rootScope.$broadcast('sidenav_send', {object: sendObj});
                        });
                }
            });
        };

        vm.sendBattle = function() {

          var battleJson = {
                "user_id": "1",
                "schedule_time" : vm.scheduleTime,
                "title": vm.title,
                "products_attributes": {
                    "first_product": {
                        "product_id": vm.selectedProducts[0].id,
                        "price": 30,
                        "image_url": "testimage",
                        "name": vm.selectedProducts[0].name,
                        "description": "asdfasdfasdffsadfdsafdasdfsaasfdasdf",
                        "details": "asdfsafdsafdafsdasdf",
                        "url": "asdfasdffsd",
                        "shop_category": "Sports & Outdoors"
                    },
                    "second_product": {
                        "product_id": vm.selectedProducts[1].id,
                        "price": 30,
                        "image_url": "testimage2",
                        "name": vm.selectedProducts[1].name,
                        "description": "asdfasdfasdffsadfdsafdasdfsaasfdasdf",
                        "details": "asdfsafdsafdafsdasdf",
                        "url": "asdfasdffsd",
                        "shop_category": "Sports & Outdoors"
                    }
                }
            };

          $http.post('http://localhost:3000/api/v1/battles', {'battle' : battleJson }).then(function(response) {
                if (response.status != 201 && response.status != 200) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('There was an error creating the battle')
                            .hideDelay(3000)
                    );
                }
                else {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('The battle successfully created')
                            .hideDelay(3000)
                    );
                    vm.close('left');
                }
            });
        };

        $scope.$watch('SelectedRows', function(newValue) {
           vm.title =  (newValue != undefined) ? newValue[0].name + " VS " +
                                                 newValue[1].name : undefined;
            vm.selectedProducts = newValue;
        });
});

