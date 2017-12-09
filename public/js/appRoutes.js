/**
 * Created by William on 10/19/17.
 */
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/apiManage', {
            templateUrl: 'views/apiManage.html',
            controller: ''
        })

        .when('/dialog', {
            templateUrl: 'views/dialog.html',
            controller: 'MainController'
        });

    $locationProvider.html5Mode(true);

}]);