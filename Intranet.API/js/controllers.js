/**
 * MainCtrl - controller
 * Contains several global data used in different view
 *
 */
function MainCtrl($http) {

    /**
     * countries - Used as duallistbox in form advanced view
     */

    this.countries = [
        { name: 'Amsterdam' },
        { name: 'Washington' },
        { name: 'Sydney' },
        { name: 'Cairo' },
        { name: 'Beijing' }];

    this.getLocation = function (val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
        }).then(function (response) {
            return response.data.results.map(function (item) {
                return item.formatted_address;
            });
        });
    };

    /**
     * daterange - Used as initial model for data range picker in Advanced form view
     */
    this.daterange = { startDate: null, endDate: null };

    /**
     * slideInterval - Interval for bootstrap Carousel, in milliseconds:
     */
    this.slideInterval = 5000;

    /**
     * tags - Used as advanced forms view in input tag control
     */

    this.tags = [
        { text: 'Amsterdam' },
        { text: 'Washington' },
        { text: 'Sydney' },
        { text: 'Cairo' },
        { text: 'Beijing' }
    ];

    /**
     * states - Data used in Advanced Form view for Chosen plugin
     */


    /**
     * check's - Few variables for checkbox input used in iCheck plugin. Only for demo purpose
     */
    this.checkOne = true;
    this.checkTwo = true;
    this.checkThree = true;
    this.checkFour = true;

    /**
     * knobs - Few variables for knob plugin used in Advanced Plugins view
     */
    this.knobOne = 75;
    this.knobTwo = 25;
    this.knobThree = 50;

    /**
     * Variables used for Ui Elements view
     */
    this.bigTotalItems = 175;
    this.bigCurrentPage = 1;
    this.maxSize = 5;
    this.singleModel = false;
    this.radioModel = 'Middle';
    this.checkModel = {
        left: false,
        middle: true,
        right: false
    };

    /**
     * groups - used for Collapse panels in Tabs and Panels view
     */
    this.groups = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    /**
     * alerts - used for dynamic alerts in Notifications and Tooltips view
     */
    this.alerts = [
        { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
        { type: 'info', msg: 'OK, You are done a great job man.' }
    ];

    /**
     * addAlert, closeAlert  - used to manage alerts in Notifications and Tooltips view
     */
    this.addAlert = function () {
        this.alerts.push({ msg: 'Another alert!' });
    };

    this.closeAlert = function (index) {
        this.alerts.splice(index, 1);
    };

    /**
     * randomStacked - used for progress bar (stacked type) in Badges adn Labels view
     */
    this.randomStacked = function () {
        this.stacked = [];
        var types = ['success', 'info', 'warning', 'danger'];

        for (var i = 0, n = Math.floor((Math.random() * 4) + 1) ; i < n; i++) {
            var index = Math.floor((Math.random() * 4));
            this.stacked.push({
                value: Math.floor((Math.random() * 30) + 1),
                type: types[index]
            });
        }
    };
    /**
     * initial run for random stacked value
     */
    this.randomStacked();

    /**
     * summernoteText - used for Summernote plugin
     */
    this.summernoteText = ['<h3>Hello Jonathan! </h3>',
    '<p>dummy text of the printing and typesetting industry. <strong>Lorem Ipsum has been the dustrys</strong> standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more',
        'recently with</p>'].join('');

    /**
     * General variables for Peity Charts
     * used in many view so this is in Main controller
     */
    this.BarChart = {
        data: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2, 4, 7, 3, 2, 7, 9, 6, 4, 5, 7, 3, 2, 1, 0, 9, 5, 6, 8, 3, 2, 1],
        options: {
            fill: ["#1ab394", "#d7d7d7"],
            width: 100
        }
    };

    this.BarChart2 = {
        data: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2],
        options: {
            fill: ["#1ab394", "#d7d7d7"]
        }
    };

    this.BarChart3 = {
        data: [5, 3, 2, -1, -3, -2, 2, 3, 5, 2],
        options: {
            fill: ["#1ab394", "#d7d7d7"]
        }
    };

    this.LineChart = {
        data: [5, 9, 7, 3, 5, 2, 5, 3, 9, 6, 5, 9, 4, 7, 3, 2, 9, 8, 7, 4, 5, 1, 2, 9, 5, 4, 7],
        options: {
            fill: '#1ab394',
            stroke: '#169c81',
            width: 64
        }
    };

    this.LineChart2 = {
        data: [3, 2, 9, 8, 47, 4, 5, 1, 2, 9, 5, 4, 7],
        options: {
            fill: '#1ab394',
            stroke: '#169c81',
            width: 64
        }
    };

    this.LineChart3 = {
        data: [5, 3, 2, -1, -3, -2, 2, 3, 5, 2],
        options: {
            fill: '#1ab394',
            stroke: '#169c81',
            width: 64
        }
    };

    this.LineChart4 = {
        data: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2],
        options: {
            fill: '#1ab394',
            stroke: '#169c81',
            width: 64
        }
    };

    this.PieChart = {
        data: [1, 5],
        options: {
            fill: ["#1ab394", "#d7d7d7"]
        }
    };

    this.PieChart2 = {
        data: [226, 360],
        options: {
            fill: ["#1ab394", "#d7d7d7"]
        }
    };
    this.PieChart3 = {
        data: [0.52, 1.561],
        options: {
            fill: ["#1ab394", "#d7d7d7"]
        }
    };
    this.PieChart4 = {
        data: [1, 4],
        options: {
            fill: ["#1ab394", "#d7d7d7"]
        }
    };
    this.PieChart5 = {
        data: [226, 134],
        options: {
            fill: ["#1ab394", "#d7d7d7"]
        }
    };
    this.PieChart6 = {
        data: [0.52, 1.041],
        options: {
            fill: ["#1ab394", "#d7d7d7"]
        }
    };
};

function topNavCtrl($scope, $sessionStorage, $http, $uibModal, SweetAlert) {

    if ($sessionStorage.user == undefined) {
        window.location = "#/login";
    }
    $scope.user = $sessionStorage.user.Username;

    $scope.logout = function () {
        $sessionStorage.$reset();
    }

    $scope.changepassword = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/change_password.html',
            controller: 'changePasswordInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                UserLogin: function () {
                    return $sessionStorage.user;
                }
            }
        }).result.then(function () {
            SweetAlert.swal({
                title: "Sucesso!",
                text: "A senha foi alterada com sucesso",
                type: "success",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
            })
        });
    };
}

function navigationCtrl($scope, $sessionStorage) {

    $scope.grupo = $sessionStorage.user.Grupo[0].Id;
}

function loginCtrl($scope, $http, toaster, $sessionStorage, $timeout) {

    if ($sessionStorage.user != undefined) {
        window.location = "#/principal/instutucional";
    }

    else {
        $scope.autenticar = function () {

            if (($scope.username == "" || $scope.username == undefined) || ($scope.password == "" || $scope.password == undefined)) {
                toaster.pop({
                    type: 'error',
                    title: 'Erro',
                    body: 'Preencha os campos corretamente!',
                    showCloseButton: true,
                    timeout: 2000
                });
            }

            else {

                toaster.pop({
                    type: 'warning',
                    title: 'Validando',
                    body: 'Aguarde enquanto estamos validando suas informações!',
                    showCloseButton: true
                });

                $scope.obj = { Username: $scope.username, PasswordHash: $scope.password }

                $http.post("http://localhost:50837/api/Usuario/Autenticate", $scope.obj).then(function (response) {
                    switch (response.data) {
                        case 1:
                            toaster.pop({
                                type: 'success',
                                title: 'Sucesso',
                                body: 'Você ira logar em alguns segundos!',
                                showCloseButton: true,
                                timeout: 2000
                            });
                            $http.get("http://localhost:50837/api/Usuario/GetUser?username=" + $scope.username).then(function (response) {
                                $sessionStorage.user = response.data;
                            });
                            $sessionStorage.passwordNoHash = $scope.password;
                            $timeout(function () {
                                window.location = "#/principal/instutucional";
                            }, 2000);

                            break;
                        case 2:
                            toaster.pop({
                                type: 'warning',
                                title: 'Bloqueado',
                                body: 'Seu usuário esta bloqueado!',
                                showCloseButton: true,
                                timeout: 2000
                            });
                            break;
                        default:
                            toaster.pop({
                                type: 'error',
                                title: 'Falha',
                                body: 'Usuário ou senha incorrettos!',
                                showCloseButton: true,
                                timeout: 2000
                            });
                            break;
                    }
                })
            }
        }
    }
}

function registerCtrl($scope, $http) {
    $scope.cadastrar = function () {
        $scope.obj = { Username: $scope.username, Email: $scope.email, Nome: $scope.nome, Sobrenome: $scope.sobrenome, PasswordHash: $scope.password };

        $http.post("http://localhost:50837/api/Usuario/Register", $scope.obj).then(function (response) {
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
}

function wizardCtrl($scope, $rootScope) {
    // All data will be store in this object
    $scope.formData = {};

    // After process wizard
    $scope.processForm = function () {
        alert('Wizard completed');
    };

}

function rolesUserCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    /**
     * persons - Data used in Tables view for Data Tables plugin
     */
    $scope.grupos;

    $http.get("http://localhost:50837/api/Grupo/GetAll").then(function (response) {
        $scope.grupos = response.data;

    });

    $scope.usuarios;

    $http.get("http://localhost:50837/api/Usuario/GetAll").then(function (response) {
        $scope.usuarios = response.data;
    });

    $scope.editarGrupo = function (grupo) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal_example1.html',
            controller: 'rolesUserModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                grupoSelected: function () {
                    return grupo;
                }
            }
        });
    };

    $scope.incluirGrupo = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal_grupo_inclusao.html',
            controller: 'rolesUserModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                grupoSelected: function () {
                    return true;
                }
            }
        });
    };

    $scope.excluirGrupo = function (grupo) {
        SweetAlert.swal({
            title: "Deseja excluir?",
            text: "Não será possivel recuperar depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/Grupo/Excluir", grupo).then(function (response) {
                        SweetAlert.swal("Deletado!", "O grupo foi excluido com sucesso.", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão do grupo", "error");
                }
            });
    }

}

