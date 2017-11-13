app.controller("RolesCtrl", function ($scope, RolesService) {

    RolesService.AllRoles().then(function (response) {
        $scope.Roles = response.data;
    });
});