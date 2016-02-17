/**
 * Created by n on 17/01/2016.
 */
angular.module('ProductBattleApp')
    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.toggleRight = buildToggler('right');
        $scope.toggleLeft = function(rows) {
            $scope.SelectedRows = rows;

            $mdSidenav('left')
                .toggle();
        }
        $scope.isOpenRight = IsOpen('right');
        $scope.isOpenRight = IsOpen('left');

        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle();
            }
        };

        function IsOpen(navID) {
            return function() {
                $mdSidenav(navID).IsOpen();
            }
        };
    });