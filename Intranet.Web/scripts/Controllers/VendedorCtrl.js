// IndexPage

vendedorApp.controller('VendedorCtrl', function ($scope, $uibModal, $interval, VendedorService, PessoaJuridicaService) {

    $scope.Compradores = [
        { id: 14, nome: 'Diego Gonçalves' }, { id: 175, nome: 'Geraldo Bonifácio' }, { id: 12, nome: 'Julio Ruiz' },
        { id: 15, nome: 'Marcel Louis' }, { id: 144, nome: 'Renato Barros' }, { id: 186, nome: 'Samir Ponce de Leon' },
        { id: 27, nome: 'Vinicius Bonifácio' }, { id: 13, nome: 'Wanderson Batista' }];

    $scope.totalItems = 500;
    $scope.currentPage = 1;
    $scope.maxSize = 10;

    VendedorService.GetAll().then(function (response) {
        $scope.vendedores = response.data;
    });

    $scope.Procurar = function () {
        if ($scope.searchVendedor != "") {
            VendedorService.GetAllByNameLike($scope.searchVendedor).then(function (response) {
                $scope.vendedores = response.data;
            });
        }
        else {
            VendedorService.GetAll().then(function (response) {
                $scope.vendedores = response.data;
            });
        }

    }

    $scope.AddVendedor = function (vendedor) {
        $scope.vendedores.push(vendedor);
    }

    $scope.orderByMe = function (colunm) {
        $scope.reverse = ($scope.orderBycolumn === colunm) ? !$scope.reverse : false;
        $scope.orderBycolumn = colunm;
    }

    $scope.openVendedor = function (nome) {
        $uibModal.open({
            templateUrl: 'modalEdit.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope,
            resolve: {
                editVendedor: function () {
                    VendedorService.GetAllByName(nome).then(function (response) {
                        console.log(angular.toJson(response.data));
                        $scope.empresa = response.data[0].Empresa
                        $scope.CNPJ = response.data[0].CNPJ
                        $scope.nome = response.data[0].Nome
                        $scope.email = response.data[0].Email
                        $scope.telefone = response.data[0].DDD.toString() + response.data[0].Telefone.toString();
                        $scope.editVendedor = response.data;
                    })
                    return $scope.editVendedor;
                }
            }
        });
    }

    $scope.openComprador = function (nome) {
        $uibModal.open({
            templateUrl: 'modalComprador.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope,
            resolve: {
                comprs: function () {
                    VendedorService.GetAllByNameGrouped(nome).then(function (response) {
                        $scope.comprs = response.data
                    })
                    return $scope.comprs;
                }
            }
        });
    }

    $scope.openFornecedor = function (nome) {
        $uibModal.open({
            templateUrl: 'modalFornecedor.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope,
            resolve: {
                fornecedores: function () {
                    VendedorService.GetAllFornecedorByName(nome).then(function (response) {
                        $scope.fornecedores = response.data
                    })
                    return $scope.fornecedores;
                }
            }
        });
    }

    $scope.addComprador = function () {
        $uibModal.open({
            templateUrl: 'modalAddComprador.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope
        });
    }

    $scope.addFornecedor = function () {
        $uibModal.open({
            templateUrl: 'modalAddFornecedor.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope
        });
    }

    $scope.inativar = function (index) {
        $uibModal.open({
            templateUrl: 'modalQuestion.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope,
            resolve: {
                Status: function () {
                    $scope.status = $scope.vendedores[index].Status;
                    return $scope.status;
                },

                Nome: function () {
                    $scope.nome = $scope.vendedores[index].Nome;
                    return $scope.nome;
                }
            }
        });
    }
});

// AddPage

