angular.module('app').service('PessoaJuridicaService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    this.GetByRazaoSocial = function (razao) {
        return $http.get(serviceBase + "api/PessoaJuridica/GetByRazaoSocial?razaoSocial="+razao).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetByCNPJ = function (CNPJEmpresa, CNPJFilial, CNPJDV) {
        return $http.get(serviceBase + "api/PessoaJuridica/GetByCNPJ?CNPJEmpresa=" + CNPJEmpresa + "&CNPJFilial=" + CNPJFilial + "&CNPJDV=" + CNPJDV).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetCdPessoaJuridica = function (CNPJEmpresa, CNPJFilial, CNPJDV) {
        return $http.get(serviceBase + "api/PessoaJuridica/GetCdPessoaJuridica?CNPJEmpresa=" + CNPJEmpresa + "&CNPJFilial=" + CNPJFilial + "&CNPJDV=" + CNPJDV).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});