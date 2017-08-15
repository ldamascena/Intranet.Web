app.controller('balancoCtrl', function ($scope, $uibModal, AlertaBalancoService) {

    $scope.submitted = false;

    AlertaBalancoService.getAll('','').then(function (response) {
        $scope.dados = response.data
        
    });

    $scope.today = function () {
        $scope.dt = new Date();
    };

    $scope.clear = function () {
        $scope.dt = null;
    };

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.popup1 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
          date: tomorrow,
          status: 'full'
      },
      {
          date: afterTomorrow,
          status: 'partially'
      }
    ];

    $scope.orderByMe = function (colunm) {
        $scope.reverse = ($scope.orderBycolumn === colunm) ? !$scope.reverse : false;
        $scope.orderBycolumn = colunm;
    }

    $scope.buscaProduto = function () {
        if (isNaN($scope.codigoProduto) && ($scope.codigoProduto != "" && $scope.codigoProduto != undefined)) {
            AlertaBalancoService.GetContainsNomeProduto($scope.codigoProduto).then(function (response) {
                $scope.dados = response.data
            });
        }
        else if (isNaN($scope.codigoProduto) == false && ($scope.codigoProduto != "" && $scope.codigoProduto != undefined)) {
            AlertaBalancoService.GetBalancoPorProduto(parseInt($scope.codigoProduto)).then(function (response) {
                $scope.dados = response.data
            });
        }

        else {
            AlertaBalancoService.getAll($scope.situacao, formatDate($scope.dt)).then(function (response) {
                $scope.dados = response.data
            });
        }
    };

    $scope.Aprovar = function (item) {
        $scope.dado = item;
        $uibModal.open({
            templateUrl: 'modalAprovar.html',
            controller: 'ModalInstanceAprovar',
            scope: $scope
        });
    }

    $scope.Reprovar = function (item) {
        $scope.dado = item;
        $uibModal.open({
            templateUrl: 'modalReprovar.html',
            controller: 'ModalInstanceReprovar',
            scope: $scope
        });
    }
});