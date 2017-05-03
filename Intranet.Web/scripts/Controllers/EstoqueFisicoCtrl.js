app.controller('estoqueCtrl', function ($scope, $interval, $filter, $location, $uibModal, EstoqueService) {

    $scope.Pesquisar = function () {
        $scope.cdProduto = 0;
        $scope.cdProduto = $scope.pesquisar.cdProduto;

        EstoqueService.GetallEstoqueProduto($scope.cdProduto).then(function (response) {
            $scope.data = response.data

            $scope.estoques = angular.copy($scope.data);
            $scope.enabledEdit = [];

            $scope.addEstoque = function () {
                var est = {
                    CdProduto: $scope.cdProduto, CdEmbalagem: "", QtEmbalagem: "",
                    QtEstoqueFisico: "", QtVolumesFisico: "", QtPedida: "",
                    QtComprometida: ""
                };
                $scope.estoques.push(est);
                $scope.enabledEdit[$scope.estoques.length - 1] = true;
            }
            $scope.editEstoque = function (index) {
                console.log("edit index" + index);
                $scope.enabledEdit[index] = !$scope.enabledEdit[index];
            }

            $scope.submitEstoque = function () {

                console.log($scope.estoques.length);
                console.log($scope.data.length);

                if ($scope.estoques.length != $scope.data.length) {
                    console.log($scope.estoques[$scope.estoques.length - 1]);
                    console.log("Inclusão");
                    if ($scope.estoques[$scope.estoques.length - 1].CdEmbalagem == "") {
                        window.document.getElementById("CdEmbalagem" + ($scope.estoques.length - 1) + "").focus();
                    }
                    else if ($scope.estoques[$scope.estoques.length - 1].QtEmbalagem == null) {
                        window.document.getElementById("QtEmbalagem" + ($scope.estoques.length - 1) + "").focus();
                    }

                    else if ($scope.estoques[$scope.estoques.length - 1].QtEstoqueFisico == null) {
                        window.document.getElementById("QtEstoqueFisico" + ($scope.estoques.length - 1) + "").focus();
                    }

                    else if ($scope.estoques[$scope.estoques.length - 1].QtVolumesFisico == null) {
                        window.document.getElementById("QtVolumesFisico" + ($scope.estoques.length - 1) + "").focus();
                    }

                    else {

                        $uibModal.open({
                            templateUrl: 'myModal.html',
                            controller: 'ModalInstanceCtrl',
                            scope: $scope
                        })
                        .result.then(
                            function () {
                                //alert(angular.toJson($scope.estoques[$scope.estoques.length - 1]));
                                EstoqueService.AdicionarEstoque(angular.toJson($scope.estoques[$scope.estoques.length - 1]));
                                //alert(angular.toJson($scope.estoques[$scope.estoques.length - 1]));
                                $uibModal.open({
                                    templateUrl: 'myModalAlert.html',
                                    controller: 'ModalInstanceCtrl',
                                    scope: $scope
                                })
                                $interval(function () {
                                    location.reload();
                                }, 3000);
                            },
                            function () {

                            });
                    }
                }

                else {

                    $scope.dataUnion = [];

                    for (var i = 0; i <= $scope.estoques.length - 1; i++) {
                        //console.log("form submitted:" + angular.toJson($scope.estoques[i]));

                        if ($scope.data[i].QtEstoqueFisico != $scope.estoques[i].QtEstoqueFisico) {

                            $scope.dataUnion.push($scope.data[i]);
                            $scope.dataUnion.push($scope.estoques[i]);
                            //console.log(angular.toJson($scope.dataUnion));
                            //console.log("Alteração");
                            EstoqueService.AtualizaEstoque(angular.toJson($scope.dataUnion))
                        }
                    }

                    $uibModal.open({
                        templateUrl: 'myModal.html',
                        controller: 'ModalInstanceCtrl',
                        scope: $scope
                    })
                            .result.then(
                                function () {
                                    //alert(angular.toJson($scope.dataUnion));
                                    EstoqueService.AtualizaEstoque(angular.toJson($scope.dataUnion));
                                    $uibModal.open({
                                        templateUrl: 'myModalAlert.html',
                                        controller: 'ModalInstanceCtrl',
                                        scope: $scope
                                    })

                                    $interval(function () {
                                        location.reload();
                                    }, 3000);
                                },
                                function () {

                                });


                    //$scope.dataUnion = [];
                }
            }
        });
    }
});