var app = angular.module('BalancoApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'checklist-model', 'chieffancypants.loadingBar'])
.config(function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
});