function rolesUserModalInstanceCtrl($scope, $uibModalInstance, $http, grupoSelected) {

    $scope.grupo = grupoSelected.Nome;

    $scope.editar = function () {

        $scope.obj = { Id: grupoSelected.Id, Nome: $scope.grupo }

        if ($scope.signup_form.$valid) {
            $http.post("http://localhost:50837/api/Grupo/Alterar", $scope.obj).then(function (response) {

                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.signup_form.submitted = true;
        }
    };

    $scope.incluir = function () {

        $scope.obj = { Nome: $scope.grupo }

        if ($scope.signup_form.$valid) {
            $http.post("http://localhost:50837/api/Grupo/Incluir", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.signup_form.submitted = true;
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

};

function adminUsuarioCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert, $state, $stateParams) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    alert(angular.toJson($stateParams.obj));

    $scope.usuarios;

    $http.get("http://localhost:50837/api/Usuario/GetAll").then(function (response) {
        $scope.usuarios = response.data;
    });

    $scope.editar = function (usuario) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/usuariomodal.html',
            controller: 'adminUsuarioModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                usuarioSelected: function () {
                    return usuario;
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/Usuario/GetAll").then(function (response) {
                $scope.usuarios = response.data;
            });
        });
    };

    $scope.bloquear = function (usuario) {
        SweetAlert.swal({
            title: "Deseja bloquear?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, bloquear!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/Usuario/Bloquear", usuario).then(function (response) {
                        SweetAlert.swal("Bloqueado!", "O usuário foi bloqueado com sucesso.", "success");
                        $http.get("http://localhost:50837/api/Usuario/GetAll").then(function (response) {
                            $scope.usuarios = response.data;
                        });
                    },
                    function (response) {
                        return alert("Erro: " + response.status);
                    });
                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou o bloqueio do usuario", "error");
                }
            });
    }

    $scope.desbloquear = function (usuario) {
        SweetAlert.swal({
            title: "Deseja desbloquear?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, desbloquear!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/Usuario/Desbloquear", usuario).then(function (response) {
                        SweetAlert.swal("Desbloqueado!", "O usuário foi desbloqueado com sucesso.", "success");
                        $http.get("http://localhost:50837/api/Usuario/GetAll").then(function (response) {
                            $scope.usuarios = response.data;
                        });
                    },
                    function (response) {
                        return alert("Erro: " + response.status);
                    });
                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou o desbloqueio do usuario", "error");
                }
            });
    }

}

function adminUsuarioModalInstanceCtrl($scope, $http, $uibModalInstance, usuarioSelected) {
    $scope.nome = usuarioSelected.Nome;
    $scope.sobrenome = usuarioSelected.Sobrenome;
    $scope.email = usuarioSelected.Email;

    $scope.editar = function () {
        $scope.obj = {
            Id: usuarioSelected.Id, Username: usuarioSelected.Username, EmailConfirmed: usuarioSelected.EmailConfirmed, PasswordHash: usuarioSelected.PasswordHash,
            Bloqueado: usuarioSelected.Bloqueado, DataInclusao: usuarioSelected.DataInclusao, DataAlteracao: usuarioSelected.DataAlteracao, DataBloqueio: usuarioSelected.DataBloqueio,
            Nome: $scope.nome, Sobrenome: $scope.sobrenome, Email: $scope.email
        };

        if ($scope.usuarioForm.$valid) {
            $http.post("http://localhost:50837/api/Usuario/Editar", $scope.obj).then(function (response) {
                $uibModalInstance.close();
            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }
        else {
            $scope.usuarioForm.submitted = true;
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}

function balancoCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    $scope.alertabalancos;

    $http.get("http://localhost:50837/api/AlertaBalanco/GetAll").then(function (response) {
        $scope.alertabalancos = response.data;
    });

    $scope.aprovar = function (balanco) {

        $scope.obj = { "CdAlertaBalanco": balanco.CdAlertaBalanco, "CdProduto": balanco.CdProduto, "CdPessoaFilial": balanco.CdPessoaFilial, "Status": 2 };

        SweetAlert.swal({
            title: "Deseja confimar?",
            text: "Não será possivel mudar depois de confimardo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, confirmar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/AlertaBalanco/UpdateBalanco", $scope.obj).then(function (response) {
                        SweetAlert.swal("Confirmado!", "O status do produto foi alterado!", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a alteração status", "error");
                }
            });

    };

    $scope.reprovar = function (balanco) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/balancoReprovar.html',
            controller: 'balancoModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                balancoSelected: function () {
                    return balanco;
                }
            }
        });
    };
}

function balancoModalInstanceCtrl($scope, $uibModalInstance, $http, balancoSelected) {
    $scope.confirmar = function () {
        $scope.obj = { "CdAlertaBalanco": balancoSelected.CdAlertaBalanco, "CdProduto": balancoSelected.CdProduto, "CdPessoaFilial": balancoSelected.CdPessoaFilial, "Status": 1, "Motivo": $scope.motivo };

        $http.post("http://localhost:50837/api/AlertaBalanco/UpdateBalanco", $scope.obj).then(function (response) {
            $uibModalInstance.close();
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }



}

function inversaoCtrl($scope, DTOptionsBuilder, $http, $uibModal) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [3, 'desc'])
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    $scope.inversoes;

    $http.get("http://localhost:50837/api/AlertaInversao/GetAllAnalitico").then(function (response) {
        $scope.inversoes = response.data;
    });

    $scope.visualizar = function () {
        $uibModal.open({
            templateUrl: 'Views/modal_example.html',
            controller: 'inversaoModalInstanceCtrl',
            backdrop: false,
            windowClass: "app-modal-window animated fadeIn"
        });
    }

}

function inversaoModalInstanceCtrl($scope, $uibModalInstance)
{ }

function despSituacaoCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    /**
     * persons - Data used in Tables view for Data Tables plugin
     */
    $scope.cadsituacoesdesp;

    $http.get("http://localhost:50837/api/CadSitDesp/GetAll").then(function (response) {
        $scope.cadsituacoesdesp = response.data;

    });

    $scope.editar = function (cadsituacaodesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/incluir_editar_cadsit.html',
            controller: 'despSituacaoModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                cadsituacaodespSelected: function () {
                    return cadsituacaodesp;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        });
    };

    $scope.incluir = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/incluir_editar_cadsit.html',
            controller: 'despSituacaoModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                cadsituacaodespSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                }
            }
        });
    };

    $scope.excluir = function (cadsituacaodesp) {
        SweetAlert.swal({
            title: "Deseja excluir?",
            text: "Não será possivel recuperar depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadSitDesp/Excluir", cadsituacaodesp).then(function (response) {
                        SweetAlert.swal("Deletado!", "A situacao foi excluida com sucesso.", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão da situacao", "error");
                }
            });
    }

}

function despSituacaoModalInstanceCtrl($scope, $uibModalInstance, $http, cadsituacaodespSelected, tipo) {
    $scope.tipo = tipo
    $scope.descricao = cadsituacaodespSelected.Descricao;
    if (cadsituacaodespSelected != true) {
        $scope.situacao = cadsituacaodespSelected.SitDesp.IdSitDesp;
    }


    $scope.situacoes;

    $http.get("http://localhost:50837/api/SitDesp/GetAll").then(function (response) {
        $scope.situacoes = response.data;

    });

    $scope.editar = function () {

        $scope.obj = { IdCadSitDesp: cadsituacaodespSelected.IdCadSitDesp, Descricao: $scope.descricao, IdSit: $scope.situacao }

        if ($scope.cadSitForm.$valid) {
            $http.post("http://localhost:50837/api/CadSitDesp/Alterar", $scope.obj).then(function (response) {

                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.cadSitForm.submitted = true;
        }
    };

    $scope.incluir = function () {
        $scope.obj = { Descricao: $scope.descricao, IdSit: $scope.situacao }

        if ($scope.cadSitForm.$valid) {
            $http.post("http://localhost:50837/api/CadSitDesp/Incluir", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.cadSitForm.submitted = true;
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

};

function despMotivoCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    /**
     * persons - Data used in Tables view for Data Tables plugin
     */
    $scope.cadmotivosdesp;

    $http.get("http://localhost:50837/api/CadMotivoDesp/GetAll").then(function (response) {
        $scope.cadmotivosdesp = response.data;

    });

    $scope.editar = function (cadmotivodesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/incluir_editar_cadmotivo.html',
            controller: 'despMotivoModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                cadmotivodespSelected: function () {
                    return cadmotivodesp;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        });
    };

    $scope.incluir = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/incluir_editar_cadmotivo.html',
            controller: 'despMotivoModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                cadmotivodespSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                }
            }
        });
    };

    $scope.excluir = function (cadmotivodesp) {
        SweetAlert.swal({
            title: "Deseja excluir?",
            text: "Não será possivel recuperar depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadMotivoDesp/Excluir", cadmotivodesp).then(function (response) {
                        SweetAlert.swal("Deletado!", "O motivo foi excluido com sucesso.", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão do motivo", "error");
                }
            });
    }

}

function despMotivoModalInstanceCtrl($scope, $uibModalInstance, $http, cadmotivodespSelected, tipo) {
    $scope.tipo = tipo
    $scope.motivo = cadmotivodespSelected.Motivo;


    $scope.editar = function () {

        $scope.obj = { IdMotivo: cadmotivodespSelected.IdMotivo, Motivo: $scope.motivo }

        if ($scope.cadMotivoForm.$valid) {
            $http.post("http://localhost:50837/api/CadMotivoDesp/Alterar", $scope.obj).then(function (response) {

                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.cadMotivoForm.submitted = true;
        }
    };

    $scope.incluir = function () {
        $scope.obj = { Motivo: $scope.motivo }

        if ($scope.cadMotivoForm.$valid) {
            $http.post("http://localhost:50837/api/CadMotivoDesp/Incluir", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.cadMotivoForm.submitted = true;
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

};

function despFornecedorCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    /**
     * persons - Data used in Tables view for Data Tables plugin
     */
    $scope.cadfornecedoresdesp;

    $http.get("http://localhost:50837/api/CadFornecedorDesp/GetAll").then(function (response) {
        $scope.cadfornecedoresdesp = response.data;

    });

    $scope.editar = function (cadfornecedordesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/incluir_editar_cadfornecedor.html',
            controller: 'despFornecedorModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                cadfornecedordespSelected: function () {
                    return cadfornecedordesp;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        });
    };

    $scope.incluir = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/incluir_editar_cadfornecedor.html',
            controller: 'despFornecedorModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                cadfornecedordespSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                }
            }
        });
    };
}

