// Iniciação do Controller

app.controller('listaAlertaCtrl', function ($scope, $uibModal, AlertaGeralService, AlertaManualService, $interval, ProdutoService, $cookieStore) {

    $scope.idProduto = $cookieStore.get('idProduto');
    

    var pagesShown = 1;
    var pageSize = 5;


    // Carrega Alerta de Inversão

    AlertaGeralService.GetallAlertasProduto($scope.idProduto).then(function (response) {
        $scope.dadosinversao = response.data;
    })

    AlertaManualService.GetByProduto($scope.idProduto).then(function (response) {
        $scope.dadosManual = response.data;
    })

    AlertaGeralService.GetAllHistoricosPorProduto($scope.idProduto, $scope.tipoAlerta).then(function (response) {
        $scope.dadosHistorico = response.data;
    });


    // Carrega Todos os históricos

    AlertaGeralService.GetAllHistoricosPorProduto($scope.idProduto).then(function (response) {
        $scope.dadosHistorico = response.data;


        $scope.paginationLimit = function (data) {
            return pageSize * pagesShown;
        };

        $scope.hasMoreItemsToShow = function () {
            return pagesShown < ($scope.dadosHistorico.length / pageSize);
        };

        $scope.showMoreItems = function () {
            pagesShown = pagesShown + 1;
        };

    });

    // Função para abrir o modal ao clicar

    $scope.showModal = function (idProduto, idAlerta, idFilial, tipoAlerta) {
        var modalInstance = $uibModal.open({
            templateUrl: 'myModal.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope
        });

        $scope.idProduto = idProduto;
        $scope.idAlerta = idAlerta;
        $scope.idFilial = idFilial;
        $scope.tipoAlerta = tipoAlerta;
    };;

    $scope.showModalTodos = function (tipoAlerta) {
        var modalInstance = $uibModal.open({
            templateUrl: 'myModal.html',
            controller: 'ModalInstanceTodosCtrl',
            scope: $scope
        });

        $scope.tipoAlerta = tipoAlerta;
    };;
});

app.controller('appCtrl', function (AlertaGeralService, $uibModal, $scope, $interval, $location, EmpresaFilialService, ProdutoService, $cookieStore) {
    $scope.currentPage = 1;
    $scope.numPerPage = 10
    $scope.maxSize = 10;
    $scope.filteredTodos = [];

    $scope.appCtrl.filiais = [];

    EmpresaFilialService.GetAll().then(function (response) {
        $scope.filiaisDiponiveis = response.data;
    });

    $scope.orderByMe = function (colunm) {
        $scope.reverse = ($scope.orderBycolumn === colunm) ? !$scope.reverse : false;
        $scope.orderBycolumn = colunm;
    }

    $scope.buscaProduto = function () {

        if (isNaN($scope.teste) && $scope.teste != "") {
            AlertaGeralService.GetContainsNomeProduto($scope.teste).then(function (response) {
                $scope.produtos = response.data;
                $scope.totalItems = response.data.length;

                $scope.$watch('currentPage + numPerPage', function () {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                    , end = begin + $scope.numPerPage;

                    $scope.filteredProdutos = $scope.produtos.slice(begin, end);
                });
            });
        }
        else if (isNaN($scope.teste) == false && $scope.teste != "") {
            AlertaGeralService.GetGeralPorProduto(parseInt($scope.teste)).then(function (response) {
                $scope.produtos = response.data;
                $scope.totalItems = response.data.length;

                $scope.$watch('currentPage + numPerPage', function () {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                    , end = begin + $scope.numPerPage;

                    $scope.filteredProdutos = $scope.produtos.slice(begin, end);
                });
            });
        }

        else {
            AlertaGeralService.GetallInvertidos().then(function (response) {
                $scope.produtos = response.data;
                $scope.totalItems = response.data.length;

                $scope.$watch('currentPage + numPerPage', function () {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                    , end = begin + $scope.numPerPage;

                    $scope.filteredProdutos = $scope.produtos.slice(begin, end);
                });
            });
        }
    }

    AlertaGeralService.GetallInvertidos().then(function (response) {
        $scope.produtos = response.data;
        $scope.totalItems = response.data.length;

        $scope.$watch('currentPage + numPerPage', function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

            $scope.filteredProdutos = $scope.produtos.slice(begin, end);
        });

        $scope.addManual = function () {
            $uibModal.open({
                templateUrl: 'modalAddAlertaManual.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope
            });
        }

        $scope.changePage = function (index) {
            $cookieStore.remove('idProduto');
            $cookieStore.put('idProduto', $scope.filteredProdutos[index].CdProduto);
            window.location.href = 'ListaDeAlertas';
        }
    });
});