app.service('ProdutoService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';
    var info;

    this.GetByNomeProduto = function (nomeProduto) {
        return $http.get(serviceBaseProducao + "api/ViewProduto/GetByNomeProduto?nomeProduto=" + nomeProduto).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetById = function (id) {
        return $http.get(serviceBaseProducao + "api/ViewProduto/GetById?id=" + id).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    return {
        getInfo: getInfo,
        setInfo: setInfo
    };


    function getInfo() {
        return info;
    }

    function setInfo(value) {
        info = value;
    }
});

//app.factory('ProdutoFactory', function () {
//    var savedProduto = 0;
//    function set(data) {
//        savedProduto = data;
//    }
//    function get() {
//        return savedProduto;
//    }

//    return {
//        set: set,
//        get: get
//    }

//});