//var serviceBase = 'http://localhost:50837/';
//var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';




function AccountService($http) {
    this.Autenticate = function (user, password) {
        return $http.get("http://localhost:50837/" + "api/Account/Autenticate?user=" + user + "&password=" + password).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
};

function RolesService($http) {
    this.AllRoles = function () {
        return $http.get("http://localhost:50837/" + "api/RolesAdmin/GetAllRoles").then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
};


//angular.module('inspinia')
//    .service(AccountService, 'AccountService')
//    .service(RolesService, 'RolesService')