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