vendedorApp.controller('VendedorAddCtrl', function ($scope, $uibModal, $interval, PessoaJuridicaService, VendedorService) {

    $scope.Comprador = [];
    $scope.Compradores = [
        { id: 14, nome: 'Diego Gonçalves' }, { id: 175, nome: 'Geraldo Bonifácio' }, { id: 12, nome: 'Julio Ruiz' },
        { id: 15, nome: 'Marcel Louis' }, { id: 144, nome: 'Renato Barros' }, { id: 186, nome: 'Samir Ponce de Leon' },
        { id: 27, nome: 'Vinicius Bonifácio' }, { id: 13, nome: 'Wanderson Batista' }];

    $scope.pad_with_zeroes = function (number, length) {
        var my_string = '' + number;
        while (my_string.length < length) {
            my_string = '0' + my_string;
        }
        return my_string;
    }

    $scope.AddVendedor = function (vendedor) {
        $scope.vendedores.push(vendedor);
    }

    $scope.searchCNPJ = function () {
        $uibModal.open({
            templateUrl: 'modalEmpresa.html',
            controller: 'ModalInstanceCtrl'
        });

        $scope.test = $scope.CNPJ.substring(0, $scope.CNPJ.indexOf("/"));
        $scope.CNPJEmpresa = $scope.test.replace(".", "").replace(".", "");
        $scope.CNPJFilial = parseInt($scope.CNPJ.substring($scope.CNPJ.indexOf("/") + 1, $scope.CNPJ.indexOf("-")));
        $scope.CNPJDV = parseInt($scope.CNPJ.substring($scope.CNPJ.indexOf("-") + 1, $scope.CNPJ.indexOf("-") + 3));

        PessoaJuridicaService.GetByCNPJ($scope.CNPJEmpresa, $scope.CNPJFilial, $scope.CNPJDV).then(function (response) {
            $scope.empresa = response.data.RazaoSocial
        });
    }

    $scope.searchEmpresa = function () {
        $uibModal.open({
            templateUrl: 'modalEmpresa.html',
            controller: 'ModalInstanceCtrl'
        });

        PessoaJuridicaService.GetByRazaoSocial($scope.empresa).then(function (response) {
            $scope.CNPJ = response.data.CNPJEmpresa
            $scope.CNPJ = $scope.CNPJ + $scope.pad_with_zeroes(response.data.CNPJFilial, 4);
            $scope.CNPJ = $scope.CNPJ + $scope.pad_with_zeroes(response.data.CNPJDV, 2)
        });
    }

    $scope.saveChanges = function () {

        $scope.submitted = true
        $scope.DDD = parseInt($scope.telefone.substring(0, 2));
        $scope.telefoneCortado = parseInt($scope.telefone.substring(2, $scope.telefone.length));

        $scope.test = $scope.CNPJ.substring(0, $scope.CNPJ.indexOf("/"));
        $scope.CNPJEmpresa = $scope.test.replace(".", "").replace(".", "");
        $scope.CNPJFilial = parseInt($scope.CNPJ.substring($scope.CNPJ.indexOf("/") + 1, $scope.CNPJ.indexOf("-")));
        $scope.CNPJDV = parseInt($scope.CNPJ.substring($scope.CNPJ.indexOf("-") + 1, $scope.CNPJ.indexOf("-") + 3));



        if ($scope.Comprador.length > 1 && $scope.nome != "") {
            alert($scope.nome);
            for (var i = 0; i < $scope.Comprador.length; i++) {
                $scope.vendedor = {
                    CNPJ: $scope.CNPJ,
                    Empresa: $scope.empresa,
                    CdComprador: $scope.Comprador[i].id,
                    Nome: $scope.nome,
                    DDD: $scope.DDD,
                    Telefone: $scope.telefoneCortado,
                    Email: $scope.email,
                    Status: false
                };

                $scope.vendedor = angular.toJson($scope.vendedor);
                VendedorService.AddVendedor($scope.vendedor);

            }

            $uibModal.open({
                templateUrl: 'modalSucess.html'
            });

            $interval(function () {
                location.href = "/Vendedor";
            }, 3000);
        }
        else {
            alert($scope.Comprador[0].id);

            $scope.vendedor = {
                CNPJ: $scope.CNPJ,
                Empresa: $scope.empresa,
                CdComprador: $scope.Comprador[0].id,
                Nome: $scope.nome,
                DDD: $scope.DDD,
                Telefone: $scope.telefoneCortado,
                Email: $scope.email,
                Status: false
            }

            $scope.vendedor = angular.toJson($scope.vendedor);
            VendedorService.AddVendedor($scope.vendedor);
            // addVendedor
            $uibModal.open({
                templateUrl: 'modalSucess.html'
            });

            $interval(function () {
                location.href = "/Vendedor";
            }, 3000);
        }
    };
});