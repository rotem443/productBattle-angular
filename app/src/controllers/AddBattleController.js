angular.module('ProductBattleApp')
    .controller('AddBattleController', function () {
       var vm = this;

        vm.hide = function() {
            $mdDialog.hide();
        };
        vm.cancel = function() {
            $mdDialog.cancel();
        };
        vm.answer = function(answer) {
            $mdDialog.hide(nswer);
        };
    });