app.service('ClassificacaoMetaService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    this.GetClassificacaoMetaMes = function () {
        return $http.get(serviceBaseProducao + "api/ClassificacaoMeta/GetClassificacaoMetaMes").then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetClassificacaoMetaByMes = function (nomeMes) {
        return $http.get(serviceBaseProducao + "api/ClassificacaoMeta/GetClassificacaoMetaByMes?nomeMes=" + nomeMes).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.AlterarClassificacao = function (data) {
        return $http.post(serviceBaseProducao + "api/ClassificacaoMeta/AlterarClassificacao", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});