app.service('ProdutoService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    this.GetByNomeProduto = function (nomeProduto) {
        return $http.get(serviceBase + "api/ViewProduto/GetByNomeProduto?nomeProduto=" + nomeProduto).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetById = function (id) {
        return $http.get(serviceBase + "api/ViewProduto/GetById?id=" + id).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});