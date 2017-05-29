app.service('ClassificacaoProdutoService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = ' ';

    this.GetallClassificacaoProduto = function () {
        return $http.get('http://localhost:53759/Resources/ClassificacaoProduto.json')
        //return $http.get(serviceBase + "api/AlertaGeral/Get")
        .then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.UpdateClassificacao = function (data) {
        return $http.post(serviceBase + "api/ClassificacaoProduto/AlterarClassificacaoProduto", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});