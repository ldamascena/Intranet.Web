angular.module('app').service('VendedorService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    this.GetByRazaoSocial = function () {
        return $http.get(serviceBase + "api/Vendedor/GetAll").then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetByRazaoSocial = function (data) {
        return $http.post(serviceBase + "api/Vendedor/AddVendedor", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});