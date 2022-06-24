function log_debug(txt){
    if (AppConfigs.debug) {
        console.log(txt);
    }
}

let app = angular.module('NewNopAdministration', ['ngMaterial', 'ngMessages', 'ngRoute']);
app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey', {
            'default': '500', // by default use shade 400 from the pink palette for primary intentions
            'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
            'hue-3': '900' // use shade A100 for the <code>md-hue-3</code> class
        })
        .accentPalette('amber', {
            'default': '900' // use shade 200 for default, and keep all other shades the same
        });
});
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
app.service('AuthService',function ($rootScope, $location, $http) {
    let authToken = '';
    let userData = null;
    return {
        authenticate : (email, password) => {
            return new Promise((resolve, reject) => {
                $http.post('/auth/authenticate', {email: email, password: password})
                    .then((payload)=>{
                        authToken = payload.data.token
                        userData = payload.data.userInfo;
                        resolve(payload.data.userInfo);
                    })
                    .catch((error)=>{
                        reject(error);
                    });
            });
        },
        getUserdata: () => {
            return userData;
        }
    }

})
app.controller('NavbarController', function ($scope) {
    log_debug('NavbarController loaded');
    this.showNavBar = false;
    $scope.$on('navbar.show', (_event, _args)=> {
        this.showNavBar = true;
    });
    $scope.$on('navbar.hide', (_event, _args)=> {
        this.showNavBar = false;
    });
});
app.controller('DashboardController', function ($scope, AuthService, $rootScope) {
    $rootScope.$broadcast('navbar.show');
});
app.controller('LoginController', function ($scope, AuthService, $location) {
    log_debug('LoginController loaded');
    this.emailAddress = 'sulochana.456@live.com';
    this.password = 'deanmsi';
    this.loggingIn = false;
    this.errorMessage = '';

    this.login = () =>
    {
        this.errorMessage = '';
        if (this.password.length === 0) {
            this.errorMessage = 'Please enter a password';
            return;
        }
        this.loggingIn = true;
        AuthService.authenticate(this.emailAddress, this.password)
            .then((data)=>{
                log_debug(data);
                $location.path(`/dashboard`);
                $scope.$apply();
            })
            .catch((error)=>{
                this.loggingIn = false;
                log_debug(error)
                if (error.status !== 401) {
                    this.errorMessage = 'Internal Server Error. Please try again later!';
                } else {
                    this.errorMessage = 'The password is invalid or the user does not have a password.';
                }
                $scope.$apply();
            });
    }
});