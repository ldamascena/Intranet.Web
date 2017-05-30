app.service('AlertaGeralService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    this.GetallInvertidos = function () {
        return $http.get(serviceBaseProducao + "api/AlertaGeral/Get").then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetContainsNomeProduto = function (nomeProduto) {
        return $http.get(serviceBaseProducao + "api/AlertaGeral/GetContainsNomeProduto?nomeProduto=" + nomeProduto).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetGeralPorProduto = function (id) {
        return $http.get(serviceBaseProducao + "api/AlertaGeral/GetGeralPorProduto?cdProduto=" + id).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetallAlertasProduto = function (idProduto) {
        return $http.get(serviceBaseProducao + "api/AlertaInversao/GetInvertidosPorProduto/?cdProduto=" + idProduto).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetAllHistoricosPorProduto = function (idProduto) {
        return $http.get(serviceBaseProducao + "api/AlertaHistorico/GetHistoricoPorProduto/?cdProduto=" + idProduto).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.CadastrarHistoricoInversao = function (data) {
        return $http.post(serviceBaseProducao + "api/AlertaHistorico/CadastrarHistoricoInversao", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.CadastrarHistoricosInversao = function (data) {
        return $http.post(serviceBaseProducao + "api/AlertaHistorico/CadastrarHistoricosInversao", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.CadastrarHistoricoManual = function (data) {
        return $http.post(serviceBaseProducao + "api/AlertaHistorico/CadastrarHistoricoManual", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.CadastrarHistoricosManual = function (data) {
        return $http.post(serviceBaseProducao + "api/AlertaHistorico/CadastrarHistoricosManual", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.SaveObservacoes = function (data) {
        return $http.post(serviceBaseProducao + "api/AlertaHistorico/CadastrarHistoricos", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});