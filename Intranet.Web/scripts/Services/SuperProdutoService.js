﻿app.service('SuperProdutoService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    this.GetAllSuperProdutos = function () {
        return $http.get(serviceBaseProducao + "api/SuperProduto/GetAllSuperProdutos").then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});