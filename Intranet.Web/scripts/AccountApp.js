var app = angular.module('accountApp', ['angular-growl', 'ngAnimate', 'ngSanitize', 'ngStorage']);

app.config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive(5000);
}]);