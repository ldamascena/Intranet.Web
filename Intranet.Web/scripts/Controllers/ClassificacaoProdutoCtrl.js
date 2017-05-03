app.controller('ClassificacaoProdutoCtrl', function (ClassificacaoProdutoService, $scope, $interval, $filter, $location, $uibModal) {

    ClassificacaoProdutoService.GetallClassificacaoProduto().then(function (response) {
        $scope.classificacoes = response.data
    });

    $scope.doSomethingElse = function (classificacao) {
        $scope.classificacao = classificacao
        $uibModal.open({
            templateUrl: 'myModal.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope
        })
    }
});