function despFornecedorModalInstanceCtrl($scope, $uibModalInstance, $http, cadfornecedordespSelected, tipo) {
    $scope.tipo = tipo
    $scope.ativo = cadfornecedordespSelected.Ativo;
    $scope.nome = cadfornecedordespSelected.Nome;


    $scope.editar = function () {

        $scope.obj = { Id: cadfornecedordespSelected.Id, Nome: $scope.nome, Ativo: $scope.ativo }

        if ($scope.cadFornecedorForm.$valid) {
            $http.post("http://localhost:50837/api/CadFornecedorDesp/Alterar", $scope.obj).then(function (response) {

                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.cadFornecedorForm.submitted = true;
        }
    };

    $scope.incluir = function () {
        $scope.obj = { Nome: $scope.nome, Ativo: true }

        if ($scope.cadFornecedorForm.$valid) {
            $http.post("http://localhost:50837/api/CadFornecedorDesp/Incluir", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.cadFornecedorForm.submitted = true;
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

};

function solDespesaCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert, $sessionStorage) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    /**
     * persons - Data used in Tables view for Data Tables plugin
     */
    $scope.solicitacoesdesp;

    $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
        $scope.solicitacoesdesp = response.data;

    });

    $scope.editar = function (solicitacaodesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/incluir_editar_cadsoldespesa.html',
            controller: 'solDespesaModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return solicitacaodesp;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.solicitacoesdesp = response.data;
            });
        });
    };

    $scope.incluir = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/incluir_editar_cadsoldespesa.html',
            controller: 'solDespesaModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.solicitacoesdesp = response.data;
            });
        });
    };

    $scope.excluir = function (solicitacaodesp) {
        SweetAlert.swal({
            title: "Deseja excluir?",
            text: "Não será possivel recuperar depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/SolitDesp/Excluir", solicitacaodesp).then(function (response) {
                        $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.solicitacoesdesp = response.data;
                        });
                        SweetAlert.swal("Deletado!", "A solicitacao foi excluida com sucesso.", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão da solicitacao", "error");
                }
            });
    }

    $scope.cancelar = function (solicitacaodesp) {

        $scope.obj = {
            IdCadSolDesp: solicitacaodesp.IdCadSolDesp, VlDespesa: solicitacaodesp.VlDespesa, IdSitDesp: 10,
            IdMotivo: solicitacaodesp.IdMotivo, Documento: solicitacaodesp.Documento, Observacao: solicitacaodesp.Observacao,
            IdAprovador: solicitacaodesp.IdAprovador, DataAprovacao: solicitacaodesp.DataAprovacao,
            ObservacaoAprovacao: solicitacaodesp.ObservacaoAprovacao, DataInclusao: solicitacaodesp.DataInclusao,
            IdUsuarioInclusao: solicitacaodesp.IdUsuarioInclusao, Favorecido: solicitacaodesp.Favorecido
        }

        alert(angular.toJson($scope.obj));

        SweetAlert.swal({
            title: "Deseja cancelar?",
            text: "Não será possivel recuperar depois de cancelado!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, cancelar!",
            cancelButtonText: "Não!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/SolitDesp/Cancelar", $scope.obj).then(function (response) {
                        $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.solicitacoesdesp = response.data;
                        });
                        SweetAlert.swal("Cancelado!", "A solicitacao foi cancelada com sucesso.", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "A execução foi cancelada", "error");
                }
            });
    }

    $scope.visualizar = function (solicitacaodesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/visualizar_despesa.html',
            controller: 'aprovDespesaModalInstanceCtrl',
            size: "lg",
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return solicitacaodesp;
                },
                tipo: function () {
                    return "visualizar";
                }
            }
        });
    };

    $scope.aprovarOrdem = function (solicitacaodesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/aprovar_reprovar_desp.html',
            controller: 'ordemModalAprovacaoInstanceCtrl',
            size: "lg",
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return solicitacaodesp;
                },
                tipo: function () {
                    return "Aprovar";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.solicitacoesdesp = response.data;
            });
        });
    };

    $scope.reprovarOrdem = function (solicitacaodesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/aprovar_reprovar_desp.html',
            controller: 'ordemModalAprovacaoInstanceCtrl',
            size: "lg",
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return solicitacaodesp;
                },
                tipo: function () {
                    return "Reprovar";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.solicitacoesdesp = response.data;
            });
        });
    };
}

function solDespesaModalInstanceCtrl($scope, $uibModalInstance, $http, solicitacaodespSelected, tipo, $sessionStorage) {
    $scope.motivos;
    $scope.tipo = tipo

    solicitacaodespSelected

    $http.get("http://localhost:50837/api/CadMotivoDesp/GetAll").then(function (response) {
        $scope.motivos = response.data;
    });

    if (solicitacaodespSelected.VlDespesa != undefined) {
        $scope.valor = solicitacaodespSelected.VlDespesa.toString().replace(".", ",");
    }

    $scope.motivo = solicitacaodespSelected.CadMotivoDesp;
    $scope.favorecido = solicitacaodespSelected.Favorecido;
    $scope.documento = solicitacaodespSelected.Documento;
    $scope.observacao = solicitacaodespSelected.Observacao;

    $scope.editar = function () {

        $scope.valor = $scope.valor.toString().replace(",", ".");

        $scope.obj = {
            IdCadSolDesp: solicitacaodespSelected.IdCadSolDesp, VlDespesa: $scope.valor, IdMotivo: $scope.motivo.IdMotivo,
            Favorecido: $scope.favorecido, Documento: $scope.documento, Observacao: $scope.observacao, IdUsuarioInclusao: $sessionStorage.user.Id,
            DataInclusao: solicitacaodespSelected.DataInclusao, IdSitDesp: solicitacaodespSelected.IdSitDesp, IdTipoDespesa: 1,
            Baixa: solicitacaodespSelected.Baixa
        }

        if ($scope.cadSolDespForm.$valid) {
            $http.post("http://localhost:50837/api/SolitDesp/Alterar", $scope.obj).then(function (response) {

                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.cadSolDespForm.submitted = true;
        }
    };

    $scope.incluir = function () {

        $scope.valor = $scope.valor.toString().replace(",", ".");

        $scope.obj = {
            VlDespesa: $scope.valor, IdSitDesp: 8, IdMotivo: $scope.motivo.IdMotivo, Favorecido: $scope.favorecido, Documento: $scope.documento,
            Observacao: $scope.observacao, IdUsuarioInclusao: $sessionStorage.user.Id, IdTipoDespesa: 1
        }
        if ($scope.cadSolDespForm.$valid) {
            $http.post("http://localhost:50837/api/SolitDesp/Incluir", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.cadSolDespForm.submitted = true;
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

};

function aprovDespesaCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert, $sessionStorage) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    /**
     * persons - Data used in Tables view for Data Tables plugin
     */
    $scope.solicitacoesdesp;

    $http.get("http://localhost:50837/api/SolitDesp/GetAll").then(function (response) {
        $scope.solicitacoesdesp = response.data;
    });

    $scope.aprovar = function (solicitacaodesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/aprovar_reprovar_desp.html',
            controller: 'aprovDespesaModalInstanceCtrl',
            size: "lg",
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return solicitacaodesp;
                },
                tipo: function () {
                    return "Aprovar";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/SolitDesp/GetAll").then(function (response) {
                $scope.solicitacoesdesp = response.data;
            });
        });
    };

    $scope.reprovar = function (solicitacaodesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/aprovar_reprovar_desp.html',
            controller: 'aprovDespesaModalInstanceCtrl',
            size: "lg",
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return solicitacaodesp;
                },
                tipo: function () {
                    return "Reprovar";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/SolitDesp/GetAll").then(function (response) {
                $scope.solicitacoesdesp = response.data;
            });
        });
    };

    $scope.ordemDePagamento = function (solicitacaodesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/incluir_ordem_de_pagamento.html',
            controller: 'ordemModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/SolitDesp/GetAll").then(function (response) {
                $scope.solicitacoesdesp = response.data;
            });
        });
    };

    $scope.visualizar = function (solicitacaodesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/visualizar_despesa.html',
            controller: 'aprovDespesaModalInstanceCtrl',
            size: "lg",
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return solicitacaodesp;
                },
                tipo: function () {
                    return "visualizar";
                }
            }
        });
    };

    $scope.excluir = function (solicitacaodesp) {
        SweetAlert.swal({
            title: "Deseja excluir?",
            text: "Não será possivel recuperar depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/SolitDesp/Excluir", solicitacaodesp).then(function (response) {
                        $http.get("http://localhost:50837/api/SolitDesp/GetAll").then(function (response) {
                            $scope.solicitacoesdesp = response.data;
                        });
                        SweetAlert.swal("Deletado!", "A solicitacao foi excluida com sucesso.", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão da solicitacao", "error");
                }
            });
    };

    $scope.editar = function (solicitacaodesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/incluir_ordem_de_pagamento.html',
            controller: 'ordemModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return solicitacaodesp;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/SolitDesp/GetAll").then(function (response) {
                $scope.solicitacoesdesp = response.data;
            });
        });
    };
}

