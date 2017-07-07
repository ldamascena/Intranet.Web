app.service('EstoqueService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    this.GetallEstoque = function () {
        return $http.get(serviceBaseProducao + "api/EstoqueFisico/Get").then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetallEstoqueProduto = function (idProduto) {
        return $http.get(serviceBaseProducao + "api/EstoqueFisico/GetPorProduto/?cdProduto=" + idProduto).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.AtualizaEstoque = function (data) {
        return $http.post(serviceBaseProducao + "api/EstoqueFisico/AtualizarEstoque", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.AdicionarEstoque = function (data) {
        return $http.post(serviceBaseProducao + "api/EstoqueFisico/AdicionarEstoque", data).then(function (response) {
                return response
            }, function (response) {
                return alert("Erro: " + response.status);
            });
    }
});