app.controller('DashboardController', function ($scope, AuthService, $rootScope) {
    $rootScope.$broadcast('navbar.show');
});