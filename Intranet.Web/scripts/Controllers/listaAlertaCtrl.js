// Iniciação do Controller

app.controller('listaAlertaCtrl', function ($scope, $uibModal, AlertaGeralService, AlertaManualService, $interval) {

    // Recuperando identificador do produto - LocalHost
    //var pathArray = window.location.pathname.split('/');
    //$scope.idProduto = pathArray[3];

    //Producao
    var pathArray = window.location.pathname.split('/');
    //Produção
    //$scope.idProduto = pathArray[4];
    //Local
    $scope.idProduto = pathArray[3];

    var pagesShown = 1;
    var pageSize = 5;


    // Carrega Alerta de Inversão

    AlertaGeralService.GetallAlertasProduto($scope.idProduto).then(function (response) {
        $scope.dadosinversao = response.data;
    })

    AlertaManualService.GetByProduto($scope.idProduto).then(function (response) {
        $scope.dadosManual = response.data;
    })

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
});