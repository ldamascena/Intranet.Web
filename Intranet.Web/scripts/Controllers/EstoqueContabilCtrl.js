app.controller('contabilCtrl', function ($scope, $uibModal, EstoqueService, EmpresaFilialService, SuperProdutoService) {

    $scope.submittedBusca = false;
    $scope.submittedSuccess = false;
    $scope.submittedError = false;

    SuperProdutoService.GetAllSuperProdutos().then(function (response) {
        $scope.produtos = response.data
    });

    EmpresaFilialService.GetAll().then(function (response) {
        $scope.filiais = response.data
    });

    $scope.buscaProduto = function () {
        $scope.submittedBusca = true;

        if (isNaN($scope.codigoProduto) == false && ($scope.codigoProduto != "" && $scope.codigoProduto != undefined)) {
            EstoqueService.GetBySuperProduto($scope.codigoProduto, $scope.filial).then(function (response) {
                $scope.dados = response.data;
            });
        }

        else {
            EstoqueService.GetBySuperProdutoNome($scope.codigoProduto, $scope.filial).then(function (response) {
                $scope.dados = response.data
            });
        }
    }

    $scope.AlteraCusto = function (item) {
        $scope.item = item;
        $uibModal.open({
            templateUrl: 'CustoFormModal.html',
            controller: 'ModalInstanceCusto',
            scope: $scope
        });
    }
});