function aprovDespesaModalInstanceCtrl($scope, $uibModalInstance, $http, solicitacaodespSelected, tipo, $sessionStorage) {
    $scope.tipo = tipo

    $scope.valor = solicitacaodespSelected.VlDespesa;
    $scope.motivo = solicitacaodespSelected.CadMotivoDesp.Motivo;
    $scope.favorecido = solicitacaodespSelected.Favorecido;
    $scope.documento = solicitacaodespSelected.Documento;
    $scope.observacao = solicitacaodespSelected.Observacao;
    $scope.solicitante = solicitacaodespSelected.UsuarioInclusao.Nome + " " + solicitacaodespSelected.UsuarioInclusao.Sobrenome
    $scope.observacao = solicitacaodespSelected.Observacao;
    $scope.observacaoaprovador = solicitacaodespSelected.ObservacaoAprovacao;

    $scope.editar = function () {

        if (tipo == "Aprovar") {
            $scope.obj = {
                IdCadSolDesp: solicitacaodespSelected.IdCadSolDesp, VlDespesa: solicitacaodespSelected.VlDespesa,
                IdMotivo: solicitacaodespSelected.CadMotivoDesp.IdMotivo, Favorecido: solicitacaodespSelected.Favorecido,
                Documento: solicitacaodespSelected.Documento, Observacao: solicitacaodespSelected.Observacao,
                IdUsuarioInclusao: solicitacaodespSelected.UsuarioInclusao.Id,
                DataInclusao: solicitacaodespSelected.DataInclusao, IdSitDesp: 6, IdAprovador: $sessionStorage.user.Id,
                ObservacaoAprovacao: $scope.observacaoaprovador
            }


            $http.post("http://localhost:50837/api/SolitDesp/AprovarReprovar", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });


        }
        else {
            $scope.obj = {
                IdCadSolDesp: solicitacaodespSelected.IdCadSolDesp, VlDespesa: solicitacaodespSelected.VlDespesa,
                IdMotivo: solicitacaodespSelected.CadMotivoDesp.IdMotivo, Favorecido: solicitacaodespSelected.Favorecido,
                Documento: solicitacaodespSelected.Documento, Observacao: solicitacaodespSelected.Observacao,
                IdUsuarioInclusao: solicitacaodespSelected.UsuarioInclusao.Id,
                DataInclusao: solicitacaodespSelected.DataInclusao, IdSitDesp: 7, IdAprovador: $sessionStorage.user.Id,
                ObservacaoAprovador: $scope.observacaoaprovador
            }

            $http.post("http://localhost:50837/api/SolitDesp/AprovarReprovar", $scope.obj).then(function (response) {

                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

};

function ordemModalInstanceCtrl($scope, $uibModalInstance, $http, solicitacaodespSelected, tipo, $sessionStorage) {
    $scope.tipo = tipo;
    $scope.motivos;
    $scope.usuariosDestino;
    if (solicitacaodespSelected.VlDespesa != undefined) {
        $scope.valor = solicitacaodespSelected.VlDespesa.toString().replace(".", ",");
    }
    $scope.motivo = solicitacaodespSelected.CadMotivoDesp;
    $scope.favorecido = solicitacaodespSelected.Favorecido;
    $scope.documento = solicitacaodespSelected.Documento;
    $scope.observacao = solicitacaodespSelected.Observacao;
    $scope.usuariodestino = solicitacaodespSelected.Aprovador;

    $http.get("http://localhost:50837/api/CadMotivoDesp/GetAll").then(function (response) {
        $scope.motivos = response.data;
    });

    $http.get("http://localhost:50837/api/Usuario/GetAllTesoureiras").then(function (response) {
        $scope.usuariosDestino = response.data;
    });

    $scope.incluir = function () {
        $scope.valor = $scope.valor.toString().replace(",", ".");

        $scope.obj = {
            VlDespesa: $scope.valor, IdSitDesp: 9, IdMotivo: $scope.motivo.IdMotivo, Favorecido: $scope.favorecido, Documento: $scope.documento,
            Observacao: $scope.observacao, IdUsuarioInclusao: $sessionStorage.user.Id, IdAprovador: $scope.usuariodestino.Id
        }
        if ($scope.cadSolDespForm.$valid) {
            $http.post("http://localhost:50837/api/SolitDesp/Incluir", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.cadSolDespForm.submitted = true;
        }
    };

    $scope.editar = function () {

        $scope.valor = $scope.valor.toString().replace(",", ".");

        $scope.obj = {
            IdCadSolDesp: solicitacaodespSelected.IdCadSolDesp, VlDespesa: $scope.valor, IdMotivo: $scope.motivo.IdMotivo,
            Favorecido: $scope.favorecido, Documento: $scope.documento,
            Observacao: $scope.observacao, IdUsuarioInclusao: $sessionStorage.user.Id,
            IdAprovador: $scope.usuariodestino.Id,
            DataInclusao: solicitacaodespSelected.DataInclusao, IdSitDesp: solicitacaodespSelected.IdSitDesp
        }

        $http.post("http://localhost:50837/api/SolitDesp/Alterar", $scope.obj).then(function (response) {
            $uibModalInstance.close();

        }, function (response) {
            return alert("Erro: " + response.status);
        });
    };

}

function ordemModalAprovacaoInstanceCtrl($scope, $uibModalInstance, $http, solicitacaodespSelected, tipo, $sessionStorage) {
    $scope.tipo = tipo

    $scope.valor = solicitacaodespSelected.VlDespesa;
    $scope.motivo = solicitacaodespSelected.CadMotivoDesp.Motivo;
    $scope.favorecido = solicitacaodespSelected.Favorecido;
    $scope.documento = solicitacaodespSelected.Documento;
    $scope.observacao = solicitacaodespSelected.Observacao;
    $scope.solicitante = solicitacaodespSelected.UsuarioInclusao.Nome + " " + solicitacaodespSelected.UsuarioInclusao.Sobrenome
    $scope.observacao = solicitacaodespSelected.Observacao;
    $scope.observacaoaprovador = solicitacaodespSelected.ObservacaoAprovacao;

    $scope.editar = function () {

        if (tipo == "Aprovar") {
            $scope.obj = {
                IdCadSolDesp: solicitacaodespSelected.IdCadSolDesp, VlDespesa: solicitacaodespSelected.VlDespesa,
                IdMotivo: solicitacaodespSelected.CadMotivoDesp.IdMotivo, Favorecido: solicitacaodespSelected.Favorecido,
                Documento: solicitacaodespSelected.Documento, Observacao: solicitacaodespSelected.Observacao,
                IdUsuarioInclusao: solicitacaodespSelected.UsuarioInclusao.Id,
                DataInclusao: solicitacaodespSelected.DataInclusao, IdSitDesp: 6, IdAprovador: $sessionStorage.user.Id,
                ObservacaoAprovacao: $scope.observacaoaprovador
            }


            $http.post("http://localhost:50837/api/SolitDesp/AprovarReprovar", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });


        }
        else {
            $scope.obj = {
                IdCadSolDesp: solicitacaodespSelected.IdCadSolDesp, VlDespesa: solicitacaodespSelected.VlDespesa,
                IdMotivo: solicitacaodespSelected.CadMotivoDesp.IdMotivo, Favorecido: solicitacaodespSelected.Favorecido,
                Documento: solicitacaodespSelected.Documento, Observacao: solicitacaodespSelected.Observacao,
                IdUsuarioInclusao: solicitacaodespSelected.UsuarioInclusao.Id,
                DataInclusao: solicitacaodespSelected.DataInclusao, IdSitDesp: 7, IdAprovador: $sessionStorage.user.Id,
                ObservacaoAprovador: $scope.observacaoaprovador
            }

            $http.post("http://localhost:50837/api/SolitDesp/AprovarReprovar", $scope.obj).then(function (response) {

                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

function changePasswordInstanceCtrl($scope, $uibModalInstance, UserLogin, $http) {

    $scope.salvar = function () {
        if ($scope.signup_form.$valid) {
            $scope.obj = {
                Id: UserLogin.Id, Username: UserLogin.Username, Nome: UserLogin.Nome, Sobrenome: UserLogin.Sobrenome,
                Email: UserLogin.Email, EmailConfirmed: UserLogin.EmailConfirmed, PasswordHash: $scope.senha, Bloqueado: UserLogin.Bloqueado
            }
            ,
            $http.post("http://localhost:50837/api/Usuario/ChangePassword", $scope.obj).then(function (response) {
                $uibModalInstance.close();
            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }
        else {
            $scope.signup_form.submitted = true;
        }

    }

    $scope.cancel = function () {
        alert(angular.toJson(UserLogin));
        $uibModalInstance.dismiss('cancel');
    };
}

function supervisorCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    /**
     * persons - Data used in Tables view for Data Tables plugin
     */
    $scope.supervisores;

    $http.get("http://localhost:50837/api/CadSupervisor/GetAll").then(function (response) {
        $scope.supervisores = response.data;

    });

    $scope.editar = function (supervisor) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadsupervisor.html',
            controller: 'supervisorModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                supervisorSelected: function () {
                    return supervisor;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        });
    };

    $scope.incluir = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadsupervisor.html',
            controller: 'supervisorModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                supervisorSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                }
            }
        });
    };

    $scope.bloquear = function (supervisor) {
        SweetAlert.swal({
            title: "Deseja bloquear?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, bloquear!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadSupervisor/Bloquear", supervisor).then(function (response) {
                        SweetAlert.swal("Bloqueado!", "O supervisor foi bloqueado com sucesso.", "success");
                        $http.get("http://localhost:50837/api/CadSupervisor/GetAll").then(function (response) {
                            $scope.supervisores = response.data;
                        });
                    },
                    function (response) {
                        return alert("Erro: " + response.status);
                    });
                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou o bloqueio do supervisor", "error");
                }
            });
    }

    $scope.desbloquear = function (supervisor) {
        SweetAlert.swal({
            title: "Deseja desbloquear?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, desbloquear!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadSupervisor/Desbloquear", supervisor).then(function (response) {
                        SweetAlert.swal("Desbloqueado!", "O supervisor foi desbloqueado com sucesso.", "success");
                        $http.get("http://localhost:50837/api/CadSupervisor/GetAll").then(function (response) {
                            $scope.supervisores = response.data;
                        });
                    },
                    function (response) {
                        return alert("Erro: " + response.status);
                    });
                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou o desbloqueio do supervisor", "error");
                }
            });
    }
}

function supervisorModalInstanceCtrl($scope, $uibModalInstance, $http, supervisorSelected, tipo) {
    $scope.tipo = tipo
    $scope.nome = supervisorSelected.Nome;
    $scope.sobrenome = supervisorSelected.Sobrenome;


    $scope.editar = function () {

        $scope.obj = {
            Id: supervisorSelected.Id, Nome: $scope.nome, Sobrenome: $scope.sobrenome, DataInclusao: supervisorSelected.DataInclusao,
            DataAlteracao: supervisorSelected.DataAlteracao, DataBloqueio: supervisorSelected.DataBloqueio
        };

        if ($scope.cadSupervisorForm.$valid) {
            $http.post("http://localhost:50837/api/CadSupervisor/Alterar", $scope.obj).then(function (response) {

                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.cadSupervisorForm.submitted = true;
        }
    };

    $scope.incluir = function () {
        $scope.obj = { Nome: $scope.nome, Sobrenome: $scope.sobrenome }

        if ($scope.cadSupervisorForm.$valid) {
            $http.post("http://localhost:50837/api/CadSupervisor/Incluir", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.cadSupervisorForm.submitted = true;
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

};

function atendenteCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    /**
     * persons - Data used in Tables view for Data Tables plugin
     */
    $scope.atendentes;

    $http.get("http://localhost:50837/api/CadAtendente/GetAll").then(function (response) {
        $scope.atendentes = response.data;
    });

    $scope.editar = function (atendente) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadatendente.html',
            controller: 'atendenteModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                atendenteSelected: function () {
                    return atendente;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        });
    };

    $scope.incluir = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadatendente.html',
            controller: 'atendenteModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                atendenteSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                }
            }
        });
    };

    $scope.bloquear = function (atendente) {
        SweetAlert.swal({
            title: "Deseja bloquear?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, bloquear!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadAtendente/Bloquear", atendente).then(function (response) {
                        SweetAlert.swal("Bloqueado!", "O atendente foi bloqueado com sucesso.", "success");
                        $http.get("http://localhost:50837/api/CadAtendente/GetAll").then(function (response) {
                            $scope.atendentes = response.data;
                        });
                    },
                    function (response) {
                        return alert("Erro: " + response.status);
                    });
                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou o bloqueio do atendente", "error");
                }
            });
    }

    $scope.desbloquear = function (atendente) {
        SweetAlert.swal({
            title: "Deseja desbloquear?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, desbloquear!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadAtendente/Desbloquear", atendente).then(function (response) {
                        SweetAlert.swal("Desbloqueado!", "O atendente foi desbloqueado com sucesso.", "success");
                        $http.get("http://localhost:50837/api/CadAtendente/GetAll").then(function (response) {
                            $scope.atendentes = response.data;
                        });
                    },
                    function (response) {
                        return alert("Erro: " + response.status);
                    });
                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou o desbloqueio do atendente", "error");
                }
            });
    }
}

