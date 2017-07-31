app.service('AlertaGeralService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    // Alerta Geral

    this.Getall = function (tipoAlerta, situacao) {
        return $http.get(serviceBase + "api/AlertaGeral/Get?tipoAlerta=" + tipoAlerta + "&situacao=" + situacao).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetContainsNomeProduto = function (nomeProduto) {
        return $http.get(serviceBase + "api/AlertaGeral/GetContainsNomeProduto?nomeProduto=" + nomeProduto).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetGeralPorProduto = function (id) {
        return $http.get(serviceBase + "api/AlertaGeral/GetGeralPorProduto?cdProduto=" + id).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    // Alerta Inversão

    this.GetAllInversaoByProduto = function (idProduto) {
        return $http.get(serviceBase + "api/AlertaInversao/GetInvertidosPorProduto/?cdProduto=" + idProduto).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    // Alerta Ultimo Custo

    this.GetAllUltCustoByProduto = function (idProduto) {
        return $http.get(serviceBase + "api/AlertaUltimoCusto/GetUltimoCustoPorProduto/?cdProduto=" + idProduto).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    // Alerta Histórico

    this.GetAllHistoricosPorProduto = function (idProduto) {
        return $http.get(serviceBase + "api/AlertaHistorico/GetHistoricoPorProduto/?cdProduto=" + idProduto).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.CadastrarHistoricoManual = function (data) {
        return $http.post(serviceBase + "api/AlertaHistorico/CadastrarHistoricoManual", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.CadastrarHistoricosManual = function (data) {
        return $http.post(serviceBase + "api/AlertaHistorico/CadastrarHistoricosManual", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.CadastrarHistoricoInversao = function (data) {
        return $http.post(serviceBase + "api/AlertaHistorico/CadastrarHistoricoInversao", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.CadastrarHistoricosInversao = function (data) {
        return $http.post(serviceBase + "api/AlertaHistorico/CadastrarHistoricosInversao", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.CadastrarHistoricoUltimoCusto = function (data) {
        return $http.post(serviceBase + "api/AlertaHistorico/CadastrarHistoricoUltimoCusto", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.CadastrarHistoricosUltimoCusto = function (data) {
        return $http.post(serviceBase + "api/AlertaHistorico/CadastrarHistoricosUltimoCusto", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }


    // Alerta Status 

    this.GetStatus = function (idProduto) {
        return $http.get(serviceBase + "api/AlertaStatus/Get").then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetStatusExceptNovo = function (idProduto) {
        return $http.get(serviceBase + "api/AlertaStatus/GetExceptNovo").then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    // Alerta Quarentena

    this.IncluirNaQuarentena = function (data) {
        return $http.post(serviceBase + "api/AlertaQuarentena/IncluirNaQuarentena", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetAllQuarentenaPorProduto = function (idProduto) {
        return $http.get(serviceBase + "api/AlertaQuarentena/GetQuarentenaPorProduto/?cdProduto=" + idProduto).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});