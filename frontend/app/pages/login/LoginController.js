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