app.service('EstoqueService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    // Estoque Fisico

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

    // Estoque Contábil

    this.GetBySuperProduto = function (cdSuperProduto, cdPessoaFilial) {
        return $http.get(serviceBaseProducao + "api/EstoqueContabil/GetBySuperProduto/?cdSuperProduto=" + cdSuperProduto + "&cdPessoaFilial=" + cdPessoaFilial).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetBySuperProdutoNome = function (nomeSuperProduto, cdPessoaFilial) {
        return $http.get(serviceBaseProducao + "api/EstoqueContabil/GetBySuperProdutoNome/?nomeSuperProduto=" + nomeSuperProduto + "&cdPessoaFilial=" +cdPessoaFilial).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.AlterarValorDeCusto = function (data) {
        return $http.post(serviceBaseProducao + "api/EstoqueContabil/AlterarValorDeCusto", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

});