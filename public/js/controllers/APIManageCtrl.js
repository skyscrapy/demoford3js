angular.module('APIManageCtrl', []).controller('APIManageController', function($scope, $http, $uibModal, APIService) {
    $scope.radioModel = '';

    function reloadTblData(str) {

    }

    $scope.$watchCollection('radioModel', function () {
            reloadTblData($scope.radioModel);
    });
});