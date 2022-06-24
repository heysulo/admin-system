const BASE_HTML_PATH = 'public/admin/html'
app.config(function($routeProvider) {
    function applicationAuthenticator(AuthService, $location) {
        if (AuthService.getUserdata() == null)
        {
            $location.path('/');
            return {};
        }
        return AuthService.getUserdata();
    }
    $routeProvider
        .when("/",{
            controller:'LoginController',
            templateUrl: BASE_HTML_PATH + '/pages/login/view.html',
            controllerAs : 'ctrlLogin'
        })
        .when("/dashboard",{
            controller:'DashboardController',
            templateUrl: BASE_HTML_PATH + '/pages/dashboard/view.html',
            controllerAs : 'ctrlDash',
            resolve : {
                userdata: applicationAuthenticator
            }
        })
});