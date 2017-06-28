app.filter('sumByKey', function () {
    return function (data, key) {
        if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
            return 0;
        }

        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            sum += parseInt(data[i][key]);
        }

        return sum;
    };
});

app.controller('metaCtrl', function ($scope, $uibModal, $timeout, ClassificacaoMetaService) {
    $scope.dadosMeta = [];
    $scope.subbmited = false;
    $scope.anoMeses =
        [{ data: "2017-01-01", nome: "Janeiro" }, { data: "2017-02-01", nome: "Fevereiro" }, { data: "2017-03-01", nome: "Março" },
        { data: "2017-04-01", nome: "Abril" }, { data: "2017-05-01", nome: "Maio" }, { data: "2017-06-01", nome: "Junho" }, { data: "2017-07-01", nome: "Julho" },
        { data: "2017-08-01", nome: "Agosto" }, { data: "2017-09-01", nome: "Setembro" }, { data: "2017-10-01", nome: "Outubro" }, { data: "2017-11-01", nome: "Novembro" },
        { data: "2017-12-01", nome: "Dezembro" }];

    $scope.getVolumeSum = function (items) {
        return items
        .map(function (x) { return x.dispCompras; })
        .reduce(function (a, b) { return a + b; });
    };

    ClassificacaoMetaService.GetClassificacaoMetaMes().then(function (response) {
        $scope.dados = response.data;
    });

    $scope.editEstoque = function ($index) {
        $scope.nomeMes = $scope.dados[$index].nomeMes;
        $scope.show = true;
        var dateNow = new Date();
        dateNow.setHours(0, 0, 0, 0);

        var dateParameter = new Date(parseInt($scope.dados[$index].dtMes.substr(0, 4)), $scope.dados[$index].dtMes.substr(5, 2) - 1, parseInt($scope.dados[$index].dtMes.substr(8, 2)));
        var datePrazo = new Date(parseInt($scope.dados[$index].dtMes.substr(0, 4)), $scope.dados[$index].dtMes.substr(5, 2) - 1, parseInt($scope.dados[$index].dtMes.substr(8, 2)) + 7);


        if (dateNow >= dateParameter && dateNow <= datePrazo) {
            ClassificacaoMetaService.GetClassificacaoMetaByMes($scope.dados[$index].nomeMes).then(function (response) {
                $scope.dadosMeta = response.data;
            });

            $uibModal.open({
                templateUrl: 'stackedModal.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
                windowClass: 'app-modal-window',
                backdrop: false
            });
        }

        else {
            $scope.show = false;

            ClassificacaoMetaService.GetClassificacaoMetaByMes($scope.dados[$index].nomeMes).then(function (response) {
                $scope.dadosMeta = response.data;
            });

            $uibModal.open({
                templateUrl: 'stackedModal.html',
                controller: 'ModalInstanceCtrl',
                windowClass: 'app-modal-window',
                scope: $scope,
                backdrop: false
            });

            $timeout(function () {
                $uibModal.open({
                    templateUrl: 'AvisoMeta.html',
                    controller: 'ModalInstanceAlertCtrl',
                    windowClass: 'app-modal-alert',
                    backdrop: false
                });
            }, 1000)
        }
    }
});