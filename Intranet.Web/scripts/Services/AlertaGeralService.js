app.service('AlertaGeralService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    this.GetallInvertidos = function () {
        return $http.get(serviceBase + "api/AlertaGeral/Get").then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetallAlertasProduto = function (idProduto) {
        return $http.get(serviceBase + "api/AlertaInversao/GetInvertidosPorProduto/?cdProduto=" + idProduto).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetAllHistoricosPorProduto = function (idProduto) {
        return $http.get(serviceBase + "api/AlertaHistorico/GetHistoricoPorProduto/?cdProduto=" + idProduto).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.SaveObservacao = function (data) {
        return $http.post(serviceBase + "api/AlertaHistorico/CadastrarHistorico", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.SaveObservacoes = function (data) {
        return $http.post(serviceBase + "api/AlertaHistorico/CadastrarHistoricos", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});