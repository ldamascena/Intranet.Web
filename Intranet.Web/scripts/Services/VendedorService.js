vendedorApp.service('VendedorService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    this.GetAll = function () {
        return $http.get(serviceBaseProducao + "api/Vendedor/GetAll").then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetAllByNameLike = function (nome) {
        return $http.get(serviceBaseProducao + "api/Vendedor/GetAllByNameLike?nome=" + nome).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetAllByNameGrouped = function (nome) {
        return $http.get(serviceBaseProducao + "api/Vendedor/GetAllByNameGrouped?nome=" + nome).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetAllByName = function (nome) {
        return $http.get(serviceBaseProducao + "api/Vendedor/GetAllByName?nome=" + nome).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetAllFornecedorByName = function (nome) {
        return $http.get(serviceBaseProducao + "api/Vendedor/GetAllFornecedorByName?nome=" + nome).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.GetByEmpresa = function (empresa, nome) {
        return $http.get(serviceBaseProducao + "api/Vendedor/GetByEmpresa?empresa=" + empresa + "&nome=" + nome).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.AddVendedor = function (data) {
        return $http.post(serviceBaseProducao + "api/Vendedor/AddVendedor", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.AtualizarVendedor = function (data) {
        return $http.post(serviceBaseProducao + "api/Vendedor/AtulizarVendedor", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.IncluirComprador = function (data) {
        return $http.post(serviceBaseProducao + "api/Vendedor/IncluirComprador", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.ExcluirComprador = function (data) {
        return $http.post(serviceBaseProducao + "api/Vendedor/ExcluirComprador", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.IncluirFornecedor = function (data) {
        return $http.post(serviceBaseProducao + "api/Vendedor/IncluirFornecedor", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.ExcluirFornecedor = function (data) {
        return $http.post(serviceBaseProducao + "api/Vendedor/ExcluirFornecedor", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    this.AlterarStatus = function (data) {
        return $http.post(serviceBaseProducao + "api/Vendedor/AlterarStatus", data).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});