function atendenteModalInstanceCtrl($scope, $uibModalInstance, $http, atendenteSelected, tipo) {
    $scope.tipo = tipo
    $scope.nome = atendenteSelected.Nome;
    $scope.sobrenome = atendenteSelected.Sobrenome;


    $scope.editar = function () {

        $scope.obj = {
            Id: atendenteSelected.Id, Nome: $scope.nome, Sobrenome: $scope.sobrenome, DataInclusao: atendenteSelected.DataInclusao,
            DataAlteracao: atendenteSelected.DataAlteracao, DataBloqueio: atendenteSelected.DataBloqueio
        };

        if ($scope.CadAtendenteForm.$valid) {
            $http.post("http://localhost:50837/api/CadAtendente/Alterar", $scope.obj).then(function (response) {

                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.CadAtendenteForm.submitted = true;
        }
    };

    $scope.incluir = function () {
        $scope.obj = { Nome: $scope.nome, Sobrenome: $scope.sobrenome }

        if ($scope.CadAtendenteForm.$valid) {
            $http.post("http://localhost:50837/api/CadAtendente/Incluir", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.CadAtendenteForm.submitted = true;
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

};

function controleCaixaCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert, $sessionStorage, $interval, $location) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    $scope.totalCaixas = 0;
    $scope.totalDespesas = 0;
    $scope.totalOutrasDespesas = 0;
    $scope.totalEntradas = 0;
    $scope.totalComposicao = 0;
    $scope.totalCaixaGeral = 0;


    $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
        $scope.totalCaixas = response.data;
    });

    $http.get("http://localhost:50837/api/SolitDesp/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
        $scope.totalDespesas = response.data;
    });

    $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
        $scope.totalOutrasDespesas = response.data;
    });

    $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
        $scope.totalEntradas = response.data;
    });

    $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
        $scope.totalComposicao = response.data;
    });

    $http.get("http://localhost:50837/api/CadSaldo/GetLastSaldoByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
        $scope.totalCaixaGeral = response.data.Saldo;
    });

    $http.get("http://localhost:50837/api/CadSaldo/GetCurrentSaldoByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
        $scope.foiFechado = response.data;
    });

    $scope.caixas;

    $http.get("http://localhost:50837/api/CadCaixa/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
        $scope.caixas = response.data;
    });

    $scope.editarCaixa = function (caixa) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadcaixa.html',
            controller: 'caixaModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                caixaSelected: function () {
                    return caixa;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadCaixa/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.caixas = response.data;
            });
            $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalCaixas = response.data;
            });
        });
    };

    $scope.incluirCaixa = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadcaixa.html',
            controller: 'caixaModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                caixaSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadCaixa/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.caixas = response.data;
            });
            $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalCaixas = response.data;
            });
        });
    };

    $scope.excluirCaixa = function (caixa) {
        SweetAlert.swal({
            title: "Deseja excluir?",
            text: "Não será possivel recuperar depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadCaixa/Excluir", caixa).then(function (response) {
                        $http.get("http://localhost:50837/api/CadCaixa/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.caixas = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.totalCaixas = response.data;
                        });
                        SweetAlert.swal("Deletado!", "Registro excluido com sucesso", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão do registro", "error");
                }
            });
    }


    $scope.entradas;

    $http.get("http://localhost:50837/api/CadEntrada/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
        $scope.entradas = response.data;
    });

    $scope.editarEntrada = function (entrada) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadentrada.html',
            controller: 'entradaModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                entradaSelected: function () {
                    return entrada;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadEntrada/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.entradas = response.data;
            });
            $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalEntradas = response.data;
            });
        });
    };

    $scope.incluirEntrada = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadentrada.html',
            controller: 'entradaModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                entradaSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                },
                buscaSelected: function () {
                    return true;
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadEntrada/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.entradas = response.data;
            });
            $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalEntradas = response.data;
            });
        });
    };

    $scope.excluirEntrada = function (entrada) {
        SweetAlert.swal({
            title: "Deseja excluir?",
            text: "Não será possivel recuperar depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadEntrada/Excluir", entrada).then(function (response) {
                        $http.get("http://localhost:50837/api/CadEntrada/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.entradas = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.totalEntradas = response.data;
                        });
                        SweetAlert.swal("Deletado!", "Registro excluido com sucesso", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão do registro", "error");
                }
            });
    }



    $scope.composicoes;

    $http.get("http://localhost:50837/api/CadComposicao/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
        $scope.composicoes = response.data;
    });

    $scope.editarComposicao = function (composicao) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadcomposicao.html',
            controller: 'composicaoModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                composicaoSelected: function () {
                    return composicao;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadComposicao/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.composicoes = response.data;
            });
            $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalComposicao = response.data;
            });
        });
    };

    $scope.incluirComposicao = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadcomposicao.html',
            controller: 'composicaoModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                composicaoSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadComposicao/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.composicoes = response.data;
            });
            $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalComposicao = response.data;
            });
        });
    };

    $scope.excluirComposicao = function (composicao) {
        SweetAlert.swal({
            title: "Deseja excluir?",
            text: "Não será possivel recuperar depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadComposicao/Excluir", composicao).then(function (response) {
                        $http.get("http://localhost:50837/api/CadComposicao/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.composicoes = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.totalComposicao = response.data;
                        });
                        SweetAlert.swal("Deletado!", "Registro excluido com sucesso", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão do registro", "error");
                }
            });
    }

    $scope.baixarComposicao = function (composicao) {
        SweetAlert.swal({
            title: "Deseja baixar?",
            text: "Não será possivel recuperar depois de baixado!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, baixar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadComposicao/Baixar", composicao).then(function (response) {
                        $http.get("http://localhost:50837/api/CadComposicao/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.composicoes = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.totalComposicao = response.data;
                        });
                        SweetAlert.swal("Baixado!", "Registro baixado com sucesso", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a alteracao do registro", "error");
                }
            });
    }



    $scope.despesas;

    $http.get("http://localhost:50837/api/SolitDesp/GetAllByUserAprovado?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
        $scope.despesas = response.data;
    });

    $scope.editar = function (solicitacaodesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/incluir_editar_cadsoldespesa.html',
            controller: 'solDespesaModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return solicitacaodesp;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.solicitacoesdesp = response.data;
            });
        });
    };

    $scope.incluirDespesa = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/incluir_editar_cadsoldespesa.html',
            controller: 'solDespesaModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.solicitacoesdesp = response.data;
            });
        });
    };

    $scope.visualizar = function (solicitacaodesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/visualizar_despesa.html',
            controller: 'aprovDespesaModalInstanceCtrl',
            size: "lg",
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return solicitacaodesp;
                },
                tipo: function () {
                    return "visualizar";
                }
            }
        });
    };

    $scope.baixar = function (solicitacaodesp) {
        SweetAlert.swal({
            title: "Deseja dar baixa?",
            text: "Não será possivel recuperar depois de dado baixa!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, baixar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/SolitDesp/Baixar", solicitacaodesp).then(function (response) {
                        $http.get("http://localhost:50837/api/SolitDesp/GetAllByUserAprovado?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.despesas = response.data;
                        });
                        $http.get("http://localhost:50837/api/SolitDesp/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.totalDespesas = response.data;
                        });
                        SweetAlert.swal("Baixado!", "Registro baixado com sucesso", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a alteracao do registro", "error");
                }
            });
    }


    $scope.outrasdespesas;

    $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
        $scope.outrasdespesas = response.data;
    });

    $scope.editarOutrasDespesas = function (outrasDespesas) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadoutrasdespesas.html',
            controller: 'outrasdespesasModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                outrasdespesasSelected: function () {
                    return outrasDespesas;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.outrasdespesas = response.data;
            });
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalOutrasDespesas = response.data;
            });
        });
    };

    $scope.incluirOutrasDespesas = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadoutrasdespesas.html',
            controller: 'outrasdespesasModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                outrasdespesasSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.outrasdespesas = response.data;
            });
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalOutrasDespesas = response.data;
            });
        });
    };

    $scope.excluirOutrasDespesas = function (outrasDespesas) {
        SweetAlert.swal({
            title: "Deseja excluir?",
            text: "Não será possivel recuperar depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadOutrasDesp/Excluir", outrasDespesas).then(function (response) {
                        $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.outrasdespesas = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.totalOutrasDespesas = response.data;
                        });
                        SweetAlert.swal("Deletado!", "Registro excluido com sucesso", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão do registro", "error");
                }
            });
    }


    $scope.fechar = function () {

        if ($scope.foiFechado == false) {
            $scope.saldodivergencia = $scope.totalComposicao - (($scope.totalCaixaGeral + $scope.totalCaixas + $scope.totalEntradas) - ($scope.totalDespesas + $scope.totalOutrasDespesas));

            $scope.saldo = ($scope.totalCaixaGeral + $scope.totalCaixas + $scope.totalEntradas) - ($scope.totalDespesas + $scope.totalOutrasDespesas);

            SweetAlert.swal({
                title: "Deseja fechar o dia?",
                text: "Você tem uma divergência de: " + Math.round(($scope.totalComposicao - $scope.saldo) * 100) / 100 + " deseja continuar o fechamento?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, fechar!",
                cancelButtonText: "Não, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
                function (isConfirm) {
                    if (isConfirm) {
                        if (Math.round($scope.saldodivergencia * 100) / 100 < 0) {
                            $scope.saldodivergencia = (Math.round($scope.saldodivergencia * 100) / 100) * -1;

                            $scope.objSaida = {
                                IdUsuario: $sessionStorage.user.Id, Valor: $scope.saldodivergencia, Descricao: "Quebra"
                            };

                            $scope.obj = { IdUsuario: $sessionStorage.user.Id, Saldo: Math.round(($scope.saldo - $scope.saldodivergencia) * 100) / 100 };

                            $http.post("http://localhost:50837/api/CadOutrasDesp/Incluir", $scope.objSaida).then(function (response) {
                                $http.post("http://localhost:50837/api/CadSaldo/Incluir", $scope.obj).then(function (response) {
                                    SweetAlert.swal("Fechado!", "Dia fechado com sucesso!", "success");
                                    $interval(function () {
                                        location.reload();
                                    }, 3000);
                                }, function (response) {
                                    return alert("Erro: " + response.status);
                                });

                            }, function (response) {
                                return alert("Erro: " + response.status);
                            });

                        }
                        else {

                            $scope.obj = { IdUsuario: $sessionStorage.user.Id, Saldo: Math.round(($scope.saldo + $scope.saldodivergencia) * 100) / 100 };

                            $scope.objEntrada = {
                                IdUsuario: $sessionStorage.user.Id, Valor: Math.round($scope.saldodivergencia * 100) / 100, Descricao: "Sobra"
                            };

                            $http.post("http://localhost:50837/api/CadEntrada/Incluir", $scope.objEntrada).then(function (response) {
                                $http.post("http://localhost:50837/api/CadSaldo/Incluir", $scope.obj).then(function (response) {
                                    SweetAlert.swal("Fechado!", "Dia fechado com sucesso!", "success");
                                    $interval(function () {
                                        location.reload();
                                    }, 3000);
                                }, function (response) {
                                    return alert("Erro: " + response.status);
                                });

                            }, function (response) {
                                return alert("Erro: " + response.status);
                            });
                        }

                    } else {
                        SweetAlert.swal("Cancelado", "Você cancelou a exclusão do registro", "error");
                    }
                });
        }
        else {
            SweetAlert.swal({
                title: "Fechado!",
                text: "Você já efetuou o fechamento no dia de hoje!",
                type: "warning",
                confirmButtonColor: "#DD6B55",
                closeOnConfirm: false,
                closeOnCancel: false
            });
        }
    }
}

