app.service('AlertaTipoService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    this.GetAll = function () {
        return $http.get(serviceBase + "api/AlertaTipo/GetAll").then(function (response) {
            return response
        }, function (response) {

            return alert("Erro: " + response.status);
        });
    }

    this.GetAllAprovado = function () {
        return $http.get(serviceBase + "api/AlertaTipo/GetAllAprovado").then(function (response) {
            return response
        }, function (response) {

            return alert("Erro: " + response.status);
        });
    }

    this.GetPorNome = function (nome) {
        return $http.get(serviceBase + "api/AlertaTipo/GetByName?nomeAlerta=" + nome).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.IncluirAlerta = function (data) {
        return $http.post(serviceBase + "api/AlertaTipo/IncluirAlertaTipo", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.AprovarTipoAlerta = function (data) {
        return $http.post(serviceBase + "api/AlertaTipo/AprovarTipoAlerta", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.VincularTipoAlerta = function (data) {
        return $http.post(serviceBase + "api/AlertaTipo/VincularTipoAlerta", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});