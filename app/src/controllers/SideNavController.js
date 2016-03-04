/**
 * Created by ADMIN on 22/01/16.
 */
angular.module('ProductBattleApp').
    controller('SideNavController', function ($scope, $timeout, $mdSidenav, $log, $rootScope, $http, $mdToast, dataFactory) {

        var vm = this;

        vm.close = function (navID) {
            $mdSidenav(navID).close()
                .then(function () {
                    $log.debug("close "+navID+" is done");
                });
        };

        //<editor-fold desc="Insert produt">
        vm.send = function () {

                var productJson =
                {
                    "price": vm.battlePrice,
                    "images": {"main": vm.battleImageURL},
                    "name": vm.battleName,
                    "description": vm.battleDescription,
                    "interesting_info": vm.battleDetails,
                    "url": vm.battleURL,
                    "fake_votes" : vm.fakeVotesProduct,
                    "fake_votes_limit" : vm.fakeVotesLimitProduct,
                    "shop_category": "Sports & Outdoors"
                };

                dataFactory.insertProduct(productJson).
                    then(function(response) {

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
                            "images": vm.battleImageURL,
                            "details": vm.battleDetails,
                            "interesting_info": vm.battleDescription,
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
        //</editor-fold>

        //<editor-fold desc="Inser battle">
        vm.sendBattle = function() {

          var battleJson = {
                "user_id": "4",
                "schedule_time" : vm.scheduleTime,
                "winner_precent" : vm.ratio,
                "title": vm.title,
                "products_attributes": [
                   {
                        "product_id": vm.selectedProducts[0].id,
                        "price": 30,
                        "images": "testimage",
                        "name": vm.selectedProducts[0].name,
                        "description": "asdfasdfasdffsadfdsafdasdfsaasfdasdf",
                        "interesting_info": "asdfsafdsafdafsdasdf",
                        "url": "asdfasdffsd",
                        "shop_category": "Sports & Outdoors"
                    },
                    {
                        "product_id": vm.selectedProducts[1].id,
                        "price": 30,
                        "images": "testimage2",
                        "name": vm.selectedProducts[1].name,
                        "description": "asdfasdfasdffsadfdsafdasdfsaasfdasdf",
                        "interesting_info": "asdfsafdsafdafsdasdf",
                        "url": "asdfasdffsd",
                        "shop_category": "Sports & Outdoors"
                    }
                ]
            };

            dataFactory.insertBattle(battleJson).
                then(function(response) {
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
        //</editor-fold>

        $scope.$watch('SelectedRows', function(newValue) {
           vm.title =  (newValue != undefined) ? newValue[0].name + " VS " +
                                                 newValue[1].name : undefined;
            vm.selectedProducts = newValue;
        });
});

