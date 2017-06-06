app.service('ClassificacaoProdutoService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    this.UpdateClassificacao = function (data) {
        return $http.post(serviceBase + "api/ClassificacaoProduto/AlterarClassificacaoProduto", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});