function caixaModalInstanceCtrl($scope, $uibModalInstance, $http, caixaSelected, tipo, $sessionStorage) {
    $scope.tipo = tipo;
    $scope.supervisores;
    $scope.operadores;
    $scope.caixas;
    $scope.data;

    $scope.turnos = [{ id: 1, nome: "Manhã" }, { id: 2, nome: "Tarde" }];

    $http.get("http://localhost:50837/api/CadSupervisor/GetAll").then(function (response) {
        $scope.supervisores = response.data;
    });

    $http.get("http://localhost:50837/api/CadAtendente/GetAll").then(function (response) {
        $scope.operadores = response.data;
    });

    $http.get("http://localhost:50837/api/Caixa/GetAll").then(function (response) {
        $scope.caixas = response.data;
    });

    if ($scope.tipo == "Alteracao") {
        $scope.hora = caixaSelected.DataInclusao.substring(11, 16);
        $scope.data = caixaSelected.DataInclusao;
        $scope.supervisor = caixaSelected.Supervisor;
        $scope.operador = caixaSelected.Atendente;
        $scope.caixa = caixaSelected.Caixa.Id;
        $scope.valor = caixaSelected.Valor;
        $scope.turno = caixaSelected.Turno;
    }

    $scope.incluir = function () {
        $scope.valor = $scope.valor.toString().replace(",", ".");

        if ($scope.cadCaixaForm.$valid) {
            $scope.obj = {
                DataInclusao: $scope.hora, IdUsuario: $sessionStorage.user.Id, IdSupervisor: $scope.supervisor.Id,
                IdAtendente: $scope.operador.Id, IdCaixa: $scope.caixa, Valor: $scope.valor, Turno: $scope.turno
            };

            $http.post("http://localhost:50837/api/CadCaixa/Incluir", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });
        } else {
            $scope.cadCaixaForm.submitted = true;
        }
    }

    $scope.editar = function () {
        $scope.valor = $scope.valor.toString().replace(",", ".");

        if ($scope.cadCaixaForm.$valid) {
            $scope.obj = {
                Id: caixaSelected.Id, DataInclusao: $scope.data, IdUsuario: caixaSelected.IdUsuario, IdSupervisor: $scope.supervisor.Id,
                IdAtendente: $scope.operador.Id, IdCaixa: $scope.caixa, Valor: $scope.valor, Turno: $scope.turno, IdUsuarioAlteracao: $sessionStorage.user.Id
            };

            $http.post("http://localhost:50837/api/CadCaixa/Editar", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });
        } else {
            $scope.cadCaixaForm.submitted = true;
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

function entradaModalInstanceCtrl($scope, $uibModalInstance, $http, entradaSelected, tipo, $sessionStorage, buscaSelected) {
    $scope.tipo = tipo;

    if ($scope.tipo == "Alteracao") {
        $scope.valor = entradaSelected.Valor;
        $scope.descricao = entradaSelected.Descricao;
        $scope.observacao = entradaSelected.Observacao;
        $scope.turno = entradaSelected.Turno
    }

    if (buscaSelected != true) {
        $scope.usuario = buscaSelected.Loja;
        $scope.dataInclusao = buscaSelected.Data
    }
    else {
        $scope.usuario = $sessionStorage.user.Id;
        $scope.dataInclusao = Date.now();
    }

    $scope.incluir = function () {
        $scope.valor = $scope.valor.toString().replace(",", ".");

        if ($scope.cadEntradaForm.$valid) {
            $scope.obj = {
                IdUsuario: $scope.usuario, DataInclusao: $scope.dataInclusao, Valor: $scope.valor, Descricao: $scope.descricao
            };

            $http.post("http://localhost:50837/api/CadEntrada/Incluir", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });
        } else {
            $scope.cadEntradaForm.submitted = true;
        }
    }

    $scope.editar = function () {

        $scope.valor = $scope.valor.toString().replace(",", ".");

        if ($scope.cadEntradaForm.$valid) {
            $scope.obj = {
                Id: entradaSelected.Id, DataInclusao: entradaSelected.DataInclusao, IdUsuario: entradaSelected.IdUsuario,
                Valor: $scope.valor, Descricao: $scope.descricao, IdUsuarioAlteracao: $sessionStorage.user.Id
            };

            $http.post("http://localhost:50837/api/CadEntrada/Editar", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });
        } else {
            $scope.cadEntradaForm.submitted = true;
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

function composicaoModalInstanceCtrl($scope, $uibModalInstance, $http, composicaoSelected, tipo, $sessionStorage) {
    $scope.tipo = tipo;
    $scope.descricoes = ["Moedas", "Nota R$2", "Nota R$5", "Nota R$10", "Nota R$20", "Nota R$50", "Nota R$100", "Caixinha", "Copinho", "Troco", "Boca de Lobo", "Outros"];
    if ($scope.tipo == "Alteracao") {
        $scope.valor = composicaoSelected.Valor;
        $scope.descricao = composicaoSelected.Descricao;
        $scope.observacao = composicaoSelected.Observacao;
        $scope.baixa = composicaoSelected.Baixa;
    }

    $scope.incluir = function () {
        $scope.valor = $scope.valor.toString().replace(",", ".");

        if ($scope.cadComposicaoForm.$valid) {
            $scope.obj = {
                IdUsuario: $sessionStorage.user.Id, Valor: $scope.valor, Descricao: $scope.descricao, Observacao: $scope.observacao, Baixa: $scope.baixa
            };

            $http.post("http://localhost:50837/api/CadComposicao/Incluir", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });
        } else {
            $scope.cadComposicaoForm.submitted = true;
        }
    }

    $scope.editar = function () {

        $scope.valor = $scope.valor.toString().replace(",", ".");

        if ($scope.cadComposicaoForm.$valid) {
            $scope.obj = {
                Id: composicaoSelected.Id, DataInclusao: composicaoSelected.DataInclusao, IdUsuario: composicaoSelected.IdUsuario,
                Valor: $scope.valor, Descricao: $scope.descricao, Observacao: $scope.observacao, IdUsuarioAlteracao: $sessionStorage.user.Id,
                Baixa: $scope.baixa, DataBaixa: composicaoSelected.Baixa
            };

            $http.post("http://localhost:50837/api/CadComposicao/Editar", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });
        } else {
            $scope.cadComposicaoForm.submitted = true;
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

function outrasdespesasModalInstanceCtrl($scope, $uibModalInstance, $http, outrasdespesasSelected, tipo, $sessionStorage) {
    $scope.tipo = tipo;
    $scope.descricoes = ["Boca de Lobo", "Transferencia"];
    if ($scope.tipo == "Alteracao") {
        $scope.valor = outrasdespesasSelected.Valor;
        $scope.descricao = outrasdespesasSelected.Descricao;
        $scope.observacao = outrasdespesasSelected.Observacao;
    }

    $scope.incluir = function () {
        $scope.valor = $scope.valor.toString().replace(",", ".");

        if ($scope.cadOutrasDespesasForm.$valid) {
            $scope.obj = {
                IdUsuario: $sessionStorage.user.Id, Valor: $scope.valor, Descricao: $scope.descricao, Observacao: $scope.observacao
            };

            $http.post("http://localhost:50837/api/CadOutrasDesp/Incluir", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });
        } else {
            $scope.cadOutrasDespesasForm.submitted = true;
        }
    }

    $scope.editar = function () {

        $scope.valor = $scope.valor.toString().replace(",", ".");

        if ($scope.cadOutrasDespesasForm.$valid) {
            $scope.obj = {
                Id: outrasdespesasSelected.Id, DataInclusao: outrasdespesasSelected.DataInclusao, IdUsuario: outrasdespesasSelected.IdUsuario,
                Valor: $scope.valor, Descricao: $scope.descricao, Observacao: $scope.observacao, IdUsuarioAlteracao: $sessionStorage.user.Id
            };

            $http.post("http://localhost:50837/api/CadOutrasDesp/Editar", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });
        } else {
            $scope.cadOutrasDespesasForm.submitted = true;
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

function supcontroleCaixaCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert, $sessionStorage, $interval, $location) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    $scope.totalCaixas = 0;
    $scope.totalDespesas = 0;
    $scope.totalOutrasDespesas = 0;
    $scope.totalEntradas = 0;
    $scope.totalComposicao = 0;
    $scope.totalCaixaGeral = 0;

    $scope.lojas;

    $http.get("http://localhost:50837/api/Usuario/GetAllTesoureiras").then(function (response) {
        $scope.lojas = response.data;

    });

    $scope.Buscar = function () {

        // Registros 

        $http.get("http://localhost:50837/api/CadCaixa/GetAllByUserAndDate?idUsuario=1&date=" + $scope.date).then(function (response) {
            $scope.caixas = response.data;
        });

        $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUserAndDate?idUsuario=1&date=" + $scope.date).then(function (response) {
            $scope.outrasdespesas = response.data;
        });

        $http.get("http://localhost:50837/api/CadEntrada/GetAllByUserAndDate?idUsuario=1&date=" + $scope.date).then(function (response) {
            $scope.entradas = response.data;
        });

        $http.get("http://localhost:50837/api/CadComposicao/GetAllByUserAndDate?idUsuario=1&date=" + $scope.date).then(function (response) {
            $scope.composicoes = response.data;
        });

        $http.get("http://localhost:50837/api/SolitDesp/GetAllByUserAndDate?idUsuario=1&date=" + $scope.date).then(function (response) {
            $scope.despesas = response.data;
        });

        // Totais


        $http.get("http://localhost:50837/api/CadSaldo/GetSaldoByUserAndDate?idUsuario=1&date=" + $scope.date).then(function (response) {
            $scope.totalCaixaGeral = response.data.Saldo;
        });

        $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUserAndDate?idUsuario=1&date=" + $scope.date).then(function (response) {
            $scope.totalCaixas = response.data;
        });


        $http.get("http://localhost:50837/api/SolitDesp/GetTotalByUserAndDate?idUsuario=1&date=" + $scope.date).then(function (response) {
            $scope.totalDespesas = response.data;
        });

        $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUserAndDate?idUsuario=1&date=" + $scope.date).then(function (response) {
            $scope.totalOutrasDespesas = response.data;
        });

        $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUserAndDate?idUsuario=1&date=" + $scope.date).then(function (response) {
            $scope.totalEntradas = response.data;
        });

        $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUserAndDate?idUsuario=1&date=" + $scope.date).then(function (response) {
            $scope.totalComposicao = response.data;
        });
    }

    $scope.caixas;

    $scope.editarCaixa = function (caixa) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadcaixa.html',
            controller: 'caixaModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                caixaSelected: function () {
                    return caixa;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadCaixa/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.caixas = response.data;
            });
            $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalCaixas = response.data;
            });
        });
    };

    $scope.incluirCaixa = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadcaixa.html',
            controller: 'caixaModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                caixaSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadCaixa/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.caixas = response.data;
            });
            $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalCaixas = response.data;
            });
        });
    };

    $scope.excluirCaixa = function (caixa) {
        SweetAlert.swal({
            title: "Deseja excluir?",
            text: "Não será possivel recuperar depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadCaixa/Excluir", caixa).then(function (response) {
                        $http.get("http://localhost:50837/api/CadCaixa/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.caixas = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.totalCaixas = response.data;
                        });
                        SweetAlert.swal("Deletado!", "Registro excluido com sucesso", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão do registro", "error");
                }
            });
    }



    $scope.entradas;

    $scope.editarEntrada = function (entrada) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadentrada.html',
            controller: 'entradaModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                entradaSelected: function () {
                    return entrada;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadEntrada/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.entradas = response.data;
            });
            $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalEntradas = response.data;
            });
        });
    };

    $scope.incluirEntrada = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadentrada.html',
            controller: 'entradaModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                entradaSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                },
                buscaSelected: function () {
                    return { Loja: $scope.loja, Data: $scope.date };
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadEntrada/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.entradas = response.data;
            });
            $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalEntradas = response.data;
            });
        });
    };

    $scope.excluirEntrada = function (entrada) {
        SweetAlert.swal({
            title: "Deseja excluir?",
            text: "Não será possivel recuperar depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadEntrada/Excluir", entrada).then(function (response) {
                        $http.get("http://localhost:50837/api/CadEntrada/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.entradas = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.totalEntradas = response.data;
                        });
                        SweetAlert.swal("Deletado!", "Registro excluido com sucesso", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão do registro", "error");
                }
            });
    }



    $scope.composicoes;

    $scope.editarComposicao = function (composicao) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadcomposicao.html',
            controller: 'composicaoModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                composicaoSelected: function () {
                    return composicao;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadComposicao/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.composicoes = response.data;
            });
            $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalComposicao = response.data;
            });
        });
    };

    $scope.incluirComposicao = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadcomposicao.html',
            controller: 'composicaoModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                composicaoSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadComposicao/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.composicoes = response.data;
            });
            $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalComposicao = response.data;
            });
        });
    };

    $scope.excluirComposicao = function (composicao) {
        SweetAlert.swal({
            title: "Deseja excluir?",
            text: "Não será possivel recuperar depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadComposicao/Excluir", composicao).then(function (response) {
                        $http.get("http://localhost:50837/api/CadComposicao/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.composicoes = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.totalComposicao = response.data;
                        });
                        SweetAlert.swal("Deletado!", "Registro excluido com sucesso", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão do registro", "error");
                }
            });
    }



    $scope.despesas;

    $scope.editar = function (solicitacaodesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/incluir_editar_cadsoldespesa.html',
            controller: 'solDespesaModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return solicitacaodesp;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.solicitacoesdesp = response.data;
            });
        });
    };

    $scope.incluirDespesa = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/incluir_editar_cadsoldespesa.html',
            controller: 'solDespesaModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.solicitacoesdesp = response.data;
            });
        });
    };

    $scope.visualizar = function (solicitacaodesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/visualizar_despesa.html',
            controller: 'aprovDespesaModalInstanceCtrl',
            size: "lg",
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaodespSelected: function () {
                    return solicitacaodesp;
                },
                tipo: function () {
                    return "visualizar";
                }
            }
        });
    };

    $scope.baixar = function (solicitacaodesp) {
        SweetAlert.swal({
            title: "Deseja dar baixa?",
            text: "Não será possivel recuperar depois de dado baixa!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, baixar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/SolitDesp/Baixar", solicitacaodesp).then(function (response) {
                        $http.get("http://localhost:50837/api/SolitDesp/GetAllByUserAprovado?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.despesas = response.data;
                        });
                        $http.get("http://localhost:50837/api/SolitDesp/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.totalDespesas = response.data;
                        });
                        SweetAlert.swal("Baixado!", "Registro baixado com sucesso", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a alteracao do registro", "error");
                }
            });
    }



    $scope.outrasdespesas;

    $scope.editarOutrasDespesas = function (outrasDespesas) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadoutrasdespesas.html',
            controller: 'outrasdespesasModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                outrasdespesasSelected: function () {
                    return outrasDespesas;
                },
                tipo: function () {
                    return "Alteracao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.outrasdespesas = response.data;
            });
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalOutrasDespesas = response.data;
            });
        });
    };

    $scope.incluirOutrasDespesas = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadoutrasdespesas.html',
            controller: 'outrasdespesasModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                outrasdespesasSelected: function () {
                    return true;
                },
                tipo: function () {
                    return "Inclusao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.outrasdespesas = response.data;
            });
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                $scope.totalOutrasDespesas = response.data;
            });
        });
    };

    $scope.excluirOutrasDespesas = function (outrasDespesas) {
        SweetAlert.swal({
            title: "Deseja excluir?",
            text: "Não será possivel recuperar depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadOutrasDesp/Excluir", outrasDespesas).then(function (response) {
                        $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.outrasdespesas = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUser?idUsuario=" + $sessionStorage.user.Id).then(function (response) {
                            $scope.totalOutrasDespesas = response.data;
                        });
                        SweetAlert.swal("Deletado!", "Registro excluido com sucesso", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão do registro", "error");
                }
            });
    }

    $scope.fechar = function () {

        $scope.saldodivergencia = $scope.totalComposicao - (($scope.totalCaixaGeral + $scope.totalCaixas + $scope.totalEntradas) - ($scope.totalDespesas + $scope.totalOutrasDespesas));

        $scope.saldo = ($scope.totalCaixaGeral + $scope.totalCaixas + $scope.totalEntradas) - ($scope.totalDespesas + $scope.totalOutrasDespesas);

        SweetAlert.swal({
            title: "Deseja fechar o dia?",
            text: "Você tem uma divergência de: " + Math.round(($scope.totalComposicao - $scope.saldo) * 100) / 100 + " deseja continuar o fechamento?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, fechar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    if (Math.round($scope.saldodivergencia * 100) / 100 < 0) {
                        $scope.saldodivergencia = (Math.round($scope.saldodivergencia * 100) / 100) * -1;

                        $scope.objSaida = {
                            IdUsuario: $sessionStorage.user.Id, Valor: $scope.saldodivergencia, Descricao: "Quebra"
                        };

                        $scope.obj = { IdUsuario: $sessionStorage.user.Id, IdUsuarioAlteracao: $sessionStorage.user.Id, DataInclusao: $scope.date, Saldo: Math.round(($scope.saldo - $scope.saldodivergencia) * 100) / 100 };

                        $http.post("http://localhost:50837/api/CadOutrasDesp/Incluir", $scope.objSaida).then(function (response) {
                            $http.post("http://localhost:50837/api/CadSaldo/Alterar", $scope.obj).then(function (response) {
                                SweetAlert.swal("Fechado!", "Dia fechado com sucesso!", "success");
                                $interval(function () {
                                    location.reload();
                                }, 3000);
                            }, function (response) {
                                SweetAlert.swal("Fechado!", "Dia fechado com sucesso!", "success");
                                $interval(function () {
                                    location.reload();
                                }, 3000);
                            });

                        }, function (response) {
                            return alert("Erro: " + response.status);
                        });

                    }
                    else {

                        $scope.obj = { IdUsuario: $sessionStorage.user.Id, IdUsuarioAlteracao: $sessionStorage.user.Id, DataInclusao: $scope.date, Saldo: Math.round(($scope.saldo + $scope.saldodivergencia) * 100) / 100 };

                        $scope.objEntrada = {
                            IdUsuario: $sessionStorage.user.Id, Valor: Math.round($scope.saldodivergencia * 100) / 100, Descricao: "Sobra"
                        };

                        $http.post("http://localhost:50837/api/CadEntrada/Incluir", $scope.objEntrada).then(function (response) {
                            $http.post("http://localhost:50837/api/CadSaldo/Alterar", $scope.obj).then(function (response) {
                                SweetAlert.swal("Fechado!", "Dia fechado com sucesso!", "success");
                                $interval(function () {
                                    location.reload();
                                }, 3000);
                            }, function (response) {
                                return alert("Erro: " + response.status);
                            });

                        }, function (response) {
                            return alert("Erro: " + response.status);
                        });
                    }

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão do registro", "error");
                }
            });
    }
}

