app.service('AlertaManualService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    this.GetByProduto = function (cdProduto) {
        return $http.get(serviceBase + "api/AlertaManual/GetByProduto?cdProduto=" + cdProduto).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.IncluirAlerta = function (data) {
        return $http.post(serviceBase + "api/AlertaManual/IncluirAlerta", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});