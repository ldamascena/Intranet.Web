app.service('AlertaBalancoService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    this.getAll = function (status, dataInclusao) {
        return $http.get(serviceBase + "api/AlertaBalanco/GetAll?situacao=" + status + "&dataInclusao=" + dataInclusao).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetContainsNomeProduto = function (nomeProduto) {
        return $http.get(serviceBase + "api/AlertaBalanco/GetBalancoContainsNomeProduto?nomeProduto=" + nomeProduto).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetBalancoPorProduto = function (id) {
        return $http.get(serviceBase + "api/AlertaBalanco/GetBalancoPorProduto?cdProduto=" + id).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.UpdateBalanco = function (data) {
        return $http.post(serviceBase + "api/AlertaBalanco/UpdateBalanco", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});