function parametroFilialCtrl($scope, DTOptionsBuilder, $http, $uibModal) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    /**
     * persons - Data used in Tables view for Data Tables plugin
     */
    $scope.parametroFiliais;

    $http.get("http://localhost:50837/api/SolParametro/GetAllSistemaInventario").then(function (response) {
        $scope.parametroFiliais = response.data;
    });

    $scope.editar = function (parametroFilial) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/parametro/parametro_filial_editar.html',
            controller: 'parametroFilialModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                parametroFilialSelected: function () {
                    return parametroFilial;
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/SolParametro/GetAllSistemaInventario").then(function (response) {
                $scope.parametroFiliais = response.data;
            });
        })
    };
}

function parametroFilialModalInstanceCtrl($scope, $uibModalInstance, $http, parametroFilialSelected) {
    $scope.modelos = ['Handcom', 'FR'];

    $scope.modelo = parametroFilialSelected.Valor;

    $scope.editar = function () {
        $scope.obj = {
            CdEmpresa: parametroFilialSelected.CdEmpresa, CdPessoaFilial: parametroFilialSelected.CdPessoaFilial,
            nmParametro: parametroFilialSelected.NmParametro, Valor: $scope.modelo
        }
        $http.post("http://localhost:50837/api/SolParametro/Editar", $scope.obj).then(function (response) {
            $http.post("http://localhost:50837/api/SolLog/Incluir", { txOBS: $scope.modelo, cdPessoaFilial: parametroFilialSelected.CdPessoaFilial }).then(function (response) {
                $uibModalInstance.close();
            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

function estoqueFisicoCtrl($scope, $http, $uibModal) {

    $scope.estoques;
    $scope.lojas;
    $scope.tiposEstoque = [
        { Id: 1, Nome: "Produto" }, { Id: 2, Nome: "Uso Consumo" }, { Id: 3, Nome: "Avaria" },
        { Id: 4, Nome: "Promoção" }, { Id: 5, Nome: "Saldo Invent." }, { Id: 6, Nome: "Ativo Imob." }
    ];

    $http.get("http://localhost:50837/api/EmpresaFilial/GetAll").then(function (response) {
        $scope.lojas = response.data;
    });

    $scope.Buscar = function () {

        $http.get("http://localhost:50837/api/EstoqueFisico/GetAllByCodigoProdutoAndFilial?cdProduto=" + $scope.codigo + "&cdFilial=" + $scope.loja + "&cdEstoqueTipo=" + $scope.estoquetipo).then(function (response) {
            $scope.estoques = response.data;
        });

        $scope.editar = function (estoque) {

            var modalInstance = $uibModal.open({
                templateUrl: 'Views/modal/estoque/estoque_editar.html',
                controller: 'estoqueModalInstanceCtrl',
                windowClass: "animated fadeIn",
                resolve: {
                    estoqueSelected: function () {
                        return estoque;
                    }
                }
            }).result.then(function () {
                $http.get("http://localhost:50837/api/EstoqueFisico/GetAllByCodigoProdutoAndFilial?cdProduto=" + $scope.codigo + "&cdFilial=" + $scope.loja + "&cdEstoqueTipo=" + $scope.estoquetipo).then(function (response) {
                    $scope.estoques = response.data;
                });
            })
        };
    }
}

function estoqueModalInstanceCtrl($scope, $http, $uibModalInstance, estoqueSelected) {

    $scope.cdProduto = estoqueSelected.CdProduto;
    $scope.cdEmbalagem = estoqueSelected.CdEmbalagem;
    $scope.qtEmbalagem = estoqueSelected.QtEmbalagem;
    $scope.qtEstoque = estoqueSelected.QtEstoqueFisico;

    $scope.editar = function () {
        $scope.obj = {
            CdPessoaFilial: estoqueSelected.CdPessoaFilial, CdPessoaObra: estoqueSelected.CdPessoaObra, CdProduto: estoqueSelected.CdProduto,
            CdEmpresaProduto: estoqueSelected.CdEmpresaProduto, CdEmbalagem: estoqueSelected.CdEmbalagem, QtEmbalagem: estoqueSelected.QtEmbalagem,
            CdEstoqueTipo: estoqueSelected.CdEstoqueTipo, QtEstoqueFisico: $scope.qtEstoque, QtVolumesFisico: $scope.qtEstoque,
            QtPedida: estoqueSelected.QtPedida, QtComprometida: estoqueSelected.QtComprometida, DtUltimaCompra: estoqueSelected.DtUltimaCompra,
            QtUltimaCompra: estoqueSelected.QtUltimaCompra
        }
        $http.post("http://localhost:50837/api/EstoqueFisico/Editar", $scope.obj).then(function (response) {
            $uibModalInstance.close();
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

function estoqueContabilCtrl($scope, $http, $uibModal) {

    $scope.estoquesCusto;
    $scope.produtos;
    $scope.lojas;
    $scope.tiposEstoque = [
        { Id: 1, Nome: "Produto" }, { Id: 2, Nome: "Uso Consumo" }, { Id: 3, Nome: "Avaria" },
        { Id: 4, Nome: "Promoção" }, { Id: 5, Nome: "Saldo Invent." }, { Id: 6, Nome: "Ativo Imob." }
    ];

    $http.get("http://localhost:50837/api/EmpresaFilial/GetAll").then(function (response) {
        $scope.lojas = response.data;
    });

    $scope.Buscar = function () {

        $http.get("http://localhost:50837/api/EstoqueContabil/GetByProdutoAndFilial?cdSuperProduto=" + $scope.codigo + "&cdPessoaFilial=" + $scope.loja).then(function (response) {
            $scope.estoquesCusto = response.data;
        });

        $scope.editar = function (estoqueCusto) {

            var modalInstance = $uibModal.open({
                templateUrl: 'Views/modal/estoque/estoque_custo_editar.html',
                controller: 'estoqueCustoModalInstanceCtrl',
                windowClass: "animated fadeIn",
                resolve: {
                    estoqueCustoSelected: function () {
                        return estoqueCusto;
                    }
                }
            }).result.then(function () {
                $http.get("http://localhost:50837/api/EstoqueContabil/GetByProdutoAndFilial?cdSuperProduto=" + $scope.codigo + "&cdPessoaFilial=" + $scope.loja).then(function (response) {
                    $scope.estoquesCusto = response.data;
                });
            })
        };
    }
}

function estoqueCustoModalInstanceCtrl($scope, $http, $uibModalInstance, estoqueCustoSelected) {

    $scope.cdSuperProduto = estoqueCustoSelected.CdSuperProduto;
    $scope.produto = estoqueCustoSelected.SuperProduto.NmProdutoPai;
    $scope.tipoEstoque = estoqueCustoSelected.EstoqueTipo.NmEstoqueTipo;
    $scope.valor = estoqueCustoSelected.VlUltimaCompra;

    $scope.editar = function () {
        $scope.valor = $scope.valor.toString().replace(",", ".");
        $scope.obj = {
            CdPessoaFilial: estoqueCustoSelected.CdPessoaFilial, CdPessoaObra: estoqueCustoSelected.CdPessoaObra,
            CdSuperProduto: estoqueCustoSelected.CdSuperProduto, CdEmpresaProduto: estoqueCustoSelected.CdEmpresaProduto,
            CdEstoqueTipo: estoqueCustoSelected.CdEstoqueTipo, VlEstoqueContabil: estoqueCustoSelected.VlEstoqueContabil,
            QtEstoqueContabil: estoqueCustoSelected.QtEstoqueContabil, VlUltimaCompra: $scope.valor, VlVerbaComercial: estoqueCustoSelected.VlVerbaComercial
        }
        $http.post("http://localhost:50837/api/EstoqueContabil/Editar", $scope.obj).then(function (response) {
            $uibModalInstance.close();
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

function cadProdutoCtrl($scope, $sessionStorage) {
    $scope.usuario = $sessionStorage.user.Username;
    $scope.password = $sessionStorage.passwordNoHash;
}

/**
 *
 * Pass all functions into module
 */
angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('loginCtrl', loginCtrl)
    .controller('registerCtrl', registerCtrl)
    .controller('topNavCtrl', topNavCtrl)
    .controller('navigationCtrl', navigationCtrl)
    .controller('wizardCtrl', wizardCtrl)
    .controller('rolesUserCtrl', rolesUserCtrl)
    .controller('rolesUserModalInstanceCtrl', rolesUserModalInstanceCtrl)
    .controller('adminUsuarioCtrl', adminUsuarioCtrl)
    .controller('adminUsuarioModalInstanceCtrl', adminUsuarioModalInstanceCtrl)
    .controller('balancoCtrl', balancoCtrl)
    .controller('balancoModalInstanceCtrl', balancoModalInstanceCtrl)
    .controller('inversaoCtrl', inversaoCtrl)
    .controller('inversaoModalInstanceCtrl', inversaoModalInstanceCtrl)
    .controller('despSituacaoCtrl', despSituacaoCtrl)
    .controller('despSituacaoModalInstanceCtrl', despSituacaoModalInstanceCtrl)
    .controller('despMotivoCtrl', despMotivoCtrl)
    .controller('despMotivoModalInstanceCtrl', despMotivoModalInstanceCtrl)
    .controller('despFornecedorCtrl', despFornecedorCtrl)
    .controller('despFornecedorModalInstanceCtrl', despFornecedorModalInstanceCtrl)
    .controller('solDespesaCtrl', solDespesaCtrl)
    .controller('solDespesaModalInstanceCtrl', solDespesaModalInstanceCtrl)
    .controller('aprovDespesaCtrl', aprovDespesaCtrl)
    .controller('aprovDespesaModalInstanceCtrl', aprovDespesaModalInstanceCtrl)
    .controller('ordemModalInstanceCtrl', ordemModalInstanceCtrl)
    .controller('ordemModalAprovacaoInstanceCtrl', ordemModalAprovacaoInstanceCtrl)
    .controller('changePasswordInstanceCtrl', changePasswordInstanceCtrl)
    .controller('supervisorCtrl', supervisorCtrl)
    .controller('supervisorModalInstanceCtrl', supervisorModalInstanceCtrl)
    .controller('atendenteCtrl', atendenteCtrl)
    .controller('atendenteModalInstanceCtrl', atendenteModalInstanceCtrl)
    .controller('controleCaixaCtrl', controleCaixaCtrl)
    .controller('caixaModalInstanceCtrl', caixaModalInstanceCtrl)
    .controller('entradaModalInstanceCtrl', entradaModalInstanceCtrl)
    .controller('composicaoModalInstanceCtrl', composicaoModalInstanceCtrl)
    .controller('outrasdespesasModalInstanceCtrl', outrasdespesasModalInstanceCtrl)
    .controller('supcontroleCaixaCtrl', supcontroleCaixaCtrl)
    .controller('parametroFilialCtrl', parametroFilialCtrl)
    .controller('parametroFilialModalInstanceCtrl', parametroFilialModalInstanceCtrl)
    .controller('estoqueFisicoCtrl', estoqueFisicoCtrl)
    .controller('estoqueModalInstanceCtrl', estoqueModalInstanceCtrl)
    .controller('estoqueContabilCtrl', estoqueContabilCtrl)
    .controller('estoqueCustoModalInstanceCtrl', estoqueCustoModalInstanceCtrl)
    .controller('cadProdutoCtrl', cadProdutoCtrl);