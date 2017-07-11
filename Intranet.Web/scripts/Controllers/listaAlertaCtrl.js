function getIPs(callback) {
    var ip_dups = {};

    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;

    //bypass naive webrtc blocking using an iframe
    if (!RTCPeerConnection) {
        //NOTE: you need to have an iframe in the page right above the script tag
        //
        //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
        //<script>...getIPs called in here...
        //
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection
            || win.mozRTCPeerConnection
            || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }

    //minimal requirements for data connection
    var mediaConstraints = {
        optional: [{ RtpDataChannels: true }]
    };

    var servers = { iceServers: [{ urls: "stun:stun.services.mozilla.com" }] };

    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);

    function handleCandidate(candidate) {
        //match just the IP address
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
        var ip_addr = ip_regex.exec(candidate)[1];

        //remove duplicates
        if (ip_dups[ip_addr] === undefined)
            callback(ip_addr);

        ip_dups[ip_addr] = true;
    }

    //listen for candidate events
    pc.onicecandidate = function (ice) {

        //skip non-candidate events
        if (ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };

    //create a bogus data channel
    pc.createDataChannel("");

    //create an offer sdp
    pc.createOffer(function (result) {

        //trigger the stun server request
        pc.setLocalDescription(result, function () { }, function () { });

    }, function () { });

    //wait for a while to let everything done
    setTimeout(function () {
        //read candidate info from local description
        var lines = pc.localDescription.sdp.split('\n');

        lines.forEach(function (line) {
            if (line.indexOf('a=candidate:') === 0)
                handleCandidate(line);
        });
    }, 1000);
}

// Iniciação do Controller

app.controller('listaAlertaCtrl', function ($scope, $uibModal, AlertaGeralService, AlertaManualService, $interval, ProdutoService, $cookieStore) {

    var pagesShown = 1;
    var pageSize = 5;


    // Carrega Alerta de Inversão

    AlertaGeralService.GetAllInversaoByProduto($scope.idProduto).then(function (response) {
        $scope.dadosinversao = response.data;
    })

    // Carrega Alerta de Ultimo Custo

    AlertaGeralService.GetAllUltCustoByProduto($scope.idProduto).then(function (response) {
        $scope.dadosUltimoCusto = response.data;
        console.log(response.data);
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
    };
});

app.controller('appCtrl', function (AlertaGeralService, $uibModal, $scope, $interval, $location, EmpresaFilialService, ProdutoService, $cookieStore) {

    getIPs(function (ip) {
        if (ip == "192.168.1.60")
        {
            $scope.nomeUsuario = "Cristiane Lima";
        }

        else if (ip == "192.168.1.56") {
            $scope.nomeUsuario = "Amanda Ramos";
        }

        else if (ip == "192.168.1.57") {
            $scope.nomeUsuario = "Tiago Cunha";
        }

        else if (ip == "192.168.1.188") {
            $scope.nomeUsuario = "Leonardo Damascena";
        }

        else if (ip == "192.168.1.229") {
            $scope.nomeUsuario = "Fabrício Oliveira";
        }

        else {
            $scope.nomeUsuario = "usuario não cadastrado";
        }
    });

    var pagesShown = 1;
    var pageSize = 5

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
        if (isNaN($scope.teste) && ($scope.teste != "" && $scope.teste != undefined)) {
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
        else if (isNaN($scope.teste) == false && ($scope.teste != "" && $scope.teste != undefined)) {
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
            AlertaGeralService.Getall($scope.selectTipoAlerta).then(function (response) {
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

    AlertaGeralService.Getall("").then(function (response) {
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


        $scope.ShowModalProduto = function (cdProduto) {

            $scope.idProduto = cdProduto;

            AlertaGeralService.GetAllInversaoByProduto(cdProduto).then(function (response) {
                $scope.dadosinversao = response.data;
            });

            AlertaGeralService.GetAllUltCustoByProduto($scope.idProduto).then(function (response) {
                $scope.dadosUltimoCusto = response.data;
            })

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

            $uibModal.open({
                templateUrl: 'modalTeste.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
                windowClass: 'app-modal-window',
                backdrop: false
            });
        }

        $scope.showModal = function (idProduto, idAlerta, idFilial, tipoAlerta) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModal.html',
                controller: 'ModalInstanceObsCtrl',
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
        };
    });
});