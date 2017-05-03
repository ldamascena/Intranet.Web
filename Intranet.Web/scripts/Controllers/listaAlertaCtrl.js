// Iniciação do Controller

app.controller('listaAlertaCtrl', function ($scope, $uibModal, AlertaGeralService, $interval) {

    // Recuperando identificador do produto - LocalHost
    //var pathArray = window.location.pathname.split('/');
    //$scope.idProduto = pathArray[3];

    //Producao
    var pathArray = window.location.pathname.split('/');
    //Produção
    //$scope.idProduto = pathArray[4];
    //Local
    $scope.idProduto = pathArray[3];


    // Função para carregar os alertas

    $scope.carregarDados = function () {
        AlertaGeralService.GetallAlertasProduto($scope.idProduto).then(function (response) {
            $scope.dados = [];
            $scope.animationsEnabled = true;
            $scope.submittedErro = false;
            $scope.submittedSuccess = false;
            $scope.idAlerta = 0
            $scope.observacao = "";
            $scope.status = "";
            $scope.tipoAlerta = 0;
            $scope.idFilial = 0;

            $scope.dados = response.data;

            // Função para abrir o modal ao clicar

            $scope.showModal = function (idProduto, idAlerta, idFilial, tipoAlerta) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModal.html',
                    controller: 'ModalInstanceCtrl',
                    scope: $scope
                });

                $scope.idProduto = idProduto;
                $scope.idAlerta = idAlerta;
                $scope.idFilial = idFilial;
                $scope.tipoAlerta = tipoAlerta;
            };


            // Função para abrir o modal ao clicar e alterar todos

            //$scope.showModalTodos = function (idProduto) {
            //    var modalInstance = $uibModal.open({
            //        animation: $scope.animationsEnabled,
            //        templateUrl: 'myModal.html',
            //        controller: 'ModalInstanceCtrl',
            //        scope: $scope
            //    });

            //    $scope.idProduto = idProduto;
            //};

            //$scope.teste = function () {
            //    var modalInstance = $uibModal.open({
            //        animation: $scope.animationsEnabled,
            //        templateUrl: 'historicoModal.html',
            //        controller: 'ModalInstanceCtrl',
            //        scope: $scope
            //    });

            //}
            
            //, function (data, status) {
            //    $scope.message = "Aconteceu um problema: " + response.status;
            //    alert($scope.message);
            //};

            var pagesShown = 1;
            var pageSize = 5;

            $scope.carregarHistoricos = function () {
                AlertaGeralService.GetAllHistoricosPorProduto($scope.idProduto).then(function (response) {
                    $scope.dadosHistorico = response.data;

		    
                    $scope.paginationLimit = function(data) {
                        return pageSize * pagesShown;
                    };

                    $scope.hasMoreItemsToShow = function() {
                        return pagesShown < ($scope.dadosHistorico.length / pageSize);
                    };

                    $scope.showMoreItems = function() {
                        pagesShown = pagesShown + 1;       
                    };	
                    
                },
                function (response) {
                    $scope.message = "Aconteceu um problema: " + response.status;
                });
            }


            $scope.carregarHistoricos()
        });
    }

    // Carregando a página com os dados

    $scope.carregarDados();

});