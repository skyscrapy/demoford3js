/**
 * Created by William on 10/29/17.
 */
angular.module('ApiService', []).factory('APIService', ['$http', function($http) {

    var urlBase = '/api';
    var apiCallBack = {};

    apiCallBack.getAges = function() {
        return $http.get(urlBase + '/' + 'ages');
    };

    apiCallBack.getAge = function(id) {
        return $http.get(urlBase + '/' + 'ages' + '/' + id);
    };

    apiCallBack.uploadAge = function(data) {
        return $http.post(urlBase + '/' + 'ages', data);
    }

    apiCallBack.updateAge = function(data) {
        return $http.put(urlBase + '/' + 'ages' + data.id, data);
    };

    apiCallBack.deleteAge = function(id) {
        return $http.delete(urlBase + '/' + 'ages' + id);
    };

    apiCallBack.getGenders = function() {
        return $http.get(urlBase + '/' + 'genders');
    };

    apiCallBack.getGender = function (id) {
        return $http.get(urlBase + '/' + 'genders' + id);
    };

    apiCallBack.uploadGender = function(data) {
        return $http.post(urlBase + '/' + 'genders', data);
    }

    apiCallBack.updateGender = function(data) {
        return $http.put(urlBase + '/' + 'genders' + data.id, data);
    };

    apiCallBack.deleteGender = function(id) {
        return $http.delete(urlBase + '/' + 'ages' + id);
    };

    apiCallBack.getRaces = function () {
        return $http.get(urlBase + '/' + 'races');
    };

    apiCallBack.getRace = function(id) {
        return $http.get(urlBase + '/' + 'races' + id);
    };

    apiCallBack.uploadRace = function(data) {
        return $http.post(urlBase + '/' + 'races', data);
    };

    apiCallBack.updateRace = function(data) {
        return $http.put(urlBase + '/' + 'races' + data.id, data);
    };

    apiCallBack.deleteRace = function(id) {
        return $http.delete(urlBase + '/' + 'races' + id);
    };

    return apiCallBack;
}]);
