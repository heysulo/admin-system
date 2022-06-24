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