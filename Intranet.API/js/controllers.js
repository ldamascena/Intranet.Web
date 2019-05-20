function MainCtrl($http, $scope) {
    $scope.aniversariantes;
    var dataAtual = new Date();
    $scope.hoje = dataAtual;
    $scope.mesAtual = dataAtual.getMonth() + 1;
    $scope.diaAtual = dataAtual.getDate();

    $http.get("http://localhost:50837/api/Aniversariantes/GetBirthdayToday").then(function (response) {
        $scope.showMessage = response.data
    });

    $http.get("http://localhost:50837/api/Aniversariantes/GetAllByMonth").then(function (response) {
        $scope.aniversariantes = response.data
    });
};

function topNavCtrl($scope, $localStorage, $http, $uibModal, SweetAlert) {

    if ($localStorage.user == undefined) {
        window.location = "#/login";
    }
    $scope.user = $localStorage.user.Username;

    $scope.logout = function () {
        $localStorage.$reset();
    }

    $scope.changepassword = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/change_password.html',
            controller: 'changePasswordInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                UserLogin: function () {
                    return $localStorage.user;
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

function navigationCtrl($scope, $localStorage) {

    $scope.grupo = $localStorage.user.Grupo[0].Id;
}

function loginCtrl($scope, $http, toaster, $localStorage, $timeout) {

    if ($localStorage.user != undefined) {
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
                                $localStorage.user = response.data;
                            });
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

function registerCtrl($scope, $http, $state, $stateParams, toaster, $timeout) {
    $scope.cadastrar = function () {
        $scope.obj = { Username: $scope.username, Email: $scope.email, Nome: $scope.nome, Sobrenome: $scope.sobrenome, PasswordHash: $scope.password };

        $http.post("http://localhost:50837/api/Usuario/Register", $scope.obj).then(function (response) {
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    $scope.forgotPassword = function () {
        $scope.obj = { Email: $scope.email };
        $http.post("http://localhost:50837/api/Usuario/ForgotPassword", $scope.obj).then(function (response) {
            if (response.data != null) {
                toaster.pop({
                    type: 'success',
                    title: 'Enviado',
                    body: 'E-mail enviado com sucesso!',
                    showCloseButton: true,
                    timeout: 3000
                });

                $timeout(function () {
                    $state.go('login');
                }, 3000);
            }
            else {
                toaster.pop({
                    type: 'error',
                    title: 'Falha!',
                    body: 'E-mail não foi encontrado!',
                    showCloseButton: true,
                    timeout: 3000
                });
            }
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    $scope.changepassword = function () {
        if (($scope.senha == '' || $scope.senha == undefined) || ($scope.confirmarSenha == '' || $scope.confirmarSenha == undefined)) {
            toaster.pop({
                type: 'warning',
                title: 'Atenção!',
                body: 'Preencha os campos corretamente!',
                showCloseButton: true,
                timeout: 2000
            });
        }
        else if ($scope.senha != $scope.confirmarSenha) {
            toaster.pop({
                type: 'error',
                title: 'Falha!',
                body: 'Senha não são identicas!',
                showCloseButton: true,
                timeout: 2000
            });
        }
        else {

            $scope.obj = { PasswordHash: $stateParams.Id, Nome: $scope.senha };

            toaster.pop({
                type: 'success',
                title: 'Sucesso!',
                body: 'Senha alterada com sucesso!',
                showCloseButton: true,
                timeout: 2000
            });

            $http.post('http://localhost:50837/api/Usuario/ChangePassword2', $scope.obj).then(function (response) {
                $timeout(function () {
                    $state.go('login');
                }, 2000);
            },
                function () {
                    return alert("Erro: " + response.status);
                });
        }
    }
}

function wizardCtrl($scope, $rootScope, $uibModal, $http, $timeout, SweetAlert, $localStorage, $interval, $state) {
    $scope.formData = {};
    $scope.grades = [{}];

    $http.get("http://localhost:50837/api/CadSolProd/GetLastId").then(function (response) {
        $scope.IdCadSolProd = response.data + 1;
    });

    $http.get("http://localhost:50837/api/Pessoa/GetAll").then(function (response) {
        $scope.fonecedores = response.data;
    }, function (response) {
        return alert("Erro: " + response.status);
    });

    $scope.addNew = function (grade) {
        $scope.grades.push({});
    };

    $scope.remove = function (grade) {
        if ($scope.grades.length > 1) {
            $scope.grades.pop({});
        }
    };

    $scope.saveInfoProduto = function (obj) {
        $http.post("http://localhost:50837/api/CadSolProd/Incluir", obj).then(function (response) {
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    $scope.saveGrade = function (obj) {
        $http.post("http://localhost:50837/api/CadSolProdGrade/Incluir", obj).then(function (response) {
        }, function (response) {
            return alert("Erro: " + response.status);
        })
    }

    $scope.lojasPequenas = function () {
        $scope.MGE = true;
        $scope.TNG = true;
        $scope.AGM = true;
        $scope.NCE = true;
        $scope.JDE = true;
        $scope.pequenas = true;
    }

    $scope.lojasMedias = function () {

        $scope.ITA = true;
        $scope.ITA2 = true;
        $scope.RBO2 = true;
        $scope.ASN = true;
        $scope.JDC = true;
        $scope.RDO = true;
        $scope.TND = true;
        $scope.BCX = true;
        $scope.medias = true;
    }

    $scope.lojasPremium = function () {
        $scope.RBO = true;
        $scope.INO = true;
        $scope.MRC = true;
        $scope.ARM = true;
        $scope.CBF = true;
        $scope.MCE = true;
        $scope.SPD = true;
        $scope.premium = true;
    }

    $scope.lojasGrandes = function () {
        $scope.MGE2 = true;
        $scope.INO = true;
        $scope.ARM = true;
        $scope.MCE = true;
        $scope.grandes = true;
    }

    $scope.todas = function () {
        $scope.ITA = true;
        $scope.ITA2 = true;
        $scope.MGE = true;
        $scope.MGE2 = true;
        $scope.RBO = true;
        $scope.RBO2 = true;
        $scope.TNG = true;
        $scope.ASN = true;
        $scope.AGM = true;
        $scope.INO = true;
        $scope.JDC = true;
        $scope.MRC = true;
        $scope.NCE = true;
        $scope.RDO = true;
        $scope.TND = true;
        $scope.ARM = true;
        $scope.BCX = true;
        $scope.CBF = true;
        $scope.JDE = true;
        $scope.MCE = true;
        $scope.SPD = true;
        $scope.pequenas = true;
        $scope.medias = true;
        $scope.premium = true;
        $scope.grandes = true;
    }

    $scope.cdItaborai = function () {
        $scope.CDI = true;
    }

    $scope.cdManilha = function () {
        $scope.CDM = true;
    }

    $scope.limpar = function () {

        $scope.ITA = false;
        $scope.ITA2 = false;
        $scope.MGE = false;
        $scope.MGE2 = false;
        $scope.RBO = false;
        $scope.RBO2 = false;
        $scope.TNG = false;
        $scope.ASN = false;
        $scope.AGM = false;
        $scope.INO = false;
        $scope.JDC = false;
        $scope.MRC = false;
        $scope.NCE = false;
        $scope.RDO = false;
        $scope.TND = false;
        $scope.ARM = false;
        $scope.BCX = false;
        $scope.CBF = false;
        $scope.JDE = false;
        $scope.MCE = false;
        $scope.SPD = false;
        $scope.CDI = false;
        $scope.CDM = false;
        $scope.pequenas = false;
        $scope.medias = false;
        $scope.premium = false;
        $scope.grandes = false;
    }

    $scope.save = function () {
        if ($scope.prodForm.$valid) {
            SweetAlert.swal({
                title: "Deseja confirmar?",
                text: "Não será possivel excluir o registro depois de incluir!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, incluir!",
                cancelButtonText: "Não, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false,
                timer: 5000
            },
                function (isConfirm) {
                    if (isConfirm) {
                        $scope.objProduto = {
                            Descricao: $scope.descricao, Comprador: $scope.comprador, Fornecedor: $scope.fornecedor, Abastecimento: $scope.abastecimento,
                            ConcSensibilidade: $scope.concorrencia,
                            Custo: $scope.custo == undefined ? $scope.custo : $scope.custo.toString().replace(",", "."),
                            Venda: $scope.venda == undefined ? $scope.venda : $scope.venda.toString().replace(",", "."),
                            Embalagem: $scope.embalagem,
                            QtdEmbalagem: $scope.qtdEmbalagem == undefined ? $scope.qtdEmbalagem : $scope.qtdEmbalagem.toString().replace(",", "."),
                            Peso: $scope.peso == undefined ? $scope.peso : $scope.peso.toString().replace(",", "."),
                            Altura: $scope.altura == undefined ? $scope.altura : $scope.altura.toString().replace(",", "."),
                            Largura: $scope.largura == undefined ? $scope.largura : $scope.largura.toString().replace(",", "."),
                            Comprimento: $scope.comprimento == undefined ? $scope.comprimento : $scope.comprimento.toString().replace(",", "."),
                            Lastro: $scope.lastro == undefined ? $scope.lastro : $scope.lastro.toString().replace(",", "."),
                            Camadas: $scope.camadas == undefined ? $scope.camadas : $scope.camadas.toString().replace(",", "."),
                            Caracteristica: $scope.caracteristica == undefined ? $scope.caracteristica : $scope.caracteristica.toString(),
                            JustificativaResumida: $scope.justificativa, Observacao: $scope.observacao,
                            IdUsuario: $localStorage.user.Id, TipoCadastro: $scope.tipoCadastro, Segmento: $scope.segmento, IdCadSolProd: $scope.IdCadSolProd
                        }

                        $http.post("http://localhost:50837/api/CadSolProd/Incluir", $scope.objProduto).then(function (response) {
                            $state.go('produto.sollistaprodutos');
                        }, function (response) {
                            return alert("Erro: " + response.status);
                        });
                        SweetAlert.swal({
                            title: "Incluído!",
                            text: "O registro foi incluído com sucesso.",
                            type: "success",
                            timer: 5000
                        });


                    } else {
                        SweetAlert.swal({
                            title: "Cancelado!",
                            text: "Você cancelou a inclusão do registro",
                            type: "error",
                            timer: 5000
                        });
                    }
                });
        } else {
            $scope.prodForm.submitted = true;
        }
    };

    $scope.cancel = function () {
        $state.go('produto.sollistaprodutos');
    }
}

function solListaProdCtrl($scope, $uibModal, $http, SweetAlert, $localStorage, DTOptionsBuilder) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [1, 'desc'])
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

    $scope.solicitacoesProd = [];
    $scope.grupo = $localStorage.user.Grupo[0].Id;
    $scope.usuarioLogado = $localStorage.user.Id
    $scope.dateinicio = new Date(2017, 1, 1);
    $scope.datefim = new Date(2020, 1, 1);

    $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
        $scope.solicitacoesProd = response.data;
    });

    $scope.Buscar = function () {
        if ($scope.status != 0) {
            $http.get("http://localhost:50837/api/CadSolProd/GetAllByStatus?idStatus=" + $scope.status + "&dtInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dtFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
                $scope.solicitacoesProd = response.data;
            });
        }
        else {
            $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
                $scope.solicitacoesProd = response.data;
            });
        }
    }

    $scope.aprovarComercial = function (solicitacaoProd) {
        solicitacaoProd.IdUsuario = $localStorage.user.Id;

        SweetAlert.swal({
            title: "Deseja confimar?",
            text: "Não será possivel mudar depois de confimardo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, confirmar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Confirmado!", "Aprovação feita com sucesso!", "success");
                    $http.post("http://localhost:50837/api/CadSolProd/AprovarComercial", solicitacaoProd).then(function (response) {
                        $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
                            $scope.solicitacoesProd = response.data;
                        });
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a aprovação status!", "error");
                }
            });

    };
    $scope.reprovarComercial = function (solicitacaoProd) {
        solicitacaoProd.IdUsuario = $localStorage.user.Id;
        SweetAlert.swal({
            title: "Deseja confimar?",
            text: "Não será possivel mudar depois de confimardo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, confirmar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Confirmado!", "Reprovado com sucesso!", "success");
                    $http.post("http://localhost:50837/api/CadSolProd/ReprovarComercial", solicitacaoProd).then(function (response) {
                        $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
                            $scope.solicitacoesProd = response.data;
                        });
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a alteração!", "error");
                }
            });

    };

    $scope.aprovarDiretoria = function (solicitacaoProd) {
        solicitacaoProd.IdUsuario = $localStorage.user.Id;
        SweetAlert.swal({
            title: "Deseja confimar?",
            text: "Não será possivel mudar depois de confimardo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, confirmar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Confirmado!", "Aprovação feita com sucesso!", "success");
                    $http.post("http://localhost:50837/api/CadSolProd/AprovarDiretoria", solicitacaoProd).then(function (response) {
                        $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
                            $scope.solicitacoesProd = response.data;
                        });
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });
                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a aprovação status!", "error");
                }
            });

    };
    $scope.reprovarDiretoria = function (solicitacaoProd) {
        solicitacaoProd.IdUsuario = $localStorage.user.Id;
        SweetAlert.swal({
            title: "Deseja confimar?",
            text: "Não será possivel mudar depois de confimardo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, confirmar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Confirmado!", "Reprovado com sucesso!", "success");
                    $http.post("http://localhost:50837/api/CadSolProd/ReprovarDiretoria", solicitacaoProd).then(function (response) {
                        $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
                            $scope.solicitacoesProd = response.data;
                        });

                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a alteração!", "error");
                }
            });

    };

    $scope.aprovarTodosComercial = function (solicitacoesProd) {

        $uibModal.open({
            templateUrl: 'Views/modal/produto/loading_massa.html',
            controller: 'solListaProdModalLoadingCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                solicitacoesProdSelected: function () {
                    return solicitacoesProd;
                },
                tipo: function () {
                    return "aprovacaoComercial"
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
                $scope.solicitacoesProd = response.data;
            });
        });
    }

    $scope.aprovarTodosComercialDiretoria = function (solicitacoesProd) {

        $uibModal.open({
            templateUrl: 'Views/modal/produto/loading_massa.html',
            controller: 'solListaProdModalLoadingCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                solicitacoesProdSelected: function () {
                    return solicitacoesProd;
                },
                tipo: function () {
                    return "aprovacaoComercialDiretoria"
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
                $scope.solicitacoesProd = response.data;
            });
        });
    }

    $scope.reprovarTodosComercial = function (solicitacoesProd) {
        $uibModal.open({
            templateUrl: 'Views/modal/produto/loading_massa.html',
            controller: 'solListaProdModalLoadingCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                solicitacoesProdSelected: function () {
                    return solicitacoesProd;
                },
                tipo: function () {
                    return "reprovacaoComercial"
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
                $scope.solicitacoesProd = response.data;
            });
        });
    }

    $scope.aprovarTodosDiretoria = function (solicitacoesProd) {
        $uibModal.open({
            templateUrl: 'Views/modal/produto/loading_massa.html',
            controller: 'solListaProdModalLoadingCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                solicitacoesProdSelected: function () {
                    return solicitacoesProd;
                },
                tipo: function () {
                    return "aprovacaoDiretoria"
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
                $scope.solicitacoesProd = response.data;
            });
        });
    }
    $scope.reprovarTodosDiretoria = function (solicitacoesProd) {
        $uibModal.open({
            templateUrl: 'Views/modal/produto/loading_massa.html',
            controller: 'solListaProdModalLoadingCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                solicitacoesProdSelected: function () {
                    return solicitacoesProd;
                },
                tipo: function () {
                    return "reprovacaoDiretoria"
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
                $scope.solicitacoesProd = response.data;
            });
        });
    }


    $scope.visualizar = function (solicitacaoProd) {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/produto/vis_editar_produto.html',
            controller: 'solListaProdModalInstanceCtrl',

            windowClass: "animated fadeIn app-modal-window",
            resolve: {
                solicitacaoProdSelected: function () {
                    return solicitacaoProd;
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
                $scope.solicitacoesProd = response.data;
            });
        });
    }

    $scope.excluir = function (solicitacaoProd) {
        SweetAlert.swal({
            title: "Deseja excluir?",
            text: "Não será possivel mudar depois de confimardo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Excluido!", "Exclusão feita com sucesso!", "success");
                    $http.post("http://localhost:50837/api/CadSolProd/Excluir", solicitacaoProd).then(function (response) {
                        $http.get("http://localhost:50837/api/CadSolProdGrade/GetGetByIdProdutoExcluir?IdCadSolProd=" + solicitacaoProd.IdCadSolProd).then(function (response) {
                            $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
                                $scope.solicitacoesProd = response.data;
                            });
                        })
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });
                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão!", "error");
                }
            });

    };

    $scope.historico = function (solicitacaoProd) {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/produto/historico.html',
            controller: 'solProdHistoricoModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaoProdSelected: function () {
                    return solicitacaoProd;
                }
            }
        });
    }

    $scope.lock = function (solicitacaoProd) {

        $http.get("http://localhost:50837/api/CadSolProd/GetByID?ID=" + solicitacaoProd.Id).then(function (response) {
            if (response.data.IdUserLock != null) {
                SweetAlert.swal({
                    title: "Bloqueado",
                    text: "O cadastro esta com " + response.data.UsuarioLock.Nome
                });
            }

            else {

                SweetAlert.swal({
                    title: "Deseja bloquear?",
                    text: "Você esta prestes a bloquear a solicitação!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Sim, confirmar!",
                    cancelButtonText: "Não, cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    timer: 5000
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            solicitacaoProd.IdUserLock = $localStorage.user.Id;
                            SweetAlert.swal("Confirmado!", "Bloqueado com sucesso!", "success");
                            $http.post("http://localhost:50837/api/CadSolProd/Lock", solicitacaoProd).then(function (response) {
                                $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
                                    $scope.solicitacoesProd = response.data;
                                }), function (response) {
                                    return alert("Erro: " + response.status);
                                }
                            }), function (response) {
                                return alert("Erro: " + response.status);
                            }
                        } else {
                            SweetAlert.swal("Cancelado", "Você cancelou a conclusão!", "error");
                        }
                    });
            }
        });
    }

    $scope.unlock = function (solicitacaoProd) {
        SweetAlert.swal({
            title: "Deseja desbloquear?",
            text: "Você esta prestes a desbloquear a solicitação!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, confirmar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Confirmado!", "Desbloqueado com sucesso!", "success");
                    $http.post("http://localhost:50837/api/CadSolProd/Unlock", solicitacaoProd).then(function (response) {
                        $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
                            $scope.solicitacoesProd = response.data;
                        }), function (response) {
                            return alert("Erro: " + response.status);
                        }
                    }), function (response) {
                        return alert("Erro: " + response.status);
                    }
                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a conclusão!", "error");
                }
            });
    }

    $scope.incluirEan = function (IdCadSolProd) {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/produto/incluir_editar_EAN.html',
            controller: 'incluiEANModalCtrl',
            windowClass: "animated fadeIn app-modal-window",
            resolve: {
                IdCadSolProdSelected: function () {
                    return IdCadSolProd;
                }
            }
        });
    }

    var getAllSelected = function () {
        var selectedItems = $scope.solicitacoesProd.filter(function (item) {
            return $scope.selected;
        });

        return selectedItems.length === $scope.solicitacoesProd.length;
    }

    var setAllSelected = function (value) {
        angular.forEach($scope.solicitacoesProd, function (item) {
            $scope.selected = value;
        });
    }

    $scope.allSelected = function (value) {
        if (value !== undefined) {
            return setAllSelected(value);
        } else {
            return getAllSelected();
        }
    }

    $scope.today = function () {
        $scope.date = new Date();
    };

    $scope.clear = function () {
        $scope.date = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(),
        minDate: new Date(),
        startingDay: 1
    };

    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.date = new Date(year, month, day);
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
};

function solListaProdModalLoadingCtrl($scope, $http, $uibModalInstance, solicitacoesProdSelected, $localStorage, tipo, SweetAlert) {
    $scope.solicitacoesProdArray = [];
    angular.forEach(solicitacoesProdSelected, function (solicitacoesProd) {
        if (solicitacoesProd.selected) {
            solicitacoesProd.IdUsuario = $localStorage.user.Id;
            $scope.solicitacoesProdArray.push(solicitacoesProd);
        }
    });

    if (tipo == "aprovacaoComercial") {
        $http.post("http://localhost:50837/api/CadSolProd/AprovarTodosComercial", $scope.solicitacoesProdArray).then(function (response) {
            SweetAlert.swal({
                title: "Registros alterados com sucesso!",
                type: "success",
                timer: 5000
            });
            $uibModalInstance.close();

        });
    }
    else if (tipo == "aprovacaoComercialDiretoria") {
        console.log($scope.solicitacoesProdArray);
        $http.post("http://localhost:50837/api/CadSolProd/AprovarTodosComercialDiretoria", $scope.solicitacoesProdArray).then(function (response) {
            SweetAlert.swal({
                title: "Registros alterados com sucesso!",
                type: "success",
                timer: 5000
            });
            $uibModalInstance.close();

        });
    }
    else if (tipo == "reprovacaoComercial") {
        $http.post("http://localhost:50837/api/CadSolProd/ReprovarTodosComercial", $scope.solicitacoesProdArray).then(function (response) {
            SweetAlert.swal({
                title: "Registros alterados com sucesso!",
                type: "success",
                timer: 5000
            });
            $uibModalInstance.close();

        });
    }
    else if (tipo == "aprovacaoDiretoria") {
        $http.post("http://localhost:50837/api/CadSolProd/AprovarTodosDiretoria", $scope.solicitacoesProdArray).then(function (response) {
            SweetAlert.swal({
                title: "Registros alterados com sucesso!",
                type: "success",
                timer: 5000
            });
            $uibModalInstance.close();

        });
    }
    else if (tipo == "reprovacaoDiretoria") {
        $http.post("http://localhost:50837/api/CadSolProd/ReprovarTodosDiretoria", $scope.solicitacoesProdArray).then(function (response) {
            SweetAlert.swal({
                title: "Registros alterados com sucesso!",
                type: "success",
                timer: 5000
            });
            $uibModalInstance.close();

        });
    }
}

function solListaProdMobileCtrl($scope, $http, $localStorage, $uibModal, SweetAlert) {
    $scope.solicitacoesProd;
    $scope.grupo = $localStorage.user.Grupo[0].Id;

    $http.get("http://localhost:50837/api/CadSolProd/GetAll").then(function (response) {
        $scope.solicitacoesProd = response.data;
    });

    $scope.aprovarDiretoria = function (solicitacaoProd) {
        $scope.objLog = { IdCadSolProd: solicitacaoProd.IdCadSolProd, IdUsuario: $localStorage.user.Id, IdStatus: 4 };
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
                    SweetAlert.swal("Confirmado!", "Aprovação feita com sucesso!", "success");
                    $http.post("http://localhost:50837/api/CadSolProd/AprovarDiretoria", solicitacaoProd).then(function (response) {
                        $http.post("http://localhost:50837/api/CadSolProdLog/Incluir", $scope.objLog).then(function (response) {
                            $http.get("http://localhost:50837/api/CadSolProd/GetAllAproveByComercial").then(function (response) {
                                $scope.solicitacoesProd = response.data;
                            });
                        })
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });
                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a aprovação status!", "error");
                }
            });

    };
    $scope.reprovarDiretoria = function (solicitacaoProd) {
        $scope.objLog = { IdCadSolProd: solicitacaoProd.IdCadSolProd, IdUsuario: $localStorage.user.Id, IdStatus: 5 };
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
                    SweetAlert.swal("Confirmado!", "Reprovado com sucesso!", "success");
                    $http.post("http://localhost:50837/api/CadSolProd/ReprovarDiretoria", solicitacaoProd).then(function (response) {
                        $http.post("http://localhost:50837/api/CadSolProdLog/Incluir", $scope.objLog).then(function (response) {
                            $http.get("http://localhost:50837/api/CadSolProd/GetAllAproveByComercial").then(function (response) {
                                $scope.solicitacoesProd = response.data;
                            });
                        })
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a alteração!", "error");
                }
            });

    };

    $scope.visualizar = function (solicitacaoProd) {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/produto/vis_editar_produto.html',
            controller: 'solListaProdModalInstanceCtrl',
            size: "lg",
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaoProdSelected: function () {
                    return solicitacaoProd;
                }
            }
        });
    }
}

function validadeModalInstanceCtrl($scope, $uibModalInstance, $http, errors) {

    $scope.listaDeErros = errors;

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

};

function solListaProdModalInstanceCtrl($scope, $uibModalInstance, $http, solicitacaoProdSelected, $localStorage, SweetAlert) {
    $scope.grades;

    $http.get("http://localhost:50837/api/CadSolProdGrade/GetByIdProduto?idCadProduto=" + solicitacaoProdSelected.Id).then(function (response) {
        $scope.grades = response.data;
    });

    $scope.descricao = solicitacaoProdSelected.Descricao;
    $scope.comprador = solicitacaoProdSelected.Comprador;
    $scope.fornecedor = solicitacaoProdSelected.Fornecedor;
    $scope.segmento = solicitacaoProdSelected.Segmento;
    $scope.abastecimento = solicitacaoProdSelected.Abastecimento;
    $scope.concorrencia = solicitacaoProdSelected.ConcSensibilidade;
    $scope.custo = solicitacaoProdSelected.Custo;
    $scope.venda = solicitacaoProdSelected.Venda;
    $scope.embalagem = solicitacaoProdSelected.Embalagem;
    $scope.qtdEmbalagem = solicitacaoProdSelected.QtdEmbalagem;
    $scope.peso = solicitacaoProdSelected.Peso;
    $scope.altura = solicitacaoProdSelected.Altura;
    $scope.largura = solicitacaoProdSelected.Largura;
    $scope.comprimento = solicitacaoProdSelected.Comprimento;
    $scope.lastro = solicitacaoProdSelected.Lastro;
    $scope.camadas = solicitacaoProdSelected.Camadas;
    $scope.caracteristica = solicitacaoProdSelected.Caracteristica;
    $scope.justificativa = solicitacaoProdSelected.JustificativaResumida;
    $scope.tipoCadastro = solicitacaoProdSelected.TipoCadastro;
    $scope.observacao = solicitacaoProdSelected.Observacao;
    $scope.status = solicitacaoProdSelected.IdStatus;
    $scope.lock = solicitacaoProdSelected.IdUserLock;
    $scope.idUser = $localStorage.user.Id;
    $scope.grupo = $localStorage.user.Grupo[0].Nome;

    $scope.editar = function () {
        $scope.obj = {
            Id: solicitacaoProdSelected.Id, IdCadSolProd: solicitacaoProdSelected.IdCadSolProd, Descricao: $scope.descricao,
            Comprador: $scope.comprador, Fornecedor: $scope.fornecedor, Abastecimento: $scope.abastecimento, ConcSensibilidade: $scope.concorrencia,
            Custo: $scope.custo, Venda: $scope.venda, Embalagem: $scope.embalagem, QtdEmbalagem: $scope.qtdEmbalagem,
            Peso: $scope.peso, Altura: $scope.altura, Largura: $scope.largura, Comprimento: $scope.comprimento, Lastro: $scope.lastro,
            Camadas: $scope.camadas, Caracteristica: $scope.caracteristica,
            JustificativaResumida: $scope.justificativa, Observacao: $scope.observacao, idStatus: solicitacaoProdSelected.IdStatus,
            IdUsuario: solicitacaoProdSelected.IdUsuario, DataCriacao: solicitacaoProdSelected.DataCriacao, Segmento: $scope.segmento,
            TipoCadastro: $scope.tipoCadastro, IdUserLocksolicitacaoProdSelected: solicitacaoProdSelected.IdUserLocksolicitacaoProdSelected
        };


        $http.post("http://localhost:50837/api/CadSolProd/Editar", $scope.obj).then(function (response) {
            $uibModalInstance.dismiss();
        }, function (response) {
            return alert("Erro: " + response.status);
        })

    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }

    $scope.concluir = function () {

        solicitacaoProdSelected.IdUsuario = $localStorage.user.Id;

        $http.post("http://localhost:50837/api/CadSolProd/Concluir", solicitacaoProdSelected).then(function (response) {

        }, function (response) {
            return alert("Erro: " + response.status);
        });
        SweetAlert.swal({
            title: "A solicitação foi concluida com sucesso!",
            type: "success",
            timer: 5000
        });
        $uibModalInstance.close();
    };

    $scope.aprovarComercial = function () {
        solicitacaoProdSelected.IdUsuario = $localStorage.user.Id;
        SweetAlert.swal({
            title: "Deseja confimar?",
            text: "Não será possivel mudar depois de confimardo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, confirmar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "A solicitação foi aprovada com sucesso!",
                        type: "success",
                        timer: 5000
                    });
                    $uibModalInstance.close();
                    $http.post("http://localhost:50837/api/CadSolProd/AprovarComercial", solicitacaoProdSelected).then(function (response) {

                    }, function (response) {
                        return alert("Erro: " + response.status);
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });
                }
                else {
                    SweetAlert.swal({
                        title: "A solicitação foi cancelada com sucesso!",
                        type: "error",
                        timer: 5000
                    });
                    $uibModalInstance.close();
                }
            });
    }

    $scope.reprovarComercial = function () {
        solicitacaoProdSelected.IdUsuario = $localStorage.user.Id;
        SweetAlert.swal({
            title: "Deseja confimar?",
            text: "Não será possivel mudar depois de confimardo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, confirmar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "A solicitação foi reprovada com sucesso!",
                        type: "success",
                        timer: 5000
                    });
                    $http.post("http://localhost:50837/api/CadSolProd/ReprovarComercial", solicitacaoProdSelected).then(function (response) {
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });
                    $uibModalInstance.close();
                }
                else {
                    SweetAlert.swal({
                        title: "A solicitação foi cancelada com sucesso!",
                        type: "error",
                        timer: 5000
                    });
                    $uibModalInstance.close();
                }
            });
    };

    $scope.aprovarComercialDiretoria = function () {
        solicitacaoProdSelected.IdUsuario = $localStorage.user.Id;
        SweetAlert.swal({
            title: "Deseja confimar?",
            text: "Não será possivel mudar depois de confimardo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, confirmar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "A solicitação foi aprovada com sucesso!",
                        type: "success",
                        timer: 5000
                    });
                    $uibModalInstance.close();
                    $http.post("http://localhost:50837/api/CadSolProd/AprovarComercialDiretoria", solicitacaoProdSelected).then(function (response) {

                    }, function (response) {
                        return alert("Erro: " + response.status);
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });
                }
                else {
                    SweetAlert.swal({
                        title: "A solicitação foi cancelada com sucesso!",
                        type: "error",
                        timer: 5000
                    });
                    $uibModalInstance.close();
                }
            });
    }

    $scope.aprovarDiretoria = function () {
        solicitacaoProdSelected.IdUsuario = $localStorage.user.Id;
        SweetAlert.swal({
            title: "Deseja confimar?",
            text: "Não será possivel mudar depois de confimardo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, confirmar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "A solicitação foi aprovada com sucesso!",
                        type: "success",
                        timer: 5000
                    });
                    $uibModalInstance.close();
                    $http.post("http://localhost:50837/api/CadSolProd/AprovarDiretoria", solicitacaoProdSelected).then(function (response) {

                    }, function (response) {
                        return alert("Erro: " + response.status);
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });
                }
                else {
                    SweetAlert.swal({
                        title: "A solicitação foi cancelada com sucesso!",
                        type: "error",
                        timer: 5000
                    });
                    $uibModalInstance.close();
                }
            });
    }

    $scope.reprovarDiretoria = function () {
        solicitacaoProdSelected.IdUsuario = $localStorage.user.Id;
        SweetAlert.swal({
            title: "Deseja confimar?",
            text: "Não será possivel mudar depois de confimardo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, confirmar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "A solicitação foi reprovada com sucesso!",
                        type: "success",
                        timer: 5000
                    });
                    $http.post("http://localhost:50837/api/CadSolProd/ReprovarDiretoria", solicitacaoProdSelected).then(function (response) {
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });
                    $uibModalInstance.close();
                }
                else {
                    SweetAlert.swal({
                        title: "A solicitação foi cancelada com sucesso!",
                        type: "error",
                        timer: 5000
                    });
                    $uibModalInstance.close();
                }
            });
    };

    $scope.excluirGrade = function (grade) {
        $http.post("http://localhost:50837/api/CadSolProdGrade/Excluir", grade).then(function () {
            SweetAlert.swal({
                title: "Exclusão feita com sucesso!",
                type: "success",
                timer: 5000
            });
            $http.get("http://localhost:50837/api/CadSolProdGrade/GetByIdProduto?idCadProduto=" + solicitacaoProdSelected.Id).then(function (response) {
                $scope.grades = response.data;
            });
        })
    }

    $scope.alterarGrade = function (grade) {
        $http.post("http://localhost:50837/api/CadSolProdGrade/Alterar", grade).then(function () {
            SweetAlert.swal({
                title: "Alteração feita com sucesso!",
                type: "success",
                timer: 5000
            });
            $http.get("http://localhost:50837/api/CadSolProdGrade/GetByIdProduto?idCadProduto=" + solicitacaoProdSelected.Id).then(function (response) {
                $scope.grades = response.data;
            });
        })
    }
}

function solProdHistoricoModalCtrl($scope, $uibModalInstance, solicitacaoProdSelected, $http, $localStorage) {
    $scope.historicos;

    $http.get("http://localhost:50837/api/CadSolProdLog/GetAllByCadProd?IdCadSolProd=" + solicitacaoProdSelected.Id).then(function (response) {
        $scope.historicos = response.data;
        console.log($scope.historicos)
    });
}

function incluiEANModalCtrl($scope, $uibModalInstance, $http, IdCadSolProdSelected, SweetAlert) {
    $scope.grades = [{}];

    $scope.addNew = function (grade) {
        $scope.grades.push({});
    };

    $scope.remove = function (grade) {
        if ($scope.grades.length > 1) {
            $scope.grades.pop({});
        }
    };

    $scope.lojasPequenas = function (grade) {
        grade.MGE = true;
        grade.TNG = true;
        grade.AGM = true;
        grade.NCE = true;
        grade.JDE = true;
        grade.pequenas = true;
    }

    $scope.lojasMedias = function (grade) {
        grade.ITA = true;
        grade.ITA2 = true;
        grade.RBO2 = true;
        grade.ASN = true;
        grade.JDC = true;
        grade.RDO = true;
        grade.TND = true;
        grade.BCX = true;
        grade.medias = true;
    }

    $scope.lojasPremium = function (grade) {
        grade.RBO = true;
        grade.INO = true;
        grade.MRC = true;
        grade.ARM = true;
        grade.ARM2 = true;
        grade.CBF = true;
        grade.MCE = true;
        grade.SPD = true;
        grade.premium = true;
    }

    $scope.lojasGrandes = function (grade) {
        grade.MGE2 = true;
        grade.INO = true;
        grade.ARM = true;
        grade.ARM2 = true;
        grade.MCE = true;
        grade.grandes = true;

    }

    $scope.todas = function (grade) {
        grade.ITA = true;
        grade.ITA2 = true;
        grade.MGE = true;
        grade.MGE2 = true;
        grade.RBO = true;
        grade.RBO2 = true;
        grade.TNG = true;
        grade.ASN = true;
        grade.AGM = true;
        grade.INO = true;
        grade.JDC = true;
        grade.MRC = true;
        grade.NCE = true;
        grade.RDO = true;
        grade.TND = true;
        grade.ARM = true;
        grade.BCX = true;
        grade.CBF = true;
        grade.JDE = true;
        grade.MCE = true;
        grade.SPD = true;
        grade.ARM2 = true;
        grade.pequenas = true;
        grade.medias = true;
        grade.premium = true;
        grade.grandes = true;

    }

    $scope.cdItaborai = function (grade) {
        grade.CDI = true;
    }

    $scope.cdManilha = function (grade) {
        grade.CDM = true;
    }

    $scope.limpar = function (grade) {
        grade.ITA = false;
        grade.ITA2 = false;
        grade.MGE = false;
        grade.MGE2 = false;
        grade.RBO = false;
        grade.RBO2 = false;
        grade.TNG = false;
        grade.ASN = false;
        grade.AGM = false;
        grade.INO = false;
        grade.JDC = false;
        grade.MRC = false;
        grade.NCE = false;
        grade.RDO = false;
        grade.TND = false;
        grade.ARM = false;
        grade.BCX = false;
        grade.CBF = false;
        grade.JDE = false;
        grade.MCE = false;
        grade.SPD = false;
        grade.ARM2 = false;
        grade.pequenas = false;
        grade.medias = false;
        grade.premium = false;
        grade.grandes = false;

    }

    $scope.incluir = function () {
        if ($scope.EANForm.$valid) {
            for (var i = 0; i < $scope.grades.length; i++) {
                $scope.objgrade = {
                    IdCadSolProd: IdCadSolProdSelected,
                    CodFornecedor: $scope.grades[i].codfornecedor,
                    DescricaoSabor: $scope.grades[i].descricaosabor,
                    EAN: $scope.grades[i].EAN,
                    DUN: $scope.grades[i].DUN,
                    ProdutoInativado: $scope.grades[i].produto,
                    NCM: $scope.grades[i].ncm,
                    ITA: $scope.grades[i].ITA,
                    ITA2: $scope.grades[i].ITA2,
                    MGE: $scope.grades[i].MGE,
                    MGE2: $scope.grades[i].MGE2,
                    RBO: $scope.grades[i].RBO,
                    RBO2: $scope.grades[i].RBO2,
                    TNG: $scope.grades[i].TNG,
                    ASN: $scope.grades[i].ASN,
                    AGM: $scope.grades[i].AGM,
                    INO: $scope.grades[i].INO,
                    JDC: $scope.grades[i].JDC,
                    MRC: $scope.grades[i].MRC,
                    NCE: $scope.grades[i].NCE,
                    RDO: $scope.grades[i].RDO,
                    TND: $scope.grades[i].TND,
                    ARM: $scope.grades[i].ARM,
                    BCX: $scope.grades[i].BCX,
                    CBF: $scope.grades[i].CBF,
                    JDE: $scope.grades[i].JDE,
                    MCE: $scope.grades[i].MCE,
                    SPD: $scope.grades[i].SPD,
                    CDI: $scope.grades[i].CDI,
                    CDM: $scope.grades[i].CDM,
                    pequenas: $scope.grades[i].pequenas,
                    medias: $scope.grades[i].medias,
                    premium: $scope.grades[i].premium,
                    grandes: $scope.grades[i].grandes
                }

                //console.log($scope.objgrade);

                $http.post("http://localhost:50837/api/CadSolProdGrade/Incluir", $scope.objgrade).then(function (response) {
                    SweetAlert.swal({
                        title: "Inclusão feita com sucesso!",
                        type: "success",
                        timer: 5000
                    });
                }, function (response) {
                    return alert("Erro: " + response.status);
                })
            }

            $uibModalInstance.close();
        } else {
            $scope.EANForm.submitted = true;
        }
    }
}

function altProd($scope, $http, SweetAlert, $localStorage, $state) {

    $scope.produto;
    $scope.embalagens;

    $scope.Buscar = function () {
        $http.get("http://localhost:50837/api/ViewProduto/GetByCdProduto?IdProduto=" + $scope.Ean).then(function (response) {
            $scope.produto = response.data;
            $scope.descricaoantes = response.data.Produto
            $scope.abastecimentoantes = response.data.NmCompraTipo
        })

        $http.get("http://localhost:50837/api/ViewProduto/GetEmbalagensByCdProduto?IdProduto=" + $scope.Ean).then(function (response) {
            $scope.embalagens = response.data;
            console.log($scope.embalagens);
        })
    }

    $scope.solicitar = function () {
        SweetAlert.swal({
            title: "Deseja confimar?",
            text: "Não será possivel mudar depois de confimardo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, confirmar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000
        },
            function (isConfirm) {
                if (isConfirm) {
                    $scope.obj = { Ean: $scope.Ean, Campo: $scope.campo, Detalhe: $scope.detalhe, Observacao: $scope.observacao, IdUsuario: $localStorage.user.Id }
                    $http.post("http://localhost:50837/api/CadSolAlterProd/Incluir", $scope.obj).then(function (response) {
                        $state.go('produto.altlistaprodutos')
                    });
                    SweetAlert.swal({
                        title: "Inclusão feita com sucesso!",
                        type: "success",
                        timer: 5000
                    });
                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a solicitacao!", "error");
                }
            });
    }
}

function listaAltProd($scope, $uibModal, $http, SweetAlert, $localStorage, DTOptionsBuilder) {
    $scope.grupo = $localStorage.user.Grupo[0].Id;

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'desc'])
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

    $scope.solicitacoes;
    $scope.grupo = $localStorage.user.Grupo[0].Nome;
    $scope.usuarioLogado = $localStorage.user.Id

    if ($scope.grupo != "Indicadores" || $scope.grupo != "Coordenador Indicadores" || $scope.grupo != "Admin") {
        $http.get("http://localhost:50837/api/CadSolAlterProd/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
            $scope.solicitacoes = response.data;
        });
    }
    else {
        $http.get("http://localhost:50837/api/CadSolAlterProd/GetAll").then(function (response) {
            $scope.solicitacoes = response.data;
        });
    }


    $scope.concluir = function (solicitacao) {
        //$scope.objLog = { IdSolAlterProd: solicitacao.Id, IdUsuario: $localStorage.user.Id, IdStatus: 6 };
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
                    SweetAlert.swal("Confirmado!", "Conclusão feita com sucesso!", "success");
                    $http.post("http://localhost:50837/api/CadSolAlterProd/Concluir", solicitacao).then(function (response) {
                        $http.get("http://localhost:50837/api/CadSolAlterProd/GetAll").then(function (response) {
                            $scope.solicitacoes = response.data;
                        });
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });
                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a conclusão!", "error");
                }
            });
    }

    $scope.excluir = function (solicitacao) {

    }

    $scope.historico = function (solicitacao) {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/produto/historicoAlteracao.html',
            controller: 'solAltProdHistoricoModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                solicitacaoSelected: function () {
                    return solicitacao;
                }
            }
        });
    }
}

function solAltProdHistoricoModalCtrl($scope, $uibModalInstance, solicitacaoSelected, $http, $localStorage) {
    $scope.historicos;

    console.log(solicitacaoSelected);

    $http.get("http://localhost:50837/api/CadSolAlterProdLog/GetById?id=" + solicitacaoSelected.Id).then(function (response) {
        $scope.historicos = response.data;
    });
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
        }).result.then(function () {
            $http.get("http://localhost:50837/api/Grupo/GetAll").then(function (response) {
                $scope.grupos = response.data;
            });
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
        }).result.then(function () {
            $http.get("http://localhost:50837/api/Grupo/GetAll").then(function (response) {
                $scope.grupos = response.data;
            });
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
                        SweetAlert.swal({
                            title: "Exclusao!",
                            text: "Exclusao feita com sucesso!",
                            type: "success",
                            timer: 5000
                        });
                        $http.get("http://localhost:50837/api/Grupo/GetAll").then(function (response) {
                            $scope.grupos = response.data;
                        });
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão do grupo", "error");
                }
            });
    }

}

function rolesUserModalInstanceCtrl($scope, $uibModalInstance, $http, grupoSelected, SweetAlert) {

    $scope.grupo = grupoSelected.Nome;

    $scope.editar = function () {

        $scope.obj = { Id: grupoSelected.Id, Nome: $scope.grupo }

        if ($scope.signup_form.$valid) {
            $http.post("http://localhost:50837/api/Grupo/Alterar", $scope.obj).then(function (response) {
                SweetAlert.swal({
                    title: "Alteracao!",
                    text: "Alteracao feita com sucesso!",
                    type: "success",
                    timer: 5000
                });
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
                SweetAlert.swal({
                    title: "Inclusão",
                    text: "Inclusão feita com sucesso!",
                    type: "success",
                    timer: 5000
                });
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
                SweetAlert.swal({
                    title: "Alteracao!",
                    text: "Alteracao feita com sucesso!",
                    type: "success",
                    timer: 5000
                });
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
        .withOption('order', [0, 'desc'])
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
                    $http.post("http://localhost:50837/api/AlertaBalanco/Aprovar", balanco).then(function (response) {
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
        $scope.obj = {
            CdAlertaBalanco: balancoSelected.CdAlertaBalanco, CdProduto: balancoSelected.CdProduto,
            CdPessoaFilial: balancoSelected.CdPessoaFilial, NomeProduto: balancoSelected.NomeProduto,
            Estoque: balancoSelected.Estoque, Motivo: $scope.motivo, DtInclusao: balancoSelected.DtInclusao
        };

        $http.post("http://localhost:50837/api/AlertaBalanco/Reprovar", $scope.obj).then(function (response) {
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
    $scope.produtosInversao;

    $http.get("http://localhost:50837/api/AlertaInversao/GetAllAnalitico").then(function (response) {
        $scope.inversoes = response.data;
    });

    $scope.visualizar = function (produto) {
        $http.get("http://localhost:50837/api/AlertaInversao/GetInvertidosPorProduto?cdProduto=" + produto.cdProduto).then(function (response) {
            $scope.produtosInversao = response.data;

        });
    }

    $scope.cadastrarObs = function (produtoAlerta) {
        $uibModal.open({
            templateUrl: 'Views/modal/alertas/inversao/inversao_modal.html',
            controller: 'observacaoModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                produtoAlertaSelected: function () {
                    return produtoAlerta;
                }
            }
        });
    }

    $scope.quarentena = function (produtoAlerta) {
        $uibModal.open({
            templateUrl: 'Views/modal/alertas/quarentena.html',
            controller: 'quarentenaModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                produtoAlertaSelected: function () {
                    return produtoAlerta;
                }
            }
        });
    }

    $scope.historico = function (produtoAlerta) {
        $uibModal.open({
            templateUrl: 'Views/modal/alertas/historico.html',
            controller: 'historicoModalCtrl',
            windowClass: "animated fadeIn",
            size: 'lg',
            resolve: {
                produtoAlertaSelected: function () {
                    return produtoAlerta;
                }
            }
        });
    }

    $scope.cadastrarObsTodos = function (produtoAlerta) {
        $uibModal.open({
            templateUrl: 'Views/modal/alertas/inversao/inversao_modal.html',
            controller: 'observacaoTodosModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                produtoAlertaSelected: function () {
                    return produtoAlerta;
                }
            }
        });
    }

    $scope.quarentenaTodos = function (produtoAlerta) {
        $uibModal.open({
            templateUrl: 'Views/modal/alertas/quarentena.html',
            controller: 'quarentenaTodosModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                produtoAlertaSelected: function () {
                    return produtoAlerta;
                }
            }
        });
    }
}

function ultimocustoCtrl($scope, DTOptionsBuilder, $http, $uibModal) {
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

    $scope.ultimoscusto;
    $scope.produtosUltimoCusto

    $http.get("http://localhost:50837/api/AlertaUltimoCusto/GetAllAnalitico").then(function (response) {
        $scope.ultimoscusto = response.data;
    });

    $scope.visualizar = function (produto) {
        $http.get("http://localhost:50837/api/AlertaUltimoCusto/GetUltimoCustoPorProduto?cdProduto=" + produto.cdProduto).then(function (response) {
            $scope.produtosUltimoCusto = response.data;

        });
    }

    $scope.cadastrarObs = function (produtoAlerta) {
        $uibModal.open({
            templateUrl: 'Views/modal/alertas/inversao/inversao_modal.html',
            controller: 'observacaoModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                produtoAlertaSelected: function () {
                    return produtoAlerta;
                }
            }
        });
    }

    $scope.quarentena = function (produtoAlerta) {
        $uibModal.open({
            templateUrl: 'Views/modal/alertas/quarentena.html',
            controller: 'quarentenaModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                produtoAlertaSelected: function () {
                    return produtoAlerta;
                }
            }
        });
    }

    $scope.historico = function (produtoAlerta) {
        $uibModal.open({
            templateUrl: 'Views/modal/alertas/historico.html',
            controller: 'historicoModalCtrl',
            windowClass: "animated fadeIn",
            size: 'lg',
            resolve: {
                produtoAlertaSelected: function () {
                    return produtoAlerta;
                }
            }
        });
    }

    $scope.cadastrarObsTodos = function (produtoAlerta) {
        $uibModal.open({
            templateUrl: 'Views/modal/alertas/inversao/inversao_modal.html',
            controller: 'observacaoTodosModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                produtoAlertaSelected: function () {
                    return produtoAlerta;
                }
            }
        });
    }

    $scope.quarentenaTodos = function (produtoAlerta) {
        $uibModal.open({
            templateUrl: 'Views/modal/alertas/quarentena.html',
            controller: 'quarentenaTodosModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                produtoAlertaSelected: function () {
                    return produtoAlerta;
                }
            }
        });
    }
}

function geralCtrl($scope, DTOptionsBuilder, $http, $uibModal) {
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

    $scope.gerais;
    $scope.produtosUltimoCusto;
    $scope.produtosInversao;

    $http.get("http://localhost:50837/api/AlertaGeral/GetAllAnalitico").then(function (response) {
        $scope.gerais = response.data;
    });

    $scope.visualizar = function (produto) {
        $http.get("http://localhost:50837/api/AlertaUltimoCusto/GetUltimoCustoPorProduto?cdProduto=" + produto.cdProduto).then(function (response) {
            $scope.produtosUltimoCusto = response.data;
        });
        $http.get("http://localhost:50837/api/AlertaInversao/GetInvertidosPorProduto?cdProduto=" + produto.cdProduto).then(function (response) {
            $scope.produtosInversao = response.data;
        });
    }

    $scope.cadastrarObs = function (produtoAlerta) {
        $uibModal.open({
            templateUrl: 'Views/modal/alertas/inversao/inversao_modal.html',
            controller: 'observacaoModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                produtoAlertaSelected: function () {
                    return produtoAlerta;
                }
            }
        });
    }

    $scope.quarentena = function (produtoAlerta) {
        $uibModal.open({
            templateUrl: 'Views/modal/alertas/quarentena.html',
            controller: 'quarentenaModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                produtoAlertaSelected: function () {
                    return produtoAlerta;
                }

            }
        });
    }

    $scope.historico = function (produtoAlerta) {
        $uibModal.open({
            templateUrl: 'Views/modal/alertas/historico.html',
            controller: 'historicoModalCtrl',
            windowClass: "animated fadeIn",
            size: 'lg',
            resolve: {
                produtoAlertaSelected: function () {
                    return produtoAlerta;
                }
            }
        });
    }

    $scope.cadastrarObsTodos = function (produtoAlerta) {
        $uibModal.open({
            templateUrl: 'Views/modal/alertas/inversao/inversao_modal.html',
            controller: 'observacaoTodosModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                produtoAlertaSelected: function () {
                    return produtoAlerta;
                }
            }
        });
    }

    $scope.quarentenaTodos = function (produtoAlerta) {
        $uibModal.open({
            templateUrl: 'Views/modal/alertas/quarentena.html',
            controller: 'quarentenaTodosModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                produtoAlertaSelected: function () {
                    return produtoAlerta;
                }
            }
        });
    }
}

function historicoModalCtrl($scope, $uibModalInstance, produtoAlertaSelected, $http, $localStorage) {
    $scope.historicos;

    $http.get("http://localhost:50837/api/AlertaHistorico/GetHistoricoByProdutoFilialTipoAlerta?cdProduto=" + produtoAlertaSelected.CdProduto + "&cdPessoaFilial=" + produtoAlertaSelected.CdPessoaFilial + "&cdTipoAlerta=" + produtoAlertaSelected.CdTipoAlerta).then(function (response) {
        $scope.historicos = response.data;
    });
}

function quarentenaModalCtrl($scope, $uibModalInstance, produtoAlertaSelected, $http, $localStorage) {

    $scope.incluir = function () {

        $scope.obj = {
            CdPessoaFilial: produtoAlertaSelected.CdPessoaFilial,
            CdProduto: produtoAlertaSelected.CdProduto,
            CdTipoAlerta: produtoAlertaSelected.CdTipoAlerta,
            Motivo: $scope.motivo,
            IdUsuario: $localStorage.user.Id
        };

        $http.post("http://localhost:50837/api/AlertaQuarentena/Incluir", $scope.obj).then(function (response) {
            $uibModalInstance.close();
        }, function (response) {
            return alert("Erro: " + response.status);
        });

        $scope.objHistorico = {
            CdProduto: produtoAlertaSelected.CdProduto,
            StatusAlertaAtual: "Quarentena",
            StatusAlertaAnterior: produtoAlertaSelected.AlertaStatus.nomeStatus,
            CdTipoAlerta: produtoAlertaSelected.CdTipoAlerta,
            CdPessoaFilial: produtoAlertaSelected.CdPessoaFilial,
            DescricaoHistorico: $scope.motivo,
            IdUsuario: $localStorage.user.Id
        }

        $http.post("http://localhost:50837/api/AlertaHistorico/Incluir", $scope.objHistorico).then(function (response) {
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
}

function observacaoModalCtrl($scope, $uibModalInstance, produtoAlertaSelected, $http, $localStorage) {

    $scope.statusAll;

    $scope.tipo = produtoAlertaSelected.CdTipoAlerta

    $http.get("http://localhost:50837/api/AlertaStatus/GetAllExceptNovo").then(function (response) {
        $scope.statusAll = response.data;
    });

    $scope.alterar = function () {

        if ($scope.tipo == 2) {
            $scope.objInversao = {
                CdAlertaInv: produtoAlertaSelected.CdAlertaInv, CdPessoaFilial: produtoAlertaSelected.CdPessoaFilial,
                CdProduto: produtoAlertaSelected.CdProduto, CdAlertaStatus: $scope.status.cdAlertaStatus,
                NomeProduto: produtoAlertaSelected.NomeProduto, QtdEstoque: produtoAlertaSelected.QtdEstoque,
                UltData: produtoAlertaSelected.UltData, CdTipoAlerta: $scope.tipo
            }

            $http.post("http://localhost:50837/api/AlertaInversao/Alterar", $scope.objInversao).then(function (response) {
                $uibModalInstance.close();
            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }

        else if ($scope.tipo == 3) {
            $scope.objInversao = {
                CdAlertaUltCusto: produtoAlertaSelected.CdAlertaUltCusto, CdPessoaFilial: produtoAlertaSelected.CdPessoaFilial,
                CdProduto: produtoAlertaSelected.CdProduto, CdAlertaStatus: $scope.status.cdAlertaStatus,
                NomeProduto: produtoAlertaSelected.NomeProduto, UltData: produtoAlertaSelected.UltData, CdTipoAlerta: $scope.tipo,
                Nota: produtoAlertaSelected.Nota, UltimoCusto: produtoAlertaSelected.UltimoCusto, PenultimoCusto: produtoAlertaSelected.PenultimoCusto,
                Classificacao: produtoAlertaSelected.Classificacao, Diferenca: produtoAlertaSelected.Diferenca
            }

            $http.post("http://localhost:50837/api/AlertaUltimoCusto/Alterar", $scope.objInversao).then(function (response) {
                $uibModalInstance.close();
            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }

        $scope.objHistorico = {
            CdProduto: produtoAlertaSelected.CdProduto,
            StatusAlertaAtual: $scope.status.nomeStatus,
            StatusAlertaAnterior: produtoAlertaSelected.AlertaStatus.nomeStatus,
            CdTipoAlerta: $scope.tipo,
            CdPessoaFilial: produtoAlertaSelected.CdPessoaFilial,
            DescricaoHistorico: $scope.observacao,
            IdUsuario: $localStorage.user.Id
        }

        $http.post("http://localhost:50837/api/AlertaHistorico/Incluir", $scope.objHistorico).then(function (response) {
        }, function (response) {
            return alert("Erro: " + response.status);
        });

        if ($scope.status.cdAlertaStatus == 4) {
            $scope.objBalanco = {
                CdProduto: produtoAlertaSelected.CdProduto, CdPessoaFilial: produtoAlertaSelected.CdPessoaFilial,
                NomeProduto: produtoAlertaSelected.NomeProduto, Estoque: produtoAlertaSelected.QtdEstoque, CdProdutoInvertido: $scope.invertido
            }

            $http.post("http://localhost:50837/api/AlertaBalanco/Incluir", $scope.objBalanco).then(function (response) {
            }, function (response) {
                return alert("Erro: " + response.status);
            });

            $scope.objQuarentena = {
                CdPessoaFilial: produtoAlertaSelected.CdPessoaFilial,
                CdProduto: produtoAlertaSelected.CdProduto,
                CdTipoAlerta: produtoAlertaSelected.CdTipoAlerta,
                Motivo: $scope.motivo,
                IdUsuario: $localStorage.user.Id
            };

            $http.post("http://localhost:50837/api/AlertaQuarentena/Incluir", $scope.objQuarentena).then(function (response) {
                $uibModalInstance.close();
            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }
    }
}

function observacaoTodosModalCtrl($scope, $uibModalInstance, produtoAlertaSelected, $http, $localStorage) {

    $scope.statusAll;

    console.log(produtoAlertaSelected);

    $scope.tipo = produtoAlertaSelected[0].CdTipoAlerta

    $http.get("http://localhost:50837/api/AlertaStatus/GetAllExceptNovo").then(function (response) {
        $scope.statusAll = response.data;
    });

    $scope.alterar = function () {

        for (var i = 0; i < produtoAlertaSelected.length; i++) {

            if ($scope.tipo == 2) {
                $scope.objInversao = {
                    CdAlertaInv: produtoAlertaSelected[i].CdAlertaInv, CdPessoaFilial: produtoAlertaSelected[i].CdPessoaFilial,
                    CdProduto: produtoAlertaSelected[i].CdProduto, CdAlertaStatus: $scope.status.cdAlertaStatus,
                    NomeProduto: produtoAlertaSelected[i].NomeProduto, QtdEstoque: produtoAlertaSelected[i].QtdEstoque,
                    UltData: produtoAlertaSelected[i].UltData, CdTipoAlerta: $scope.tipo
                }

                $http.post("http://localhost:50837/api/AlertaInversao/Alterar", $scope.objInversao).then(function (response) {
                }, function (response) {
                    return alert("Erro: " + response.status);
                });
            }

            else if ($scope.tipo == 3) {
                $scope.objInversao = {
                    CdAlertaUltCusto: produtoAlertaSelected[i].CdAlertaUltCusto, CdPessoaFilial: produtoAlertaSelected[i].CdPessoaFilial,
                    CdProduto: produtoAlertaSelected[i].CdProduto, CdAlertaStatus: $scope.status.cdAlertaStatus,
                    NomeProduto: produtoAlertaSelected[i].NomeProduto, UltData: produtoAlertaSelected[i].UltData, CdTipoAlerta: $scope.tipo,
                    Nota: produtoAlertaSelected[i].Nota, UltimoCusto: produtoAlertaSelected[i].UltimoCusto, PenultimoCusto: produtoAlertaSelected[i].PenultimoCusto,
                    Classificacao: produtoAlertaSelected[i].Classificacao, Diferenca: produtoAlertaSelected[i].Diferenca
                }

                $http.post("http://localhost:50837/api/AlertaUltimoCusto/Alterar", $scope.objInversao).then(function (response) {
                    $uibModalInstance.close();
                }, function (response) {
                    return alert("Erro: " + response.status);
                });
            }

            $scope.objHistorico = {
                CdProduto: produtoAlertaSelected[i].CdProduto,
                StatusAlertaAtual: $scope.status.nomeStatus,
                StatusAlertaAnterior: produtoAlertaSelected[i].AlertaStatus.nomeStatus,
                CdTipoAlerta: $scope.tipo,
                CdPessoaFilial: produtoAlertaSelected[i].CdPessoaFilial,
                DescricaoHistorico: $scope.observacao,
                IdUsuario: $localStorage.user.Id
            }

            $http.post("http://localhost:50837/api/AlertaHistorico/Incluir", $scope.objHistorico).then(function (response) {
            }, function (response) {
                return alert("Erro: " + response.status);
            });

            if ($scope.status.cdAlertaStatus == 4) {
                $scope.objBalanco = {
                    CdProduto: produtoAlertaSelected[i].CdProduto, CdPessoaFilial: produtoAlertaSelected[i].CdPessoaFilial,
                    NomeProduto: produtoAlertaSelected[i].NomeProduto, Estoque: produtoAlertaSelected[i].QtdEstoque, CdProdutoInvertido: $scope.invertido
                }

                $http.post("http://localhost:50837/api/AlertaBalanco/Incluir", $scope.objBalanco).then(function (response) {
                }, function (response) {
                    return alert("Erro: " + response.status);
                });

                $scope.objQuarentena = {
                    CdPessoaFilial: produtoAlertaSelected[i].CdPessoaFilial,
                    CdProduto: produtoAlertaSelected[i].CdProduto,
                    CdTipoAlerta: produtoAlertaSelected[i].CdTipoAlerta,
                    Motivo: $scope.motivo,
                    IdUsuario: $localStorage.user.Id
                };

                $http.post("http://localhost:50837/api/AlertaQuarentena/Incluir", $scope.objQuarentena).then(function (response) {
                    $uibModalInstance.close();
                }, function (response) {
                    return alert("Erro: " + response.status);
                });
            }
        }
        $uibModalInstance.close();
    }
}

function quarentenaTodosModalCtrl($scope, $uibModalInstance, produtoAlertaSelected, $http, $localStorage) {

    $scope.incluir = function () {
        for (var i = 0; i < produtoAlertaSelected.length; i++) {

            $scope.obj = {
                CdPessoaFilial: produtoAlertaSelected[i].CdPessoaFilial,
                CdProduto: produtoAlertaSelected[i].CdProduto,
                CdTipoAlerta: produtoAlertaSelected[i].CdTipoAlerta,
                Motivo: $scope.motivo,
                IdUsuario: $localStorage.user.Id
            };

            $http.post("http://localhost:50837/api/AlertaQuarentena/Incluir", $scope.obj).then(function (response) {
                $uibModalInstance.close();
            }, function (response) {
                return alert("Erro: " + response.status);
            });

            $scope.objHistorico = {
                CdProduto: produtoAlertaSelected[i].CdProduto,
                StatusAlertaAtual: "Quarentena",
                StatusAlertaAnterior: produtoAlertaSelected[i].AlertaStatus.nomeStatus,
                CdTipoAlerta: produtoAlertaSelected[i].CdTipoAlerta,
                CdPessoaFilial: produtoAlertaSelected[i].CdPessoaFilial,
                DescricaoHistorico: $scope.motivo,
                IdUsuario: $localStorage.user.Id
            }

            $http.post("http://localhost:50837/api/AlertaHistorico/Incluir", $scope.objHistorico).then(function (response) {
            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }
        $uibModalInstance.close();
    }

}

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
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadSitDesp/GetAll").then(function (response) {
                $scope.cadsituacoesdesp = response.data;

            });
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
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadSitDesp/GetAll").then(function (response) {
                $scope.cadsituacoesdesp = response.data;
            });
        });;
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
                        SweetAlert.swal({
                            title: "Deletado!",
                            text: "A situação foi deletada com sucesso.",
                            type: "success",
                            timer: 5000
                        });
                        $http.get("http://localhost:50837/api/CadSitDesp/GetAll").then(function (response) {
                            $scope.cadsituacoesdesp = response.data;
                        });
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão da situacao", "error");
                }
            });
    }

}

function despSituacaoModalInstanceCtrl($scope, $uibModalInstance, $http, cadsituacaodespSelected, tipo, SweetAlert) {
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
                SweetAlert.swal({
                    title: "Alterado!",
                    text: "A situação foi alterada com sucesso.",
                    type: "success",
                    timer: 5000
                });
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
                SweetAlert.swal({
                    title: "Incluido!",
                    text: "A situação foi incluida com sucesso.",
                    type: "success",
                    timer: 5000
                });
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
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadMotivoDesp/GetAll").then(function (response) {
                $scope.cadmotivosdesp = response.data;
            });
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
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadMotivoDesp/GetAll").then(function (response) {
                $scope.cadmotivosdesp = response.data;
            });
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
                        SweetAlert.swal({
                            title: "Deletado!",
                            text: "O motivo foi excluido com sucesso.",
                            type: "success",
                            timer: 5000
                        });
                        $http.get("http://localhost:50837/api/CadMotivoDesp/GetAll").then(function (response) {
                            $scope.cadmotivosdesp = response.data;
                        });
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão do motivo", "error");
                }
            });
    }

    $scope.centrodecusto = function (cadmotivodesp) {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/despesa/editar_cadmotivofilial.html',
            controller: 'despMotivoFilialModalInstanceCtrl',
            windowClass: "animated fadeIn",
            size: 'lg',
            resolve: {
                cadmotivodespSelected: function () {
                    return cadmotivodesp;
                }
            }
        })
    }

}

function despMotivoModalInstanceCtrl($scope, $uibModalInstance, $http, cadmotivodespSelected, tipo, SweetAlert) {
    $scope.tipo = tipo
    $scope.motivo = cadmotivodespSelected.Motivo;


    $scope.editar = function () {

        $scope.obj = { IdMotivo: cadmotivodespSelected.IdMotivo, Motivo: $scope.motivo }

        if ($scope.cadMotivoForm.$valid) {
            $http.post("http://localhost:50837/api/CadMotivoDesp/Alterar", $scope.obj).then(function (response) {
                SweetAlert.swal({
                    title: "Alterado!",
                    text: "O motivo foi alterado com sucesso.",
                    type: "success",
                    timer: 5000
                });
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
                SweetAlert.swal({
                    title: "Incluido!",
                    text: "O motivo foi incluido com sucesso.",
                    type: "success",
                    timer: 5000
                });
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

function despMotivoFilialCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert) {

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
    $scope.cadmotivosfilialdesp;

    $http.get("http://localhost:50837/api/CadMotivoDespFilial/GetAll").then(function (response) {
        $scope.cadmotivosfilialdesp = response.data;
        console.log(response.data);

    });

    $scope.editar = function (cadmotivofilialdesp) {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/despesa/editar_cadmotivofilial.html',
            controller: 'despMotivoFilialModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                cadmotivodefilialSelected: function () {
                    return cadmotivofilialdesp;
                },
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadMotivoDespFilial/GetAll").then(function (response) {
                $scope.cadmotivosfilialdesp = response.data;
            });
        });
    };

    $scope.incluir = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/despesa/incluir_cadmotivofilial.html',
            controller: 'despMotivoFilialModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                cadmotivodefilialSelected: function () {
                    return null;
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadMotivoDespFilial/GetAll").then(function (response) {
                $scope.cadmotivosfilialdesp = response.data;
            });
        });
    };

    $scope.excluir = function (cadmotivofilialdesp) {
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
                    $http.post("http://localhost:50837/api/CadMotivoDespFilial/Excluir", cadmotivofilialdesp).then(function (response) {
                        SweetAlert.swal({
                            title: "Deletado!",
                            text: "O motivo foi excluido com sucesso.",
                            type: "success",
                            timer: 5000
                        });
                        $http.get("http://localhost:50837/api/CadMotivoDespFilial/GetAll").then(function (response) {
                            $scope.cadmotivosfilialdesp = response.data;
                        });
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão do motivo", "error");
                }
            });
    }
}

function despMotivoFilialModalInstanceCtrl($scope, $uibModalInstance, $http, SweetAlert, cadmotivodespSelected) {

    $http.get("http://localhost:50837/api/CadMotivoDespFilial/GetAllByCodigoMotivo?idMotivo=" + cadmotivodespSelected.IdMotivo).then(function (response) {
        $scope.motivosFilial = response.data;
    });

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }

    $scope.edit = function (motivoFilial) {
        motivoFilial.editMode = true;
    }

    $scope.saveUser = function (motivoFilial, $index) {
        motivoFilial.editMode = false;
    }

    $scope.salvar = function () {

        SweetAlert.swal({
            title: "Alterado!",
            text: "Alteração feita com sucesso!",
            type: "success",
            timer: 5000
        });

        for (var i = 0; i < $scope.motivosFilial.length; i++) {
            $http.post("http://localhost:50837/api/CadMotivoDespFilial/Alterar", $scope.motivosFilial[i]).then(function (response) {
            },
                function (response) {
                    return alert("Erro: " + response.status)
                }
            );
        }
        $uibModalInstance.close();
    }
}

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
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadFornecedorDesp/GetAll").then(function (response) {
                $scope.cadfornecedoresdesp = response.data;
            });
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
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadFornecedorDesp/GetAll").then(function (response) {
                $scope.cadfornecedoresdesp = response.data;
            });
        });
    };
}

function despFornecedorModalInstanceCtrl($scope, $uibModalInstance, $http, cadfornecedordespSelected, tipo, SweetAlert) {
    $scope.tipo = tipo
    $scope.ativo = cadfornecedordespSelected.Ativo;
    $scope.nome = cadfornecedordespSelected.Nome;


    $scope.editar = function () {

        $scope.obj = { Id: cadfornecedordespSelected.Id, Nome: $scope.nome, Ativo: $scope.ativo }

        if ($scope.cadFornecedorForm.$valid) {
            $http.post("http://localhost:50837/api/CadFornecedorDesp/Alterar", $scope.obj).then(function (response) {
                SweetAlert.swal({
                    title: "Alterado!",
                    text: "O fornecedor foi alterado com sucesso.",
                    type: "success",
                    timer: 5000
                });
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
                SweetAlert.swal({
                    title: "Incluido!",
                    text: "O fornecedor foi incluido com sucesso.",
                    type: "success",
                    timer: 5000
                });
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

function solDespesaCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert, $localStorage) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'desc'])
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

    $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
                        $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
                        $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
                $scope.solicitacoesdesp = response.data;
            });
        });
    };
}

function solDespesaModalInstanceCtrl($scope, $uibModalInstance, $http, solicitacaodespSelected, tipo, $localStorage, SweetAlert) {
    $scope.motivos;
    $scope.tipo = tipo
    $scope.disabled = false;

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
        $scope.disabled = true;

        $scope.valor = $scope.valor.toString().replace(",", ".");

        $scope.obj = {
            IdCadSolDesp: solicitacaodespSelected.IdCadSolDesp, VlDespesa: $scope.valor, IdMotivo: $scope.motivo.IdMotivo,
            Favorecido: $scope.favorecido, Documento: $scope.documento, Observacao: $scope.observacao, IdUsuarioInclusao: $localStorage.user.Id,
            DataInclusao: solicitacaodespSelected.DataInclusao, IdSitDesp: solicitacaodespSelected.IdSitDesp, IdTipoDespesa: 1,
            Baixa: solicitacaodespSelected.Baixa
        }

        if ($scope.cadSolDespForm.$valid) {
            $http.post("http://localhost:50837/api/SolitDesp/Alterar", $scope.obj).then(function (response) {
                SweetAlert.swal({
                    title: "Alteração!",
                    text: "Alteração feita com sucesso!",
                    type: "success",
                    timer: 5000
                });
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });

        } else {
            $scope.cadSolDespForm.submitted = true;
        }
    };

    $scope.incluir = function () {
        $scope.disabled = true;

        $scope.valor = $scope.valor.toString().replace(",", ".");

        $scope.obj = {
            VlDespesa: $scope.valor, IdSitDesp: 8, IdMotivo: $scope.motivo.IdMotivo, Favorecido: $scope.favorecido, Documento: $scope.documento,
            Observacao: $scope.observacao, IdUsuarioInclusao: $localStorage.user.Id, IdTipoDespesa: 1
        }
        if ($scope.cadSolDespForm.$valid) {
            $http.post("http://localhost:50837/api/SolitDesp/Incluir", $scope.obj).then(function (response) {
                SweetAlert.swal({
                    title: "Inclusão!",
                    text: "Inclusão feita com sucesso!",
                    type: "success",
                    timer: 5000
                });
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

function aprovDespesaCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert, $localStorage) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'desc'])
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

function aprovDespesaModalInstanceCtrl($scope, $uibModalInstance, $http, solicitacaodespSelected, tipo, $localStorage, SweetAlert) {
    $scope.tipo = tipo

    $scope.valor = solicitacaodespSelected.VlDespesa;
    $scope.motivo = solicitacaodespSelected.CadMotivoDesp.Motivo;
    $scope.favorecido = solicitacaodespSelected.Favorecido;
    $scope.documento = solicitacaodespSelected.Documento;
    $scope.observacao = solicitacaodespSelected.Observacao;
    $scope.solicitante = solicitacaodespSelected.UsuarioInclusao.Nome + " " + solicitacaodespSelected.UsuarioInclusao.Sobrenome
    $scope.observacao = solicitacaodespSelected.Observacao;
    $scope.observacaoaprovador = solicitacaodespSelected.ObservacaoAprovacao;

    $http.get("http://localhost:50837/api/SolitDesp/GetTotalByMotivoDate?idMotivo=" + solicitacaodespSelected.CadMotivoDesp.IdMotivo + "&idUsuario=" + solicitacaodespSelected.UsuarioInclusao.Id).then(function (response) {
        $scope.totalMes = response.data;
    });

    $http.get("http://localhost:50837/api/CadMotivoDespFilial/GetMotivoDespFilialByUser?idMotivo=" + solicitacaodespSelected.CadMotivoDesp.IdMotivo + "&idUsuario=" + solicitacaodespSelected.UsuarioInclusao.Id).then(function (response) {
        $scope.totalDefinido = response.data.Limite;
    });


    $scope.editar = function () {

        if (tipo == "Aprovar") {
            $scope.obj = {
                IdCadSolDesp: solicitacaodespSelected.IdCadSolDesp, VlDespesa: solicitacaodespSelected.VlDespesa,
                IdMotivo: solicitacaodespSelected.CadMotivoDesp.IdMotivo, Favorecido: solicitacaodespSelected.Favorecido,
                Documento: solicitacaodespSelected.Documento, Observacao: solicitacaodespSelected.Observacao,
                IdUsuarioInclusao: solicitacaodespSelected.UsuarioInclusao.Id,
                DataInclusao: solicitacaodespSelected.DataInclusao, IdSitDesp: 6, IdAprovador: $localStorage.user.Id,
                ObservacaoAprovacao: $scope.observacaoaprovador
            }

            $http.post("http://localhost:50837/api/SolitDesp/AprovarReprovar", $scope.obj).then(function (response) {
                SweetAlert.swal({
                    title: "Aprovado!",
                    text: "Despesa aprovada com sucesso!",
                    type: "success",
                    timer: 5000
                });
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
                DataInclusao: solicitacaodespSelected.DataInclusao, IdSitDesp: 7, IdAprovador: $localStorage.user.Id,
                ObservacaoAprovador: $scope.observacaoaprovador
            }

            $http.post("http://localhost:50837/api/SolitDesp/AprovarReprovar", $scope.obj).then(function (response) {
                SweetAlert.swal({
                    title: "Reprovado!",
                    text: "Despesa reprovada com sucesso!",
                    type: "success",
                    timer: 5000
                });
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

function ordemModalInstanceCtrl($scope, $uibModalInstance, $http, solicitacaodespSelected, tipo, $localStorage) {
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

    $http.get("http://localhost:50837/api/Usuario/GetAllTesoureirasAndDepositos").then(function (response) {
        $scope.usuariosDestino = response.data;
    });

    $scope.incluir = function () {
        $scope.valor = $scope.valor.toString().replace(",", ".");

        $scope.obj = {
            VlDespesa: $scope.valor, IdSitDesp: 9, IdMotivo: $scope.motivo.IdMotivo, Favorecido: $scope.favorecido, Documento: $scope.documento,
            Observacao: $scope.observacao, IdUsuarioInclusao: $localStorage.user.Id, IdAprovador: $scope.usuariodestino.Id
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
            Observacao: $scope.observacao, IdUsuarioInclusao: $localStorage.user.Id,
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

function ordemModalAprovacaoInstanceCtrl($scope, $uibModalInstance, $http, solicitacaodespSelected, tipo, $localStorage) {
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
                DataInclusao: solicitacaodespSelected.DataInclusao, IdSitDesp: 6, IdAprovador: $localStorage.user.Id,
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
                DataInclusao: solicitacaodespSelected.DataInclusao, IdSitDesp: 7, IdAprovador: $localStorage.user.Id,
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

function changePasswordInstanceCtrl($scope, $uibModalInstance, UserLogin, $http, SweetAlert) {

    $scope.salvar = function () {
        if ($scope.signup_form.$valid) {
            $scope.obj = {
                Id: UserLogin.Id, Username: UserLogin.Username, Nome: UserLogin.Nome, Sobrenome: UserLogin.Sobrenome,
                Email: UserLogin.Email, PasswordHash: $scope.senha, DataInclusao: UserLogin.DataInclusao
            }
            alert(angular.toJson(UserLogin));
            alert(angular.toJson($scope.obj));

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

function controleCaixaCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert, $localStorage, $interval, $location) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'asc'])
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

    $scope.dtOptions2 = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'desc'])
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

    $scope.caixas;
    $scope.entradas;
    $scope.composicoes;
    $scope.despesas;
    $scope.outrasdespesas;

    $scope.today = function () {
        $scope.date = new Date();
    };

    $scope.clear = function () {
        $scope.date = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.date = new Date(year, month, day);
    };

    $scope.popup1 = {
        opened: false
    };

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    $scope.Definir = function () {
        $http.get("http://localhost:50837/api/CadSaldo/GetFechado?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.foiFechado = response.data;
        });

        // Registros 

        $http.get("http://localhost:50837/api/CadCaixa/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.caixas = response.data;
        });

        $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.outrasdespesas = response.data;
        });

        $http.get("http://localhost:50837/api/CadEntrada/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.entradas = response.data;
        });

        $http.get("http://localhost:50837/api/CadComposicao/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.composicoes = response.data;
        });

        $http.get("http://localhost:50837/api/SolitDesp/GetAllByUserAprovado?idUsuario=" + $localStorage.user.Id).then(function (response) {
            $scope.despesas = response.data;
        });

        // Totais


        $http.get("http://localhost:50837/api/CadSaldo/GetSaldoByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.totalCaixaGeral = response.data.Saldo;
        });

        $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.totalCaixas = response.data;
        });


        $http.get("http://localhost:50837/api/SolitDesp/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.totalDespesas = response.data;
        });

        $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.totalOutrasDespesas = response.data;
        });

        $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.totalEntradas = response.data;
        });

        $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.totalComposicao = response.data;
        });
    }

    //$http.get("http://localhost:50837/api/CadCaixa/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
    //    $scope.caixas = response.data;
    //});

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
                },
                date: function () {
                    return $scope.date.toLocaleDateString('en-US');
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadCaixa/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
                $scope.caixas = response.data;
            });
            $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
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
                },
                date: function () {
                    return $scope.date.toLocaleDateString('en-US');
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadCaixa/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
                $scope.caixas = response.data;
            });
            $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
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
                        $http.get("http://localhost:50837/api/CadCaixa/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
                            $scope.caixas = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
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

    //$http.get("http://localhost:50837/api/CadEntrada/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
    //    $scope.entradas = response.data;
    //});

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
                },
                date: function () {
                    return $scope.date.toLocaleDateString('en-US');
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadEntrada/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
                $scope.entradas = response.data;
            });
            $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
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
                },
                date: function () {
                    return $scope.date.toLocaleDateString('en-US');
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadEntrada/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
                $scope.entradas = response.data;
            });
            $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
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
                        $http.get("http://localhost:50837/api/CadEntrada/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
                            $scope.entradas = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
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


    //$http.get("http://localhost:50837/api/CadComposicao/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
    //    $scope.composicoes = response.data;
    //});

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
                },
                date: function () {
                    return $scope.date.toLocaleDateString('en-US');
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadComposicao/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
                $scope.composicoes = response.data;
            });
            $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
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
                },
                date: function () {
                    return $scope.date.toLocaleDateString('en-US');
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadComposicao/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
                $scope.composicoes = response.data;
            });
            $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
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
                        $http.get("http://localhost:50837/api/CadComposicao/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
                            $scope.composicoes = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
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
                        $http.get("http://localhost:50837/api/CadComposicao/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
                            $scope.composicoes = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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


    //$http.get("http://localhost:50837/api/SolitDesp/GetAllByUserAprovado?idUsuario=" + $localStorage.user.Id).then(function (response) {
    //    $scope.despesas = response.data;
    //});

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
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
        solicitacaodesp.DataBaixa = $scope.date.toLocaleDateString('en-US');
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
                        $http.get("http://localhost:50837/api/SolitDesp/GetAllByUserAprovado?idUsuario=" + $localStorage.user.Id).then(function (response) {
                            $scope.despesas = response.data;
                        });
                        $http.get("http://localhost:50837/api/SolitDesp/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
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

    $scope.desbaixar = function (solicitacaodesp) {
        SweetAlert.swal({
            title: "Deseja cancelar a baixa?",
            text: "Não será possivel recuperar depois de dado baixa!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, cancelar!",
            cancelButtonText: "Não, manter!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/SolitDesp/Desbaixar", solicitacaodesp).then(function (response) {
                        $http.get("http://localhost:50837/api/SolitDesp/GetAllByUserAprovado?idUsuario=" + $localStorage.user.Id).then(function (response) {
                            $scope.despesas = response.data;
                        });
                        $http.get("http://localhost:50837/api/SolitDesp/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
                            $scope.totalDespesas = response.data;
                        });
                        SweetAlert.swal("Desbaixado!", "Registro desbaixado com sucesso", "success");
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a alteracao do registro", "error");
                }
            });
    }


    //$http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
    //    $scope.outrasdespesas = response.data;
    //});

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
                },
                date: function () {
                    return $scope.date.toLocaleDateString('en-US');
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
                $scope.outrasdespesas = response.data;
            });
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
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
                },
                date: function () {
                    return $scope.date.toLocaleDateString('en-US');
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
                $scope.outrasdespesas = response.data;
            });
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
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
                        $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
                            $scope.outrasdespesas = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUserAndDate?idUsuario=" + $localStorage.user.Id + "&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
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
                                IdUsuario: $localStorage.user.Id, DataInclusao: $scope.date.toLocaleDateString('en-US'), Valor: $scope.saldodivergencia, Descricao: "Quebra"
                            };

                            $scope.obj = { IdUsuario: $localStorage.user.Id, DataInclusao: $scope.date.toLocaleDateString('en-US'), Saldo: Math.round(($scope.saldo - $scope.saldodivergencia) * 100) / 100 };

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

                            $scope.obj = { IdUsuario: $localStorage.user.Id, DataInclusao: $scope.date.toLocaleDateString('en-US'), Saldo: Math.round(($scope.saldo + $scope.saldodivergencia) * 100) / 100 };

                            $scope.objEntrada = {
                                IdUsuario: $localStorage.user.Id, DataInclusao: $scope.date.toLocaleDateString('en-US'), Valor: Math.round($scope.saldodivergencia * 100) / 100, Descricao: "Sobra"
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

    $scope.fechar2 = function () {

        if ($scope.foiFechado == false) {
            var modalInstance = $uibModal.open({
                templateUrl: 'Views/modal/controledecaixa/fechamento.html',
                controller: 'fechamentoModalInstanceCtrl',
                windowClass: "animated fadeIn",
                resolve: {
                    SaldoDivergente: function () {
                        return $scope.totalComposicao - (($scope.totalCaixaGeral + $scope.totalCaixas + $scope.totalEntradas) - ($scope.totalDespesas + $scope.totalOutrasDespesas));
                    },

                    Saldo: function () {
                        return ($scope.totalCaixaGeral + $scope.totalCaixas + $scope.totalEntradas) - ($scope.totalDespesas + $scope.totalOutrasDespesas);
                    },

                    date: function () {
                        return $scope.date.toLocaleDateString('en-US');
                    }
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

function relAcompanhamentoCtrl($scope, DTOptionsBuilder, $http, $localStorage) {
    $scope.dtini;
    $scope.dtfim;
    $scope.relDados;

    $scope.Buscar = function () {

        if ($scope.dtini != undefined && $scope.dtini != "") {
            $scope.day = $scope.dtini.substring(0, 2);
            $scope.month = $scope.dtini.substring(3, 5);
            $scope.year = $scope.dtini.substring(6, 10);

            $scope.dateiniFormat = $scope.year + "-" + $scope.month + "-" + $scope.day;
        }

        if ($scope.dtfim != undefined && $scope.dtfim != "") {
            $scope.day = $scope.dtfim.substring(0, 2);
            $scope.month = $scope.dtfim.substring(3, 5);
            $scope.year = $scope.dtfim.substring(6, 10);

            $scope.datefimFormat = $scope.year + "-" + $scope.month + "-" + $scope.day;
        }

        $http.get("http://localhost:50837/api/CadComposicao/GetAnalitcoByUser?idUsuario=" + $localStorage.user.Id + "&dataInicio=" + $scope.dateiniFormat + "&dataFim=" + $scope.datefimFormat).then(function (response) {
            $scope.relDados = response.data;
        });
    }
}

function caixaModalInstanceCtrl($scope, $uibModalInstance, $http, caixaSelected, tipo, $localStorage, date) {
    $scope.tipo = tipo;
    //$scope.supervisores;
    //$scope.operadores;
    $scope.caixas;
    $scope.data;

    //$scope.turnos = [{ id: 1, nome: "Manhã" }, { id: 2, nome: "Tarde" }];

    //$http.get("http://localhost:50837/api/CadSupervisor/GetAll").then(function (response) {
    //    $scope.supervisores = response.data;
    //});

    //$http.get("http://localhost:50837/api/CadAtendente/GetAll").then(function (response) {
    //    $scope.operadores = response.data;
    //});

    $http.get("http://localhost:50837/api/Caixa/GetAll").then(function (response) {
        $scope.caixas = response.data;
    });

    if ($scope.tipo == "Alteracao") {
        $scope.hora = caixaSelected.Hora
        $scope.data = caixaSelected.DataInclusao;
        $scope.supervisor = caixaSelected.Supervisor;
        $scope.operador = caixaSelected.Atendente;
        $scope.caixa = caixaSelected.Caixa.Id;
        $scope.valor = caixaSelected.Valor;
        $scope.turno = caixaSelected.Turno;
        $scope.observacao = caixaSelected.Observacao;

    }

    $scope.incluir = function () {
        $scope.valor = $scope.valor.toString().replace(",", ".");

        if ($scope.cadCaixaForm.$valid) {
            //$scope.obj = {
            //    DataInclusao: date, IdUsuario: $localStorage.user.Id, IdSupervisor: $scope.supervisor.Id,
            //    IdAtendente: $scope.operador.Id, IdCaixa: $scope.caixa, Valor: $scope.valor, Turno: $scope.turno, Hora: $scope.hora
            //};

            $scope.obj = {
                DataInclusao: date, IdUsuario: $localStorage.user.Id, IdCaixa: $scope.caixa,
                Valor: $scope.valor, Observacao: $scope.observacao
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
            //$scope.obj = {
            //    Id: caixaSelected.Id, DataInclusao: $scope.data, IdUsuario: caixaSelected.IdUsuario, IdSupervisor: $scope.supervisor.Id,
            //    IdAtendente: $scope.operador.Id, IdCaixa: $scope.caixa, Valor: $scope.valor, Turno: $scope.turno, IdUsuarioAlteracao: $localStorage.user.Id,
            //    Hora: $scope.hora
            //};

            $scope.obj = {
                Id: caixaSelected.Id, DataInclusao: caixaSelected.DataInclusao, IdUsuario: caixaSelected.IdUsuario,
                Valor: $scope.valor, IdUsuarioAlteracao: $localStorage.user.Id, IdCaixa: $scope.caixa, Observacao: $scope.observacao
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

function entradaModalInstanceCtrl($scope, $uibModalInstance, $http, entradaSelected, tipo, $localStorage, buscaSelected, date) {
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
        $scope.usuario = $localStorage.user.Id;
        $scope.dataInclusao = Date.now();
    }

    $scope.incluir = function () {
        $scope.valor = $scope.valor.toString().replace(",", ".");

        if ($scope.cadEntradaForm.$valid) {
            $scope.obj = {
                IdUsuario: $scope.usuario, DataInclusao: date, Valor: $scope.valor, Descricao: $scope.descricao
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
                Valor: $scope.valor, Descricao: $scope.descricao, IdUsuarioAlteracao: $localStorage.user.Id
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

function composicaoModalInstanceCtrl($scope, $uibModalInstance, $http, composicaoSelected, tipo, $localStorage, date) {
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
                IdUsuario: $localStorage.user.Id, DataInclusao: date, Valor: $scope.valor, Descricao: $scope.descricao, Observacao: $scope.observacao, Baixa: $scope.baixa
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



        $scope.obj = {
            Id: composicaoSelected.Id, DataInclusao: composicaoSelected.DataInclusao, IdUsuario: composicaoSelected.IdUsuario,
            Valor: $scope.valor, Descricao: $scope.descricao, Observacao: $scope.observacao, IdUsuarioAlteracao: $localStorage.user.Id,
            Baixa: $scope.baixa, DataBaixa: composicaoSelected.Baixa
        };


        $http.post("http://localhost:50837/api/CadComposicao/Editar", angular.toJson($scope.obj)).then(function (response) {
            $uibModalInstance.close();

        }, function (response) {
            return alert("Erro: " + response.status);
        });

    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

function outrasdespesasModalInstanceCtrl($scope, $uibModalInstance, $http, outrasdespesasSelected, tipo, $localStorage, date) {
    $scope.tipo = tipo;

    $scope.descricoes = ["Boca de Lobo", "Transferencia Cofre (GTV)", "Transferencia Filial"];
    if ($scope.tipo == "Alteracao") {
        $scope.valor = outrasdespesasSelected.Valor;
        $scope.descricao = outrasdespesasSelected.Descricao;
        $scope.observacao = outrasdespesasSelected.Observacao;
    }

    $scope.incluir = function () {
        $scope.valor = $scope.valor.toString().replace(",", ".");

        if ($scope.cadOutrasDespesasForm.$valid) {
            $scope.obj = {
                IdUsuario: $localStorage.user.Id, DataInclusao: date, Valor: $scope.valor, Descricao: $scope.descricao, Observacao: $scope.observacao
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
                Valor: $scope.valor, Descricao: $scope.descricao, Observacao: $scope.observacao, IdUsuarioAlteracao: $localStorage.user.Id
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

function fechamentoModalInstanceCtrl($scope, $uibModalInstance, $http, SaldoDivergente, Saldo, date, $localStorage, SweetAlert, $timeout) {

    $scope.disable = false;
    $scope.saldodivergencia = SaldoDivergente;
    $scope.saldo = Saldo;

    $scope.salvar = function () {
        $scope.disable = true;

        if ($scope.saldodivergencia < 0) {
            $scope.saldodivergencia = (Math.round($scope.saldodivergencia * 100) / 100) * -1;

            $scope.objSaida = {
                IdUsuario: $localStorage.user.Id, DataInclusao: date, Valor: $scope.saldodivergencia, Descricao: "Quebra"
            };

            $scope.obj = { IdUsuario: $localStorage.user.Id, DataInclusao: date, Saldo: Math.round(($scope.saldo - $scope.saldodivergencia) * 100) / 100 };

            $http.post("http://localhost:50837/api/CadOutrasDesp/Incluir", $scope.objSaida).then(function (response) {
                $http.post("http://localhost:50837/api/CadSaldo/Incluir", $scope.obj).then(function (response) {
                    SweetAlert.swal("Fechado!", "Dia fechado com sucesso!", "success");
                    $uibModalInstance.close();
                    $timeout(function () {
                        location.reload();
                    }, 3000);
                }, function (response) {
                    return alert("Erro: " + response.status);
                });

            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }

        else if ($scope.saldodivergencia > 0) {

            $scope.obj = { IdUsuario: $localStorage.user.Id, DataInclusao: date, Saldo: Math.round(($scope.saldo + $scope.saldodivergencia) * 100) / 100 };

            $scope.objEntrada = {
                IdUsuario: $localStorage.user.Id, DataInclusao: date, Valor: Math.round($scope.saldodivergencia * 100) / 100, Descricao: "Sobra"
            };
            $http.post("http://localhost:50837/api/CadEntrada/Incluir", $scope.objEntrada).then(function (response) {
                $http.post("http://localhost:50837/api/CadSaldo/Incluir", $scope.obj).then(function (response) {
                    SweetAlert.swal("Fechado!", "Dia fechado com sucesso!", "success");
                    $uibModalInstance.close();
                    $timeout(function () {
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
            $scope.obj = { IdUsuario: $localStorage.user.Id, DataInclusao: date, Saldo: Math.round(($scope.saldo + $scope.saldodivergencia) * 100) / 100 };

            $http.post("http://localhost:50837/api/CadSaldo/Incluir", $scope.obj).then(function (response) {
                SweetAlert.swal("Fechado!", "Dia fechado com sucesso!", "success");
                $uibModalInstance.close();
                $timeout(function () {
                    location.reload();
                }, 3000);
            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

function supcontroleCaixaCtrl($scope, DTOptionsBuilder, $http, $uibModal, SweetAlert, $localStorage, $interval, $location) {
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

    $scope.caixas;
    $scope.entradas;
    $scope.composicoes;
    $scope.despesas;
    $scope.outrasdespesas;

    $scope.lojas;
    $scope.foiFechado;

    $scope.today = function () {
        $scope.date = new Date();
    };

    $scope.clear = function () {
        $scope.date = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.date = new Date(year, month, day);
    };

    $scope.popup1 = {
        opened: false
    };

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    $http.get("http://localhost:50837/api/Usuario/GetAllTesoureirasAndDepositos").then(function (response) {
        $scope.lojas = response.data;

    });

    $scope.Buscar = function () {

        $http.get("http://localhost:50837/api/CadSaldo/GetFechado?idUsuario=1&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.foiFechado = response.data;
        });

        // Registros 

        $http.get("http://localhost:50837/api/CadCaixa/GetAllByUserAndDate?idUsuario=1&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.caixas = response.data;
        });

        $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUserAndDate?idUsuario=1&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.outrasdespesas = response.data;
        });

        $http.get("http://localhost:50837/api/CadEntrada/GetAllByUserAndDate?idUsuario=1&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.entradas = response.data;
        });

        $http.get("http://localhost:50837/api/CadComposicao/GetAllByUserAndDate?idUsuario=1&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.composicoes = response.data;
        });

        $http.get("http://localhost:50837/api/SolitDesp/GetAllByUserAprovado?idUsuario=1").then(function (response) {
            $scope.despesas = response.data;
        });

        // Totais


        $http.get("http://localhost:50837/api/CadSaldo/GetSaldoByUserAndDate?idUsuario=1&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.totalCaixaGeral = response.data.Saldo;
        });

        $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUserAndDate?idUsuario=1&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.totalCaixas = response.data;
        });


        $http.get("http://localhost:50837/api/SolitDesp/GetTotalByUserAndDate?idUsuario=1&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.totalDespesas = response.data;
        });

        $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUserAndDate?idUsuario=1&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.totalOutrasDespesas = response.data;
        });

        $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUserAndDate?idUsuario=1&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.totalEntradas = response.data;
        });

        $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUserAndDate?idUsuario=1&date=" + $scope.date.toLocaleDateString('en-US')).then(function (response) {
            $scope.totalComposicao = response.data;
        });
    }

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
            $http.get("http://localhost:50837/api/CadCaixa/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
                $scope.caixas = response.data;
            });
            $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
            $http.get("http://localhost:50837/api/CadCaixa/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
                $scope.caixas = response.data;
            });
            $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
                        $http.get("http://localhost:50837/api/CadCaixa/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
                            $scope.caixas = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadCaixa/GetTotalByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
            $http.get("http://localhost:50837/api/CadEntrada/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
                $scope.entradas = response.data;
            });
            $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
                    return { Loja: $scope.loja, Data: $scope.date.toLocaleDateString('en-US') };
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadEntrada/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
                $scope.entradas = response.data;
            });
            $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
                        $http.get("http://localhost:50837/api/CadEntrada/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
                            $scope.entradas = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadEntrada/GetTotalByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
            $http.get("http://localhost:50837/api/CadComposicao/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
                $scope.composicoes = response.data;
            });
            $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
            $http.get("http://localhost:50837/api/CadComposicao/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
                $scope.composicoes = response.data;
            });
            $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
                        $http.get("http://localhost:50837/api/CadComposicao/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
                            $scope.composicoes = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadComposicao/GetTotalByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
            $http.get("http://localhost:50837/api/SolitDesp/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
                        $http.get("http://localhost:50837/api/SolitDesp/GetAllByUserAprovado?idUsuario=" + $localStorage.user.Id).then(function (response) {
                            $scope.despesas = response.data;
                        });
                        $http.get("http://localhost:50837/api/SolitDesp/GetTotalByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
                $scope.outrasdespesas = response.data;
            });
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
                $scope.outrasdespesas = response.data;
            });
            $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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
                        $http.get("http://localhost:50837/api/CadOutrasDesp/GetAllByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
                            $scope.outrasdespesas = response.data;
                        });
                        $http.get("http://localhost:50837/api/CadOutrasDesp/GetTotalByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
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

        $scope.obj = { IdUsuario: 1, DataInclusao: $scope.date.toLocaleDateString('en-US'), DataReabriu: $scope.date.toLocaleDateString('en-US'), IdUsuarioReabriu: $localStorage.user.Id };

        if ($scope.foiFechado) {
            SweetAlert.swal({
                title: "Deseja reabrir o dia?",
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
                        $http.post("http://localhost:50837/api/CadSaldo/Excluir", $scope.obj).then(function (response) {
                            $http.post("http://localhost:50837/api/CadSaldo/IncluirLog", $scope.obj).then(function (response) {
                            });
                            $scope.foiFechado = response.data;
                            SweetAlert.swal("Reaberto!", "Dia reaberto com sucesso!", "success");
                        });
                    }
                    else {
                        SweetAlert.swal("Cancelado", "Você cancelou a reabertura do dia!", "error");
                    }
                });
        }
        else {
            SweetAlert.swal("Cancelado", "Dia ainda não foi fechado!", "error");
        }
    }

    $scope.historico = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/controledecaixa/incluir_editar_cadoutrasdespesas.html',
            controller: 'outrasdespesasModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                DiaSelected: function () {
                    return true;
                }
            }
        })
    }
}

function supRelAcompanhamentoCtrl($scope, $http) {
    $scope.relDados;
    $scope.lojas;
    $scope.dtini;
    $scope.dtfim;

    $http.get("http://localhost:50837/api/Usuario/GetAllTesoureirasAndDepositos").then(function (response) {
        $scope.lojas = response.data;
    });

    $scope.Buscar = function () {

        if ($scope.dtini != undefined && $scope.dtini != "") {
            $scope.day = $scope.dtini.substring(0, 2);
            $scope.month = $scope.dtini.substring(3, 5);
            $scope.year = $scope.dtini.substring(6, 10);

            $scope.dateiniFormat = $scope.year + "-" + $scope.month + "-" + $scope.day;
        }

        if ($scope.dtfim != undefined && $scope.dtfim != "") {
            $scope.day = $scope.dtfim.substring(0, 2);
            $scope.month = $scope.dtfim.substring(3, 5);
            $scope.year = $scope.dtfim.substring(6, 10);

            $scope.datefimFormat = $scope.year + "-" + $scope.month + "-" + $scope.day;
        }

        $http.get("http://localhost:50837/api/CadComposicao/GetAnalitcoByUser?idUsuario=" + $scope.loja + "&dataInicio=" + $scope.dateiniFormat + "&dataFim=" + $scope.datefimFormat).then(function (response) {
            $scope.relDados = response.data;
        });
    }
}

function controleCaixaLogsCtrl($scope, $http) {
    $scope.dtinicio;
    $scope.dtfim;
    $scope.logs;
    $scope.lojas;

    $http.get("http://localhost:50837/api/Usuario/GetAllTesoureirasAndDepositos").then(function (response) {
        $scope.lojas = response.data;
    });

    $scope.buscar = function () {

        $http.get("http://localhost:50837/api/CadSaldo/GetAllLogsByUser?IdUsuario=" + $scope.loja + "&dataInicial=" + $scope.dtinicio.toLocaleDateString('en-US') + "&dataFinal=" + $scope.dtfim.toLocaleDateString('en-US')).then(function (response) {
            $scope.logs = response.data;
        });
    }

    $scope.today = function () {
        $scope.dtinicio = new Date();
    };

    $scope.clear = function () {
        $scope.dtinicio = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dtinicio = new Date(year, month, day);
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
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
    $scope.modelos = ['Handcom', 'FR', 'TELCO'];

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

function cadProdutoCtrl($scope, $localStorage, DTOptionsBuilder) {
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
}

function bpdreCtrl($scope, $localStorage, $http, DTOptionsBuilder) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('lengthMenu', [50, 100, 150, 200])
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

    $scope.dadosFilial;
    $scope.TotalCMV;
    $scope.diasVenda = 30;

    $http.get("http://localhost:50837/api/teste/GetTotalLoja").then(function (response) {
        $scope.dadosFilial = response.data;
    });

    $http.get("http://localhost:50837/api/teste/GetTotalCDME").then(function (response) {
        $scope.TotalCMV = response.data;
    });
}

function promocaoCtrl($scope, $localStorage, $http, DTOptionsBuilder, SweetAlert, $interval, $uibModal) {
    $scope.dadosFilial = [];
    $scope.dadosComprador = [];
    $scope.totalVenda = 0;
    $scope.totalCMV = 0;
    $scope.totalPedidos = 0;
    $scope.totalCompras = 0;

    $scope.dtOptions1 = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'asc'])
        .withOption('lengthMenu', [50, 100, 150, 200])
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

    $scope.dtOptions2 = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'asc'])
        .withOption('lengthMenu', [50, 100, 150, 200])
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

    $http.get("http://localhost:50837/api/teste/Get").then(function (response) {
        $scope.totalCMV = response.data[0].CMV
        $scope.totalVenda = response.data[0].Venda
        $scope.totalPedidos = response.data[0].vlPedidos
        $scope.totalCompras = response.data[0].vlCompras
    })

    $http.get("http://localhost:50837/api/teste/GetLojas").then(function (response) {
        $scope.dadosFilial = response.data;
    })

    $http.get("http://localhost:50837/api/teste/GetCompradores").then(function (response) {
        $scope.dadosComprador = response.data;
    })
}

function promocaoModalInstanceCtrl($scope, $http, $uibModalInstance, abastecimentoSelected, parametroCoberturas) {
    $scope.Produto = abastecimentoSelected.Produto;
    $scope.Codigo = abastecimentoSelected.cdProduto;
    $scope.Filial = abastecimentoSelected.Filial;
    $scope.EstoqueLoja = abastecimentoSelected.EstLJ;
    $scope.EstoqueCD = abastecimentoSelected.EstCD_UND;
    $scope.EstoqueMinimo = abastecimentoSelected.EstMin;
    $scope.Emb = abastecimentoSelected.QtdEmb;
    $scope.VMN = abastecimentoSelected.VMN;
    $scope.VMP = abastecimentoSelected.VMP;
    $scope.sugestComprador = abastecimentoSelected.sugestaoComprador == null ? 0 : abastecimentoSelected.sugestaoComprador;
    $scope.cdPromocao = abastecimentoSelected.cdPromocao;
    $scope.editMode = false;
    $scope.edit = false;

    console.log($scope.EstoqueLoja);
    console.log(abastecimentoSelected.EstLJ)

    $http.get("http://localhost:50837/api/Abastecimento/GetAllByCodigoAndFilial?codigo=" + abastecimentoSelected.cdProduto + "&codigoFilial=" + abastecimentoSelected.cdPessoaFilial).then(function (response) {

        $scope.atendido = response.data == null ? 0 : response.data.Atendido / abastecimentoSelected.QtdEmb;
        $scope.pendente = response.data == null ? 0 : response.data.Pendente / abastecimentoSelected.QtdEmb;
        $scope.transito = response.data == null ? 0 : response.data.Transito;
        $scope.sugestNormal = ((($scope.VMN / $scope.Emb) * parametroCoberturas.Cobertura) + ($scope.EstoqueMinimo / $scope.Emb)) - (($scope.EstoqueLoja / $scope.Emb) + $scope.atendido + $scope.pendente + $scope.transito)
        $scope.sugestPromocional = ((($scope.VMP / $scope.Emb) * parametroCoberturas.CoberturaPromocional) + ($scope.EstoqueMinimo / $scope.Emb)) - (($scope.EstoqueLoja / $scope.Emb) + $scope.atendido + $scope.pendente + $scope.transito)
        $scope.diasDeEstoqueNormal = (($scope.sugestComprador * $scope.Emb) + ($scope.EstoqueLoja + $scope.atendido + $scope.pendente + $scope.transito)) / $scope.VMN;
        $scope.diasDeEstoquePromocional = (($scope.sugestComprador * $scope.Emb) + ($scope.EstoqueLoja + $scope.atendido + $scope.pendente + $scope.transito)) / $scope.VMP;
    });

    $scope.edit = function (dado) {
        $scope.editMode = true;
    }

    $scope.save = function () {
        $scope.diasDeEstoqueNormal = (($scope.sugestComprador * $scope.Emb) + ($scope.EstoqueLoja + $scope.atendido + $scope.pendente + $scope.transito)) / $scope.VMN;
        $scope.diasDeEstoquePromocional = (($scope.sugestComprador * $scope.Emb) + ($scope.EstoqueLoja + $scope.atendido + $scope.pendente + $scope.transito)) / $scope.VMP;
        $scope.editMode = false;
    }

    $scope.gravar = function () {

        if (abastecimentoSelected.sugestaoComprador != 0 && abastecimentoSelected.sugestaoComprador != null) {
            $scope.obj = { cdPromocao: abastecimentoSelected.cdPromocao, cdProduto: abastecimentoSelected.cdProduto, cdPessoaFilial: abastecimentoSelected.cdPessoaFilial, sugestaoComprador: $scope.sugestComprador, conferido: abastecimentoSelected.conferido };
            $http.post("http://localhost:50837/api/abastecimento/AlterarSugestao", $scope.obj).then(function (response) {
                $uibModalInstance.close();
            },
                function (response) {
                    alert("Error: " + response.status);
                });
        }
        else {
            $scope.obj = { cdPromocao: abastecimentoSelected.cdPromocao, cdProduto: abastecimentoSelected.cdProduto, cdPessoaFilial: abastecimentoSelected.cdPessoaFilial, sugestaoComprador: $scope.sugestComprador };
            $http.post("http://localhost:50837/api/abastecimento/IncluirSugestao", $scope.obj).then(function (response) {
                $uibModalInstance.close();
            },
                function (response) {
                    alert("Error: " + response.status);
                });
        }


    }
}

function classificacaoProdutoCtrl($scope, $localStorage, $http, $uibModal) {

    $scope.itemId = 0;
    $scope.isExpend = true;

    $scope.itemClick = function (id, expend) {
        $scope.itemId = id;
        $scope.isExpend = !expend
    };

    $scope.tree_data = [{ "children": [{ "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 10101001, "idPai": 10101, "CdOrdem": "001001001001", "PrMargem": 40.0, "CdComprador": 224, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-BASICO" }, { "children": [], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 10101002, "idPai": 10101, "CdOrdem": "001001001002", "PrMargem": 40.0, "CdComprador": 224, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-ESPECIAL" }, { "children": [], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 10101003, "idPai": 10101, "CdOrdem": "001001001003", "PrMargem": 40.0, "CdComprador": 224, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-PREPARADO" }], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 10101, "idPai": 101, "CdOrdem": "001001001", "PrMargem": 40.0, "CdComprador": 224, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-ARROZ" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 10102001, "idPai": 10102, "CdOrdem": "001001002001", "PrMargem": 40.0, "CdComprador": 224, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-BASICO" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10102002, "idPai": 10102, "CdOrdem": "001001002002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-ESPECIAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 10102, "idPai": 101, "CdOrdem": "001001002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-FEIJAO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10103001, "idPai": 10103, "CdOrdem": "001001003001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10103002, "idPai": 10103, "CdOrdem": "001001003002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-PIPOCAS" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10103, "idPai": 101, "CdOrdem": "001001003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-GRAOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10104001, "idPai": 10104, "CdOrdem": "001001004001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-TRIGO" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10104002, "idPai": 10104, "CdOrdem": "001001004002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-MANDIOCA" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10104003, "idPai": 10104, "CdOrdem": "001001004003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-MILHO" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10104004, "idPai": 10104, "CdOrdem": "001001004004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-DIVERSOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10104005, "idPai": 10104, "CdOrdem": "001001004005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-FARINHAS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10104006, "idPai": 10104, "CdOrdem": "001001004006", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-FAROFA" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10104007, "idPai": 10104, "CdOrdem": "001001004007", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-INDUSTRIALIZADO" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10104008, "idPai": 10104, "CdOrdem": "001001004008", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-VAREJO" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10104009, "idPai": 10104, "CdOrdem": "001001004009", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-CESTAS" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10104, "idPai": 101, "CdOrdem": "001001004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-FARINACEOS" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 101, "idPai": 1, "CdOrdem": "001001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-CEREAIS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 10201001, "idPai": 10201, "CdOrdem": "001002001001", "PrMargem": 30.0, "CdComprador": 224, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-SOJA" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10201002, "idPai": 10201, "CdOrdem": "001002001002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-ESPECIAL" }], "Usuario": { "CdUsuario": 27, "NmUsuario": "VINICIUS BONIFACIO", "Email": "viniciusbonifacio@smalvorada.com" }, "CdEmpresa": 10, "id": 10201, "idPai": 102, "CdOrdem": "001002001", "PrMargem": 40.0, "CdComprador": 27, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-OLEOS" }], "Usuario": { "CdUsuario": 27, "NmUsuario": "VINICIUS BONIFACIO", "Email": "viniciusbonifacio@smalvorada.com" }, "CdEmpresa": 10, "id": 102, "idPai": 1, "CdOrdem": "001002", "PrMargem": 40.0, "CdComprador": 27, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-GORDUROSOS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10311001, "idPai": 10311, "CdOrdem": "001003011001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10311002, "idPai": 10311, "CdOrdem": "001003011002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10311005, "idPai": 10311, "CdOrdem": "001003011003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10311006, "idPai": 10311, "CdOrdem": "001003011004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10311, "idPai": 103, "CdOrdem": "001003011", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "11-SOPAS E CREMES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10312001, "idPai": 10312, "CdOrdem": "001003012001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10312002, "idPai": 10312, "CdOrdem": "001003012002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10312004, "idPai": 10312, "CdOrdem": "001003012003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10312005, "idPai": 10312, "CdOrdem": "001003012004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10312006, "idPai": 10312, "CdOrdem": "001003012005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10312, "idPai": 103, "CdOrdem": "001003012", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "12-RALADOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10313001, "idPai": 10313, "CdOrdem": "001003013001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10313002, "idPai": 10313, "CdOrdem": "001003013002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10313005, "idPai": 10313, "CdOrdem": "001003013003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10313006, "idPai": 10313, "CdOrdem": "001003013004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10313, "idPai": 103, "CdOrdem": "001003013", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "13-TEMPERO CALDOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10321001, "idPai": 10321, "CdOrdem": "001003021001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10321002, "idPai": 10321, "CdOrdem": "001003021002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10321004, "idPai": 10321, "CdOrdem": "001003021003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10321005, "idPai": 10321, "CdOrdem": "001003021004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10321006, "idPai": 10321, "CdOrdem": "001003021005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10321, "idPai": 103, "CdOrdem": "001003021", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "21-ALHO E CEBOLA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10322001, "idPai": 10322, "CdOrdem": "001003022001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10322002, "idPai": 10322, "CdOrdem": "001003022002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10322004, "idPai": 10322, "CdOrdem": "001003022003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10322005, "idPai": 10322, "CdOrdem": "001003022004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10322006, "idPai": 10322, "CdOrdem": "001003022005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10322, "idPai": 103, "CdOrdem": "001003022", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "22-ESPECIARIAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10323001, "idPai": 10323, "CdOrdem": "001003023001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10323002, "idPai": 10323, "CdOrdem": "001003023002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10323004, "idPai": 10323, "CdOrdem": "001003023003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10323005, "idPai": 10323, "CdOrdem": "001003023004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10323006, "idPai": 10323, "CdOrdem": "001003023005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10323, "idPai": 103, "CdOrdem": "001003023", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "23-CONDIMENTOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10301001, "idPai": 10301, "CdOrdem": "001003001001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10301002, "idPai": 10301, "CdOrdem": "001003001002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10301004, "idPai": 10301, "CdOrdem": "001003001003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10301005, "idPai": 10301, "CdOrdem": "001003001004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10301006, "idPai": 10301, "CdOrdem": "001003001005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10301, "idPai": 103, "CdOrdem": "001003001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-VEGETAIS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10302001, "idPai": 10302, "CdOrdem": "001003002001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10302002, "idPai": 10302, "CdOrdem": "001003002002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10302004, "idPai": 10302, "CdOrdem": "001003002003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10302005, "idPai": 10302, "CdOrdem": "001003002004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10302006, "idPai": 10302, "CdOrdem": "001003002005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10302, "idPai": 103, "CdOrdem": "001003002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-AZEITONA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10303001, "idPai": 10303, "CdOrdem": "001003003001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10303002, "idPai": 10303, "CdOrdem": "001003003002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10303005, "idPai": 10303, "CdOrdem": "001003003003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10303, "idPai": 103, "CdOrdem": "001003003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-SALSICHAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10304001, "idPai": 10304, "CdOrdem": "001003004001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10304002, "idPai": 10304, "CdOrdem": "001003004002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10304004, "idPai": 10304, "CdOrdem": "001003004003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10304005, "idPai": 10304, "CdOrdem": "001003004004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10304006, "idPai": 10304, "CdOrdem": "001003004005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10304, "idPai": 103, "CdOrdem": "001003004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-ATOMATADOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10305001, "idPai": 10305, "CdOrdem": "001003005001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10305002, "idPai": 10305, "CdOrdem": "001003005002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10305004, "idPai": 10305, "CdOrdem": "001003005003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10305005, "idPai": 10305, "CdOrdem": "001003005004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10305006, "idPai": 10305, "CdOrdem": "001003005005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10305, "idPai": 103, "CdOrdem": "001003005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-MOLHOS SABORIZADOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10306001, "idPai": 10306, "CdOrdem": "001003006001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10306002, "idPai": 10306, "CdOrdem": "001003006002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10306004, "idPai": 10306, "CdOrdem": "001003006003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10306005, "idPai": 10306, "CdOrdem": "001003006004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10306006, "idPai": 10306, "CdOrdem": "001003006005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10306, "idPai": 103, "CdOrdem": "001003006", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-PEIXES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10307001, "idPai": 10307, "CdOrdem": "001003007001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10307002, "idPai": 10307, "CdOrdem": "001003007002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10307004, "idPai": 10307, "CdOrdem": "001003007003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10307005, "idPai": 10307, "CdOrdem": "001003007004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10307, "idPai": 103, "CdOrdem": "001003007", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-PRATOS PRONTOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10308001, "idPai": 10308, "CdOrdem": "001003008001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10308002, "idPai": 10308, "CdOrdem": "001003008002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10308004, "idPai": 10308, "CdOrdem": "001003008003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10308005, "idPai": 10308, "CdOrdem": "001003008004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10308006, "idPai": 10308, "CdOrdem": "001003008005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10308, "idPai": 103, "CdOrdem": "001003008", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-MAIONESES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10309001, "idPai": 10309, "CdOrdem": "001003009001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10309002, "idPai": 10309, "CdOrdem": "001003009002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10309004, "idPai": 10309, "CdOrdem": "001003009003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10309005, "idPai": 10309, "CdOrdem": "001003009004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10309006, "idPai": 10309, "CdOrdem": "001003009005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10309, "idPai": 103, "CdOrdem": "001003009", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-AZEITES DE OLIVA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10310001, "idPai": 10310, "CdOrdem": "001003010001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10310005, "idPai": 10310, "CdOrdem": "001003010002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10310, "idPai": 103, "CdOrdem": "001003010", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "10-OLEO COMPOSTO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10314001, "idPai": 10314, "CdOrdem": "001003014001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10314002, "idPai": 10314, "CdOrdem": "001003014002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10314004, "idPai": 10314, "CdOrdem": "001003014003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10314005, "idPai": 10314, "CdOrdem": "001003014004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10314006, "idPai": 10314, "CdOrdem": "001003014005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10314, "idPai": 103, "CdOrdem": "001003014", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "14-TEMPERO ESPECIAL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10315001, "idPai": 10315, "CdOrdem": "001003015001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10315002, "idPai": 10315, "CdOrdem": "001003015002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10315004, "idPai": 10315, "CdOrdem": "001003015003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10315005, "idPai": 10315, "CdOrdem": "001003015004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10315006, "idPai": 10315, "CdOrdem": "001003015005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10315, "idPai": 103, "CdOrdem": "001003015", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "15-TEMPERO PIMENTA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10316001, "idPai": 10316, "CdOrdem": "001003016001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10316002, "idPai": 10316, "CdOrdem": "001003016002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10316004, "idPai": 10316, "CdOrdem": "001003016003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10316005, "idPai": 10316, "CdOrdem": "001003016004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10316006, "idPai": 10316, "CdOrdem": "001003016005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10316, "idPai": 103, "CdOrdem": "001003016", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "16-TEMPERO PASTA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10317001, "idPai": 10317, "CdOrdem": "001003017001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10317002, "idPai": 10317, "CdOrdem": "001003017002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10317004, "idPai": 10317, "CdOrdem": "001003017003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10317005, "idPai": 10317, "CdOrdem": "001003017004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10317006, "idPai": 10317, "CdOrdem": "001003017005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10317, "idPai": 103, "CdOrdem": "001003017", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "17-TEMPEROS DIVERSOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10318001, "idPai": 10318, "CdOrdem": "001003018001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10318002, "idPai": 10318, "CdOrdem": "001003018002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10318004, "idPai": 10318, "CdOrdem": "001003018003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10318005, "idPai": 10318, "CdOrdem": "001003018004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10318006, "idPai": 10318, "CdOrdem": "001003018005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10318, "idPai": 103, "CdOrdem": "001003018", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "18-TEMPERO SAL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10319001, "idPai": 10319, "CdOrdem": "001003019001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10319002, "idPai": 10319, "CdOrdem": "001003019002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10319004, "idPai": 10319, "CdOrdem": "001003019003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10319005, "idPai": 10319, "CdOrdem": "001003019004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10319006, "idPai": 10319, "CdOrdem": "001003019005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10319, "idPai": 103, "CdOrdem": "001003019", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "19-TEMPEROS LIQUIDO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10320001, "idPai": 10320, "CdOrdem": "001003020001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10320002, "idPai": 10320, "CdOrdem": "001003020002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10320004, "idPai": 10320, "CdOrdem": "001003020003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10320005, "idPai": 10320, "CdOrdem": "001003020004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10320006, "idPai": 10320, "CdOrdem": "001003020005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10320, "idPai": 103, "CdOrdem": "001003020", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "20-TEMPEROS MOLHOS" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 103, "idPai": 1, "CdOrdem": "001003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-CONSERVAS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10401001, "idPai": 10401, "CdOrdem": "001004001001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10401002, "idPai": 10401, "CdOrdem": "001004001002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10401004, "idPai": 10401, "CdOrdem": "001004001003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10401005, "idPai": 10401, "CdOrdem": "001004001004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10401006, "idPai": 10401, "CdOrdem": "001004001005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10401, "idPai": 104, "CdOrdem": "001004001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-OVOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10402001, "idPai": 10402, "CdOrdem": "001004002001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10402002, "idPai": 10402, "CdOrdem": "001004002002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10402004, "idPai": 10402, "CdOrdem": "001004002003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10402005, "idPai": 10402, "CdOrdem": "001004002004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10402006, "idPai": 10402, "CdOrdem": "001004002005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10402, "idPai": 104, "CdOrdem": "001004002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-SEMOLA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10403001, "idPai": 10403, "CdOrdem": "001004003001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10403002, "idPai": 10403, "CdOrdem": "001004003002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10403004, "idPai": 10403, "CdOrdem": "001004003003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10403005, "idPai": 10403, "CdOrdem": "001004003004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10403006, "idPai": 10403, "CdOrdem": "001004003005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10403, "idPai": 104, "CdOrdem": "001004003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-GRAN DURO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10404001, "idPai": 10404, "CdOrdem": "001004004001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10404002, "idPai": 10404, "CdOrdem": "001004004002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10404004, "idPai": 10404, "CdOrdem": "001004004003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10404005, "idPai": 10404, "CdOrdem": "001004004004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10404006, "idPai": 10404, "CdOrdem": "001004004005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10404, "idPai": 104, "CdOrdem": "001004004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-ESPECIAIS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10405001, "idPai": 10405, "CdOrdem": "001004005001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10405002, "idPai": 10405, "CdOrdem": "001004005002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10405004, "idPai": 10405, "CdOrdem": "001004005003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10405005, "idPai": 10405, "CdOrdem": "001004005004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10405006, "idPai": 10405, "CdOrdem": "001004005005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10405, "idPai": 104, "CdOrdem": "001004005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-INSTANTANEA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10406001, "idPai": 10406, "CdOrdem": "001004006001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10406002, "idPai": 10406, "CdOrdem": "001004006002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10406004, "idPai": 10406, "CdOrdem": "001004006003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10406005, "idPai": 10406, "CdOrdem": "001004006004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10406006, "idPai": 10406, "CdOrdem": "001004006005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10406, "idPai": 104, "CdOrdem": "001004006", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-PRATOS PRONTOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10407001, "idPai": 10407, "CdOrdem": "001004007001", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10407002, "idPai": 10407, "CdOrdem": "001004007002", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10407004, "idPai": 10407, "CdOrdem": "001004007003", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10407005, "idPai": 10407, "CdOrdem": "001004007004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10407006, "idPai": 10407, "CdOrdem": "001004007005", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 10407, "idPai": 104, "CdOrdem": "001004007", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-ORIENTAL" }], "Usuario": { "CdUsuario": 5, "NmUsuario": "Tiago Cunha", "Email": null }, "CdEmpresa": 10, "id": 104, "idPai": 1, "CdOrdem": "001004", "PrMargem": 40.0, "CdComprador": 5, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-MASSAS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 197, "NmUsuario": "Thiago Amaral", "Email": null }, "CdEmpresa": 10, "id": 10501001, "idPai": 10501, "CdOrdem": "001005001001", "PrMargem": 40.0, "CdComprador": 197, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 197, "NmUsuario": "Thiago Amaral", "Email": null }, "CdEmpresa": 10, "id": 10501, "idPai": 105, "CdOrdem": "001005001", "PrMargem": 40.0, "CdComprador": 197, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-BASICAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 197, "NmUsuario": "Thiago Amaral", "Email": null }, "CdEmpresa": 10, "id": 10502001, "idPai": 10502, "CdOrdem": "001005002001", "PrMargem": 40.0, "CdComprador": 197, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 197, "NmUsuario": "Thiago Amaral", "Email": null }, "CdEmpresa": 10, "id": 10502, "idPai": 105, "CdOrdem": "001005002", "PrMargem": 40.0, "CdComprador": 197, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-NATALINAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 197, "NmUsuario": "Thiago Amaral", "Email": null }, "CdEmpresa": 10, "id": 10503001, "idPai": 10503, "CdOrdem": "001005003001", "PrMargem": 40.0, "CdComprador": 197, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 197, "NmUsuario": "Thiago Amaral", "Email": null }, "CdEmpresa": 10, "id": 10503, "idPai": 105, "CdOrdem": "001005003", "PrMargem": 40.0, "CdComprador": 197, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-OUTRAS" }], "Usuario": { "CdUsuario": 197, "NmUsuario": "Thiago Amaral", "Email": null }, "CdEmpresa": 10, "id": 105, "idPai": 1, "CdOrdem": "001005", "PrMargem": 40.0, "CdComprador": 197, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-CESTAS" }], "Usuario": { "CdUsuario": 27, "NmUsuario": "VINICIUS BONIFACIO", "Email": "viniciusbonifacio@smalvorada.com" }, "CdEmpresa": 10, "id": 1, "idPai": null, "CdOrdem": "001", "PrMargem": 40.0, "CdComprador": 27, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-MERCEARIA SALGADA" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20111001, "idPai": 20111, "CdOrdem": "002001011001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20111002, "idPai": 20111, "CdOrdem": "002001011002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20111004, "idPai": 20111, "CdOrdem": "002001011003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20111005, "idPai": 20111, "CdOrdem": "002001011004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20111, "idPai": 201, "CdOrdem": "002001011", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "11-RECHEADOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20112001, "idPai": 20112, "CdOrdem": "002001012001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20112, "idPai": 201, "CdOrdem": "002001012", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "12-GRANEL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20101001, "idPai": 20101, "CdOrdem": "002001001001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20101002, "idPai": 20101, "CdOrdem": "002001001002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20101004, "idPai": 20101, "CdOrdem": "002001001003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20101005, "idPai": 20101, "CdOrdem": "002001001004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20101, "idPai": 201, "CdOrdem": "002001001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-LINHA SALGADA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20102001, "idPai": 20102, "CdOrdem": "002001002001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20102002, "idPai": 20102, "CdOrdem": "002001002002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20102004, "idPai": 20102, "CdOrdem": "002001002003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20102005, "idPai": 20102, "CdOrdem": "002001002004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20102, "idPai": 201, "CdOrdem": "002001002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-LINHA DOCE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20103001, "idPai": 20103, "CdOrdem": "002001003001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20103002, "idPai": 20103, "CdOrdem": "002001003002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20103004, "idPai": 20103, "CdOrdem": "002001003003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20103005, "idPai": 20103, "CdOrdem": "002001003004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20103, "idPai": 201, "CdOrdem": "002001003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-APERITIVOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20104001, "idPai": 20104, "CdOrdem": "002001004001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20104002, "idPai": 20104, "CdOrdem": "002001004002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20104004, "idPai": 20104, "CdOrdem": "002001004003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20104005, "idPai": 20104, "CdOrdem": "002001004004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20104, "idPai": 201, "CdOrdem": "002001004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-COOKIES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20105001, "idPai": 20105, "CdOrdem": "002001005001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20105002, "idPai": 20105, "CdOrdem": "002001005002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20105004, "idPai": 20105, "CdOrdem": "002001005003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20105005, "idPai": 20105, "CdOrdem": "002001005004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20105, "idPai": 201, "CdOrdem": "002001005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-POLVILHO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20106001, "idPai": 20106, "CdOrdem": "002001006001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20106002, "idPai": 20106, "CdOrdem": "002001006002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20106004, "idPai": 20106, "CdOrdem": "002001006003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20106005, "idPai": 20106, "CdOrdem": "002001006004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20106, "idPai": 201, "CdOrdem": "002001006", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-COBERTOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20107001, "idPai": 20107, "CdOrdem": "002001007001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20107002, "idPai": 20107, "CdOrdem": "002001007002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20107004, "idPai": 20107, "CdOrdem": "002001007003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20107005, "idPai": 20107, "CdOrdem": "002001007004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20107, "idPai": 201, "CdOrdem": "002001007", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-TORRADAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20108001, "idPai": 20108, "CdOrdem": "002001008001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20108005, "idPai": 20108, "CdOrdem": "002001008002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20108, "idPai": 201, "CdOrdem": "002001008", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-PETROPOLIS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20109001, "idPai": 20109, "CdOrdem": "002001009001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20109002, "idPai": 20109, "CdOrdem": "002001009002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20109004, "idPai": 20109, "CdOrdem": "002001009003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20109005, "idPai": 20109, "CdOrdem": "002001009004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20109, "idPai": 201, "CdOrdem": "002001009", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-ROSCAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20110001, "idPai": 20110, "CdOrdem": "002001010001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20110002, "idPai": 20110, "CdOrdem": "002001010002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20110004, "idPai": 20110, "CdOrdem": "002001010003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20110005, "idPai": 20110, "CdOrdem": "002001010004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20110, "idPai": 201, "CdOrdem": "002001010", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "10-WAFFER" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 201, "idPai": 2, "CdOrdem": "002001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-BISCOITOS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 20201001, "idPai": 20201, "CdOrdem": "002002001001", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 20201002, "idPai": 20201, "CdOrdem": "002002001002", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 20201004, "idPai": 20201, "CdOrdem": "002002001003", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 20201005, "idPai": 20201, "CdOrdem": "002002001004", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 20201, "idPai": 202, "CdOrdem": "002002001", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-BOLOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 20202001, "idPai": 20202, "CdOrdem": "002002002001", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 20202002, "idPai": 20202, "CdOrdem": "002002002002", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 20202004, "idPai": 20202, "CdOrdem": "002002002003", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 20202005, "idPai": 20202, "CdOrdem": "002002002004", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 20202, "idPai": 202, "CdOrdem": "002002002", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-PAES" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 202, "idPai": 2, "CdOrdem": "002002", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-PANIFICACAO" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20301001, "idPai": 20301, "CdOrdem": "002003001001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20301002, "idPai": 20301, "CdOrdem": "002003001002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20301004, "idPai": 20301, "CdOrdem": "002003001003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20301005, "idPai": 20301, "CdOrdem": "002003001004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20301, "idPai": 203, "CdOrdem": "002003001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-CAFES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20302001, "idPai": 20302, "CdOrdem": "002003002001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20302002, "idPai": 20302, "CdOrdem": "002003002002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20302005, "idPai": 20302, "CdOrdem": "002003002003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20302, "idPai": 203, "CdOrdem": "002003002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-MINGAU" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20303001, "idPai": 20303, "CdOrdem": "002003003001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20303002, "idPai": 20303, "CdOrdem": "002003003002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20303005, "idPai": 20303, "CdOrdem": "002003003003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20303, "idPai": 203, "CdOrdem": "002003003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-CEREAL MATINAL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20304001, "idPai": 20304, "CdOrdem": "002003004001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20304002, "idPai": 20304, "CdOrdem": "002003004002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20304004, "idPai": 20304, "CdOrdem": "002003004003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20304005, "idPai": 20304, "CdOrdem": "002003004004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20304, "idPai": 203, "CdOrdem": "002003004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-PAPINHA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20305001, "idPai": 20305, "CdOrdem": "002003005001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20305002, "idPai": 20305, "CdOrdem": "002003005002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20305004, "idPai": 20305, "CdOrdem": "002003005003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20305005, "idPai": 20305, "CdOrdem": "002003005004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20305, "idPai": 203, "CdOrdem": "002003005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-CHA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20306001, "idPai": 20306, "CdOrdem": "002003006001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20306002, "idPai": 20306, "CdOrdem": "002003006002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20306003, "idPai": 20306, "CdOrdem": "002003006003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-ESPECIAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20306005, "idPai": 20306, "CdOrdem": "002003006004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20306006, "idPai": 20306, "CdOrdem": "002003006005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20306, "idPai": 203, "CdOrdem": "002003006", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-LEITE EM PO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20307001, "idPai": 20307, "CdOrdem": "002003007001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20307002, "idPai": 20307, "CdOrdem": "002003007002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20307004, "idPai": 20307, "CdOrdem": "002003007003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20307005, "idPai": 20307, "CdOrdem": "002003007004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20307006, "idPai": 20307, "CdOrdem": "002003007005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20307, "idPai": 203, "CdOrdem": "002003007", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-ALIMENTO NUTRICIONAL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20308001, "idPai": 20308, "CdOrdem": "002003008001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20308002, "idPai": 20308, "CdOrdem": "002003008002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20308004, "idPai": 20308, "CdOrdem": "002003008003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20308005, "idPai": 20308, "CdOrdem": "002003008004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20308006, "idPai": 20308, "CdOrdem": "002003008005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20308, "idPai": 203, "CdOrdem": "002003008", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-CACAU&CHOCOLATE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20309001, "idPai": 20309, "CdOrdem": "002003009001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20309002, "idPai": 20309, "CdOrdem": "002003009002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20309004, "idPai": 20309, "CdOrdem": "002003009003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20309005, "idPai": 20309, "CdOrdem": "002003009004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20309006, "idPai": 20309, "CdOrdem": "002003009005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20309, "idPai": 203, "CdOrdem": "002003009", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-ALIMENTO PO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20310001, "idPai": 20310, "CdOrdem": "002003010001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20310002, "idPai": 20310, "CdOrdem": "002003010002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20310004, "idPai": 20310, "CdOrdem": "002003010003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20310005, "idPai": 20310, "CdOrdem": "002003010004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20310, "idPai": 203, "CdOrdem": "002003010", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "10-ALIMENTO LIQ" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 203, "idPai": 2, "CdOrdem": "002003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-MATINAIS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20411001, "idPai": 20411, "CdOrdem": "002004011001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20411002, "idPai": 20411, "CdOrdem": "002004011002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20411004, "idPai": 20411, "CdOrdem": "002004011003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20411005, "idPai": 20411, "CdOrdem": "002004011004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20411006, "idPai": 20411, "CdOrdem": "002004011005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20411, "idPai": 204, "CdOrdem": "002004011", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "11-FRUTAS SECAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20412001, "idPai": 20412, "CdOrdem": "002004012001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20412002, "idPai": 20412, "CdOrdem": "002004012002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20412004, "idPai": 20412, "CdOrdem": "002004012003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20412005, "idPai": 20412, "CdOrdem": "002004012004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20412006, "idPai": 20412, "CdOrdem": "002004012005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20412, "idPai": 204, "CdOrdem": "002004012", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "12-DOCES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20413001, "idPai": 20413, "CdOrdem": "002004013001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20413002, "idPai": 20413, "CdOrdem": "002004013002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20413006, "idPai": 20413, "CdOrdem": "002004013003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20413, "idPai": 204, "CdOrdem": "002004013", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "13-ESSENCIAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20401001, "idPai": 20401, "CdOrdem": "002004001001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-BASICOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20401002, "idPai": 20401, "CdOrdem": "002004001002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-ESPECIAIS" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20401, "idPai": 204, "CdOrdem": "002004001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-ACUCAR" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20402001, "idPai": 20402, "CdOrdem": "002004002001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20402002, "idPai": 20402, "CdOrdem": "002004002002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20402004, "idPai": 20402, "CdOrdem": "002004002003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20402005, "idPai": 20402, "CdOrdem": "002004002004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20402006, "idPai": 20402, "CdOrdem": "002004002005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20402, "idPai": 204, "CdOrdem": "002004002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-MISTURAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20403001, "idPai": 20403, "CdOrdem": "002004003001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20403002, "idPai": 20403, "CdOrdem": "002004003002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20403004, "idPai": 20403, "CdOrdem": "002004003003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20403005, "idPai": 20403, "CdOrdem": "002004003004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20403006, "idPai": 20403, "CdOrdem": "002004003005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20403, "idPai": 204, "CdOrdem": "002004003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-SOBREMESAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20404001, "idPai": 20404, "CdOrdem": "002004004001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20404002, "idPai": 20404, "CdOrdem": "002004004002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20404004, "idPai": 20404, "CdOrdem": "002004004003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20404005, "idPai": 20404, "CdOrdem": "002004004004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20404006, "idPai": 20404, "CdOrdem": "002004004005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20404, "idPai": 204, "CdOrdem": "002004004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-CALDAS&CONFEITOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20405001, "idPai": 20405, "CdOrdem": "002004005001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20405002, "idPai": 20405, "CdOrdem": "002004005002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20405004, "idPai": 20405, "CdOrdem": "002004005003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20405005, "idPai": 20405, "CdOrdem": "002004005004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20405006, "idPai": 20405, "CdOrdem": "002004005005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20405, "idPai": 204, "CdOrdem": "002004005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-DERIVADOS LEITE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20406001, "idPai": 20406, "CdOrdem": "002004006001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20406002, "idPai": 20406, "CdOrdem": "002004006002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20406004, "idPai": 20406, "CdOrdem": "002004006003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20406005, "idPai": 20406, "CdOrdem": "002004006004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20406006, "idPai": 20406, "CdOrdem": "002004006005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20406, "idPai": 204, "CdOrdem": "002004006", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-DERIVADOS SOJA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20407001, "idPai": 20407, "CdOrdem": "002004007001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20407002, "idPai": 20407, "CdOrdem": "002004007002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20407004, "idPai": 20407, "CdOrdem": "002004007003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20407005, "idPai": 20407, "CdOrdem": "002004007004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20407006, "idPai": 20407, "CdOrdem": "002004007005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20407, "idPai": 204, "CdOrdem": "002004007", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-DERIVADOS COCO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20408001, "idPai": 20408, "CdOrdem": "002004008001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20408002, "idPai": 20408, "CdOrdem": "002004008002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20408004, "idPai": 20408, "CdOrdem": "002004008003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20408005, "idPai": 20408, "CdOrdem": "002004008004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20408006, "idPai": 20408, "CdOrdem": "002004008005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20408, "idPai": 204, "CdOrdem": "002004008", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-GELEIAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20409001, "idPai": 20409, "CdOrdem": "002004009001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20409002, "idPai": 20409, "CdOrdem": "002004009002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20409004, "idPai": 20409, "CdOrdem": "002004009003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20409005, "idPai": 20409, "CdOrdem": "002004009004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20409, "idPai": 204, "CdOrdem": "002004009", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-MELACO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20410001, "idPai": 20410, "CdOrdem": "002004010001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20410002, "idPai": 20410, "CdOrdem": "002004010002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20410004, "idPai": 20410, "CdOrdem": "002004010003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20410005, "idPai": 20410, "CdOrdem": "002004010004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20410006, "idPai": 20410, "CdOrdem": "002004010005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20410, "idPai": 204, "CdOrdem": "002004010", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "10-FRUTAS CALDAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20414001, "idPai": 20414, "CdOrdem": "002004014001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20414002, "idPai": 20414, "CdOrdem": "002004014002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20414006, "idPai": 20414, "CdOrdem": "002004014003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20414, "idPai": 204, "CdOrdem": "002004014", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "14-FERMENTOS" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 204, "idPai": 2, "CdOrdem": "002004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-DOCES E COMPOTAS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20501001, "idPai": 20501, "CdOrdem": "002005001001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20501002, "idPai": 20501, "CdOrdem": "002005001002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20501004, "idPai": 20501, "CdOrdem": "002005001003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20501005, "idPai": 20501, "CdOrdem": "002005001004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20501006, "idPai": 20501, "CdOrdem": "002005001005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20501, "idPai": 205, "CdOrdem": "002005001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-CHOCOLATES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20502001, "idPai": 20502, "CdOrdem": "002005002001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20502002, "idPai": 20502, "CdOrdem": "002005002002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20502004, "idPai": 20502, "CdOrdem": "002005002003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20502005, "idPai": 20502, "CdOrdem": "002005002004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20502, "idPai": 205, "CdOrdem": "002005002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CONFEITOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20503001, "idPai": 20503, "CdOrdem": "002005003001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20503002, "idPai": 20503, "CdOrdem": "002005003002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20503004, "idPai": 20503, "CdOrdem": "002005003003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20503005, "idPai": 20503, "CdOrdem": "002005003004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20503, "idPai": 205, "CdOrdem": "002005003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-APERITIVOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20504001, "idPai": 20504, "CdOrdem": "002005004001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20504002, "idPai": 20504, "CdOrdem": "002005004002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20504004, "idPai": 20504, "CdOrdem": "002005004003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20504005, "idPai": 20504, "CdOrdem": "002005004004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20504, "idPai": 205, "CdOrdem": "002005004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-SNACKS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20505001, "idPai": 20505, "CdOrdem": "002005005001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-GRANEL" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20505002, "idPai": 20505, "CdOrdem": "002005005002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-EMBALADOS" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20505, "idPai": 205, "CdOrdem": "002005005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-DELICATESSEN" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 205, "idPai": 2, "CdOrdem": "002005", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BOMBONIERE" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20601001, "idPai": 20601, "CdOrdem": "002006001001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20601002, "idPai": 20601, "CdOrdem": "002006001002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20601, "idPai": 206, "CdOrdem": "002006001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-ADOCANTES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20602001, "idPai": 20602, "CdOrdem": "002006002001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20602002, "idPai": 20602, "CdOrdem": "002006002002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20602004, "idPai": 20602, "CdOrdem": "002006002003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20602005, "idPai": 20602, "CdOrdem": "002006002004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20602, "idPai": 206, "CdOrdem": "002006002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-LINHA NATURAL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20603001, "idPai": 20603, "CdOrdem": "002006003001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-ORIENTAL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20603, "idPai": 206, "CdOrdem": "002006003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-CULINARIA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20604001, "idPai": 20604, "CdOrdem": "002006004001", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20604002, "idPai": 20604, "CdOrdem": "002006004002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20604004, "idPai": 20604, "CdOrdem": "002006004003", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20604005, "idPai": 20604, "CdOrdem": "002006004004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 20604, "idPai": 206, "CdOrdem": "002006004", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-BARRINHAS" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 206, "idPai": 2, "CdOrdem": "002006", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-VIDA SAUDAVEL" }], "Usuario": { "CdUsuario": 13, "NmUsuario": "Wanderson Batista", "Email": "bebidas@smalvorada.com" }, "CdEmpresa": 10, "id": 2, "idPai": null, "CdOrdem": "002", "PrMargem": 40.0, "CdComprador": 13, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-MERCEARIA DOCE" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30111001, "idPai": 30111, "CdOrdem": "003001011001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30111002, "idPai": 30111, "CdOrdem": "003001011002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30111004, "idPai": 30111, "CdOrdem": "003001011003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30111005, "idPai": 30111, "CdOrdem": "003001011004", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30111006, "idPai": 30111, "CdOrdem": "003001011005", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30111, "idPai": 301, "CdOrdem": "003001011", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "11-REFRESCO PO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30112001, "idPai": 30112, "CdOrdem": "003001012001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30112002, "idPai": 30112, "CdOrdem": "003001012002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30112003, "idPai": 30112, "CdOrdem": "003001012003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-COCO" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30112004, "idPai": 30112, "CdOrdem": "003001012004", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-SABORIZADA" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30112005, "idPai": 30112, "CdOrdem": "003001012005", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30112, "idPai": 301, "CdOrdem": "003001012", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "12-AGUAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30113001, "idPai": 30113, "CdOrdem": "003001013001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30113002, "idPai": 30113, "CdOrdem": "003001013002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30113005, "idPai": 30113, "CdOrdem": "003001013003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30113, "idPai": 301, "CdOrdem": "003001013", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "13-REFRIGERANTE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30101001, "idPai": 30101, "CdOrdem": "003001001001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30101002, "idPai": 30101, "CdOrdem": "003001001002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30101005, "idPai": 30101, "CdOrdem": "003001001003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30101, "idPai": 301, "CdOrdem": "003001001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-ENERGETICO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30102001, "idPai": 30102, "CdOrdem": "003001002001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30102002, "idPai": 30102, "CdOrdem": "003001002002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30102004, "idPai": 30102, "CdOrdem": "003001002003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30102005, "idPai": 30102, "CdOrdem": "003001002004", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30102, "idPai": 301, "CdOrdem": "003001002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-NECTAR PRONTO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30103001, "idPai": 30103, "CdOrdem": "003001003001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30103002, "idPai": 30103, "CdOrdem": "003001003002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30103004, "idPai": 30103, "CdOrdem": "003001003003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30103005, "idPai": 30103, "CdOrdem": "003001003004", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30103, "idPai": 301, "CdOrdem": "003001003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-SUCO PRONTO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30104001, "idPai": 30104, "CdOrdem": "003001004001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30104002, "idPai": 30104, "CdOrdem": "003001004002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30104004, "idPai": 30104, "CdOrdem": "003001004003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30104005, "idPai": 30104, "CdOrdem": "003001004004", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30104, "idPai": 301, "CdOrdem": "003001004", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-REFRESCO PRONTO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30105001, "idPai": 30105, "CdOrdem": "003001005001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30105002, "idPai": 30105, "CdOrdem": "003001005002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30105005, "idPai": 30105, "CdOrdem": "003001005003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30105, "idPai": 301, "CdOrdem": "003001005", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-CHA PRONTO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30106001, "idPai": 30106, "CdOrdem": "003001006001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30106002, "idPai": 30106, "CdOrdem": "003001006002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30106005, "idPai": 30106, "CdOrdem": "003001006003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30106, "idPai": 301, "CdOrdem": "003001006", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-SUCO CONCENTRADO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30107001, "idPai": 30107, "CdOrdem": "003001007001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30107002, "idPai": 30107, "CdOrdem": "003001007002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30107005, "idPai": 30107, "CdOrdem": "003001007003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30107006, "idPai": 30107, "CdOrdem": "003001007004", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30107, "idPai": 301, "CdOrdem": "003001007", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-XAROPE CONCENTRADO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30108001, "idPai": 30108, "CdOrdem": "003001008001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30108002, "idPai": 30108, "CdOrdem": "003001008002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30108004, "idPai": 30108, "CdOrdem": "003001008003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30108005, "idPai": 30108, "CdOrdem": "003001008004", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30108, "idPai": 301, "CdOrdem": "003001008", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-BEBIDA MISTA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30109001, "idPai": 30109, "CdOrdem": "003001009001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30109002, "idPai": 30109, "CdOrdem": "003001009002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30109005, "idPai": 30109, "CdOrdem": "003001009003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30109, "idPai": 301, "CdOrdem": "003001009", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-BEBIDA SOJA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30110001, "idPai": 30110, "CdOrdem": "003001010001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30110002, "idPai": 30110, "CdOrdem": "003001010002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30110005, "idPai": 30110, "CdOrdem": "003001010003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30110, "idPai": 301, "CdOrdem": "003001010", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "10-BEBIDA ARROZ" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 301, "idPai": 3, "CdOrdem": "003001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NAO ALCOOLICAS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30201001, "idPai": 30201, "CdOrdem": "003002001001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30201002, "idPai": 30201, "CdOrdem": "003002001002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30201004, "idPai": 30201, "CdOrdem": "003002001003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30201005, "idPai": 30201, "CdOrdem": "003002001004", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30201, "idPai": 302, "CdOrdem": "003002001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-CERVEJA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30202001, "idPai": 30202, "CdOrdem": "003002002001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30202002, "idPai": 30202, "CdOrdem": "003002002002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30202, "idPai": 302, "CdOrdem": "003002002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-AGUARDENTES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30203001, "idPai": 30203, "CdOrdem": "003002003001", "PrMargem": 50.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30203002, "idPai": 30203, "CdOrdem": "003002003002", "PrMargem": 50.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30203, "idPai": 302, "CdOrdem": "003002003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-APERITIVOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30204001, "idPai": 30204, "CdOrdem": "003002004001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30204002, "idPai": 30204, "CdOrdem": "003002004002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30204, "idPai": 302, "CdOrdem": "003002004", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-CONHAQUE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30205001, "idPai": 30205, "CdOrdem": "003002005001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30205002, "idPai": 30205, "CdOrdem": "003002005002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30205, "idPai": 302, "CdOrdem": "003002005", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-DESTILADO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30206001, "idPai": 30206, "CdOrdem": "003002006001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30206002, "idPai": 30206, "CdOrdem": "003002006002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30206, "idPai": 302, "CdOrdem": "003002006", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-VODCA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30207001, "idPai": 30207, "CdOrdem": "003002007001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30207002, "idPai": 30207, "CdOrdem": "003002007002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30207, "idPai": 302, "CdOrdem": "003002007", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-WHISKY" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30208001, "idPai": 30208, "CdOrdem": "003002008001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30208002, "idPai": 30208, "CdOrdem": "003002008002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30208, "idPai": 302, "CdOrdem": "003002008", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-LICORES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30209001, "idPai": 30209, "CdOrdem": "003002009001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30209002, "idPai": 30209, "CdOrdem": "003002009002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30209, "idPai": 302, "CdOrdem": "003002009", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-BATIDA" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 302, "idPai": 3, "CdOrdem": "003002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-ALCOOLICAS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30301001, "idPai": 30301, "CdOrdem": "003003001001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30301002, "idPai": 30301, "CdOrdem": "003003001002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30301, "idPai": 303, "CdOrdem": "003003001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-BRANCO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30302001, "idPai": 30302, "CdOrdem": "003003002001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30302002, "idPai": 30302, "CdOrdem": "003003002002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30302, "idPai": 303, "CdOrdem": "003003002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-TINTO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30303001, "idPai": 30303, "CdOrdem": "003003003001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30303002, "idPai": 30303, "CdOrdem": "003003003002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30303, "idPai": 303, "CdOrdem": "003003003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-ROSE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30304001, "idPai": 30304, "CdOrdem": "003003004001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30304002, "idPai": 30304, "CdOrdem": "003003004002", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }, { "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30304005, "idPai": 30304, "CdOrdem": "003003004003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-BAIXOS TEORES" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30304, "idPai": 303, "CdOrdem": "003003004", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-GASEIFICADO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30305001, "idPai": 30305, "CdOrdem": "003003005001", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 30305, "idPai": 303, "CdOrdem": "003003005", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-POPULARES" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 303, "idPai": 3, "CdOrdem": "003003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-VINHOS" }], "Usuario": { "CdUsuario": 215, "NmUsuario": "Alexandre Martins", "Email": null }, "CdEmpresa": 10, "id": 3, "idPai": null, "CdOrdem": "003", "PrMargem": 40.0, "CdComprador": 215, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-MERCEARIA LIQUIDA" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 144, "NmUsuario": "Renato Barros", "Email": "compras4@smalvorada.com" }, "CdEmpresa": 10, "id": 40201001, "idPai": 40201, "CdOrdem": "004002001001", "PrMargem": 60.0, "CdComprador": 144, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }, { "children": [], "Usuario": { "CdUsuario": 144, "NmUsuario": "Renato Barros", "Email": "compras4@smalvorada.com" }, "CdEmpresa": 10, "id": 40201002, "idPai": 40201, "CdOrdem": "004002001002", "PrMargem": 60.0, "CdComprador": 144, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CURATIVOS" }], "Usuario": { "CdUsuario": 144, "NmUsuario": "Renato Barros", "Email": "compras4@smalvorada.com" }, "CdEmpresa": 10, "id": 40201, "idPai": 402, "CdOrdem": "004002001", "PrMargem": 41.5, "CdComprador": 144, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-MEDICAMENTOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 144, "NmUsuario": "Renato Barros", "Email": "compras4@smalvorada.com" }, "CdEmpresa": 10, "id": 40202001, "idPai": 40202, "CdOrdem": "004002002001", "PrMargem": 60.0, "CdComprador": 144, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 144, "NmUsuario": "Renato Barros", "Email": "compras4@smalvorada.com" }, "CdEmpresa": 10, "id": 40202, "idPai": 402, "CdOrdem": "004002002", "PrMargem": 41.5, "CdComprador": 144, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-SUPLEMENTOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 144, "NmUsuario": "Renato Barros", "Email": "compras4@smalvorada.com" }, "CdEmpresa": 10, "id": 40203001, "idPai": 40203, "CdOrdem": "004002003001", "PrMargem": 60.0, "CdComprador": 144, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 144, "NmUsuario": "Renato Barros", "Email": "compras4@smalvorada.com" }, "CdEmpresa": 10, "id": 40203, "idPai": 402, "CdOrdem": "004002003", "PrMargem": 41.5, "CdComprador": 144, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-ESTERILIZACAO" }], "Usuario": { "CdUsuario": 144, "NmUsuario": "Renato Barros", "Email": "compras4@smalvorada.com" }, "CdEmpresa": 10, "id": 402, "idPai": 4, "CdOrdem": "004002", "PrMargem": 41.5, "CdComprador": 144, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-SAUDE" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40411001, "idPai": 40411, "CdOrdem": "004004011001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-CERA" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40411002, "idPai": 40411, "CdOrdem": "004004011002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-LIMPADOR" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40411, "idPai": 404, "CdOrdem": "004004011", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "11-PISOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40412001, "idPai": 40412, "CdOrdem": "004004012001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-CERA" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40412002, "idPai": 40412, "CdOrdem": "004004012002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-OLEO" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40412, "idPai": 404, "CdOrdem": "004004012", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "12-MOVEIS POLIMENTO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40413001, "idPai": 40413, "CdOrdem": "004004013001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40413, "idPai": 404, "CdOrdem": "004004013", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "13-CALCADOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40401001, "idPai": 40401, "CdOrdem": "004004001001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-PO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40401002, "idPai": 40401, "CdOrdem": "004004001002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-LIQUIDO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40401003, "idPai": 40401, "CdOrdem": "004004001003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-TABLETE" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40401, "idPai": 404, "CdOrdem": "004004001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-ROUPA LAVAGEM" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40402001, "idPai": 40402, "CdOrdem": "004004002001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-LIQUIDO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40402002, "idPai": 40402, "CdOrdem": "004004002002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-TABLETE" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40402, "idPai": 404, "CdOrdem": "004004002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-ROUPA AMACIANTE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40403001, "idPai": 40403, "CdOrdem": "004004003001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40403, "idPai": 404, "CdOrdem": "004004003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-ROUPA TIRA MANCHAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40404001, "idPai": 40404, "CdOrdem": "004004004001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-SOLUCOES" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40404, "idPai": 404, "CdOrdem": "004004004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-ROUPA CUIDADOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40405001, "idPai": 40405, "CdOrdem": "004004005001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-LAVA LOUCA" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40405002, "idPai": 40405, "CdOrdem": "004004005002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-SABOES" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40405003, "idPai": 40405, "CdOrdem": "004004005003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-SAPONACEO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40405004, "idPai": 40405, "CdOrdem": "004004005004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-LINHA MAQUINA" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40405, "idPai": 404, "CdOrdem": "004004005", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-COZINHA LOUCAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40406001, "idPai": 40406, "CdOrdem": "004004006001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-LIMPADOR" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40406002, "idPai": 40406, "CdOrdem": "004004006002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-DESENGORDURANTE" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40406, "idPai": 404, "CdOrdem": "004004006", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-COZINHA LIMPEZA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40407001, "idPai": 40407, "CdOrdem": "004004007001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-AGUA SANITARIA" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40407002, "idPai": 40407, "CdOrdem": "004004007002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CLORO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40407003, "idPai": 40407, "CdOrdem": "004004007003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-DESENTUPIDOR" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40407004, "idPai": 40407, "CdOrdem": "004004007004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-DESINFETANTE" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40407005, "idPai": 40407, "CdOrdem": "004004007005", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-LIMPADOR" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40407006, "idPai": 40407, "CdOrdem": "004004007006", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40407, "idPai": 404, "CdOrdem": "004004007", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-MULTI USO LIMPEZA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40408001, "idPai": 40408, "CdOrdem": "004004008001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40408, "idPai": 404, "CdOrdem": "004004008", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-BANHEIRO LIMPEZA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40409001, "idPai": 40409, "CdOrdem": "004004009001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40409, "idPai": 404, "CdOrdem": "004004009", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-SANITARIOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40410001, "idPai": 40410, "CdOrdem": "004004010001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-ALCOOL" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40410002, "idPai": 40410, "CdOrdem": "004004010002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-REMOVEDOR" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40410003, "idPai": 40410, "CdOrdem": "004004010003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-QUEROSENE" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40410004, "idPai": 40410, "CdOrdem": "004004010004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40410, "idPai": 404, "CdOrdem": "004004010", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "10-LIMPADORES DIVERSOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40414001, "idPai": 40414, "CdOrdem": "004004014001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40414, "idPai": 404, "CdOrdem": "004004014", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "14-DESUMIDIFICANTE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40415001, "idPai": 40415, "CdOrdem": "004004015001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40415, "idPai": 404, "CdOrdem": "004004015", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "15-DESODORIZANTE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40416001, "idPai": 40416, "CdOrdem": "004004016001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40416, "idPai": 404, "CdOrdem": "004004016", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "16-INSETICIDA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40417001, "idPai": 40417, "CdOrdem": "004004017001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40417, "idPai": 404, "CdOrdem": "004004017", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "17-AUTOMOTIVO" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 404, "idPai": 4, "CdOrdem": "004004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-LIMPEZA" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40511001, "idPai": 40511, "CdOrdem": "004005011001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40511, "idPai": 405, "CdOrdem": "004005011", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "11-COZINHA GALHETEIRO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40512001, "idPai": 40512, "CdOrdem": "004005012001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40512, "idPai": 405, "CdOrdem": "004005012", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "12-FEIRINHA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40521001, "idPai": 40521, "CdOrdem": "004005021001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-VASSOURA" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40521002, "idPai": 40521, "CdOrdem": "004005021002", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-RODO" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40521003, "idPai": 40521, "CdOrdem": "004005021003", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-PA" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40521004, "idPai": 40521, "CdOrdem": "004005021004", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-LIXEIRA" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40521005, "idPai": 40521, "CdOrdem": "004005021005", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-DESENTUPIDOR" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40521006, "idPai": 40521, "CdOrdem": "004005021006", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-MOP" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40521007, "idPai": 40521, "CdOrdem": "004005021007", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-OUTROS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40521008, "idPai": 40521, "CdOrdem": "004005021008", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-LUVAS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40521, "idPai": 405, "CdOrdem": "004005021", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "21-LIMPEZA REMOCAO LIXO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40523001, "idPai": 40523, "CdOrdem": "004005023001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-ELETRICA" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40523002, "idPai": 40523, "CdOrdem": "004005023002", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-HIDRAULICA" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40523003, "idPai": 40523, "CdOrdem": "004005023003", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-FERRAGENS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40523, "idPai": 405, "CdOrdem": "004005023", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "23-ACESSORIOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40533001, "idPai": 40533, "CdOrdem": "004005033001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40533, "idPai": 405, "CdOrdem": "004005033", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "33-PISCINA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40541001, "idPai": 40541, "CdOrdem": "004005041001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40541, "idPai": 405, "CdOrdem": "004005041", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "41-BRICOLAGEM" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40501001, "idPai": 40501, "CdOrdem": "004005001001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-ACENDEDOR" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40501002, "idPai": 40501, "CdOrdem": "004005001002", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-FOSFORO" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40501003, "idPai": 40501, "CdOrdem": "004005001003", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-ISQUEIRO" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40501004, "idPai": 40501, "CdOrdem": "004005001004", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-LAMPADA" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40501005, "idPai": 40501, "CdOrdem": "004005001005", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-PILHA" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40501006, "idPai": 40501, "CdOrdem": "004005001006", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-BATERIA" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40501007, "idPai": 40501, "CdOrdem": "004005001007", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-CARREGADOR" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40501008, "idPai": 40501, "CdOrdem": "004005001008", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-LANTERNA" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40501009, "idPai": 40501, "CdOrdem": "004005001009", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-VELA" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40501, "idPai": 405, "CdOrdem": "004005001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-ILUMINACAO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40502001, "idPai": 40502, "CdOrdem": "004005002001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-CARVAO" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40502002, "idPai": 40502, "CdOrdem": "004005002002", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CHURRASQUEIRA" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40502003, "idPai": 40502, "CdOrdem": "004005002003", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-OUTROS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40502, "idPai": 405, "CdOrdem": "004005002", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CHURRASCO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40503001, "idPai": 40503, "CdOrdem": "004005003001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40503, "idPai": 405, "CdOrdem": "004005003", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-LINHA FESTA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40504001, "idPai": 40504, "CdOrdem": "004005004001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-UTENSILIOS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40504002, "idPai": 40504, "CdOrdem": "004005004002", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-LINHA SERVIR" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40504003, "idPai": 40504, "CdOrdem": "004005004003", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-LINHA ORIENTAL" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40504, "idPai": 405, "CdOrdem": "004005004", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-DESCARTAVEIS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40505001, "idPai": 40505, "CdOrdem": "004005005001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-LAMINADOS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40505002, "idPai": 40505, "CdOrdem": "004005005002", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-ESPECIAIS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40505003, "idPai": 40505, "CdOrdem": "004005005003", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-TRANSPORTE" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40505004, "idPai": 40505, "CdOrdem": "004005005004", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-LIXO" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40505005, "idPai": 40505, "CdOrdem": "004005005005", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-LANCHES" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40505006, "idPai": 40505, "CdOrdem": "004005005006", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-COMERCIAIS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40505, "idPai": 405, "CdOrdem": "004005005", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-EMBALAGENS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40506001, "idPai": 40506, "CdOrdem": "004005006001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40506, "idPai": 405, "CdOrdem": "004005006", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-COZINHA DESCARTAVEIS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40507001, "idPai": 40507, "CdOrdem": "004005007001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40507, "idPai": 405, "CdOrdem": "004005007", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-TALHER MESA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40508001, "idPai": 40508, "CdOrdem": "004005008001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40508, "idPai": 405, "CdOrdem": "004005008", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-TALHER SERVIR" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40509001, "idPai": 40509, "CdOrdem": "004005009001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40509, "idPai": 405, "CdOrdem": "004005009", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-CUTELARIA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40510001, "idPai": 40510, "CdOrdem": "004005010001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40510, "idPai": 405, "CdOrdem": "004005010", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "10-COZINHA UTILIDADES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40513001, "idPai": 40513, "CdOrdem": "004005013001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40513, "idPai": 405, "CdOrdem": "004005013", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "13-UTENSILIOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40514001, "idPai": 40514, "CdOrdem": "004005014001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40514, "idPai": 405, "CdOrdem": "004005014", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "14-KIT GOURMET" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40515001, "idPai": 40515, "CdOrdem": "004005015001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40515, "idPai": 405, "CdOrdem": "004005015", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "15-LOUCAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40516001, "idPai": 40516, "CdOrdem": "004005016001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40516, "idPai": 405, "CdOrdem": "004005016", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "16-DECORACAO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40517001, "idPai": 40517, "CdOrdem": "004005017001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40517, "idPai": 405, "CdOrdem": "004005017", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "17-LAVANDERIA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40518001, "idPai": 40518, "CdOrdem": "004005018001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40518, "idPai": 405, "CdOrdem": "004005018", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "18-LIMPEZA PANOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40519001, "idPai": 40519, "CdOrdem": "004005019001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40519, "idPai": 405, "CdOrdem": "004005019", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "19-LIMPEZA ESPONJAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40520001, "idPai": 40520, "CdOrdem": "004005020001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40520, "idPai": 405, "CdOrdem": "004005020", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "20-LIMPEZA ESCOVAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40522001, "idPai": 40522, "CdOrdem": "004005022001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSAS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40522, "idPai": 405, "CdOrdem": "004005022", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "22-UTILIDADES EM GERAL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40524001, "idPai": 40524, "CdOrdem": "004005024001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40524, "idPai": 405, "CdOrdem": "004005024", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "24-INFORMATICA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40525001, "idPai": 40525, "CdOrdem": "004005025001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40525, "idPai": 405, "CdOrdem": "004005025", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "25-SOM IMAGEM TEL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40526001, "idPai": 40526, "CdOrdem": "004005026001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40526, "idPai": 405, "CdOrdem": "004005026", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "26-PAPELARIA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40527001, "idPai": 40527, "CdOrdem": "004005027001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40527, "idPai": 405, "CdOrdem": "004005027", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "27-ENTRETENIMENTO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40528001, "idPai": 40528, "CdOrdem": "004005028001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40528, "idPai": 405, "CdOrdem": "004005028", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "28-ADESIVOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40529001, "idPai": 40529, "CdOrdem": "004005029001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40529, "idPai": 405, "CdOrdem": "004005029", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "29-CALCADO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40530001, "idPai": 40530, "CdOrdem": "004005030001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40530, "idPai": 405, "CdOrdem": "004005030", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "30-VESTUARIO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40531001, "idPai": 40531, "CdOrdem": "004005031001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40531, "idPai": 405, "CdOrdem": "004005031", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "31-CAMA MESA BANHO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40532001, "idPai": 40532, "CdOrdem": "004005032001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40532, "idPai": 405, "CdOrdem": "004005032", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "32-ELETRO ELETRONICO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40534001, "idPai": 40534, "CdOrdem": "004005034001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40534, "idPai": 405, "CdOrdem": "004005034", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "34-BRINQUEDOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40535001, "idPai": 40535, "CdOrdem": "004005035001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40535, "idPai": 405, "CdOrdem": "004005035", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "35-ESCOLAR" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40536001, "idPai": 40536, "CdOrdem": "004005036001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40536, "idPai": 405, "CdOrdem": "004005036", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "36-ORGANIZACAO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40537001, "idPai": 40537, "CdOrdem": "004005037001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40537, "idPai": 405, "CdOrdem": "004005037", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "37-MODA E ACESSORIOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40538001, "idPai": 40538, "CdOrdem": "004005038001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40538, "idPai": 405, "CdOrdem": "004005038", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "38-PRESENTES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40539001, "idPai": 40539, "CdOrdem": "004005039001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40539, "idPai": 405, "CdOrdem": "004005039", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "39-INFANTIL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40540001, "idPai": 40540, "CdOrdem": "004005040001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40540, "idPai": 405, "CdOrdem": "004005040", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "40-MOVEIS E UTENCILIOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40542001, "idPai": 40542, "CdOrdem": "004005042001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40542, "idPai": 405, "CdOrdem": "004005042", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "42-LAZER" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40543001, "idPai": 40543, "CdOrdem": "004005043001", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-ACESSORIOS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40543002, "idPai": 40543, "CdOrdem": "004005043002", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-SERVICOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40543, "idPai": 405, "CdOrdem": "004005043", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "43-GOURMET BEBIDAS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 405, "idPai": 4, "CdOrdem": "004005", "PrMargem": 41.5, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-UTILIDADES" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40606001, "idPai": 40606, "CdOrdem": "004006006001", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-PET LOVER" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40606, "idPai": 406, "CdOrdem": "004006006", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-PET MIX" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40601001, "idPai": 40601, "CdOrdem": "004006001001", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40601, "idPai": 406, "CdOrdem": "004006001", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-PET VIVO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40602001, "idPai": 40602, "CdOrdem": "004006002001", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40602, "idPai": 406, "CdOrdem": "004006002", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-PET FOOD" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40603001, "idPai": 40603, "CdOrdem": "004006003001", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40603, "idPai": 406, "CdOrdem": "004006003", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-PET CARE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40604001, "idPai": 40604, "CdOrdem": "004006004001", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-SERVICOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40604, "idPai": 406, "CdOrdem": "004006004", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-PET SERV" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40605001, "idPai": 40605, "CdOrdem": "004006005001", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40605, "idPai": 406, "CdOrdem": "004006005", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-PET VET" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 406, "idPai": 4, "CdOrdem": "004006", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-PET SHOP" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40701001, "idPai": 40701, "CdOrdem": "004007001001", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-PLANTAS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40701002, "idPai": 40701, "CdOrdem": "004007001002", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-SEMENTES" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40701003, "idPai": 40701, "CdOrdem": "004007001003", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40701, "idPai": 407, "CdOrdem": "004007001", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NATURAIS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 407, "idPai": 4, "CdOrdem": "004007", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-ORNAMENTACAO" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40801001, "idPai": 40801, "CdOrdem": "004008001001", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-NACIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40801002, "idPai": 40801, "CdOrdem": "004008001002", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-IMPORTADOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 40801, "idPai": 408, "CdOrdem": "004008001", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 408, "idPai": 4, "CdOrdem": "004008", "PrMargem": 42.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-TABACARIA" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40111001, "idPai": 40111, "CdOrdem": "004001011001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40111, "idPai": 401, "CdOrdem": "004001011", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "11-PES E MAOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40112001, "idPai": 40112, "CdOrdem": "004001012001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-ADULTO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40112002, "idPai": 40112, "CdOrdem": "004001012002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-INFANTIL" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40112003, "idPai": 40112, "CdOrdem": "004001012003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-PROFISSIONAL" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40112, "idPai": 401, "CdOrdem": "004001012", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "12-CABELOS" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40113, "idPai": 401, "CdOrdem": "004001013", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "13-INFANTO JUVENIL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40114001, "idPai": 40114, "CdOrdem": "004001014001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40114, "idPai": 401, "CdOrdem": "004001014", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "14-FACIAL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40101001, "idPai": 40101, "CdOrdem": "004001001001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-INTERNO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40101002, "idPai": 40101, "CdOrdem": "004001001002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-EXTERNO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40101003, "idPai": 40101, "CdOrdem": "004001001003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-ESPECIAIS" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40101004, "idPai": 40101, "CdOrdem": "004001001004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-PROTETORES" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40101, "idPai": 401, "CdOrdem": "004001001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-ABSORVENTE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40102001, "idPai": 40102, "CdOrdem": "004001002001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-FS" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40102002, "idPai": 40102, "CdOrdem": "004001002002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-FD" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40102003, "idPai": 40102, "CdOrdem": "004001002003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-FT" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40102004, "idPai": 40102, "CdOrdem": "004001002004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40102, "idPai": 401, "CdOrdem": "004001002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-PAPEL HIGIENICO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40103001, "idPai": 40103, "CdOrdem": "004001003001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-INFANTIL" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40103002, "idPai": 40103, "CdOrdem": "004001003002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-GERIATRICA" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40103003, "idPai": 40103, "CdOrdem": "004001003003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-PANO" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40103, "idPai": 401, "CdOrdem": "004001003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-FRALDAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40104001, "idPai": 40104, "CdOrdem": "004001004001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40104, "idPai": 401, "CdOrdem": "004001004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-PRESERVATIVO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40105001, "idPai": 40105, "CdOrdem": "004001005001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40105, "idPai": 401, "CdOrdem": "004001005", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-PROTETORES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40106001, "idPai": 40106, "CdOrdem": "004001006001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-UMEDECIDO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40106002, "idPai": 40106, "CdOrdem": "004001006002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-OUTROS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40106, "idPai": 401, "CdOrdem": "004001006", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-LENCOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40107001, "idPai": 40107, "CdOrdem": "004001007001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40107, "idPai": 401, "CdOrdem": "004001007", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-DEPILACAO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40108001, "idPai": 40108, "CdOrdem": "004001008001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40108, "idPai": 401, "CdOrdem": "004001008", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-BARBEAR" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40109001, "idPai": 40109, "CdOrdem": "004001009001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-ESCOVAS AD" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40109002, "idPai": 40109, "CdOrdem": "004001009002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-ESCOVA INF" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40109003, "idPai": 40109, "CdOrdem": "004001009003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-FIO&FITA AD" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40109004, "idPai": 40109, "CdOrdem": "004001009004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-FIO&FITA INF" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40109005, "idPai": 40109, "CdOrdem": "004001009005", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-ORTODONTICO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40109006, "idPai": 40109, "CdOrdem": "004001009006", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40109, "idPai": 401, "CdOrdem": "004001009", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-ORAL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40110001, "idPai": 40110, "CdOrdem": "004001010001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-ALGODAO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40110002, "idPai": 40110, "CdOrdem": "004001010002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-HASTES" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40110003, "idPai": 40110, "CdOrdem": "004001010003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-BANHO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40110004, "idPai": 40110, "CdOrdem": "004001010004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40110, "idPai": 401, "CdOrdem": "004001010", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "10-CORPORAL" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 401, "idPai": 4, "CdOrdem": "004001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-HIGIENE PESSOAL" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40311001, "idPai": 40311, "CdOrdem": "004003011001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40311, "idPai": 403, "CdOrdem": "004003011", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "11-DEPILACAO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40312001, "idPai": 40312, "CdOrdem": "004003012001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40312, "idPai": 403, "CdOrdem": "004003012", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "12-MAQUIAGEM" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40313001, "idPai": 40313, "CdOrdem": "004003013001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-CABELO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40313002, "idPai": 40313, "CdOrdem": "004003013002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CORPORAL" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40313003, "idPai": 40313, "CdOrdem": "004003013003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-TOUCADOR" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40313004, "idPai": 40313, "CdOrdem": "004003013004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-SABONETES" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40313005, "idPai": 40313, "CdOrdem": "004003013005", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-DESODORANTES" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40313006, "idPai": 40313, "CdOrdem": "004003013006", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-LINHA ORAL" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40313007, "idPai": 40313, "CdOrdem": "004003013007", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-PES E MAOS" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40313008, "idPai": 40313, "CdOrdem": "004003013008", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-MAQUIAGEM" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40313009, "idPai": 40313, "CdOrdem": "004003013009", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-KIT" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40313, "idPai": 403, "CdOrdem": "004003013", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "13-INFANTO JUVENIL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40301001, "idPai": 40301, "CdOrdem": "004003001001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-SHAMPOO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40301002, "idPai": 40301, "CdOrdem": "004003001002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CONDICIONADOR" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40301003, "idPai": 40301, "CdOrdem": "004003001003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-CR PENTEAR" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40301004, "idPai": 40301, "CdOrdem": "004003001004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-FINALIZADORES" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40301005, "idPai": 40301, "CdOrdem": "004003001005", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-GEL" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40301006, "idPai": 40301, "CdOrdem": "004003001006", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-KIT CAPILAR" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40301, "idPai": 403, "CdOrdem": "004003001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-CABELOS USO DIARIO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40302001, "idPai": 40302, "CdOrdem": "004003002001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-CREMES" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40302002, "idPai": 40302, "CdOrdem": "004003002002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-SOLUCOES" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40302003, "idPai": 40302, "CdOrdem": "004003002003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-OLEOS" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40302004, "idPai": 40302, "CdOrdem": "004003002004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-RELAX" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40302005, "idPai": 40302, "CdOrdem": "004003002005", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-KIT TRATAMENTO" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40302, "idPai": 403, "CdOrdem": "004003002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CABELOS TRATAMENTO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40303001, "idPai": 40303, "CdOrdem": "004003003001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-EMULSIFICANTE" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40303002, "idPai": 40303, "CdOrdem": "004003003002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-DESCOLORANTE" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40303003, "idPai": 40303, "CdOrdem": "004003003003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-COLORANTE" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40303, "idPai": 403, "CdOrdem": "004003003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-CABELOS COLORACAO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40304001, "idPai": 40304, "CdOrdem": "004003004001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-LINHA SOL" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40304002, "idPai": 40304, "CdOrdem": "004003004002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-HIDRATACAO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40304003, "idPai": 40304, "CdOrdem": "004003004003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-REPELENTE" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40304004, "idPai": 40304, "CdOrdem": "004003004004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-TALCO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40304005, "idPai": 40304, "CdOrdem": "004003004005", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-CUIDADOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40304, "idPai": 403, "CdOrdem": "004003004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-CORPORAL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40305001, "idPai": 40305, "CdOrdem": "004003005001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-LIMPEZA" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40305002, "idPai": 40305, "CdOrdem": "004003005002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CHEIRO" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40305, "idPai": 403, "CdOrdem": "004003005", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-TOUCADOR" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40306001, "idPai": 40306, "CdOrdem": "004003006001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-LIQUIDO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40306002, "idPai": 40306, "CdOrdem": "004003006002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-MASSA" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40306003, "idPai": 40306, "CdOrdem": "004003006003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-KIT" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40306004, "idPai": 40306, "CdOrdem": "004003006004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-INSTITUCIONAL" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40306, "idPai": 403, "CdOrdem": "004003006", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-SABONETES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40307001, "idPai": 40307, "CdOrdem": "004003007001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-AERO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40307002, "idPai": 40307, "CdOrdem": "004003007002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CREME" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40307003, "idPai": 40307, "CdOrdem": "004003007003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-ROLLON" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40307004, "idPai": 40307, "CdOrdem": "004003007004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-SPRAY" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40307005, "idPai": 40307, "CdOrdem": "004003007005", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-STICK" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40307006, "idPai": 40307, "CdOrdem": "004003007006", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-BASE LEITE" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40307007, "idPai": 40307, "CdOrdem": "004003007007", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-KIT" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40307, "idPai": 403, "CdOrdem": "004003007", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-DESODORANTES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40308001, "idPai": 40308, "CdOrdem": "004003008001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DENTIFRICIO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40308002, "idPai": 40308, "CdOrdem": "004003008002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-ENXAGUANTE" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40308003, "idPai": 40308, "CdOrdem": "004003008003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-ORTODONTICO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40308004, "idPai": 40308, "CdOrdem": "004003008004", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-DENTADURA" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40308005, "idPai": 40308, "CdOrdem": "004003008005", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-DIVERSOS" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40308006, "idPai": 40308, "CdOrdem": "004003008006", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-KIT" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40308, "idPai": 403, "CdOrdem": "004003008", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-LINHA ORAL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40309001, "idPai": 40309, "CdOrdem": "004003009001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-BARBEAR" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40309002, "idPai": 40309, "CdOrdem": "004003009002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-POS BARBA" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40309003, "idPai": 40309, "CdOrdem": "004003009003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-KIT" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40309, "idPai": 403, "CdOrdem": "004003009", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-BARBA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40310001, "idPai": 40310, "CdOrdem": "004003010001", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-COLORACAO" }, { "children": [], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40310002, "idPai": 40310, "CdOrdem": "004003010002", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-PROTECAO" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 40310, "idPai": 403, "CdOrdem": "004003010", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "10-PES E MAOS" }], "Usuario": { "CdUsuario": 45, "NmUsuario": "Rinaldo Rocha", "Email": null }, "CdEmpresa": 10, "id": 403, "idPai": 4, "CdOrdem": "004003", "PrMargem": 41.5, "CdComprador": 45, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-PERFUMARIA" }], "Usuario": { "CdUsuario": 144, "NmUsuario": "Renato Barros", "Email": "compras4@smalvorada.com" }, "CdEmpresa": 10, "id": 4, "idPai": null, "CdOrdem": "004", "PrMargem": 41.5, "CdComprador": 144, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-HPLU" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50701, "idPai": 507, "CdOrdem": "005007001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 507, "idPai": 5, "CdOrdem": "005007", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "07-PREPARACAO" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50101001, "idPai": 50101, "CdOrdem": "005001001001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-DIANTEIRO IN NAT" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50101002, "idPai": 50101, "CdOrdem": "005001001002", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-DIANTEIRO CONG" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50101003, "idPai": 50101, "CdOrdem": "005001001003", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "03-DIANTEIRO DIVERSOS" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50101004, "idPai": 50101, "CdOrdem": "005001001004", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "04-TRASEIRO IN NAT" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50101005, "idPai": 50101, "CdOrdem": "005001001005", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "05-TRASEIRO CONG" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50101006, "idPai": 50101, "CdOrdem": "005001001006", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "06-TRASEIRO DIVERSOS" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50101007, "idPai": 50101, "CdOrdem": "005001001007", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "07-NOBRES IN NAT" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50101008, "idPai": 50101, "CdOrdem": "005001001008", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "08-NOBRES CONG" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50101009, "idPai": 50101, "CdOrdem": "005001001009", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "09-NOBRES DIVERSOS" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50101010, "idPai": 50101, "CdOrdem": "005001001010", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "10-COSTELA IN NAT" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50101011, "idPai": 50101, "CdOrdem": "005001001011", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "11-COSTELA CONG" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50101012, "idPai": 50101, "CdOrdem": "005001001012", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "12-PREPARADO" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50101, "idPai": 501, "CdOrdem": "005001001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-CORTES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50102001, "idPai": 50102, "CdOrdem": "005001002001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50102, "idPai": 501, "CdOrdem": "005001002", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-INDUSTRIALIZADO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50103001, "idPai": 50103, "CdOrdem": "005001003001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-RESF" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50103002, "idPai": 50103, "CdOrdem": "005001003002", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-CONG" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50103, "idPai": 501, "CdOrdem": "005001003", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "03-MIUDOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50104001, "idPai": 50104, "CdOrdem": "005001004001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50104, "idPai": 501, "CdOrdem": "005001004", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "04-SUB PRODUTO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50105001, "idPai": 50105, "CdOrdem": "005001005001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-ENTRADA" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50105, "idPai": 501, "CdOrdem": "005001005", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "05-PECAS NO OSSO" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 501, "idPai": 5, "CdOrdem": "005001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-BOVINO" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50201001, "idPai": 50201, "CdOrdem": "005002001001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-IN NATURA" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50201002, "idPai": 50201, "CdOrdem": "005002001002", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-CONG" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50201003, "idPai": 50201, "CdOrdem": "005002001003", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "03-PREPARADO" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50201004, "idPai": 50201, "CdOrdem": "005002001004", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "04-TEMPERADO" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50201005, "idPai": 50201, "CdOrdem": "005002001005", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "05-SAZONAL" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50201, "idPai": 502, "CdOrdem": "005002001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-INTEIRAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50202001, "idPai": 50202, "CdOrdem": "005002002001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-IN NATURA" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50202002, "idPai": 50202, "CdOrdem": "005002002002", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-CONG" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50202003, "idPai": 50202, "CdOrdem": "005002002003", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "03-PREPARADO" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50202004, "idPai": 50202, "CdOrdem": "005002002004", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "04-TEMPERADO" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50202005, "idPai": 50202, "CdOrdem": "005002002005", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "05-SAZONAL" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50202, "idPai": 502, "CdOrdem": "005002002", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-CORTES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50203001, "idPai": 50203, "CdOrdem": "005002003001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50203, "idPai": 502, "CdOrdem": "005002003", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "03-INDUSTRIALIZADO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50204001, "idPai": 50204, "CdOrdem": "005002004001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-IN NATURA" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50204002, "idPai": 50204, "CdOrdem": "005002004002", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-CONG" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50204, "idPai": 502, "CdOrdem": "005002004", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "04-MIUDO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50205001, "idPai": 50205, "CdOrdem": "005002005001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50205, "idPai": 502, "CdOrdem": "005002005", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "05-KITS" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 502, "idPai": 5, "CdOrdem": "005002", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-AVES" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50301001, "idPai": 50301, "CdOrdem": "005003001001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-IN NATURA" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50301002, "idPai": 50301, "CdOrdem": "005003001002", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-CONG" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50301003, "idPai": 50301, "CdOrdem": "005003001003", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "03-PREPARADO" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50301004, "idPai": 50301, "CdOrdem": "005003001004", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "04-TEMPERADO" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50301005, "idPai": 50301, "CdOrdem": "005003001005", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "05-SAZONAL" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50301, "idPai": 503, "CdOrdem": "005003001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-CORTES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50302001, "idPai": 50302, "CdOrdem": "005003002001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50302, "idPai": 503, "CdOrdem": "005003002", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-INDUSTRIALIZADO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50303001, "idPai": 50303, "CdOrdem": "005003003001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50303, "idPai": 503, "CdOrdem": "005003003", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "03-MIUDOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50304001, "idPai": 50304, "CdOrdem": "005003004001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-ENTRADA" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50304, "idPai": 503, "CdOrdem": "005003004", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "04-PECAS NO OSSO" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 503, "idPai": 5, "CdOrdem": "005003", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "03-SUINO" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50401001, "idPai": 50401, "CdOrdem": "005004001001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-IN NATURA" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50401002, "idPai": 50401, "CdOrdem": "005004001002", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-CONG" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50401003, "idPai": 50401, "CdOrdem": "005004001003", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "03-PREPARADO" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50401004, "idPai": 50401, "CdOrdem": "005004001004", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "04-TEMPERADO" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50401005, "idPai": 50401, "CdOrdem": "005004001005", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "05-SAZONAL" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50401, "idPai": 504, "CdOrdem": "005004001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-CORTES" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 504, "idPai": 5, "CdOrdem": "005004", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "04-EXOTICOS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50501001, "idPai": 50501, "CdOrdem": "005005001001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-GRANEL" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50501002, "idPai": 50501, "CdOrdem": "005005001002", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-EMBALADAS" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50501, "idPai": 505, "CdOrdem": "005005001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-LINGUICA FRESCAL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50502001, "idPai": 50502, "CdOrdem": "005005002001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-GRANEL" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50502002, "idPai": 50502, "CdOrdem": "005005002002", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-EMBALADAS" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50502, "idPai": 505, "CdOrdem": "005005002", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-LINGUICA FRESCA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50503001, "idPai": 50503, "CdOrdem": "005005003001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-GRANEL" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50503002, "idPai": 50503, "CdOrdem": "005005003002", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-EMBALADAS" }, { "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50503003, "idPai": 50503, "CdOrdem": "005005003003", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "03-GOURMET" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50503, "idPai": 505, "CdOrdem": "005005003", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "03-SALSICHA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50504001, "idPai": 50504, "CdOrdem": "005005004001", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 50504, "idPai": 505, "CdOrdem": "005005004", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "04-TENDER" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50505001, "idPai": 50505, "CdOrdem": "005005005001", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-GRANEL" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50505002, "idPai": 50505, "CdOrdem": "005005005002", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-EMBALADAS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50505, "idPai": 505, "CdOrdem": "005005005", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "05-LINGUICA DEFUMADA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50506001, "idPai": 50506, "CdOrdem": "005005006001", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-DIVERSAS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50506, "idPai": 505, "CdOrdem": "005005006", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "06-LINGUICA SEMI DEF" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50507001, "idPai": 50507, "CdOrdem": "005005007001", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50507, "idPai": 505, "CdOrdem": "005005007", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "07-GOURMET" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 505, "idPai": 5, "CdOrdem": "005005", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "05-EMBUTIDO" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50601001, "idPai": 50601, "CdOrdem": "005006001001", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-BACALHAU" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50601002, "idPai": 50601, "CdOrdem": "005006001002", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-OUTROS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50601, "idPai": 506, "CdOrdem": "005006001", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-PEIXES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50602001, "idPai": 50602, "CdOrdem": "005006002001", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-GRANEL" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50602002, "idPai": 50602, "CdOrdem": "005006002002", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-EMBALADAS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50602, "idPai": 506, "CdOrdem": "005006002", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "02-CHARQUE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50603001, "idPai": 50603, "CdOrdem": "005006003001", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50603, "idPai": 506, "CdOrdem": "005006003", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "03-SUINO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50604001, "idPai": 50604, "CdOrdem": "005006004001", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50604, "idPai": 506, "CdOrdem": "005006004", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "04-PREPARADO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50605001, "idPai": 50605, "CdOrdem": "005006005001", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-BACON" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50605004, "idPai": 50605, "CdOrdem": "005006005002", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "04-GOURMET" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50605, "idPai": 506, "CdOrdem": "005006005", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "05-DEFUMADO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50606001, "idPai": 50606, "CdOrdem": "005006006001", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 50606, "idPai": 506, "CdOrdem": "005006006", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "06-BOVINO" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 506, "idPai": 5, "CdOrdem": "005006", "PrMargem": 29.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "06-SALGADO" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 5, "idPai": null, "CdOrdem": "005", "PrMargem": 29.0, "CdComprador": 175, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 16.6000, "label": "05-ACOUGUE" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60101001, "idPai": 60101, "CdOrdem": "006001001001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-IN NATURA" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60101002, "idPai": 60101, "CdOrdem": "006001001002", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CONG" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60101, "idPai": 601, "CdOrdem": "006001001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-PEIXES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60102001, "idPai": 60102, "CdOrdem": "006001002001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-IN NATURA" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60102002, "idPai": 60102, "CdOrdem": "006001002002", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CONG" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60102, "idPai": 601, "CdOrdem": "006001002", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CRUSTACEOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60103001, "idPai": 60103, "CdOrdem": "006001003001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-IN NATURA" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60103002, "idPai": 60103, "CdOrdem": "006001003002", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CONG" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60103, "idPai": 601, "CdOrdem": "006001003", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-MOLUSCOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 601, "idPai": 6, "CdOrdem": "006001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-PEIXARIA" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60201001, "idPai": 60201, "CdOrdem": "006002001001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60201, "idPai": 602, "CdOrdem": "006002001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-PRATOS PRONTOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60202001, "idPai": 60202, "CdOrdem": "006002002001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60202, "idPai": 602, "CdOrdem": "006002002", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-LANCHES PRONTOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 60203001, "idPai": 60203, "CdOrdem": "006002003001", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 60203, "idPai": 602, "CdOrdem": "006002003", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-SOBREMESAS PRONTAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60204001, "idPai": 60204, "CdOrdem": "006002004001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60204, "idPai": 602, "CdOrdem": "006002004", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-FRUTAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60205001, "idPai": 60205, "CdOrdem": "006002005001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60205, "idPai": 602, "CdOrdem": "006002005", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-CARNES PROCESSADAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60206001, "idPai": 60206, "CdOrdem": "006002006001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60206, "idPai": 602, "CdOrdem": "006002006", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-VEGETAIS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 602, "idPai": 6, "CdOrdem": "006002", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CONGELADO" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60301001, "idPai": 60301, "CdOrdem": "006003001001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSAS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60301, "idPai": 603, "CdOrdem": "006003001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-BEBIDAS GELADAS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 603, "idPai": 6, "CdOrdem": "006003", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-GELADOS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60401001, "idPai": 60401, "CdOrdem": "006004001001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 60401, "idPai": 604, "CdOrdem": "006004001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-GELO" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 604, "idPai": 6, "CdOrdem": "006004", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-SUPER CONGELADOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 6, "idPai": null, "CdOrdem": "006", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-PERECIVEIS" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70101001, "idPai": 70101, "CdOrdem": "007001001001", "PrMargem": 70.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-GRANEL" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70101002, "idPai": 70101, "CdOrdem": "007001001002", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-EMBALADO" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70101003, "idPai": 70101, "CdOrdem": "007001001003", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-INDUSTRIALIZADO" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70101, "idPai": 701, "CdOrdem": "007001001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-CONSERVAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70102001, "idPai": 70102, "CdOrdem": "007001002001", "PrMargem": 70.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSAS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70102, "idPai": 701, "CdOrdem": "007001002", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-FRUTAS SECAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70103001, "idPai": 70103, "CdOrdem": "007001003001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70103, "idPai": 701, "CdOrdem": "007001003", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-DOCE EM CALDAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70104001, "idPai": 70104, "CdOrdem": "007001004001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70104, "idPai": 701, "CdOrdem": "007001004", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-DOCES CREMOSOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70105001, "idPai": 70105, "CdOrdem": "007001005001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70105, "idPai": 701, "CdOrdem": "007001005", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-DOCES CORTE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70106001, "idPai": 70106, "CdOrdem": "007001006001", "PrMargem": 70.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-CORTE TRAD" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70106002, "idPai": 70106, "CdOrdem": "007001006002", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CORTE NOBRE" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70106003, "idPai": 70106, "CdOrdem": "007001006003", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-CORTE GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70106004, "idPai": 70106, "CdOrdem": "007001006004", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-CORTE BX TEORES" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70106005, "idPai": 70106, "CdOrdem": "007001006005", "PrMargem": 50.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-EMB TRAD" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70106006, "idPai": 70106, "CdOrdem": "007001006006", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-EMB NOBRE" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70106007, "idPai": 70106, "CdOrdem": "007001006007", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-EMB GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70106008, "idPai": 70106, "CdOrdem": "007001006008", "PrMargem": 50.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-EMB BX TEOR" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70106009, "idPai": 70106, "CdOrdem": "007001006009", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-EMB FATIADO" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70106, "idPai": 701, "CdOrdem": "007001006", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-QUEIJOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70107010, "idPai": 70107, "CdOrdem": "007001007010", "PrMargem": 70.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "10-PREPARADO" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70107001, "idPai": 70107, "CdOrdem": "007001007001", "PrMargem": 70.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-CORTE TRAD" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70107002, "idPai": 70107, "CdOrdem": "007001007002", "PrMargem": 50.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-CORTE NOBRE" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70107003, "idPai": 70107, "CdOrdem": "007001007003", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-CORTE GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70107004, "idPai": 70107, "CdOrdem": "007001007004", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-CORTE BX TEORES" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70107005, "idPai": 70107, "CdOrdem": "007001007005", "PrMargem": 50.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-EMB TRAD" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70107006, "idPai": 70107, "CdOrdem": "007001007006", "PrMargem": 50.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-EMB NOBRE" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70107007, "idPai": 70107, "CdOrdem": "007001007007", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-EMB GOURMET" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70107008, "idPai": 70107, "CdOrdem": "007001007008", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-EMB BX TEOR" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70107009, "idPai": 70107, "CdOrdem": "007001007009", "PrMargem": 50.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-EMB FATIADO" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70107, "idPai": 701, "CdOrdem": "007001007", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-FRIOS" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70108, "idPai": 701, "CdOrdem": "007001008", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-CONDIMENTOS" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70109, "idPai": 701, "CdOrdem": "007001009", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "09-GORDUROSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 701, "idPai": 7, "CdOrdem": "007001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-BALCAO" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70201001, "idPai": 70201, "CdOrdem": "007002001001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-MARG/CREMES" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70201002, "idPai": 70201, "CdOrdem": "007002001002", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-MANTEIGA" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70201003, "idPai": 70201, "CdOrdem": "007002001003", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-QUEIJO" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70201004, "idPai": 70201, "CdOrdem": "007002001004", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-REQUEIJAO" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70201005, "idPai": 70201, "CdOrdem": "007002001005", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-PASTAS" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70201006, "idPai": 70201, "CdOrdem": "007002001006", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-PATE" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70201007, "idPai": 70201, "CdOrdem": "007002001007", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-CREME LEITE" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70201008, "idPai": 70201, "CdOrdem": "007002001008", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "08-DIVERSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70201, "idPai": 702, "CdOrdem": "007002001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-CREMOSOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70202001, "idPai": 70202, "CdOrdem": "007002002001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-BANHA" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70202002, "idPai": 70202, "CdOrdem": "007002002002", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-GORDURA HIDROG" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70202003, "idPai": 70202, "CdOrdem": "007002002003", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-CHANTILLY" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70202004, "idPai": 70202, "CdOrdem": "007002002004", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-FERMENTOS" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70202005, "idPai": 70202, "CdOrdem": "007002002005", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-OUTROS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70202, "idPai": 702, "CdOrdem": "007002002", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-GORDUROSOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70203001, "idPai": 70203, "CdOrdem": "007002003001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSAS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70203, "idPai": 702, "CdOrdem": "007002003", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-MASSAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70204001, "idPai": 70204, "CdOrdem": "007002004001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSAS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70204, "idPai": 702, "CdOrdem": "007002004", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-PRATOS PRONTOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 70205001, "idPai": 70205, "CdOrdem": "007002005001", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-PETIT" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 70205002, "idPai": 70205, "CdOrdem": "007002005002", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-FERMENTADO" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 70205003, "idPai": 70205, "CdOrdem": "007002005003", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-LIQUIDO" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 70205004, "idPai": 70205, "CdOrdem": "007002005004", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "04-NATURAL" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 70205005, "idPai": 70205, "CdOrdem": "007002005005", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-SOBREMESA" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 70205006, "idPai": 70205, "CdOrdem": "007002005006", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-FUNCIONAIS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 70205007, "idPai": 70205, "CdOrdem": "007002005007", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-POTE" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 70205, "idPai": 702, "CdOrdem": "007002005", "PrMargem": 40.0, "CdComprador": 12, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "05-IOGURTE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70206001, "idPai": 70206, "CdOrdem": "007002006001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70206, "idPai": 702, "CdOrdem": "007002006", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "06-SUCOS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 702, "idPai": 7, "CdOrdem": "007002", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-REFRIGERADOS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70301001, "idPai": 70301, "CdOrdem": "007003001001", "PrMargem": 30.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-TRADICIONAL" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70301002, "idPai": 70301, "CdOrdem": "007003001002", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "02-ESPECIAL" }, { "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70301003, "idPai": 70301, "CdOrdem": "007003001003", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "03-OUTROS" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70301, "idPai": 703, "CdOrdem": "007003001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-LEITE UHT" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70302001, "idPai": 70302, "CdOrdem": "007003002001", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "01-SAQUINHO" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 70302, "idPai": 703, "CdOrdem": "007003002", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "02-PASTEURIZADO" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 703, "idPai": 7, "CdOrdem": "007003", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "03-LEITE" }], "Usuario": { "CdUsuario": 14, "NmUsuario": "Diego Gonçalves", "Email": "compras1@smalvorada.com" }, "CdEmpresa": 10, "id": 7, "idPai": null, "CdOrdem": "007", "PrMargem": 40.0, "CdComprador": 14, "NrCobertura": 15, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 23.0000, "label": "07-LATICINIOS" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80101001, "idPai": 80101, "CdOrdem": "008001001001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-IN NATURA" }, { "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80101002, "idPai": 80101, "CdOrdem": "008001001002", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "02-PROCESSADO" }, { "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80101003, "idPai": 80101, "CdOrdem": "008001001003", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "03-ESPECIAIS" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80101, "idPai": 801, "CdOrdem": "008001001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-FRESCAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80102001, "idPai": 80102, "CdOrdem": "008001002001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-DIVERSAS" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80102, "idPai": 801, "CdOrdem": "008001002", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "02-SECAS" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 801, "idPai": 8, "CdOrdem": "008001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-FRUTAS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80201001, "idPai": 80201, "CdOrdem": "008002001001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-IN NATURA" }, { "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80201002, "idPai": 80201, "CdOrdem": "008002001002", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "02-PROCESSADO" }, { "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80201003, "idPai": 80201, "CdOrdem": "008002001003", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "03-ESPECIAIS" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80201, "idPai": 802, "CdOrdem": "008002001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-FRESCOS" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 802, "idPai": 8, "CdOrdem": "008002", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "02-LEGUMES" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80301001, "idPai": 80301, "CdOrdem": "008003001001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-IN NATURA" }, { "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80301002, "idPai": 80301, "CdOrdem": "008003001002", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "02-PROCESSADO" }, { "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80301003, "idPai": 80301, "CdOrdem": "008003001003", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "03-ESPECIAIS" }, { "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80301004, "idPai": 80301, "CdOrdem": "008003001004", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "04-EXOTICAS" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80301, "idPai": 803, "CdOrdem": "008003001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-FOLHAGEM" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 803, "idPai": 8, "CdOrdem": "008003", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "03-VERDURAS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80401001, "idPai": 80401, "CdOrdem": "008004001001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80401, "idPai": 804, "CdOrdem": "008004001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-ALHO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80402001, "idPai": 80402, "CdOrdem": "008004002001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80402, "idPai": 804, "CdOrdem": "008004002", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "02-PIMENTA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80403001, "idPai": 80403, "CdOrdem": "008004003001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-IN NATURA" }, { "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80403002, "idPai": 80403, "CdOrdem": "008004003002", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "02-PROCESSADO" }, { "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80403003, "idPai": 80403, "CdOrdem": "008004003003", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "03-ESPECIAIS" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80403, "idPai": 804, "CdOrdem": "008004003", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "03-DIVERSOS" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 804, "idPai": 8, "CdOrdem": "008004", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "04-TEMPEROS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80501001, "idPai": 80501, "CdOrdem": "008005001001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80501, "idPai": 805, "CdOrdem": "008005001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-COGUMELO" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 805, "idPai": 8, "CdOrdem": "008005", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "05-FUNGOS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80601001, "idPai": 80601, "CdOrdem": "008006001001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80601, "idPai": 806, "CdOrdem": "008006001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-GALINHA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80602001, "idPai": 80602, "CdOrdem": "008006002001", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 80602, "idPai": 806, "CdOrdem": "008006002", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "02-OUTROS" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 806, "idPai": 8, "CdOrdem": "008006", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "06-OVOS" }], "Usuario": { "CdUsuario": 9, "NmUsuario": "Leandro Moreira", "Email": null }, "CdEmpresa": 10, "id": 8, "idPai": null, "CdOrdem": "008", "PrMargem": 40.0, "CdComprador": 9, "NrCobertura": 16, "PrMargemObjetiva": null, "NrCoberturaMinima": 8, "PrMargemMinima": 23.0000, "label": "08-FLV" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90101001, "idPai": 90101, "CdOrdem": "009001001001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90101, "idPai": 901, "CdOrdem": "009001001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-LINHA FRANCES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90102001, "idPai": 90102, "CdOrdem": "009001002001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90102, "idPai": 901, "CdOrdem": "009001002", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "02-LINHA DOCE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90103001, "idPai": 90103, "CdOrdem": "009001003001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90103, "idPai": 901, "CdOrdem": "009001003", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "03-LINHA SALGADA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90104001, "idPai": 90104, "CdOrdem": "009001004001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90104, "idPai": 901, "CdOrdem": "009001004", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "04-LINHA LANCHE" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90105001, "idPai": 90105, "CdOrdem": "009001005001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90105, "idPai": 901, "CdOrdem": "009001005", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "05-LINHA LIGHT" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90106001, "idPai": 90106, "CdOrdem": "009001006001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90106, "idPai": 901, "CdOrdem": "009001006", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "06-LINHA ESPECIAL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90107001, "idPai": 90107, "CdOrdem": "009001007001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90107, "idPai": 901, "CdOrdem": "009001007", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "07-LINHA FESTIVOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 901, "idPai": 9, "CdOrdem": "009001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-PADARIA" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90201001, "idPai": 90201, "CdOrdem": "009002001001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90201, "idPai": 902, "CdOrdem": "009002001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-BISCOITOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90202001, "idPai": 90202, "CdOrdem": "009002002001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90202, "idPai": 902, "CdOrdem": "009002002", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "02-BOLOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90203001, "idPai": 90203, "CdOrdem": "009002003001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90203, "idPai": 902, "CdOrdem": "009002003", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "03-DOCES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90204001, "idPai": 90204, "CdOrdem": "009002004001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90204, "idPai": 902, "CdOrdem": "009002004", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "04-TORTAS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 902, "idPai": 9, "CdOrdem": "009002", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "02-CONFEITARIA" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90301001, "idPai": 90301, "CdOrdem": "009003001001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSAS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90301, "idPai": 903, "CdOrdem": "009003001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-PIZZA SEMI" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90302001, "idPai": 90302, "CdOrdem": "009003002001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90302, "idPai": 903, "CdOrdem": "009003002", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "02-SALGADINHOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90303001, "idPai": 90303, "CdOrdem": "009003003001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90303, "idPai": 903, "CdOrdem": "009003003", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "03-SANDUICHES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90304001, "idPai": 90304, "CdOrdem": "009003004001", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 90304, "idPai": 903, "CdOrdem": "009003004", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "04-ROTISSERIA" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 903, "idPai": 9, "CdOrdem": "009003", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "03-LANCHERIA" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 9, "idPai": null, "CdOrdem": "009", "PrMargem": 45.0, "CdComprador": 12, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "09-FABRICO" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 100101001, "idPai": 100101, "CdOrdem": "010001001001", "PrMargem": 45.0, "CdComprador": null, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": null, "CdEmpresa": 10, "id": 100101, "idPai": 1001, "CdOrdem": "010001001", "PrMargem": 45.0, "CdComprador": null, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-MATERIA PRIMA" }, { "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 100102001, "idPai": 100102, "CdOrdem": "010001002001", "PrMargem": 45.0, "CdComprador": null, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": null, "CdEmpresa": 10, "id": 100102, "idPai": 1001, "CdOrdem": "010001002", "PrMargem": 45.0, "CdComprador": null, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "02-ACABAMENTO" }, { "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 100103001, "idPai": 100103, "CdOrdem": "010001003001", "PrMargem": 45.0, "CdComprador": null, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": null, "CdEmpresa": 10, "id": 100103, "idPai": 1001, "CdOrdem": "010001003", "PrMargem": 45.0, "CdComprador": null, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "03-INGREDIENTES" }, { "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 100104001, "idPai": 100104, "CdOrdem": "010001004001", "PrMargem": 45.0, "CdComprador": null, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": null, "CdEmpresa": 10, "id": 100104, "idPai": 1001, "CdOrdem": "010001004", "PrMargem": 45.0, "CdComprador": null, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "04-EMBALAGEM" }], "Usuario": null, "CdEmpresa": 10, "id": 1001, "idPai": 10, "CdOrdem": "010001", "PrMargem": 45.0, "CdComprador": null, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-FOOD" }, { "children": [{ "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 100201001, "idPai": 100201, "CdOrdem": "010002001001", "PrMargem": 45.0, "CdComprador": null, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-DIVERSOS" }], "Usuario": null, "CdEmpresa": 10, "id": 100201, "idPai": 1002, "CdOrdem": "010002001", "PrMargem": 45.0, "CdComprador": null, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "01-ALIMENTOS" }], "Usuario": null, "CdEmpresa": 10, "id": 1002, "idPai": 10, "CdOrdem": "010002", "PrMargem": 45.0, "CdComprador": null, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "02-DOCERIA" }, { "children": [], "Usuario": null, "CdEmpresa": 10, "id": 1003, "idPai": 10, "CdOrdem": "010003", "PrMargem": 45.0, "CdComprador": null, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "03-FESTA" }], "Usuario": null, "CdEmpresa": 10, "id": 10, "idPai": null, "CdOrdem": "010", "PrMargem": 45.0, "CdComprador": null, "NrCobertura": 17, "PrMargemObjetiva": null, "NrCoberturaMinima": 7, "PrMargemMinima": 23.0000, "label": "10-EXTRA" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 110101001, "idPai": 110101, "CdOrdem": "011001001001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSAS" }], "Usuario": null, "CdEmpresa": 10, "id": 110101, "idPai": 1101, "CdOrdem": "011001001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-ENTREGA" }, { "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 110102001, "idPai": 110102, "CdOrdem": "011001002001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSAS" }], "Usuario": null, "CdEmpresa": 10, "id": 110102, "idPai": 1101, "CdOrdem": "011001002", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "02-DESCARGA" }, { "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 110103001, "idPai": 110103, "CdOrdem": "011001003001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": null, "CdEmpresa": 10, "id": 110103, "idPai": 1101, "CdOrdem": "011001003", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "03-ESTACIONAMENTO" }], "Usuario": null, "CdEmpresa": 10, "id": 1101, "idPai": 11, "CdOrdem": "011001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-LOGISTICA" }, { "children": [{ "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 110201001, "idPai": 110201, "CdOrdem": "011002001001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": null, "CdEmpresa": 10, "id": 110201, "idPai": 1102, "CdOrdem": "011002001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-RETORNAVEIS" }, { "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 110202001, "idPai": 110202, "CdOrdem": "011002002001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": null, "CdEmpresa": 10, "id": 110202, "idPai": 1102, "CdOrdem": "011002002", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "02-USINAGEM EXTERNA" }], "Usuario": null, "CdEmpresa": 10, "id": 1102, "idPai": 11, "CdOrdem": "011002", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "02-RECICLAVEIS" }, { "children": [{ "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 110301001, "idPai": 110301, "CdOrdem": "011003001001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": null, "CdEmpresa": 10, "id": 110301, "idPai": 1103, "CdOrdem": "011003001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-TERCEIROS" }], "Usuario": null, "CdEmpresa": 10, "id": 1103, "idPai": 11, "CdOrdem": "011003", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "03-VENDAS" }, { "children": [{ "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 110401001, "idPai": 110401, "CdOrdem": "011004001001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": null, "CdEmpresa": 10, "id": 110401, "idPai": 1104, "CdOrdem": "011004001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-VETERINARIO" }, { "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 110402001, "idPai": 110402, "CdOrdem": "011004002001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": null, "CdEmpresa": 10, "id": 110402, "idPai": 1104, "CdOrdem": "011004002", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "02-PROCEDIMENTOS" }, { "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 110403001, "idPai": 110403, "CdOrdem": "011004003001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": null, "CdEmpresa": 10, "id": 110403, "idPai": 1104, "CdOrdem": "011004003", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "03-HIGIENE" }], "Usuario": null, "CdEmpresa": 10, "id": 1104, "idPai": 11, "CdOrdem": "011004", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "04-PET SHOP" }], "Usuario": null, "CdEmpresa": 10, "id": 11, "idPai": null, "CdOrdem": "011", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "11-SERVICO" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120101001, "idPai": 120101, "CdOrdem": "012001001001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120101, "idPai": 1201, "CdOrdem": "012001001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DESPESAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120102001, "idPai": 120102, "CdOrdem": "012001002001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120102, "idPai": 1201, "CdOrdem": "012001002", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "02-PECAS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120103001, "idPai": 120103, "CdOrdem": "012001003001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120103, "idPai": 1201, "CdOrdem": "012001003", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "03-UTENSILIOS" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 120104001, "idPai": 120104, "CdOrdem": "012001004002001", "PrMargem": null, "CdComprador": 224, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 120104, "idPai": 120105, "CdOrdem": "012001004002", "PrMargem": null, "CdComprador": 224, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "04-EPI" }, { "children": [], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 120105001, "idPai": 120105, "CdOrdem": "012001004001", "PrMargem": null, "CdComprador": 224, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 120105, "idPai": 1201, "CdOrdem": "012001004", "PrMargem": null, "CdComprador": 224, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "05-LIMPEZA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120106001, "idPai": 120106, "CdOrdem": "012001005001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120106, "idPai": 1201, "CdOrdem": "012001005", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "06-REFEITORIO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120107001, "idPai": 120107, "CdOrdem": "012001006001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-MANUTENCAO" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120107002, "idPai": 120107, "CdOrdem": "012001006002", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "02-COMBUSTIVEL" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120107, "idPai": 1201, "CdOrdem": "012001006", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "07-GERADOR" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120108001, "idPai": 120108, "CdOrdem": "012001007001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120108, "idPai": 1201, "CdOrdem": "012001007", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "08-ESCRITORIO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120109001, "idPai": 120109, "CdOrdem": "012001008001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120109, "idPai": 1201, "CdOrdem": "012001008", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "09-INFORMATICA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120110001, "idPai": 120110, "CdOrdem": "012001009001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120110, "idPai": 1201, "CdOrdem": "012001009", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "10-REFRIGERACAO" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 1201, "idPai": 12, "CdOrdem": "012001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-LOJA" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120201001, "idPai": 120201, "CdOrdem": "012002001001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120201, "idPai": 1202, "CdOrdem": "012002001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-MANUTENCAO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120202001, "idPai": 120202, "CdOrdem": "012002002001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 120202, "idPai": 1202, "CdOrdem": "012002002", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "02-COMBUSTIVEL" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 1202, "idPai": 12, "CdOrdem": "012002", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "02-VEICULOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 12, "idPai": null, "CdOrdem": "012", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "12-USO CONSUMO" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 130103001, "idPai": 130103, "CdOrdem": "013001003001", "PrMargem": 1.0, "CdComprador": 224, "NrCobertura": 1, "PrMargemObjetiva": null, "NrCoberturaMinima": 1, "PrMargemMinima": 1.0000, "label": "01-BRINDES" }], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 130103, "idPai": 1301, "CdOrdem": "013001003", "PrMargem": 1.0, "CdComprador": 224, "NrCobertura": 1, "PrMargemObjetiva": null, "NrCoberturaMinima": 1, "PrMargemMinima": 1.0000, "label": "03-PROMOÇÕES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 130101001, "idPai": 130101, "CdOrdem": "013001001001", "PrMargem": 1.0, "CdComprador": 224, "NrCobertura": 1, "PrMargemObjetiva": null, "NrCoberturaMinima": 1, "PrMargemMinima": 1.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 130101, "idPai": 1301, "CdOrdem": "013001001", "PrMargem": 1.0, "CdComprador": 224, "NrCobertura": 1, "PrMargemObjetiva": null, "NrCoberturaMinima": 1, "PrMargemMinima": 1.0000, "label": "01-FRENTE DE LOJA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 130102001, "idPai": 130102, "CdOrdem": "013001002001", "PrMargem": 1.0, "CdComprador": 224, "NrCobertura": 1, "PrMargemObjetiva": null, "NrCoberturaMinima": 1, "PrMargemMinima": 1.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 130102, "idPai": 1301, "CdOrdem": "013001002", "PrMargem": 1.0, "CdComprador": 224, "NrCobertura": 1, "PrMargemObjetiva": null, "NrCoberturaMinima": 1, "PrMargemMinima": 1.0000, "label": "02-SETORIAIS" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 1301, "idPai": 13, "CdOrdem": "013001", "PrMargem": 1.0, "CdComprador": 175, "NrCobertura": 1, "PrMargemObjetiva": null, "NrCoberturaMinima": 1, "PrMargemMinima": 1.0000, "label": "01-LOJA" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 130201001, "idPai": 130201, "CdOrdem": "013002001001", "PrMargem": 1.0, "CdComprador": 175, "NrCobertura": 1, "PrMargemObjetiva": null, "NrCoberturaMinima": 1, "PrMargemMinima": 1.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 130201, "idPai": 1302, "CdOrdem": "013002001", "PrMargem": 1.0, "CdComprador": 175, "NrCobertura": 1, "PrMargemObjetiva": null, "NrCoberturaMinima": 1, "PrMargemMinima": 1.0000, "label": "01-LOGISTICA" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 1302, "idPai": 13, "CdOrdem": "013002", "PrMargem": 1.0, "CdComprador": 175, "NrCobertura": 1, "PrMargemObjetiva": null, "NrCoberturaMinima": 1, "PrMargemMinima": 1.0000, "label": "02-CD" }], "Usuario": { "CdUsuario": 175, "NmUsuario": "Geraldo Bonifácio", "Email": "geraldo.bonifacio@hotmail.com" }, "CdEmpresa": 10, "id": 13, "idPai": null, "CdOrdem": "013", "PrMargem": 1.0, "CdComprador": 175, "NrCobertura": 1, "PrMargemObjetiva": null, "NrCoberturaMinima": 1, "PrMargemMinima": 1.0000, "label": "13-EMBALAGENS" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 140101001, "idPai": 140101, "CdOrdem": "014001001001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 140101, "idPai": 1401, "CdOrdem": "014001001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-PRIMARIA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 140102001, "idPai": 140102, "CdOrdem": "014001002001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 140102, "idPai": 1401, "CdOrdem": "014001002", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "02-SECUNDARIA" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 140103001, "idPai": 140103, "CdOrdem": "014001003001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 140103, "idPai": 1401, "CdOrdem": "014001003", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "03-INGREDIENTES" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 140104001, "idPai": 140104, "CdOrdem": "014001004001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 140104, "idPai": 1401, "CdOrdem": "014001004", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "04-FAST FOOD" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 1401, "idPai": 14, "CdOrdem": "014001", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-MATERIA PRIMA" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 140201001, "idPai": 140201, "CdOrdem": "014002001001", "PrMargem": null, "CdComprador": 224, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 140201, "idPai": 1402, "CdOrdem": "014002001", "PrMargem": null, "CdComprador": 224, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-ISOPOR" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 140202001, "idPai": 140202, "CdOrdem": "014002002001", "PrMargem": null, "CdComprador": 224, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 140202, "idPai": 1402, "CdOrdem": "014002002", "PrMargem": null, "CdComprador": 224, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "02-PLASTICO" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 140203001, "idPai": 140203, "CdOrdem": "014002003001", "PrMargem": null, "CdComprador": 224, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 140203, "idPai": 1402, "CdOrdem": "014002003", "PrMargem": null, "CdComprador": 224, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "03-PVC" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 140204001, "idPai": 140204, "CdOrdem": "014002004001", "PrMargem": null, "CdComprador": 224, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 140204, "idPai": 1402, "CdOrdem": "014002004", "PrMargem": null, "CdComprador": 224, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "04-PAPEL" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 140205001, "idPai": 140205, "CdOrdem": "014002005001", "PrMargem": null, "CdComprador": 224, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 224, "NmUsuario": "Nilo Sergio Coelho de Oliveira", "Email": null }, "CdEmpresa": 10, "id": 140205, "idPai": 1402, "CdOrdem": "014002005", "PrMargem": null, "CdComprador": 224, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "05-OUTROS" }], "Usuario": { "CdUsuario": 197, "NmUsuario": "Thiago Amaral", "Email": null }, "CdEmpresa": 10, "id": 1402, "idPai": 14, "CdOrdem": "014002", "PrMargem": null, "CdComprador": 197, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "02-EMBALAGENS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 14, "idPai": null, "CdOrdem": "014", "PrMargem": null, "CdComprador": 12, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "14-PRODUCAO" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150101001, "idPai": 150101, "CdOrdem": "015001001001", "PrMargem": 0.0, "CdComprador": 12, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "01-CONCESSIONARIOS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150101002, "idPai": 150101, "CdOrdem": "015001001002", "PrMargem": 0.0, "CdComprador": 12, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "02-CONTRATADOS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150101003, "idPai": 150101, "CdOrdem": "015001001003", "PrMargem": 0.0, "CdComprador": 12, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "03-AVULSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150101, "idPai": 1501, "CdOrdem": "015001001", "PrMargem": 20.0, "CdComprador": 12, "NrCobertura": 20, "PrMargemObjetiva": null, "NrCoberturaMinima": 20, "PrMargemMinima": 20.0000, "label": "01-SERVICOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 1501, "idPai": 15, "CdOrdem": "015001", "PrMargem": 20.0, "CdComprador": 12, "NrCobertura": 20, "PrMargemObjetiva": null, "NrCoberturaMinima": 20, "PrMargemMinima": 20.0000, "label": "01-OPERACIONAL" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150201001, "idPai": 150201, "CdOrdem": "015002001001", "PrMargem": 0.0, "CdComprador": 12, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "01-COMODATO" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150201002, "idPai": 150201, "CdOrdem": "015002001002", "PrMargem": 0.0, "CdComprador": 12, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "02-BRINDES" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150201003, "idPai": 150201, "CdOrdem": "015002001003", "PrMargem": 0.0, "CdComprador": 12, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "03-PUBLICIDADE" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150201, "idPai": 1502, "CdOrdem": "015002001", "PrMargem": 20.0, "CdComprador": 12, "NrCobertura": 20, "PrMargemObjetiva": null, "NrCoberturaMinima": 20, "PrMargemMinima": 20.0000, "label": "01-MARKETING" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 1502, "idPai": 15, "CdOrdem": "015002", "PrMargem": 20.0, "CdComprador": 12, "NrCobertura": 20, "PrMargemObjetiva": null, "NrCoberturaMinima": 20, "PrMargemMinima": 20.0000, "label": "02-COMERCIAL" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150301001, "idPai": 150301, "CdOrdem": "015003001001", "PrMargem": 0.0, "CdComprador": 12, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "01-CONTRATADOS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150301002, "idPai": 150301, "CdOrdem": "015003001002", "PrMargem": 0.0, "CdComprador": 12, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "02-AVULSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150301, "idPai": 1503, "CdOrdem": "015003001", "PrMargem": 20.0, "CdComprador": 12, "NrCobertura": 20, "PrMargemObjetiva": null, "NrCoberturaMinima": 20, "PrMargemMinima": 20.0000, "label": "01-SERVICOS" }, { "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150302001, "idPai": 150302, "CdOrdem": "015003002001", "PrMargem": 0.0, "CdComprador": 12, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "01-DIRETOS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150302002, "idPai": 150302, "CdOrdem": "015003002002", "PrMargem": 0.0, "CdComprador": 12, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "02-INDIRETOS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150302003, "idPai": 150302, "CdOrdem": "015003002003", "PrMargem": 0.0, "CdComprador": 12, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "03-CONTRIBUICOES" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150302004, "idPai": 150302, "CdOrdem": "015003002004", "PrMargem": 0.0, "CdComprador": 12, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "04-TAXAS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150302, "idPai": 1503, "CdOrdem": "015003002", "PrMargem": 20.0, "CdComprador": 12, "NrCobertura": 20, "PrMargemObjetiva": null, "NrCoberturaMinima": 20, "PrMargemMinima": 20.0000, "label": "02-TRIBUTOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 1503, "idPai": 15, "CdOrdem": "015003", "PrMargem": 20.0, "CdComprador": 12, "NrCobertura": 20, "PrMargemObjetiva": null, "NrCoberturaMinima": 20, "PrMargemMinima": 20.0000, "label": "03-GESTAO" }, { "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150401001, "idPai": 150401, "CdOrdem": "015004001001", "PrMargem": 0.0, "CdComprador": 12, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "01-CONTRATADOS" }, { "children": [], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150401002, "idPai": 150401, "CdOrdem": "015004001002", "PrMargem": 0.0, "CdComprador": 12, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "02-AVULSOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 150401, "idPai": 1504, "CdOrdem": "015004001", "PrMargem": 20.0, "CdComprador": 12, "NrCobertura": 20, "PrMargemObjetiva": null, "NrCoberturaMinima": 20, "PrMargemMinima": 20.0000, "label": "01-SERVICOS" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 1504, "idPai": 15, "CdOrdem": "015004", "PrMargem": 20.0, "CdComprador": 12, "NrCobertura": 20, "PrMargemObjetiva": null, "NrCoberturaMinima": 20, "PrMargemMinima": 20.0000, "label": "04-FINANCEIRO" }], "Usuario": { "CdUsuario": 12, "NmUsuario": "Julio Ruiz", "Email": "SECASALGADA@SMALVORADA.COM" }, "CdEmpresa": 10, "id": 15, "idPai": null, "CdOrdem": "015", "PrMargem": 20.0, "CdComprador": 12, "NrCobertura": 20, "PrMargemObjetiva": null, "NrCoberturaMinima": 20, "PrMargemMinima": 20.0000, "label": "15-ADMINISTRATIVO" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 970101001, "idPai": 970101, "CdOrdem": "016001001001", "PrMargem": 0.0, "CdComprador": null, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "01-EM TRANSITO" }], "Usuario": null, "CdEmpresa": 10, "id": 970101, "idPai": 9701, "CdOrdem": "016001001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-EM TRANSITO" }], "Usuario": null, "CdEmpresa": 10, "id": 9701, "idPai": 97, "CdOrdem": "016001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-EM TRANSITO" }], "Usuario": null, "CdEmpresa": 10, "id": 97, "idPai": null, "CdOrdem": "016", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "97-EM TRANSITO" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": { "CdUsuario": 186, "NmUsuario": "Samir Ponce de Leon", "Email": "compras5@smalvorada.com" }, "CdEmpresa": 10, "id": 980101001, "idPai": 980101, "CdOrdem": "017001001001", "PrMargem": 0.0, "CdComprador": 186, "NrCobertura": 0, "PrMargemObjetiva": null, "NrCoberturaMinima": 0, "PrMargemMinima": 0.0000, "label": "01-DIVERSOS" }], "Usuario": { "CdUsuario": 186, "NmUsuario": "Samir Ponce de Leon", "Email": "compras5@smalvorada.com" }, "CdEmpresa": 10, "id": 980101, "idPai": 9801, "CdOrdem": "017001001", "PrMargem": 10.0, "CdComprador": 186, "NrCobertura": 10, "PrMargemObjetiva": null, "NrCoberturaMinima": 10, "PrMargemMinima": 10.0000, "label": "01-EQUIPAMENTOS" }, { "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 980102001, "idPai": 980102, "CdOrdem": "017001002001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": null, "CdEmpresa": 10, "id": 980102, "idPai": 9801, "CdOrdem": "017001002", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "02-VEICULOS" }, { "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 980103001, "idPai": 980103, "CdOrdem": "017001003001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-DIVERSOS" }], "Usuario": null, "CdEmpresa": 10, "id": 980103, "idPai": 9801, "CdOrdem": "017001003", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "03-OBRAS" }], "Usuario": null, "CdEmpresa": 10, "id": 9801, "idPai": 98, "CdOrdem": "017001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-IMOBILIZADO" }], "Usuario": null, "CdEmpresa": 10, "id": 98, "idPai": null, "CdOrdem": "017", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "98-PATRIMONIAL" }, { "children": [{ "children": [{ "children": [{ "children": [], "Usuario": null, "CdEmpresa": 10, "id": 990101001, "idPai": 990101, "CdOrdem": "018001001001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-FORA DE LINHA" }], "Usuario": null, "CdEmpresa": 10, "id": 990101, "idPai": 9901, "CdOrdem": "018001001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-FORA DE LINHA" }], "Usuario": null, "CdEmpresa": 10, "id": 9901, "idPai": 99, "CdOrdem": "018001", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "01-FORA DE LINHA" }], "Usuario": null, "CdEmpresa": 10, "id": 99, "idPai": null, "CdOrdem": "018", "PrMargem": null, "CdComprador": null, "NrCobertura": null, "PrMargemObjetiva": null, "NrCoberturaMinima": null, "PrMargemMinima": null, "label": "99-FORA DE LINHA" }];

    $scope.visualizar = function (id) {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/produto/classificacao_editar.html',
            controller: 'classificacaoModalInstanceCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                classificacaoSelected: function () {
                    return id;
                }
            }
        });
    }
}

function classificacaoModalInstanceCtrl($scope, $http, $uibModalInstance, classificacaoSelected) {
    $scope.cargas;

    $http.get("http://localhost:50837/api/Carga/GetAll").then(function (response) {
        $scope.cargas = response.data;
    })

    $scope.compradores = [
        { CdUsuario: 215, NmUsuario: "Alexandre Martins" },
        { CdUsuario: 14, NmUsuario: "Diego Gonçalves" },
        { CdUsuario: 175, NmUsuario: "Geraldo Bonifácio" },
        { CdUsuario: 12, NmUsuario: "Julio Ruiz" },
        { CdUsuario: 9, NmUsuario: "Leandro Moreira" },
        { CdUsuario: 15, NmUsuario: "Marcel Louis" },
        { CdUsuario: 224, NmUsuario: "Nilo Oliveira" },
        { CdUsuario: 144, NmUsuario: "Renato Barros" },
        { CdUsuario: 197, NmUsuario: "Thiago Amaral" },
        { CdUsuario: 27, NmUsuario: "Vinicius Bonifácio" },
        { CdUsuario: 13, NmUsuario: "Wanderson Batista" },
        { CdUsuario: 5, NmUsuario: "Tiago Cunha" },
        { CdUsuario: 45, NmUsuario: "Rinaldo Rocha" },
        { CdUsuario: 1, NmUsuario: "Usuario Comprador" }
    ];

    $scope.comprador;
    $scope.margem;
    $scope.margemMinima;
    $scope.cobertura;
    $scope.coberturaMinima;
    $scope.carga;

    $http.get("http://localhost:50837/api/ClassificacaoProduto/GetByCdClassificacao?cdClassificacao=" + classificacaoSelected).then(function (response) {
        $scope.comprador = response.data.Usuario.CdUsuario;
        $scope.margem = response.data.PrMargem;
        $scope.margemMinima = response.data.PrMargemMinima;
        $scope.cobertura = response.data.NrCobertura;
        $scope.coberturaMinima = response.data.NrCoberturaMinima;
        $scope.carga = response.data.CdCarga;
    });

    $scope.editar = function () {
        $scope.obj = {
            CdClassificacaoProduto: classificacaoSelected, CdComprador: $scope.comprador, PrMargem: $scope.margem,
            NrCobertura: $scope.cobertura, PrMargemMinima: $scope.margemMinima, NrCoberturaMinima: $scope.coberturaMinima, CdCarga: $scope.carga
        };

        $http.post("http://localhost:50837/api/ClassificacaoProduto/AlterarClassificacaoProduto", $scope.obj).then(function (response) {
        }, function (response) {
            return alert("Erro: " + response.status);
        });
        $uibModalInstance.close();
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

function associacaoProdutoCtrl($scope, $localStorage, $http, $uibModal, DTOptionsBuilder, SweetAlert) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'asc'])
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


    $scope.idUsuarioLogado = $localStorage.user.Id;
    $scope.grupo = $localStorage.user.Grupo[0].Id;
    $scope.associacoes;

    if ($scope.grupo == 'CPD Loja' || $scope.grupo == 'CPD Deposito') {
        $http.get("http://localhost:50837/api/CadAssProd/GetAllByUser?idUsuario=" + $scope.idUsuarioLogado).then(function (response) {
            $scope.associacoes = response.data;
        });
    }
    else {
        $http.get("http://localhost:50837/api/CadAssProd/GetAll").then(function (response) {
            $scope.associacoes = response.data;
        });
    }





    $scope.incluir = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/produto/associacao_incluir_editar.html',
            controller: 'associacaoProdutoModalInstanceCtrl',
            windowClass: "animated fadeIn",
            size: "lg",
            resolve: {
                associacaoSelected: function () {
                    return null;
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadAssProd/GetAll").then(function (response) {
                $scope.associacoes = response.data;
            });
        });
    }

    $scope.visualizar = function (associacao) {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/produto/vis_associacao.html',
            controller: 'associacaoProdutoModalInstanceCtrl',
            windowClass: "animated fadeIn",
            size: "lg",
            resolve: {
                associacaoSelected: function () {
                    return associacao;
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/CadAssProd/GetAll").then(function (response) {
                $scope.associacoes = response.data;
            });
        });
    }

    $scope.excluir = function (associacao) {
        $http.get("http://localhost:50837/api/CadAssProdGrade/GetByIdCadAss?idCadAss=" + associacao.Id).then(function (response) {
            $scope.assGrades = response.data;
        });

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
                    $http.post("http://localhost:50837/api/CadAssProd/Excluir", associacao).then(function (response) {

                        $http.post("http://localhost:50837/api/CadAssProdGrade/Excluir", $scope.assGrades).then(function (response) {
                        },
                            function (response) { return alert("Erro: " + response.status); });


                        $http.get("http://localhost:50837/api/CadAssProd/GetAll").then(function (response) {
                            $scope.associacoes = response.data;
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

    $scope.historico = function (idCadAss) {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/produto/historico.html',
            controller: 'assProdHistoricoModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                associacaoSelected: function () {
                    return idCadAss;
                }
            }
        });
    }

    $scope.incluirEan = function (Id) {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/produto/incluir_editar_EAN_Ass.html',
            controller: 'incluiEANAssModalCtrl',
            size: "lg",
            windowClass: "animated fadeIn",
            resolve: {
                associacaoSelected: function () {
                    return Id;
                }
            }
        });
    }

    //$scope.concluir = function (associacao) {
    //    $scope.objLog = { IdCadAssProd: associacao.IdCadAssProd, IdUsuario: $localStorage.user.Id, IdStatus: 6 };

    //    SweetAlert.swal({
    //        title: "Deseja concluir?",
    //        text: "Não será possivel voltar depois de concluido!",
    //        type: "warning",
    //        showCancelButton: true,
    //        confirmButtonColor: "#DD6B55",
    //        confirmButtonText: "Sim, concluir!",
    //        cancelButtonText: "Não, cancelar!",
    //        closeOnConfirm: false,
    //        closeOnCancel: false
    //    },
    //        function (isConfirm) {
    //            if (isConfirm) {
    //                $http.post("http://localhost:50837/api/CadAssProd/Concluir", associacao).then(function (response) {
    //                    $http.post("http://localhost:50837/api/CadAssProdLog/Incluir", $scope.objLog).then(function (response) {
    //                        $http.get("http://localhost:50837/api/CadAssProd/GetAll").then(function (response) {
    //                            $scope.associacoes = response.data;
    //                        });
    //                    })
    //                }, function (response) {
    //                    return alert("Erro: " + response.status);
    //                }, function (response) {
    //                    return alert("Erro: " + response.status);
    //                });
    //                SweetAlert.swal("Deletado!", "Registro excluido com sucesso", "success");
    //            } else {
    //                SweetAlert.swal("Cancelado", "Você cancelou a exclusão do registro", "error");
    //            }
    //        });
    //}

}

function associacaoProdutoModalInstanceCtrl($scope, $http, $uibModalInstance, $localStorage, $timeout, associacaoSelected) {
    $scope.produtos;
    $scope.Eans;
    $scope.grades = [{}];
    $scope.nfe;
    $scope.cnpj;
    $scope.observacao;
    $scope.status;

    if (associacaoSelected != undefined) {
        $scope.nfe = associacaoSelected.ChaveNFE;
        $scope.cnpj = associacaoSelected.CNPJ.replace('-', '').replace('.', '').replace('.', '').replace('/', '');
        $scope.observacao = associacaoSelected.Observacao;
        $scope.status = associacaoSelected.IdStatus;
    }

    if (associacaoSelected != undefined) {
        $http.get("http://localhost:50837/api/CadAssProdGrade/GetByIdCadAss?idCadAss=" + associacaoSelected.Id).then(function (response) {
            $scope.grades = response.data;
        });
    }

    $scope.incluir = function () {
        if ($scope.associacaoForm.$valid) {

            $scope.obj = { ChaveNFE: $scope.nfe, CNPJ: $scope.cnpj, IdStatus: 1, IdUsuario: $localStorage.user.Id };

            $http.post("http://localhost:50837/api/CadAssProd/Incluir", $scope.obj).then(function (response) {

            }, function (response) {
                return alert("Erro: " + response.status);
            });
            $uibModalInstance.close();
        } else {
            $scope.associacaoForm.submitted = true;
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.salvar = function () {

        /* Condição para colocar status pendente */
        if ($scope.observacao != undefined && associacaoSelected.IdStatus == 1) {
            $scope.obj = {
                Id: associacaoSelected.Id, IdCadAssProd: associacaoSelected.IdCadAssProd, ChaveNFE: associacaoSelected.ChaveNFE,
                CNPJ: associacaoSelected.CNPJ, IdStatus: 7, DataInclusao: associacaoSelected.DataInclusao,
                IdUsuario: $localStorage.user.Id, Observacao: $scope.observacao
            }

            $http.post("http://localhost:50837/api/CadAssProd/Concluir", $scope.obj).then(function (response) {
                $uibModalInstance.close();
            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }

        /* Condição para colocar status concluido */
        else {
            $scope.obj = {
                Id: associacaoSelected.Id, IdCadAssProd: associacaoSelected.IdCadAssProd, ChaveNFE: associacaoSelected.ChaveNFE,
                CNPJ: associacaoSelected.CNPJ, IdStatus: 6, DataInclusao: associacaoSelected.DataInclusao,
                IdUsuario: $localStorage.user.Id, Observacao: $scope.observacao
            }

            $http.post("http://localhost:50837/api/CadAssProd/Concluir", $scope.obj).then(function (response) {
                $uibModalInstance.close();

            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }
    }
}

function assProdHistoricoModalCtrl($scope, $uibModalInstance, associacaoSelected, $http, $localStorage) {
    $scope.historicos;

    $http.get("http://localhost:50837/api/CadAssProdLog/GetAllByCadProd?IdCadAssProd=" + associacaoSelected).then(function (response) {
        $scope.historicos = response.data;
    });
}

function incluiEANAssModalCtrl($scope, $uibModalInstance, $http, associacaoSelected, SweetAlert) {
    $scope.grades = [{}];

    $http.get('http://localhost:50837/api/ViewProduto/GetAllAtivosEInativos').then(function (response) {
        $scope.produtos = response.data;
    });

    $scope.onSelect = function ($item, $model, $label) {
        $http.get('http://localhost:50837/api/ViewProduto/GetProdutoById?produto=' + $item).then(function (response) {
            $scope.Eans = response.data;
        });
    };

    $scope.addNew = function (grade) {
        $scope.grades.push({});
    };

    $scope.remove = function (grade) {
        if ($scope.grades.length > 1) {
            $scope.grades.pop({});
        }
    };

    $scope.incluir = function () {
        for (var i = 0; i < $scope.grades.length; i++) {
            $scope.objgrade = {
                IdCadAssProd: associacaoSelected,
                Descricao: $scope.grades[i].produto,
                EAN: $scope.grades[i].EAN
            }

            $http.post("http://localhost:50837/api/CadAssProdGrade/Incluir", $scope.objgrade).then(function (response) {
                $scope = {};
                $scope.grades = [{}];
                $uibModalInstance.close();
            }, function (response) {
                return alert("Erro: " + response.status);
            })
        }
    }
}

function cadUsuarioCtrl($scope, $localStorage, $http, DTOptionsBuilder, $uibModal, SweetAlert) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'desc'])
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

    $scope.usuarios;

    $scope.usuarioLogado = $localStorage.user.Id;
    $scope.grupo = $localStorage.user.Grupo[0].Nome;

    if ($scope.grupo == "Admin" || $scope.grupo == "DP/RH" || $scope.grupo == "Indicadores" || $scope.grupo == "Coordenador Indicadores") {
        $http.get("http://localhost:50837/api/CadUsuarioOperador/GetAll").then(function (response) {
            $scope.usuarios = response.data;
        })
    }
    else {
        $http.get("http://localhost:50837/api/CadUsuarioOperador/GetAllByLoja?idUsuario=" + $localStorage.user.Id).then(function (response) {
            $scope.usuarios = response.data;
        })
    }

    $scope.solicitar = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/cadusuario/solicitar_editar_usuario.html',
            controller: 'cadUsuarioCtrlModalInstance',
            windowClass: "animated fadeIn",
            resolve: {
                cadUsuarioSelected: function () {
                    return null;
                }
            }
        }).result.then(function () {
            if ($scope.grupo == "Admin" || $scope.grupo == "DP/RH" || $scope.grupo == "Indicadores" || $scope.grupo == "Coordenador Indicadores") {
                $http.get("http://localhost:50837/api/CadUsuarioOperador/GetAll").then(function (response) {
                    $scope.operadores = response.data;
                })
            }
            else {
                $http.get("http://localhost:50837/api/CadUsuarioOperador/GetAllByLoja?idUsuario=" + $localStorage.user.Id).then(function (response) {
                    $scope.operadores = response.data;
                })
            }
        });
    }

    $scope.alteraracao = function (cadUsuario) {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/cadusuario/solicitar_editar_usuario.html',
            controller: 'cadUsuarioCtrlModalInstance',
            windowClass: "animated fadeIn",
            resolve: {
                cadUsuarioSelected: function () {
                    return cadUsuario;
                }
            }
        }).result.then(function () {
            if ($scope.grupo == "Admin" || $scope.grupo == "DP/RH" || $scope.grupo == "Indicadores" || $scope.grupo == "Coordenador Indicadores") {
                $http.get("http://localhost:50837/api/CadUsuarioOperador/GetAll").then(function (response) {
                    $scope.operadores = response.data;
                })
            }
            else {
                $http.get("http://localhost:50837/api/CadUsuarioOperador/GetAllByLoja?idUsuario=" + $localStorage.user.Id).then(function (response) {
                    $scope.operadores = response.data;
                })
            }
        });
    }

    $scope.excluir = function (cadUsuario) {
        SweetAlert.swal({
            title: "Deseja excluir o registro da pessoa: " + cadUsuario.Pessoa,
            text: "Não será possivel recuperar o registro depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "Excluido!",
                        text: "O registro foi excluido com sucesso.",
                        type: "success",
                        timer: 5000
                    });

                    $http.post("http://localhost:50837/api/CadUsuarioOperador/Excluir", cadUsuario).then(function (response) {
                        $http.get("http://localhost:50837/api/CadUsuarioOperador/GetAll").then(function (response) {
                            $scope.usuarios = response.data;
                        });
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal({
                        title: "Cancelado!",
                        text: "Você cancelou a exclusão do registro",
                        type: "error",
                        timer: 5000
                    });

                }
            });
    }

    $scope.aprovar = function (cadUsuario) {
        cadUsuario.IdAprovador = $localStorage.user.Id;
        SweetAlert.swal({
            title: "Deseja aprovar o registro da pessoa: " + cadUsuario.Pessoa,
            text: "Não será possivel voltar o registro depois de aprovado!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, aprovar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "Aprovado!",
                        text: "O registro foi aprovado com sucesso.",
                        type: "success",
                        timer: 5000
                    });

                    $http.post("http://localhost:50837/api/CadUsuarioOperador/Aprovar", cadUsuario).then(function (response) {
                        $http.get("http://localhost:50837/api/CadUsuarioOperador/GetAll").then(function (response) {
                            $scope.usuarios = response.data;
                        });
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal({
                        title: "Cancelado!",
                        text: "Você cancelou a aprovação do registro",
                        type: "error",
                        timer: 5000
                    });
                }
            });
    }

    $scope.reprovar = function (cadUsuario) {
        cadUsuario.IdAprovador = $localStorage.user.Id;
        SweetAlert.swal({
            title: "Deseja reprovar o registro da pessoa: " + cadUsuario.Pessoa,
            text: "Não será possivel voltar o registro depois de aprovado!",
            type: "input",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, reprovar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    cadUsuario.Motivo = isConfirm;
                    SweetAlert.swal({
                        title: "Reprovado!",
                        text: "O registro foi reprovar com sucesso.",
                        type: "success",
                        timer: 5000
                    });

                    $http.post("http://localhost:50837/api/CadUsuarioOperador/Reprovar", cadUsuario).then(function (response) {
                        $http.get("http://localhost:50837/api/CadUsuarioOperador/GetAll").then(function (response) {
                            $scope.usuarios = response.data;
                        });
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal({
                        title: "Cancelado!",
                        text: "Você cancelou a reprovação do registro",
                        type: "error",
                        timer: 5000
                    });
                }
            });
    }

    $scope.concluir = function (cadUsuario) {
        cadUsuario.IdAprovador = $localStorage.user.Id;
        SweetAlert.swal({
            title: "Deseja concluir o registro da pessoa: " + cadUsuario.Pessoa,
            text: "Não será possivel voltar o registro depois de concluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, concluir!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "Concluido!",
                        text: "O registro foi concluido com sucesso.",
                        type: "success",
                        timer: 5000
                    });

                    $http.post("http://localhost:50837/api/CadUsuarioOperador/Concluir", cadUsuario).then(function (response) {
                        $http.get("http://localhost:50837/api/CadUsuarioOperador/GetAll").then(function (response) {
                            $scope.usuarios = response.data;
                        });
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal({
                        title: "Cancelado!",
                        text: "Você cancelou a conclusão do registro",
                        type: "error",
                        timer: 5000
                    });
                }
            });
        //$http.post("http://localhost:50837/api/CadUsuarioOperador/Concluir", cadUsuarioSelected).then(function (response) {
        //}, function (response) {
        //    return alert("Erro: " + response.status);
        //});
        //$uibModalInstance.close();
    }

    $scope.historico = function (cadUsuario) {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/cadusuario/historico.html',
            controller: 'cadUsuarioHistoricoModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                cadUsuarioSelected: function () {
                    return cadUsuario;
                }
            }
        });
    }
}

function cadUsuarioCtrlModalInstance($scope, $uibModalInstance, cadUsuarioSelected, $http, $localStorage, SweetAlert) {
    $scope.filiais;
    $scope.tipo = false;
    $scope.grupo = $localStorage.user.Grupo[0].Nome;
    $scope.userLogado = $localStorage.user.Id;

    $scope.$watch('senha', function (newVal, oldVal) {
        if (newVal.length > 4) {
            $scope.senha = oldVal;
        }
    });

    $http.get("http://localhost:50837/api/EmpresaFilial/GetAllOrdered").then(function (response) {
        $scope.filiais = response.data;
    })

    $scope.tiposdecadastro = ["Novo", "Transferencia"];
    $scope.setores = ["Gerente Loja", "Operador", "Supervisor/Seção", "Supervisor/Loja", "Compras", "Contabilidade", "Contas", "CPD", "Diretoria", "Financeiro", "Gerência", "Indicadores", "Prevenção", "Tesouraria", "TI"];

    if (cadUsuarioSelected != undefined || cadUsuarioSelected != null) {
        $scope.status = cadUsuarioSelected.IdStatus
        $scope.tipocadastro = cadUsuarioSelected.TipoSolicitacao;
        $scope.pessoa = cadUsuarioSelected.Pessoa;
        $scope.setor = cadUsuarioSelected.Setor;
        $scope.filial = cadUsuarioSelected.Filial;
        $scope.comercial = cadUsuarioSelected.Comercial;
        $scope.financeiro = cadUsuarioSelected.Financeiro;
        $scope.loja2 = cadUsuarioSelected.Loja2;
        $scope.concentrador = cadUsuarioSelected.Concentrador;
        $scope.pdv = cadUsuarioSelected.Pdv;
        $scope.wms = cadUsuarioSelected.Wms;
        $scope.pidgin = cadUsuarioSelected.Pidgin;
        $scope.email = cadUsuarioSelected.Email;
        $scope.observacao = cadUsuarioSelected.Observacao;
        $scope.tipo = true;
        $scope.userCadastro = cadUsuarioSelected.IdUsuario;
        $scope.usuarioCadastro = cadUsuarioSelected.IdUsuario;
        $scope.idStatus = cadUsuarioSelected.IdStatus;
        $scope.senha = cadUsuarioSelected.Senha;
        $scope.motivo = cadUsuarioSelected.Motivo;
        console.log(cadUsuarioSelected);
    }

    $scope.incluir = function () {

        if ($scope.cadUsuarioForm.$valid) {
            $scope.obj = {
                TipoSolicitacao: $scope.tipocadastro, Pessoa: $scope.pessoa, Setor: $scope.setor, Filial: $scope.filial, Comercial: $scope.comercial,
                Financeiro: $scope.financeiro, Loja2: $scope.loja2, Concentrador: $scope.concentrador, Pdv: $scope.pdv, WMS: $scope.wms, Pidgin: $scope.pidgin, Email: $scope.email,
                Observacao: $scope.observacao, Idusuario: $localStorage.user.Id, Senha: $scope.senha
            }

            $http.post("http://localhost:50837/api/CadUsuarioOperador/Incluir", $scope.obj).then(function (response) {
            }, function (response) {
                return alert("Erro: " + response.status);
            });
            SweetAlert.swal({
                title: "A solicitação foi feita com sucesso!",
                type: "success",
                timer: 5000
            });
            $uibModalInstance.close();

        } else {
            $scope.cadUsuarioForm.submitted = true;
        }
    }

    $scope.alterar = function () {
        if ($scope.cadUsuarioForm.$valid) {
            $scope.obj = {
                TipoSolicitacao: $scope.tipocadastro, Pessoa: $scope.pessoa, Setor: $scope.setor, Filial: $scope.filial, Comercial: $scope.comercial,
                Financeiro: $scope.financeiro, Loja2: $scope.loja2, Concentrador: $scope.concentrador, Pdv: $scope.pdv, WMS: $scope.wms, Pidgin: $scope.pidgin, Email: $scope.email,
                Observacao: $scope.observacao, Idusuario: $localStorage.user.Id, IdStatus: cadUsuarioSelected.IdStatus, DataInclusao: cadUsuarioSelected.DataInclusao,
                Id: cadUsuarioSelected.Id, Senha: $scope.senha
            }

            $http.post("http://localhost:50837/api/CadUsuarioOperador/Alterar", $scope.obj).then(function (response) {
                $uibModalInstance.close();
            }, function (response) {
                return alert("Erro: " + response.status);
            });
        } else {
            $scope.cadUsuarioForm.submitted = true;
        }
    }

    $scope.excluir = function () {

        $http.post("http://localhost:50837/api/CadUsuarioOperador/Excluir", cadUsuarioSelected).then(function (response) {
        }, function (response) {
            return alert("Erro: " + response.status);
        });
        $uibModalInstance.close();
    }

    $scope.concluir = function () {
        $http.post("http://localhost:50837/api/CadUsuarioOperador/Concluir", cadUsuarioSelected).then(function (response) {
            $uibModalInstance.close();
            SweetAlert.swal({
                title: "Concluido!",
                text: "O registro foi concluido com sucesso.",
                type: "success",
                timer: 5000
            });
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
}

function cadUsuarioHistoricoModalCtrl($scope, $uibModalInstance, cadUsuarioSelected, $http, $localStorage) {
    $scope.historicos;

    $http.get("http://localhost:50837/api/CadUsuarioOperadorLog/GetAllById?IdUsuLog=" + cadUsuarioSelected.Id).then(function (response) {
        $scope.historicos = response.data;
    });
}

function operadorCtrl($scope, $localStorage, $http, DTOptionsBuilder, $uibModal, SweetAlert, $interval) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'desc'])
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

    $scope.operadores;

    $http.get("http://localhost:50837/api/Operador/GetAll").then(function (response) {
        $scope.operadores = response.data;
    })

    $scope.incluir = function () {

        var ModalInstance = $uibModal.open({
            templateUrl: 'Views/modal/cadusuario/incluir_operador.html',
            controller: 'operadorCtrlModal',
            windowClass: "animated fadeIn",
            resolve: {
                operadorSelected: function () {
                    return null;
                },
                TipoCadastro: function () {
                    return "Inclusao";
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/Operador/GetAll").then(function (response) {
                $scope.operadores = response.data;
            });
        });
    }

    $scope.alterar = function (operador) {
        $uibModal.open({
            templateUrl: 'Views/modal/cadusuario/incluir_operador.html',
            controller: 'operadorCtrlModal',
            windowClass: "animated fadeIn",
            resolve: {
                operadorSelected: function () {
                    return operador;
                },
                TipoCadastro: function () {
                    return "Alteracao";
                }
            }
        })
    }

    $scope.inativar = function (operador) {
        $uibModal.open({
            templateUrl: 'Views/modal/cadusuario/incluir_operador.html',
            controller: 'operadorCtrlModal',
            windowClass: "animated fadeIn",
            resolve: {
                operadorSelected: function () {
                    return operador;
                }
            },
            TipoCadastro: function () {
                return "Inativacao";
            }
        })
    }

    $scope.historico = function (codigo) {
        $uibModal.open({
            templateUrl: 'Views/modal/cadusuario/historico_operador.html',
            controller: 'operadorHistoricoCtrlModal',
            windowClass: "animated fadeIn",
            resolve: {
                codigoSelected: function () {
                    return codigo;
                }
            }
        })
    }
}

function operadorCtrlModal($scope, $localStorage, $http, DTOptionsBuilder, $uibModalInstance, SweetAlert, operadorSelected, TipoCadastro, notify) {
    $scope.filiais;
    $scope.filiaisNome = [];
    $scope.inspiniaTemplate = 'views/common/notify.html';
    $scope.obj;
    $scope.tipo = TipoCadastro;
    $scope.cdOperador;

    $http.get("http://localhost:50837/api/Operador/GetLastIdOperador").then(function (response) {
        $scope.cdOperador = response.data;
    })

    if (operadorSelected != null) {
        $scope.inclusao = false;
    }

    $http.get("http://localhost:50837/api/EmpresaFilial/GetAllLojasOrdered").then(function (response) {
        $scope.filiais = response.data;
    });

    $scope.$watch('senha', function (newVal, oldVal) {
        if (newVal.length > 4) {
            $scope.senha = oldVal;
        }
    });

    $scope.incluir = function () {

        for (i = 0; i < $scope.lojas.length; i++) {

            notify({ message: 'Incluindo Operador na Filial: ' + $scope.lojas[i].nmFilial, classes: 'alert-warning', templateUrl: $scope.inspiniaTemplate });

            $scope.obj = {
                CdEmpresa: 10, CdFilial: $scope.lojas[i].cdPessoaFilial, CdOperador: $scope.cdOperador, NmOperador: $scope.operador,
                CdNivel: $scope.nivel, Senha: $scope.senha
            }

            $http.post("http://localhost:50837/api/Operador/IncluirDorsais", $scope.obj).then(function (response) {
                notify({ message: 'Concluido', classes: 'alert-info', templateUrl: $scope.inspiniaTemplate });
            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }

        $scope.objCentral = {
            CdEmpresa: 10, CdFilial: 1, CdOperador: $scope.cdOperador, NmOperador: $scope.operador,
            CdNivel: $scope.nivel, Senha: $scope.senha, Filiais: $scope.filiaisNome.toString()
        }

        $http.post("http://localhost:50837/api/Operador/IncluirIntranet", $scope.objCentral).then(function (response) {
            $uibModalInstance.close();
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    $scope.inativar = function () {
        for (i = 0; i < $scope.lojas.length; i++) {

            notify({ message: 'Inativando Operador na Filial: ' + $scope.lojas[i].nmFilial, classes: 'alert-warning', templateUrl: $scope.inspiniaTemplate });

            $scope.obj = {
                CdEmpresa: 10, CdFilial: $scope.lojas[i].cdPessoaFilial, CdOperador: operadorSelected.CdOperador, NmOperador: operadorSelected.NmOperador,
                CdNivel: operadorSelected.CdNivel, Senha: operadorSelected.Senha
            }

            $http.post("http://localhost:50837/api/Operador/InativarDorsais", $scope.obj).then(function (response) {
                notify({ message: 'Inativado', classes: 'alert-danger', templateUrl: $scope.inspiniaTemplate });
            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }
        $uibModalInstance.close();
    }

    $scope.alterar = function () {
        for (i = 0; i < $scope.lojas.length; i++) {

            notify({ message: 'Incluido Operador na Filial: ' + $scope.lojas[i].nmFilial, classes: 'alert-warning', templateUrl: $scope.inspiniaTemplate });

            $scope.obj = {
                CdEmpresa: 10, CdFilial: $scope.lojas[i].cdPessoaFilial, CdOperador: operadorSelected.CdOperador, NmOperador: operadorSelected.NmOperador,
                CdNivel: operadorSelected.CdNivel, Senha: operadorSelected.Senha
            }

            $http.post("http://localhost:50837/api/Operador/IncluirDorsais", $scope.obj).then(function (response) {
                notify({ message: 'Concluido', classes: 'alert-info', templateUrl: $scope.inspiniaTemplate });
            }, function (response) {
                return alert("Erro: " + response.status);
            });
        }
        $uibModalInstance.close();
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }

}

function operadorHistoricoCtrlModal($scope, $localStorage, $http, $uibModalInstance, codigoSelected) {
    $scope.historicos;

    $http.get("http://localhost:50837/api/Operador/GetLogByCodigo?codigo=" + codigoSelected).then(function (response) {
        $scope.historicos = response.data;
    });
}

function chamSuporteCtrl($scope, $uibModal, $http, $localStorage, SweetAlert, DTOptionsBuilder) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'desc'])
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

    $scope.chamados;
    $scope.assuntos;
    $scope.usuarioLogado = $localStorage.user.Id;

    $http.get("http://localhost:50837/api/ChamSuporte/GetAll").then(function (response) {
        $scope.chamados = response.data
    })

    $scope.incluir = function () {
        var modalIstance = $uibModal.open({
            templateUrl: 'Views/modal/suporte/solicitar_editar_chamado.html',
            controller: 'chamSuporteCtrlModalInstance',
            windowClass: "animated fadeIn",
            resolve: {
                chamadoSelected: function () {
                    return null;
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/ChamSuporte/GetAll").then(function (response) {
                $scope.chamados = response.data;
            });
        });
    }

    $scope.visualizar = function (chamado) {
        var modalIstance = $uibModal.open({
            templateUrl: 'Views/modal/suporte/solicitar_editar_chamado.html',
            controller: 'chamSuporteCtrlModalInstance',
            windowClass: "animated fadeIn",
            resolve: {
                chamadoSelected: function () {
                    return chamado;
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/ChamSuporte/GetAll").then(function (response) {
                $scope.chamados = response.data;
            });
        });
    }

    $scope.excluir = function (chamado) {
        SweetAlert.swal({
            title: "Deseja excluir a solicitacao do: " + chamado.UsuarioCadastro.Nome + " " + chamado.UsuarioCadastro.Sobrenome,
            text: "Não será possivel recuperar a solicitacao depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "Excluido!",
                        text: "A solicitacao foi excluida com sucesso.",
                        type: "success",
                        timer: 5000
                    });

                    $http.post("http://localhost:50837/api/ChamSuporte/Excluir", chamado).then(function (response) {
                        $http.get("http://localhost:50837/api/ChamSuporte/GetAll").then(function (response) {
                            $scope.chamados = response.data;
                        });
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal({
                        title: "Cancelado!",
                        text: "Você cancelou a exclusão da solicitacao",
                        type: "error",
                        timer: 5000
                    });

                }
            });
    }

    $scope.concluir = function (chamado) {
        SweetAlert.swal({
            title: "Deseja concluir a solicitacao do: " + chamado.UsuarioCadastro.Nome + " " + chamado.UsuarioCadastro.Sobrenome,
            text: "Não será possivel recuperar a solicitacao depois de concluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, concluir!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    $scope.objLog = { IdChamSuporte: chamado.Id, IdUsuario: $localStorage.user.Id, IdStatus: 6 };
                    SweetAlert.swal({
                        title: "Concluido!",
                        text: "A solicitacao foi concluida com sucesso.",
                        type: "success",
                        timer: 5000
                    });

                    $http.post("http://localhost:50837/api/ChamSuporte/Concluir", chamado).then(function (response) {
                        $http.post("http://localhost:50837/api/ChamSuporteLog/Incluir", $scope.objLog).then(function (response) {
                            $http.get("http://localhost:50837/api/ChamSuporte/GetAll").then(function (response) {
                                $scope.chamados = response.data;
                            });
                        }, function (response) {
                            return alert("Erro: " + response.status);
                        });
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal({
                        title: "Cancelado!",
                        text: "Você cancelou a conclusão da solicitacao",
                        type: "error",
                        timer: 5000
                    });

                }
            });
    }

    $scope.vincular = function (chamado) {
        var modalIstance = $uibModal.open({
            templateUrl: 'Views/modal/suporte/vincular_chamado.html',
            controller: 'chamSuporteVinculoCtrlModalInstance',
            windowClass: "animated fadeIn",
            resolve: {
                chamadoSelected: function () {
                    return chamado;
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/ChamSuporte/GetAll").then(function (response) {
                $scope.chamados = response.data;
            });
        });
    }

    $scope.historico = function (chamado) {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/suporte/historico.html',
            controller: 'historicoChamSuporteModalCtrl',
            windowClass: "animated fadeIn",
            resolve: {
                chamadoSelected: function () {
                    return chamado;
                }
            }
        });
    }

}

function chamSuporteCtrlModalInstance($scope, $uibModalInstance, chamadoSelected, SweetAlert, $http, $localStorage) {
    $scope.assuntos;
    $scope.status;
    $scope.usuarioCadastro;
    $scope.usuarioLogado = $localStorage.user.Id;
    $http.get("http://localhost:50837/api/ChamSuporte/GetAssuntos").then(function (response) {
        $scope.assuntos = response.data
    })

    if (chamadoSelected != undefined) {
        $scope.usuarioCadastro = chamadoSelected.IdUsuario;
        $scope.assunto = chamadoSelected.IdAssunto;
        $scope.setor = chamadoSelected.Setor;
        $scope.descricao = chamadoSelected.Descricao;
        $scope.status = chamadoSelected.IdStatus;
    }

    $scope.incluir = function () {
        $scope.obj = { IdAssunto: $scope.assunto, Setor: $scope.setor, Descricao: $scope.descricao, IdStatus: 1, IdUsuario: $localStorage.user.Id }
        $http.post("http://localhost:50837/api/ChamSuporte/Incluir", $scope.obj).then(function (response) {
            SweetAlert.swal({
                title: "Inclusão feita com sucesso!",
                type: "success",
                timer: 5000
            });
            $uibModalInstance.close();
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    $scope.alterar = function () {
        $scope.obj = {
            IdAssunto: $scope.assunto, Setor: $scope.setor, Descricao: $scope.descricao,
            IdStatus: chamadoSelected.IdStatus, IdUsuario: chamadoSelected.IdUsuario, IdVinculado: chamadoSelected.IdVinculado,
            DataInclusao: chamadoSelected.DataInclusao, Id: chamadoSelected.Id
        }
        $http.post("http://localhost:50837/api/ChamSuporte/Alterar", $scope.obj).then(function (response) {
            SweetAlert.swal({
                title: "Alteração feita com sucesso!",
                type: "success",
                timer: 5000
            });
            $uibModalInstance.close();
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }
}

function chamSuporteVinculoCtrlModalInstance($scope, $uibModalInstance, SweetAlert, $http, chamadoSelected) {
    $scope.usuariosSuporte;
    $scope.usuarioSuporte = chamadoSelected.IdVinculado;

    $http.get("http://localhost:50837/api/Usuario/GetAllTI").then(function (response) {
        $scope.usuariosSuporte = response.data
    });

    $scope.salvar = function () {
        $scope.obj = {
            IdAssunto: chamadoSelected.IdAssunto, Setor: chamadoSelected.Setor, Descricao: chamadoSelected.Descricao,
            IdStatus: chamadoSelected.IdStatus, IdUsuario: chamadoSelected.IdUsuario, IdVinculado: $scope.usuarioSuporte,
            DataInclusao: chamadoSelected.DataInclusao, Id: chamadoSelected.Id
        };

        $http.post("http://localhost:50837/api/ChamSuporte/Alterar", $scope.obj).then(function (response) {
            SweetAlert.swal({
                title: "Vinculo feito com sucesso!",
                type: "success",
                timer: 5000
            });
            $uibModalInstance.close();
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }
}

function historicoChamSuporteModalCtrl($scope, $uibModalInstance, chamadoSelected, $http, $localStorage) {
    $scope.historicos

    $http.get("http://localhost:50837/api/ChamSuporteLog/GetAllByIdChamSuporte?IdChamSuporte=" + chamadoSelected.Id).then(function (response) {
        $scope.historicos = response.data;
        console.log(response.data);
    });
}

function chamSuporteAssuntoCtrl($scope, $uibModal, $http, $localStorage, SweetAlert, DTOptionsBuilder) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'desc'])
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

    $scope.assuntos;

    $http.get("http://localhost:50837/api/ChamSuporte/GetAssuntos").then(function (response) {
        $scope.assuntos = response.data;
    });

    $scope.incluir = function () {
        var modalIstance = $uibModal.open({
            templateUrl: 'Views/modal/suporte/incluir_editar_chamado_assunto.html',
            controller: 'chamSuporteAssuntoCtrlModalInstance',
            windowClass: "animated fadeIn",
            resolve: {
                chamadoAssuntoSelected: function () {
                    return null;
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/ChamSuporte/GetAssuntos").then(function (response) {
                $scope.assuntos = response.data;
            });
        });
    }

    $scope.alterar = function (assunto) {
        var modalIstance = $uibModal.open({
            templateUrl: 'Views/modal/suporte/incluir_editar_chamado_assunto.html',
            controller: 'chamSuporteAssuntoCtrlModalInstance',
            windowClass: "animated fadeIn",
            resolve: {
                chamadoAssuntoSelected: function () {
                    return assunto;
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/ChamSuporte/GetAssuntos").then(function (response) {
                $scope.assuntos = response.data;
            });
        });
    }
}

function chamSuporteAssuntoCtrlModalInstance($scope, $uibModalInstance, $http, $localStorage, SweetAlert, chamadoAssuntoSelected) {
    $scope.tipo = "inclusao"

    if (chamadoAssuntoSelected != undefined) {
        $scope.assunto = chamadoAssuntoSelected.Descricao;
        $scope.tipo = "alteracao"
    }

    $scope.incluir = function () {
        $scope.obj = { Descricao: $scope.assunto };

        $http.post("http://localhost:50837/api/ChamSuporte/IncluirAssunto", $scope.obj).then(function (response) {
            SweetAlert.swal({
                title: "Inclusão feita com sucesso!",
                type: "success",
                timer: 5000
            });
            $uibModalInstance.close();
        },
            function (response) {
                return alert("Erro: " + response.status);
            });
    }

    $scope.alterar = function () {
        $scope.obj = { Id: chamadoAssuntoSelected.Id, Descricao: $scope.assunto };

        $http.post("http://localhost:50837/api/ChamSuporte/AlterarAssunto", $scope.obj).then(function (response) {
            SweetAlert.swal({
                title: "Alteração feita com sucesso!",
                type: "success",
                timer: 5000
            });
            $uibModalInstance.close();
        },
            function (response) {
                return alert("Erro: " + response.status);
            });
    }
}

function estoqueNotaCtrl($scope, $uibModal, $http, $localStorage, SweetAlert, DTOptionsBuilder) {

}

function maloteCtrl($scope, $uibModal, $http, $localStorage, SweetAlert, DTOptionsBuilder) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'desc'])
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

    $scope.grupo = $localStorage.user.Grupo[0].Nome;
    $scope.malotes;
    $scope.malotedisp;

    switch ($scope.grupo) {
        case "Gestor Contabilidade/Financeiro":
        case "Contabilidade":
            $http.get("http://localhost:50837/api/Malote/GetAllMalotesTesourariaAndCPD").then(function (response) {
                $scope.malotes = response.data;
            })
            $scope.malotedisp = true;
            break;
        case "DP/RH":
            $http.get("http://localhost:50837/api/Malote/GetAllMalotesDP").then(function (response) {
                $scope.malotes = response.data;
            })
            $scope.malotedisp = true;
            break;
        case "CPD Deposito":
            $http.get("http://localhost:50837/api/Malote/GetAllMalotes").then(function (response) {
                $scope.malotes = response.data;
            })
        case "CPD Loja":
        case "Tesouraria":
        case "DP/RH Loja":
            $http.get("http://localhost:50837/api/Malote/GetAllMalotesByUsuario?idUsuario=" + $localStorage.user.Id).then(function (response) {
                $scope.malotes = response.data;
            })
            $http.get("http://localhost:50837/api/Malote/GetAllMalotesByUsuarioDisp?idUsuario=" + $localStorage.user.Id).then(function (response) {
                $scope.malotedisp = response.data;
            })
            break;
    }

    $scope.incluir = function () {
        if ($scope.malotedisp) {
            var modalIstance = $uibModal.open({
                templateUrl: 'Views/modal/malote/incluir_editar_malote.html',
                controller: 'maloteCtrlModalInstance',
                windowClass: "animated fadeIn",
                resolve: {
                    maloteSelected: function () {
                        return null;
                    }
                }
            }).result.then(function () {
                switch ($scope.grupo) {
                    case "Contabilidade":
                        $http.get("http://localhost:50837/api/Malote/GetAllMalotesTesourariaAndCPD").then(function (response) {
                            $scope.malotes = response.data;
                        })
                        $scope.malotedisp = true;
                        break;
                    case "DP/RH":
                        $http.get("http://localhost:50837/api/Malote/GetAllMalotesDP").then(function (response) {
                            $scope.malotes = response.data;
                        })
                        $scope.malotedisp = true;
                        break;
                    case "CPD Deposito":
                        $http.get("http://localhost:50837/api/Malote/GetAllMalotes").then(function (response) {
                            $scope.malotes = response.data;
                        })
                    case "CPD Loja":
                    case "Tesouraria":
                    case "DP/RH Loja":
                        $http.get("http://localhost:50837/api/Malote/GetAllMalotesByUsuario?idUsuario=" + $localStorage.user.Id).then(function (response) {
                            $scope.malotes = response.data;
                        })
                        $http.get("http://localhost:50837/api/Malote/GetAllMalotesByUsuarioDisp?idUsuario=" + $localStorage.user.Id).then(function (response) {
                            $scope.malotedisp = response.data;
                        })
                        break;
                }
            });
        }
        else {
            SweetAlert.swal({
                title: "Aviso!",
                text: "Você não possui malote liberado para envio!",
                type: "warning",
                timer: 5000
            });
        }
    }

    $scope.detalhe = function (malote) {
        var modalIstance = $uibModal.open({
            templateUrl: 'Views/modal/malote/incluir_editar_malote.html',
            controller: 'maloteCtrlModalInstance',
            windowClass: "animated fadeIn",
            resolve: {
                maloteSelected: function () {
                    return malote;
                }
            }
        }).result.then(function () {
            switch ($scope.grupo) {
                case "Gestor Contabilidade/Financeiro":
                case "Contabilidade":
                    $http.get("http://localhost:50837/api/Malote/GetAllMalotesTesourariaAndCPD").then(function (response) {
                        $scope.malotes = response.data;
                    })
                    $scope.malotedisp = true;
                    break;
                case "DP/RH":
                    $http.get("http://localhost:50837/api/Malote/GetAllMalotesDP").then(function (response) {
                        $scope.malotes = response.data;
                    })
                    $scope.malotedisp = true;
                    break;
                case "CPD Deposito":
                    $http.get("http://localhost:50837/api/Malote/GetAllMalotes").then(function (response) {
                        $scope.malotes = response.data;
                    })
                    break;
                case "CPD Loja":
                case "Tesouraria":
                case "DP/RH Loja":
                    $http.get("http://localhost:50837/api/Malote/GetAllMalotesByUsuario?idUsuario=" + $localStorage.user.Id).then(function (response) {
                        $scope.malotes = response.data;
                    })
                    $http.get("http://localhost:50837/api/Malote/GetAllMalotesByUsuarioDisp?idUsuario=" + $localStorage.user.Id).then(function (response) {
                        $scope.malotedisp = response.data;
                    })
                    break;
            }
        });
    }

    $scope.historico = function (malote) {
        var modalIstance = $uibModal.open({
            templateUrl: 'Views/modal/malote/historico.html',
            controller: 'maloteHistoricoCtrlModalInstance',
            windowClass: "animated fadeIn",
            resolve: {
                maloteSelected: function () {
                    return malote;
                }
            }
        });
    }
}

function maloteCtrlModalInstance($uibModalInstance, $http, $scope, maloteSelected, notify, $localStorage, SweetAlert) {
    $scope.inspiniaTemplate = 'views/common/notify.html';
    $scope.malotes;
    $scope.grupo = $localStorage.user.Grupo[0].Nome;
    $scope.id;
    $scope.usuarioLogado = $localStorage.user.Id;
    $scope.usuarioCadastro;
    $scope.idStatus;
    $scope.isdisable = false;
    $scope.lojas;

    if (maloteSelected != null) {
        $scope.lacre = maloteSelected.Numero_Lacre;
        $scope.maloteDisp = maloteSelected.IdMalote;
        $scope.descricao = maloteSelected.Descricao;
        $scope.loja = maloteSelected.IdUsuarioEnviado;
        $scope.id = maloteSelected.Id;
        $scope.usuarioCadastro = maloteSelected.IdUsuarioInclusao;
        $scope.idStatus = maloteSelected.Status;
        $scope.motivo = maloteSelected.Motivo;
    }

    switch ($scope.grupo) {
        case "Gestor Contabilidade/Financeiro":
        case "Contabilidade":
            $http.get("http://localhost:50837/api/Malote/GetAllTiposMaloteTesourariaAndCPD").then(function (response) {
                $scope.malotes = response.data;
            })
            break;
        case "DP/RH":
            $http.get("http://localhost:50837/api/Malote/GetAllTiposMaloteDP").then(function (response) {
                $scope.malotes = response.data;
            })
            $http.get("http://localhost:50837/api/Usuario/GetAllDPLojas").then(function (response) {
                $scope.lojas = response.data;
            })
            break;
        case "CPD Deposito":
            $http.get("http://localhost:50837/api/Usuario/GetAllDPLojas").then(function (response) {
                $scope.lojas = response.data;
            })
            $http.get("http://localhost:50837/api/Malote/GetAllTiposMalote").then(function (response) {
                $scope.malotes = response.data;
            })
            break;
        case "CPD Loja":
            $http.get("http://localhost:50837/api/Malote/GetAllTiposMaloteCPD").then(function (response) {
                $scope.malotes = response.data;
            })
            break;
        case "Tesouraria":
            $http.get("http://localhost:50837/api/Malote/GetAllTiposMaloteTesouraria").then(function (response) {
                $scope.malotes = response.data;
            })
            break;
        case "DP/RH Loja":
            $http.get("http://localhost:50837/api/Malote/GetAllTiposMaloteDP").then(function (response) {
                $scope.malotes = response.data;
            })
            break;
    }

    $scope.incluir = function () {
        $scope.obj = {
            Numero_Lacre: $scope.lacre, IdMalote: $scope.maloteDisp, Descricao: $scope.descricao,
            IdUsuarioInclusao: $localStorage.user.Id, IdUsuarioEnviado: $scope.loja
        }

        $scope.isdisable = true;

        if ($scope.grupo != "CPD Deposito") {
            $http.post("http://localhost:50837/api/Malote/IncluirMalote", $scope.obj).then(function (response) {
                notify({ message: "Incluido com sucesso!", classes: 'alert-info', templateUrl: $scope.inspiniaTemplate, duration: 5000 });
                $uibModalInstance.close();
            }, function (response) {
                return alert("Erro" + response.status);
            })
        }

        else {
            $http.post("http://localhost:50837/api/Malote/IncluirMaloteDeposito", $scope.obj).then(function (response) {
                notify({ message: "Incluido com sucesso!", classes: 'alert-info', templateUrl: $scope.inspiniaTemplate, duration: 5000 });
                $uibModalInstance.close();
            }, function (response) {
                return alert("Erro" + response.status);
            })
        }
    }

    $scope.editar = function () {
        $scope.obj = {
            Id: maloteSelected.Id, DtEnvio: maloteSelected.DtEnvio, Numero_Lacre: $scope.lacre, Descricao: $scope.descricao,
            Status: maloteSelected.Status, IdUsuarioInclusao: maloteSelected.IdUsuarioInclusao, IdMalote: $scope.maloteDisp,
            IdUsuarioEnviado: $scope.loja
        }

        $scope.isdisable = true;

        $http.post("http://localhost:50837/api/Malote/AlterarMalote", $scope.obj).then(function (response) {
            notify({ message: "Alterado com sucesso!", classes: 'alert-info', templateUrl: $scope.inspiniaTemplate, duration: 5000 });
            $uibModalInstance.close();
        }, function (response) {
            return alert("Erro" + response.status);
        })
    }

    $scope.excluir = function () {

        SweetAlert.swal({
            title: "Deseja Excluir?",
            text: "Não será possivel recuperar o registro depois de excluir!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, Excluir!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/Malote/ExcluirMalote", maloteSelected).then(function (response) {
                        SweetAlert.swal({
                            title: "Excluido!",
                            text: "O registro foi excluido com sucesso!",
                            type: "success",
                            timer: 5000
                        });
                        $uibModalInstance.close();
                    }, function (response) {
                        return alert("Erro" + response.status);
                    })
                } else {
                    SweetAlert.swal({
                        title: "Cancelado!",
                        text: "Você cancelou a exclusão!",
                        type: "error",
                        timer: 5000
                    });
                    $uibModalInstance.dismiss();
                }
            });
    }

    $scope.confirmarDeposito = function () {

        $scope.obj = {
            Id: maloteSelected.Id, DtEnvio: maloteSelected.DtEnvio, Numero_Lacre: maloteSelected.Numero_Lacre, Descricao: maloteSelected.Descricao,
            Status: 4, IdUsuarioInclusao: maloteSelected.IdUsuarioInclusao, IdMalote: maloteSelected.IdMalote,
            IdUsuarioEnviado: maloteSelected.IdUsuarioEnviado, IdUsuarioRecebimento: $localStorage.user.Id
        }

        SweetAlert.swal({
            title: "Deseja Confirmar?",
            text: "Não será possivel voltar o registro depois de confirmado!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, confirmar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000,
            showLoaderOnConfirm: true
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "Confirmado!",
                        text: "O registro foi confimado com sucesso!",
                        type: "success",
                        timer: 5000
                    });
                    $http.post("http://localhost:50837/api/Malote/ConfirmarMalote", $scope.obj).then(function (response) {
                        $uibModalInstance.close();
                    }, function (response) {
                        return alert("Erro" + response.status);
                    })
                }
                else {
                    SweetAlert.swal({
                        title: "Cancelado!",
                        text: "Você cancelou a confirmacao!",
                        type: "error",
                        timer: 5000
                    });
                    $uibModalInstance.dismiss();
                }
            });
    }

    $scope.confirmar = function () {

        $scope.obj = {
            Id: maloteSelected.Id, DtEnvio: maloteSelected.DtEnvio, Numero_Lacre: maloteSelected.Numero_Lacre, Descricao: maloteSelected.Descricao,
            Status: 2, IdUsuarioInclusao: maloteSelected.IdUsuarioInclusao, IdMalote: maloteSelected.IdMalote,
            IdUsuarioEnviado: maloteSelected.IdUsuarioEnviado, IdUsuarioRecebimento: $localStorage.user.Id, Motivo: maloteSelected.Motivo
        }

        SweetAlert.swal({
            title: "Deseja Confirmar?",
            text: "Não será possivel voltar o registro depois de confirmado!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, confirmar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000,
            showLoaderOnConfirm: true
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "Confirmado!",
                        text: "O registro foi confimado com sucesso!",
                        type: "success",
                        timer: 5000
                    });
                    $http.post("http://localhost:50837/api/Malote/ConfirmarMalote", $scope.obj).then(function (response) {
                        $uibModalInstance.close();
                    }, function (response) {
                        return alert("Erro" + response.status);
                    })
                }
                else {
                    SweetAlert.swal({
                        title: "Cancelado!",
                        text: "Você cancelou a confirmacao!",
                        type: "error",
                        timer: 5000
                    });
                    $uibModalInstance.dismiss();
                }
            });
    }

    $scope.pendurar = function () {

        $scope.obj = {
            Id: maloteSelected.Id, DtEnvio: maloteSelected.DtEnvio, Numero_Lacre: maloteSelected.Numero_Lacre, Descricao: maloteSelected.Descricao,
            Status: 3, IdUsuarioInclusao: maloteSelected.IdUsuarioInclusao, IdMalote: maloteSelected.IdMalote,
            IdUsuarioEnviado: maloteSelected.IdUsuarioEnviado, IdUsuarioRecebimento: $localStorage.user.Id, Motivo: $scope.motivo
        }

        SweetAlert.swal({
            title: "Deseja colocar pendente?",
            text: "Não será possivel voltar o registro depois de colocado em pendente!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, confirmar!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000
        },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "Alterado!",
                        text: "O registro alterado com sucesso!",
                        type: "success",
                        timer: 5000
                    });
                    $http.post("http://localhost:50837/api/Malote/PendurarMalote", $scope.obj).then(function (response) {
                        $uibModalInstance.close();
                    }, function (response) {
                        return alert("Erro" + response.status);
                    })
                }
                else {
                    SweetAlert.swal({
                        title: "Cancelado!",
                        text: "Você cancelou a alteração!",
                        type: "error",
                        timer: 5000
                    });
                    $uibModalInstance.dismiss();
                }
            });
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }
}

function maloteHistoricoCtrlModalInstance($uibModalInstance, $http, $scope, maloteSelected) {
    $scope.historicos

    $http.get("http://localhost:50837/api/MaloteLog/GetById?Id=" + maloteSelected.Id).then(function (response) {
        $scope.historicos = response.data;
    });
}

function tiposMaloteCtrl($scope, $uibModal, $http, $localStorage, SweetAlert, DTOptionsBuilder) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'asc'])
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

    $scope.tiposmalote;

    $http.get("http://localhost:50837/api/Malote/GetAllTiposMalote").then(function (response) {
        $scope.tiposmalote = response.data;
    });

    $scope.incluir = function () {
        var modalIstance = $uibModal.open({
            templateUrl: 'Views/modal/malote/incluir_editar_tipomalote.html',
            controller: 'tiposMaloteCtrlModalInstance',
            windowClass: "animated fadeIn",
            resolve: {
                tipoMaloteSelected: function () {
                    return null;
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/Malote/GetAllTiposMalote").then(function (response) {
                $scope.tiposmalote = response.data;
            });
        });
    }


    $scope.editar = function (tipoMalote) {
        var modalIstance = $uibModal.open({
            templateUrl: 'Views/modal/malote/incluir_editar_tipomalote.html',
            controller: 'tiposMaloteCtrlModalInstance',
            windowClass: "animated fadeIn",
            resolve: {
                tipoMaloteSelected: function () {
                    return tipoMalote;
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/Malote/GetAllTiposMalote").then(function (response) {
                $scope.tiposmalote = response.data;
            });
        });
    }

}

function tiposMaloteCtrlModalInstance($uibModalInstance, $http, $scope, tipoMaloteSelected, notify) {
    $scope.inspiniaTemplate = 'views/common/notify.html';
    $scope.numero;
    $scope.setor;
    $scope.cor;
    $scope.id;

    if (tipoMaloteSelected != null) {
        $scope.numero = tipoMaloteSelected.Numero;
        $scope.setor = tipoMaloteSelected.Setor;
        $scope.cor = tipoMaloteSelected.Cor;
        $scope.id = tipoMaloteSelected.Id;
    }

    $scope.incluir = function () {
        $scope.obj = { Numero: $scope.numero, Setor: $scope.setor, Cor: $scope.cor };

        $http.post("http://localhost:50837/api/Malote/IncluirTiposMalote", $scope.obj).then(function (response) {
            notify({ message: "Incluido com sucesso!", classes: 'alert-info', templateUrl: $scope.inspiniaTemplate });
            $uibModalInstance.close();
        }, function (response) {
            return alert("Erro: " + response.status);
        })
    }

    $scope.editar = function () {
        $scope.obj = { Numero: $scope.numero, Setor: $scope.setor, Cor: $scope.cor, Id: tipoMaloteSelected.Id };

        $http.post("http://localhost:50837/api/Malote/AlterarTiposMalote", $scope.obj).then(function (response) {
            notify({ message: "Alterado com sucesso!", classes: 'alert-info', templateUrl: $scope.inspiniaTemplate });
            $uibModalInstance.close();
        }, function (response) {
            return alert("Erro: " + response.status);
        })
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }
}

function estoqueMinimoCtrl($scope, $uibModal, $http, $localStorage, SweetAlert, $timeout, toaster) {
    $scope.dados = [];

    $scope.today = function () {
        $scope.date = new Date();
    };

    $scope.clear = function () {
        $scope.date = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.date = new Date(year, month, day);
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    $scope.buscar = function () {
        $http.get("http://localhost:50837/api/CadAgendamento/GetProdutoByCodigo?codigo=" + $scope.codigo).then(function (response) {
            $scope.dados = response.data;
        });
    }

    $scope.edit = function (dado) {
        dado.editMode = true;
    }

    $scope.cancel = function (dado) {
        $http.get("http://localhost:50837/api/CadAgendamento/GetProdutoByCodigo?codigo=" + $scope.codigo).then(function (response) {
            $scope.dados = response.data;
        });
    }

    $scope.saveUser = function (dado, $index) {
        dado.editMode = false;
    }

    $scope.salvarAgendamento = function () {
        if (($scope.agendamento == undefined || $scope.agendamento == "") || $scope.dateinicio == undefined || $scope.datefim == undefined) {
            toaster.pop({
                type: 'error',
                title: 'Falha!',
                body: 'Preencha os campos adequadamente!',
                showCloseButton: true,
                timeout: 3000
            });
        }
        else {
            $scope.objAgendamento = { Nome: $scope.agendamento, DtInicio: $scope.dateinicio, DtFim: $scope.datefim, IdUsuario: $localStorage.user.Id };

            SweetAlert.swal({
                title: "Deseja incluir?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, incluir!",
                cancelButtonText: "Não, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
                function (isConfirm) {
                    if (isConfirm) {
                        $http.post("http://localhost:50837/api/CadAgendamento/CadastraAgendamento", $scope.objAgendamento).then(function (response) {
                            SweetAlert.swal({
                                title: "Incluido!",
                                text: "Agendamento incluido com sucesso!",
                                type: "success",
                                timer: 5000
                            });
                            $scope.show = true;
                        },
                            function (response) {
                                return alert("Erro: " + response.status);
                            });

                    } else {
                        SweetAlert.swal("Cancelado", "Você cancelou a inclusão", "error");
                    }
                });
        }
    }

    $scope.salvarItens = function () {

        $http.get("http://localhost:50837/api/CadAgendamento/GetLastAgendamento").then(function (response) {
            SweetAlert.swal({
                title: "Deseja confimar a inclusão?",
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

                        for (var i = 0; i < $scope.dados.length; i++) {
                            $scope.objItens = {
                                IdAgendamento: response.data, Codigo: $scope.dados[0].cdProduto, Produto: $scope.dados[0].Produto,
                                Filial: $scope.dados[i].nmPessoa, CodigoFilial: $scope.dados[i].cdPessoa, QtdEstoqueMinimo: $scope.dados[i].qtEstoqueUnitarioMinimoAtual,
                                QtdEstoqueMinimoProposto: $scope.dados[i].qtEstoqueUnitarioMinimoProposto
                            };

                            console.log($scope.objItens);

                            $http.post("http://localhost:50837/api/CadAgendamento/IncluirItens", $scope.objItens).then(function (response) {

                            },
                                function (response) {
                                    alert("Erro " + response.status);
                                })
                        }

                        SweetAlert.swal({
                            title: "Incluido!",
                            text: "incluidos com sucesso!",
                            type: "success",
                            timer: 5000
                        });

                    } else {
                        SweetAlert.swal("Cancelado", "Você cancelou a inclusão", "error");
                    }
                });
        },
            function (response) {
                return alert("Erro: " + response.status);
            })
    }
}

function listaEstoqueMinimoCtrl($scope, $http, DTOptionsBuilder, $uibModal, $localStorage, SweetAlert) {
    $scope.dados = [];
    $scope.usuarioLogado = $localStorage.user.Id;

    $http.get("http://localhost:50837/api/CadAgendamento/GetAllAgendamentos").then(function (response) {
        $scope.dados = response.data;
    })

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'desc'])
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

    $scope.visualizar = function (dado) {
        var modalIstance = $uibModal.open({
            templateUrl: 'Views/modal/agendamento/visualizar_agendamentos.html',
            controller: 'listaEstoqueMinimoCtrlModalInstance',
            windowClass: "animated fadeIn",
            size: 'lg',
            resolve: {
                estoqueMinimoSelected: function () {
                    return dado;
                }
            }
        });
    }

    $scope.excluir = function (dado) {
        SweetAlert.swal({
            title: "Deseja excluir?",
            text: "Não será possivel mudar depois de excluido!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Não, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 5000
        },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("http://localhost:50837/api/CadAgendamento/ExcluirAgendamento", dado).then(function () {
                        SweetAlert.swal("Excluido!", "Agendamento excluido com sucesso", "success");
                    },
                        function (response) {
                            alert("Erro " + response.status);
                        });
                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão!", "error");
                }
            });
    }
}

function listaEstoqueMinimoCtrlModalInstance($uibModalInstance, $http, $scope, estoqueMinimoSelected) {
    $scope.produto;
    $scope.codigoProduto;


    $http.get("http://localhost:50837/api/CadAgendamento/GetAllAgendamentosItensById?Id=" + estoqueMinimoSelected.Id).then(function (response) {
        console.log(response.data);
        $scope.produto = response.data[0].Produto;
        $scope.codigoProduto = response.data[0].Codigo;
        $scope.dados = response.data;

    },
        function (response) {
            alert("Erro: " + response.status);
        })
}

function abastecimentoParametro($scope, $http, DTOptionsBuilder, $uibModal, $localStorage, SweetAlert) {
    $scope.dados = [];

    $http.get("http://localhost:50837/api/Abastecimento/GetAllParametro").then(function (response) {
        $scope.dados = response.data;
    })

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [0, 'desc'])
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

    $scope.incluir = function () {
        var modalIstance = $uibModal.open({
            templateUrl: 'Views/modal/abastecimento/incluir_parametro.html',
            controller: 'abastecimentoParametroModalInstance',
            windowClass: "animated fadeIn",
            resolve: {
                parametroSelected: function () {
                    return null
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/Abastecimento/GetAllParametro").then(function (response) {
                $scope.dados = response.data;
            })
        })
    }

    $scope.alterar = function (index) {
        var modalIstance = $uibModal.open({
            templateUrl: 'Views/modal/abastecimento/incluir_parametro.html',
            controller: 'abastecimentoParametroModalInstance',
            windowClass: "animated fadeIn",
            resolve: {
                parametroSelected: function () {
                    return index
                }
            }
        }).result.then(function () {
            $http.get("http://localhost:50837/api/Abastecimento/GetAllParametro").then(function (response) {
                $scope.dados = response.data;
            })
        })
    }
}

function abastecimentoParametroModalInstance($scope, $uibModalInstance, $http, parametroSelected) {
    $http.get("http://localhost:50837/api/Promocao/GetAllAtivas").then(function (response) {
        $scope.promocoes = response.data;
    })

    console.log(parametroSelected);

    if (parametroSelected != null) {
        $scope.promocao = parametroSelected.Promocao;
        $scope.cobertura = parametroSelected.Cobertura;
        $scope.coberturaPromo = parametroSelected.CoberturaPromocional;
    }

    $scope.salvar = function () {
        $scope.obj = { cdPromocao: $scope.promocao.cdPromocao, cobertura: $scope.cobertura, coberturaPromocional: $scope.coberturaPromo, Promocao: $scope.promocao.nmPromocao }

        if (parametroSelected == null) {

            $http.post("http://localhost:50837/api/abastecimento/IncluirParametro", $scope.obj).then(function (response) {
                $uibModalInstance.close();
            },
                function (response) {
                    alert("Erro: " + response.status);
                });
        }
        else {
            $http.post("http://localhost:50837/api/abastecimento/AlterarParametro", $scope.obj).then(function (response) {
                $uibModalInstance.close();
            },
                function (response) {
                    alert("Erro: " + response.status);
                });
        }
    }

    $scope.alterar = function () {
        $scope.obj = { cdPromocao: parametroSelected.Promocao, cobertura: $scope.cobertura, coberturaPromocional: $scope.coberturaPromo, Promocao: $scope.promocao.nmPromocao }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

function abastecimentoAprovacaoCtrl() {
    $scope.carregar = function () {
        $http.get("http://localhost:50837/api/Abastecimento/GetAllByComprador?Comprador=" + $scope.comprador + "&cdPromo=" + $scope.promocao).then(function (response) {
            if (response.data.length == 0) {
                SweetAlert.swal({
                    title: "Nenhum resultado encontrado",
                    type: "warning"
                });
            }
            else {
                $scope.dados = response.data;
            }
        })

        $http.get("http://localhost:50837/api/Abastecimento/GetParametroByPromocao?codigo=" + $scope.promocao).then(function (response) {
            $scope.parametroCoberturas = response.data
        })
    }
}

function abastecimentoMassaCtrl($scope, $uibModal, SweetAlert) {

    $scope.executar = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/modal/abastecimento/loading_massa.html',
            controller: 'abastecimentoMassaModalCtrl',
            windowClass: 'animated fadeIn app-modal-window'
        }).result.then(function () {
            SweetAlert.swal({
                title: "Alteração",
                text: "Alteração feita com sucesso!",
                type: "success",
                timer: 5000
            });
        });
    }
}

function abastecimentoMassaModalCtrl($scope, $http, $uibModalInstance, $localStorage, SweetAlert) {
    $scope.obj = { Responsavel: $localStorage.user.Nome + " " + $localStorage.user.Sobrenome }

    //console.log($localStorage.user.Nome);
    //console.log($localStorage.user.Sobrenome);
    //console.log($scope.obj);

    $http.post("http://localhost:50837/api/abastecimento/AlterarAbastecimentoEmMassa", $scope.obj).then(function (response) {
        $uibModalInstance.close();
    }, function (response) {
        alert("Erro: " + response.status);
    });
}

function abastecimentoMassaLog($scope, $http, DTOptionsBuilder) {
    $scope.dados = [];

    $scope.today = function () {
        $scope.date = new Date();
    };

    $scope.clear = function () {
        $scope.date = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.date = new Date(year, month, day);
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    $scope.buscar = function () {
        $http.get("http://localhost:50837/api/Abastecimento/GetBetweenDates?dtinicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dtfim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
            $scope.dados = response.data;
        });
    }

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [2, 'desc'])
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
}

function abastecimentoTrocaCtrl($scope, $http, DTOptionsBuilder, $localStorage, SweetAlert) {

    $scope.tipo = "";
    //$scope.tipos = ['Super Produto', 'Lista de Super Produtos', 'Fornecedor'];
    $scope.tipos = ['Super Produto', 'Fornecedor'];
    $scope.fornecedores;
    $scope.nomeProduto;
    $scope.codigoProdutos;
    $scope.dados;

    $http.get("http://localhost:50837/api/SuperProduto/GetAll").then(function (response) {
        $scope.codigoProdutos = response.data;
    })

    $http.get("http://localhost:50837/api/Pessoa/GetAllFornecedores").then(function (response) {
        $scope.fornecedores = response.data;
    })

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [2, 'desc'])
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

    $scope.buscaProduto = function () {
        $http.get("http://localhost:50837/api/abastecimento/GetBySuperProduto?codigo=" + $scope.codigoSuperProduto.cdSuperProduto).then(function (response) {
            $scope.dados = response.data;
        });
    }

    //$scope.buscaProdutos = function (codigos) {

    //    $scope.listaCodigos = codigos;

    //    $http.get("http://localhost:50837/api/abastecimento/GetBySuperProdutos?codigos=" + $scope.listaCodigos).then(function (response) {
    //        $scope.dados = response.data;
    //    });
    //}

    $scope.buscaFornecedor = function () {
        $http.get("http://localhost:50837/api/abastecimento/GetByFornecedor?codigoFornecedor=" + $scope.fornecedor.cdPessoa).then(function (response) {
            $scope.dados = response.data;
        });
    }

    $scope.EDL = function (tipo) {
        if (tipo == "Super Produto") {
            SweetAlert.swal({
                title: "Deseja alterar para EDL?",
                text: "Não será possivel recuperar o registro depois de alterar!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, alterar!",
                cancelButtonText: "Não, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false,
                timer: 10000
            },
                function (isConfirm) {
                    if (isConfirm) {
                        $scope.obj = { cdCompraTipo: 1, cdSuperProduto: $scope.codigoSuperProduto.cdSuperProduto, Responsavel: $localStorage.user.Nome + " " + $localStorage.user.Sobrenome };
                        $http.post("http://localhost:50837/api/SuperProduto/AlteraAbastecimentoProduto", $scope.obj).then(function (response) {
                            SweetAlert.swal({
                                title: "Alterado!",
                                text: "O registro foi alterado com sucesso!",
                                type: "success",
                                timer: 10000
                            });
                            $http.get("http://localhost:50837/api/abastecimento/GetBySuperProduto?codigo=" + $scope.codigoSuperProduto.cdSuperProduto).then(function (response) {
                                $scope.dados = response.data;
                            });
                        },
                            function (response) {
                                return alert("Erro: " + response.status);
                            }
                        );
                    } else {
                        SweetAlert.swal({
                            title: "Cancelado!",
                            text: "Você cancelou a exclusão!",
                            type: "error",
                            timer: 10000
                        });
                    }
                });
        }
        else {

            SweetAlert.swal({
                title: "Deseja alterar para EDL?",
                text: "Não será possivel recuperar o registro depois de alterar!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, alterar!",
                cancelButtonText: "Não, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false,
                timer: 10000
            },
                function (isConfirm) {
                    if (isConfirm) {
                        $scope.obj = { cdCompraTipo: 1, cdPessoaComercial: $scope.fornecedor.cdPessoa, Responsavel: $localStorage.user.Nome + " " + $localStorage.user.Sobrenome };
                        $http.post("http://localhost:50837/api/SuperProduto/AlteraAbastecimentoFornecedor", $scope.obj).then(function (response) {
                            SweetAlert.swal({
                                title: "Alterado!",
                                text: "O registro foi alterado com sucesso!",
                                type: "success",
                                timer: 10000
                            });
                            $http.get("http://localhost:50837/api/abastecimento/GetByFornecedor?codigoFornecedor=" + $scope.fornecedor.cdPessoa).then(function (response) {
                                $scope.dados = response.data;
                            });
                        },
                            function (response) {
                                return alert("Erro: " + response.status);
                            }
                        );
                    } else {
                        SweetAlert.swal({
                            title: "Cancelado!",
                            text: "Você cancelou a exclusão!",
                            type: "error",
                            timer: 10000
                        });
                    }
                });
        }

    }

    $scope.CCEDL = function (tipo) {
        if (tipo == "Super Produto") {
            SweetAlert.swal({
                title: "Deseja alterar para CCEDL?",
                text: "Não será possivel recuperar o registro depois de alterar!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, alterar!",
                cancelButtonText: "Não, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false,
                timer: 10000
            },
                function (isConfirm) {
                    if (isConfirm) {
                        $scope.obj = { cdCompraTipo: 2, cdSuperProduto: $scope.codigoSuperProduto.cdSuperProduto, Responsavel: $localStorage.user.Nome + " " + $localStorage.user.Sobrenome };
                        $http.post("http://localhost:50837/api/SuperProduto/AlteraAbastecimentoProduto", $scope.obj).then(function (response) {
                            SweetAlert.swal({
                                title: "Alterado!",
                                text: "O registro foi alterado com sucesso!",
                                type: "success",
                                timer: 10000
                            });
                            $http.get("http://localhost:50837/api/abastecimento/GetBySuperProduto?codigo=" + $scope.codigoSuperProduto.cdSuperProduto).then(function (response) {
                                $scope.dados = response.data;
                            });
                        },
                            function (response) {
                                return alert("Erro: " + response.status);
                            }
                        );
                    } else {
                        SweetAlert.swal({
                            title: "Cancelado!",
                            text: "Você cancelou a exclusão!",
                            type: "error",
                            timer: 10000
                        });
                    }
                });
        }
        else {
            SweetAlert.swal({
                title: "Deseja alterar para CCEDL?",
                text: "Não será possivel recuperar o registro depois de alterar!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, alterar!",
                cancelButtonText: "Não, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false,
                timer: 10000
            },
                function (isConfirm) {
                    if (isConfirm) {
                        $scope.obj = { cdCompraTipo: 2, cdPessoaComercial: $scope.fornecedor.cdPessoa, Responsavel: $localStorage.user.Nome + " " + $localStorage.user.Sobrenome };
                        $http.post("http://localhost:50837/api/SuperProduto/AlteraAbastecimentoFornecedor", $scope.obj).then(function (response) {
                            SweetAlert.swal({
                                title: "Alterado!",
                                text: "O registro foi alterado com sucesso!",
                                type: "success",
                                timer: 10000
                            });
                            $http.get("http://localhost:50837/api/abastecimento/GetByFornecedor?codigoFornecedor=" + $scope.fornecedor.cdPessoa).then(function (response) {
                                $scope.dados = response.data;
                            });
                        },
                            function (response) {
                                return alert("Erro: " + response.status);
                            }
                        );
                    } else {
                        SweetAlert.swal({
                            title: "Cancelado!",
                            text: "Você cancelou a exclusão!",
                            type: "error",
                            timer: 10000
                        });
                    }
                });
        }
    }

    $scope.Centralizado = function (tipo) {
        if (tipo == "Super Produto") {
            SweetAlert.swal({
                title: "Deseja Alterar para Centralizado?",
                text: "Não será possivel recuperar o registro depois de alterar!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, alterar!",
                cancelButtonText: "Não, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false,
                timer: 10000
            },
                function (isConfirm) {
                    if (isConfirm) {
                        $scope.obj = { cdCompraTipo: 3, cdSuperProduto: $scope.codigoSuperProduto.cdSuperProduto, Responsavel: $localStorage.user.Nome + " " + $localStorage.user.Sobrenome };
                        $http.post("http://localhost:50837/api/SuperProduto/AlteraAbastecimentoProduto", $scope.obj).then(function (response) {
                            SweetAlert.swal({
                                title: "Alterado!",
                                text: "O registro foi alterado com sucesso!",
                                type: "success",
                                timer: 10000
                            });
                            $http.get("http://localhost:50837/api/abastecimento/GetBySuperProduto?codigo=" + $scope.codigoSuperProduto.cdSuperProduto).then(function (response) {
                                $scope.dados = response.data;
                            });
                        },
                            function (response) {
                                return alert("Erro: " + response.status);
                            }
                        );
                    } else {
                        SweetAlert.swal({
                            title: "Cancelado!",
                            text: "Você cancelou a exclusão!",
                            type: "error",
                            timer: 10000
                        });
                    }
                });
        }
        else {
            SweetAlert.swal({
                title: "Deseja alterar para Centralizado?",
                text: "Não será possivel recuperar o registro depois de alterar!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, alterar!",
                cancelButtonText: "Não, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false,
                timer: 10000
            },
                function (isConfirm) {
                    if (isConfirm) {
                        $scope.obj = { cdCompraTipo: 3, cdPessoaComercial: $scope.fornecedor.cdPessoa, Responsavel: $localStorage.user.Nome + " " + $localStorage.user.Sobrenome };
                        $http.post("http://localhost:50837/api/SuperProduto/AlteraAbastecimentoFornecedor", $scope.obj).then(function (response) {
                            SweetAlert.swal({
                                title: "Alterado!",
                                text: "O registro foi alterado com sucesso!",
                                type: "success",
                                timer: 10000
                            });
                            $http.get("http://localhost:50837/api/abastecimento/GetByFornecedor?codigoFornecedor=" + $scope.fornecedor.cdPessoa).then(function (response) {
                                $scope.dados = response.data;
                            });
                        },
                            function (response) {
                                return alert("Erro: " + response.status);
                            }
                        );
                    } else {
                        SweetAlert.swal({
                            title: "Cancelado!",
                            text: "Você cancelou a exclusão!",
                            type: "error",
                            timer: 10000
                        });
                    }
                });
        }
    }

    $scope.Cross = function (tipo) {
        if (tipo == "Super Produto") {
            SweetAlert.swal({
                title: "Deseja Alterar para Cross-Docking?",
                text: "Não será possivel recuperar o registro depois de alterar!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, alterar!",
                cancelButtonText: "Não, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false,
                timer: 10000
            },
                function (isConfirm) {
                    if (isConfirm) {
                        $scope.obj = { cdCompraTipo: 4, cdSuperProduto: $scope.codigoSuperProduto.cdSuperProduto, Responsavel: $localStorage.user.Nome + " " + $localStorage.user.Sobrenome };
                        $http.post("http://localhost:50837/api/SuperProduto/AlteraAbastecimentoProduto", $scope.obj).then(function (response) {
                            SweetAlert.swal({
                                title: "Alterado!",
                                text: "O registro foi alterado com sucesso!",
                                type: "success",
                                timer: 10000
                            });
                            $http.get("http://localhost:50837/api/abastecimento/GetBySuperProduto?codigo=" + $scope.codigoSuperProduto.cdSuperProduto).then(function (response) {
                                $scope.dados = response.data;
                            });
                        },
                            function (response) {
                                return alert("Erro: " + response.status);
                            }
                        );
                    } else {
                        SweetAlert.swal({
                            title: "Cancelado!",
                            text: "Você cancelou a exclusão!",
                            type: "error",
                            timer: 10000
                        });
                    }
                });
        }
        else {
            SweetAlert.swal({
                title: "Deseja alterar para Cross-Docking?",
                text: "Não será possivel recuperar o registro depois de alterar!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, alterar!",
                cancelButtonText: "Não, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false,
                timer: 10000
            },
                function (isConfirm) {
                    if (isConfirm) {
                        $scope.obj = { cdCompraTipo: 4, cdPessoaComercial: $scope.fornecedor.cdPessoa, Responsavel: $localStorage.user.Nome + " " + $localStorage.user.Sobrenome };
                        $http.post("http://localhost:50837/api/SuperProduto/AlteraAbastecimentoFornecedor", $scope.obj).then(function (response) {
                            SweetAlert.swal({
                                title: "Alterado!",
                                text: "O registro foi alterado com sucesso!",
                                type: "success",
                                timer: 10000
                            });
                            $http.get("http://localhost:50837/api/abastecimento/GetByFornecedor?codigoFornecedor=" + $scope.fornecedor.cdPessoa).then(function (response) {
                                $scope.dados = response.data;
                            });
                        },
                            function (response) {
                                return alert("Erro: " + response.status);
                            }
                        );
                    } else {
                        SweetAlert.swal({
                            title: "Cancelado!",
                            text: "Você cancelou a exclusão!",
                            type: "error",
                            timer: 10000
                        });
                    }
                });
        }
    }

}

function clusterCtrl($scope, $http, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert, $uibModal) {
    $scope.compradores;
    $scope.classificacoes;
    $scope.dados;
    var vm = this;
    vm.checkoxesState = true;

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('order', [2, 'desc'])
        .withOption('scrollY', 500)
        .withDisplayLength(-1)
        .withOption('lengthChange', false)
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

    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0).notSortable(),
        DTColumnDefBuilder.newColumnDef(2).notSortable(),
        DTColumnDefBuilder.newColumnDef(3).notSortable(),
        DTColumnDefBuilder.newColumnDef(4).notSortable(),
        DTColumnDefBuilder.newColumnDef(5).notSortable(),
        DTColumnDefBuilder.newColumnDef(6).notSortable(),
        DTColumnDefBuilder.newColumnDef(7).notSortable(),
        DTColumnDefBuilder.newColumnDef(8).notSortable(),
        DTColumnDefBuilder.newColumnDef(9).notSortable(),
        DTColumnDefBuilder.newColumnDef(10).notSortable(),
        DTColumnDefBuilder.newColumnDef(11).notSortable(),
        DTColumnDefBuilder.newColumnDef(12).notSortable(),
        DTColumnDefBuilder.newColumnDef(13).notSortable(),
        DTColumnDefBuilder.newColumnDef(14).notSortable(),
        DTColumnDefBuilder.newColumnDef(15).notSortable(),
        DTColumnDefBuilder.newColumnDef(16).notSortable(),
        DTColumnDefBuilder.newColumnDef(17).notSortable(),
        DTColumnDefBuilder.newColumnDef(18).notSortable(),
        DTColumnDefBuilder.newColumnDef(19).notSortable(),
        DTColumnDefBuilder.newColumnDef(20).notSortable(),
        DTColumnDefBuilder.newColumnDef(21).notSortable(),
        DTColumnDefBuilder.newColumnDef(22).notSortable(),
        DTColumnDefBuilder.newColumnDef(23).notSortable(),
        DTColumnDefBuilder.newColumnDef(24).notSortable(),
        DTColumnDefBuilder.newColumnDef(25).notSortable()
    ];

    $http.get("http://localhost:50837/api/cluster/GetAllCompradores").then(function (response) {
        $scope.compradores = response.data;
    });

    $scope.GetClassificacao = function (comprador) {
        $http.get("http://localhost:50837/api/cluster/GetAllClassificacoesByComprador?comprador=" + comprador).then(function (response) {
            $scope.classificacoes = response.data;
        });
    }

    $scope.Buscar = function () {
        $http.get("http://localhost:50837/api/cluster/GetAllProdutosClassificacao?classificacao=" + $scope.classificacao).then(function (response) {
            $scope.dados = response.data;
        });
    }

    var getAllSelected = function () {
        var selectedItems = $scope.dados.filter(function (item) {
            return item.selected;
        });
        return selectedItems.length === $scope.dados.length;
    }

    var setAllSelected = function (value) {
        angular.forEach($scope.dados, function (item) {
            item.selected = value;
        });
    }

    $scope.allSelected = function (value) {
        console.log(value);
        if (value !== undefined) {
            return setAllSelected(value);
        } else {
            return getAllSelected();
        }
    }

    $scope.lojasPequenas = function () {
        angular.forEach($scope.dados, function (item) {
            if (item.selected == true) {
                item.MGE = true;
                item.TNG = true;
                item.AGM = true;
                item.NCE = true;
                item.JDE = true;
                item.TND = true;
                item.pequenas = true;
            }
        });
    }

    $scope.lojasMedias = function () {
        angular.forEach($scope.dados, function (item) {
            if (item.selected == true) {
                item.ITA = true;
                item.ITA2 = true;
                item.RBO2 = true;
                item.ASN = true;
                item.JDC = true;
                item.RDO = true;
                item.BCX = true;
                item.CBF = true;
                item.SPD = true;
                item.MRC = true;
                item.RBO = true;
                item.medias = true;
            }
        });

    }

    $scope.lojasPremium = function () {
        angular.forEach($scope.dados, function (item) {
            if (item.selected == true) {
                item.RBO = true;
                item.INO = true;
                item.MRC = true;
                item.ARM = true;
                item.CBF = true;
                item.MCE = true;
                item.SPD = true;
                item.ARM2 = true;
                item.premium = true;
            }
        });
    }

    $scope.lojasGrandes = function () {
        angular.forEach($scope.dados, function (item) {
            if (item.selected == true) {
                item.MGE2 = true;
                item.INO = true;
                item.ARM = true;
                item.MCE = true;
                item.ARM2 = true;
                item.grandes = true;
            }
        });
    }

    $scope.todas = function () {
        angular.forEach($scope.dados, function (item) {
            if (item.selected == true) {
                item.ITA = true;
                item.ITA2 = true;
                item.MGE = true;
                item.MGE2 = true;
                item.RBO = true;
                item.RBO2 = true;
                item.TNG = true;
                item.ASN = true;
                item.AGM = true;
                item.INO = true;
                item.JDC = true;
                item.MRC = true;
                item.NCE = true;
                item.RDO = true;
                item.TND = true;
                item.ARM = true;
                item.BCX = true;
                item.CBF = true;
                item.JDE = true;
                item.MCE = true;
                item.SPD = true;
                item.ARM2 = true;
                item.pequenas = true;
                item.medias = true;
                item.premium = true;
                item.grandes = true;
            }
        });
    }

    $scope.cdItaborai = function () {
        angular.forEach($scope.dados, function (item) {
            if (item.selected == true) {
                item.CDI = true;
            }
        });
    }

    $scope.cdManilha = function () {
        angular.forEach($scope.dados, function (item) {
            if (item.selected == true) {
                item.CDM = true;
            }
        });
    }

    $scope.inativar = function () {
        angular.forEach($scope.dados, function (item) {
            if (item.selected == true) {
                item.Inativo = true;
            }
        });
    }

    $scope.limpar = function () {
        angular.forEach($scope.dados, function (item) {
            if (item.selected == true) {
                item.ITA = false;
                item.ITA2 = false;
                item.MGE = false;
                item.MGE2 = false;
                item.RBO = false;
                item.RBO2 = false;
                item.TNG = false;
                item.ASN = false;
                item.AGM = false;
                item.INO = false;
                item.JDC = false;
                item.MRC = false;
                item.NCE = false;
                item.RDO = false;
                item.TND = false;
                item.ARM = false;
                item.BCX = false;
                item.CBF = false;
                item.JDE = false;
                item.MCE = false;
                item.SPD = false;
                item.CDI = false;
                item.CDM = false;
                item.ARM2 = false;
                item.pequenas = false;
                item.medias = false;
                item.premium = false;
                item.grandes = false;
            }
        });
    }

    $scope.salvar = function () {
        SweetAlert.swal({
            title: "Alteração",
            text: "Alteração feita com sucesso!",
            type: "success",
            timer: 5000
        });
        $http.post("http://localhost:50837/api/Cluster/Incluir", $scope.dados).then(function (response) {
            $scope.limpar();
        },
            function (response) {
                alert("Erro: " + response.status);
            });
    }

    $scope.estatistica = function (item) {
        $uibModal.open({
            templateUrl: 'Views/modal/cluster/vis_estatistica.html',
            controller: 'clusterModalCtrl',
            windowClass: 'animated fadeIn app-modal-window',
            size: 'lg',
            resolve: {
                produtoSelected: function () {
                    return item;
                }
            }
        });
    }
}

function clusterModalCtrl($scope, $http, $uibModalInstance, produtoSelected) {
    $scope.produto = produtoSelected.Produto;
    $scope.codigo = produtoSelected.cdProduto;

    $http.get("http://localhost:50837/api/cluster/GetEstatisticaByProduto?codigo=" + produtoSelected.cdProduto).then(function (response) {
        $scope.detalhes = response.data;
    });
}

function inventarioParcialCtrl($scope, $http, DTOptionsBuilder, DTColumnDefBuilder) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('scrollX', '100%')
        .withOption('scrollY', 500)
        .withOption('lengthMenu', [50, 100, 150, 200])
        .withOption('scrollCollapse', true)
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

    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]).withOption('type', 'num-fmt').withOption("symbols", "$")
    ];


    $scope.dados;
    $scope.totalInv;
    $scope.totalQuebraIden;
    $scope.totalQuebra
    $scope.totalVenda;
    $scope.totalCusto;
    $scope.lojas;
    $scope.tipos;

    $http.get("http://localhost:50837/api/EmpresaFilial/GetAllLojasAtivasOrdered").then(function (response) {
        $scope.lojas = response.data;
    });

    $http.get("http://localhost:50837/api/Inventario/GetAllTipos").then(function (response) {
        $scope.tipos = response.data;
    });

    $scope.allSelected = function (value) {
        if (value !== undefined) {
            return setAllSelected(value);
        } else {
            return getAllSelected();
        }
    }

    $scope.today = function () {
        $scope.date = new Date();
    };

    $scope.clear = function () {
        $scope.date = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(),
        minDate: new Date(),
        startingDay: 1
    };

    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.date = new Date(year, month, day);
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    $scope.Buscar = function () {

        if ($scope.loja != 0) {
            $http.get("http://localhost:50837/api/Inventario/GetAll?loja=" + $scope.loja + "&referencia=" + $scope.tipo + "&dataInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dataFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
                $scope.dados = response.data;
            })

            $http.get("http://localhost:50837/api/Inventario/GetTotalPerdaInv?loja=" + $scope.loja + "&referencia=" + $scope.tipo + "&dataInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dataFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
                $scope.totalInv = response.data;
            })
            $http.get("http://localhost:50837/api/Inventario/GetTotalQuebraIdent?loja=" + $scope.loja + "&referencia=" + $scope.tipo + "&dataInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dataFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
                $scope.totalQuebraIden = response.data;
            })

            $http.get("http://localhost:50837/api/Inventario/GetTotalQuebra?loja=" + $scope.loja + "&referencia=" + $scope.tipo + "&dataInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dataFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
                $scope.totalQuebra = response.data;
            })

            $http.get("http://localhost:50837/api/Inventario/GetTotalVenda?loja=" + $scope.loja + "&referencia=" + $scope.tipo + "&dataInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dataFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
                $scope.totalVenda = response.data;
            })
            $http.get("http://localhost:50837/api/Inventario/GetTotalCusto?loja=" + $scope.loja + "&referencia=" + $scope.tipo + "&dataInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dataFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
                $scope.totalCusto = response.data;
            })
        }

        else {
            $http.get("http://localhost:50837/api/Inventario/GetAllTodos?referencia=" + $scope.tipo + "&dataInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dataFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
                $scope.dados = response.data;
            })

            $http.get("http://localhost:50837/api/Inventario/GetTotalPerdaInvTodos?referencia=" + $scope.tipo + "&dataInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dataFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
                $scope.totalInv = response.data;
            })
            $http.get("http://localhost:50837/api/Inventario/GetTotalQuebraIdentTodos?referencia=" + $scope.tipo + "&dataInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dataFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
                $scope.totalQuebraIden = response.data;
            })

            $http.get("http://localhost:50837/api/Inventario/GetTotalQuebraTodos?referencia=" + $scope.tipo + "&dataInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dataFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
                $scope.totalQuebra = response.data;
            })

            $http.get("http://localhost:50837/api/Inventario/GetTotalVendaTodos?referencia=" + $scope.tipo + "&dataInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dataFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
                $scope.totalVenda = response.data;
            })
            $http.get("http://localhost:50837/api/Inventario/GetTotalCustoTodos?referencia=" + $scope.tipo + "&dataInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dataFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
                $scope.totalCusto = response.data;
            })
        }
    }
}

function inventarioProdutoCtrl($scope, $http, DTOptionsBuilder, SweetAlert, $uibModal) {
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

    $scope.dados;

    $http.get("http://localhost:50837/api/Inventario/GetAllProdutos").then(function (response) {
        $scope.dados = response.data;
    })

    $scope.incluir = function () {
        var modalIstance = $uibModal.open({
            templateUrl: 'Views/modal/inventario/incluir_produto.html',
            controller: 'inventarioProdutoModalInstanceCtrl',
            windowClass: "animated fadeIn"
        }).result.then(function () {
            $http.get("http://localhost:50837/api/Inventario/GetAllProdutos").then(function (response) {
                $scope.dados = response.data;
            });
        });
    }

    $scope.excluir = function (dado) {
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
                    $http.post("http://localhost:50837/api/Inventario/Excluir", dado).then(function (response) {
                        SweetAlert.swal({
                            title: "Exclusao!",
                            text: "Exclusao feita com sucesso!",
                            type: "success",
                            timer: 5000
                        });
                        $http.get("http://localhost:50837/api/Inventario/GetAllProdutos").then(function (response) {
                            $scope.dados = response.data;
                        })
                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal("Cancelado", "Você cancelou a exclusão do grupo", "error");
                }
            });
    }

}

function inventarioProdutoModalInstanceCtrl($scope, $http, SweetAlert, $uibModalInstance) {
    $scope.tipos;

    $http.get("http://localhost:50837/api/Inventario/GetAllTipos").then(function (response) {
        $scope.tipos = response.data;
    });

    $scope.salvar = function () {
        $scope.obj = { cdProduto: $scope.codigo, Referencia: $scope.tipo };
        $http.post("http://localhost:50837/api/Inventario/Incluir", $scope.obj).then(function (response) {
            SweetAlert.swal({
                title: "Inclusão!",
                text: "Inclusão feita com sucesso!",
                type: "success",
                timer: 5000
            });
            $uibModalInstance.close();
        },
            function (response) {
                return alert("Erro: " + reponse.status);
            });
    }

    $scope.fechar = function () {
        $uibModalInstance.dismiss();
    }
}

function inventarioParcialConsolidadoCtrl($scope, $http, DTOptionsBuilder, DTColumnDefBuilder) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('lengthMenu', [50, 100, 150, 200])
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

    $scope.dados;
    $scope.totalVenda;
    $scope.totalCusto;


    $http.get("http://localhost:50837/api/Inventario/GetAllTipos").then(function (response) {
        $scope.tipos = response.data;
    });

    $scope.allSelected = function (value) {
        if (value !== undefined) {
            return setAllSelected(value);
        } else {
            return getAllSelected();
        }
    }

    $scope.today = function () {
        $scope.date = new Date();
    };

    $scope.clear = function () {
        $scope.date = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(),
        minDate: new Date(),
        startingDay: 1
    };

    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.date = new Date(year, month, day);
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    $scope.Buscar = function () {

        $http.get("http://localhost:50837/api/Inventario/GetAllGroupFilialVenda?referencia=" + $scope.tipo + "&dataInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dataFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
            $scope.totalVenda = response.data;
        });

        $http.get("http://localhost:50837/api/Inventario/GetAllGroupFilialCusto?referencia=" + $scope.tipo + "&dataInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dataFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
            $scope.totalCusto = response.data;
        });

        $http.get("http://localhost:50837/api/Inventario/GetAllGroupFilial?referencia=" + $scope.tipo + "&dataInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dataFim=" + $scope.datefim.toLocaleDateString('en-US')).then(function (response) {
            $scope.dados = response.data;
        },
            function (response) {
                return alert("Erro: " + response.status);
            }
        )
    };
}

function cadFornecedorCtrl($scope, $http, $uibModal) {
}

function CalendarCtrl($scope, $uibModal) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.events = [

        { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 2, 22, 30), allDay: true },
        { title: 'Birthday Party', start: new Date(y, m, d + 1, 1, 0), end: new Date(y, m, d + 2, 22, 30), allDay: true, backgroundColor: 'red', borderColor: 'red' }
    ];


    /* message on eventClick */
    $scope.alertOnEventClick = function (event, allDay, jsEvent, view) {
        $scope.alertMessage = (event.title + ': Clicked ');
    };
    /* message on Drop */
    //$scope.alertOnDrop = function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
    //    $scope.alertMessage = (event.title + ': Droped to make dayDelta ' + dayDelta);
    //};
    ///* message on Resize */
    //$scope.alertOnResize = function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
    //    $scope.alertMessage = (event.title + ': Resized to make dayDelta ' + minuteDelta);
    //};

    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 600,
            editable: false,
            displayEventTime: false,
            header: {
                left: '',
                center: 'prev title next',
                right: ''
            },
            dayClick: function (date) {
                var modalIstance = $uibModal.open({
                    templateUrl: 'Views/modal/calendar/incluir.html',
                    controller: 'CalendarModalCtrl',
                    windowClass: "animated fadeIn"
                }).result.then(function () {
                });
            },
            eventClick: function (event) {
                alert('modal event')
            }
        }
    };

    /* Event sources array */
    $scope.eventSources = [$scope.events];
}

function CalendarModalCtrl($uibModalInstance) {

}

function confAntecipadaCtrl($scope, $http, DTOptionsBuilder, $localStorage, $uibModal, SweetAlert, toaster, $interval) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('lengthMenu', [20, 50, 100, 200])
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

    $interval(function () {
        $http.get("http://localhost:50837/api/ConfAntecipada/GetQtdPendente?idUsuario=" + $localStorage.user.Id).then(function (response) {
            SweetAlert.swal({
                title: "Você tem " + response.data + "notas pendentes!",
                type: "warning"
            });
        })
    }, 600000);

    $scope.antecipadas;

    $http.get("http://localhost:50837/api/ConfAntecipada/GetAntecipadasByUser?idUsuario=" + $localStorage.user.Id).then(function (response) {
        $scope.antecipadas = response.data;
    })

    $scope.buscar = function () {
        $http.get("http://localhost:50837/api/ConfAntecipada/GetAntecipadasByUserDateErro?idUsuario=" + $localStorage.user.Id + "&dtInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dtFim=" + $scope.datefim.toLocaleDateString('en-US') + "&tipoErro=" + $scope.tipoErro).then(function (response) {
            $scope.antecipadas = response.data;
        })
    }

    $scope.dateinicio = new Date();
    $scope.datefim = new Date();

    $scope.today = function () {
        $scope.date = new Date();
    };

    $scope.clear = function () {
        $scope.date = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(),
        minDate: new Date(),
        startingDay: 1
    };

    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.date = new Date(year, month, day);
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    $scope.importar = function () {
        $uibModal.open({
            templateUrl: 'Views/modal/produto/loading_massa.html',
            controller: 'confAntecipadaModalInstanceCtrl',
            windowClass: "animated fadeIn"
        })
    }

    $scope.finalizar = function (antecipada) {
        $http.post("http://localhost:50837/api/ConfAntecipada/MarcarVisualizado", antecipada);
        SweetAlert.swal({
            title: "Deseja o registro da nota: " + antecipada.Numero_NFe,
            type: "input",
            showCancelButton: true,
            confirmButtonText: "Pendente!",
            cancelButtonText: "Finalizar!",
            closeOnConfirm: false,
            closeOnCancel: false,
            cancelButtonColor: '#e2342a',
            confirmButtonColor: '#ff630f',
            inputPlaceholder: 'Observacao',
            showLoaderOnConfirm: true
        },
            function (isConfirm) {
                if (isConfirm) {
                    antecipada.Observacao = isConfirm
                    SweetAlert.swal({
                        title: "Alterado!",
                        text: "O registro foi alterado com sucesso.",
                        type: "success",
                        timer: 5000
                    });

                    $http.post("http://localhost:50837/api/ConfAntecipada/FinalizarNota", antecipada).then(function (response) {

                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });

                } else {
                    SweetAlert.swal({
                        title: "Alterado!",
                        text: "O registro foi alterado com sucesso.",
                        type: "success",
                        timer: 5000
                    });

                    $http.post("http://localhost:50837/api/ConfAntecipada/FinalizarNota", antecipada).then(function (response) {

                    }, function (response) {
                        return alert("Erro: " + response.status);
                    });
                }
            });
    }
}

function confAntecipadaModalInstanceCtrl($http, $localStorage, $uibModalInstance, SweetAlert) {
    if ($localStorage.user.Id == 32) {
        $http.post("http://localhost:50837/api/ConfAntecipada/ImportarCristiane").then(function () {
            $uibModalInstance.dismiss();
            SweetAlert.swal({
                title: "Sucesso!    ",
                text: "Importação feita com sucesso!",
                type: "success",
                timer: 5000
            });
        },
            function (response) {
                alert("Erro: " + response.status);
            })
    }

    else if ($localStorage.user.Id == 34) {
        $http.post("http://localhost:50837/api/ConfAntecipada/ImportarCristiane").then(function () {

        },
            function (response) {
                alert("Erro: " + response.status);
            })
    }

    else if ($localStorage.user.Id == 128) {
        $http.post("http://localhost:50837/api/ConfAntecipada/ImportarCristiane").then(function () {

        },
            function (response) {
                alert("Erro: " + response.status);
            })
    }
}

function confAntecipadaIndicadoresCtrl($scope, $http, DTOptionsBuilder, $localStorage, $uibModal, SweetAlert) {

    $scope.indicadores;
    $scope.indicador;

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('lengthMenu', [20, 50, 100, 200])
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


    if ($localStorage.user.Id == 32) {
        $scope.indicador = "Cristiane"
    }

    else if ($localStorage.user.Id == 34) {
        $scope.indicador = "Bruno"
    }

    else if ($localStorage.user.Id == 128) {
        $scope.indicador = "Marcelo"
    }

    $http.get("http://localhost:50837/api/ConfAntecipada/GetAntecipadasByIndicador?indicador=" + $scope.indicador).then(function (response) {
        $scope.indicadores = response.data;
    })

    $scope.buscar = function () {
        $http.get("http://localhost:50837/api/ConfAntecipada/GetAntecipadasByIndicadorDateErro?indicador=" + $scope.indicador + "&dtInicio=" + $scope.dateinicio.toLocaleDateString('en-US') + "&dtFim=" + $scope.datefim.toLocaleDateString('en-US') + "&tipoErro=" + $scope.tipoErro).then(function (response) {
            $scope.indicadores = response.data;
        })
    }

    $scope.dateinicio = new Date();
    $scope.datefim = new Date();

    $scope.today = function () {
        $scope.date = new Date();
    };

    $scope.clear = function () {
        $scope.date = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(),
        minDate: new Date(),
        startingDay: 1
    };

    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.date = new Date(year, month, day);
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
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
    .controller('solListaProdCtrl', solListaProdCtrl)
    .controller('solListaProdMobileCtrl', solListaProdMobileCtrl)
    .controller('solListaProdModalLoadingCtrl', solListaProdModalLoadingCtrl)
    .controller('validadeModalInstanceCtrl', validadeModalInstanceCtrl)
    .controller('solListaProdModalInstanceCtrl', solListaProdModalInstanceCtrl)
    .controller('solProdHistoricoModalCtrl', solProdHistoricoModalCtrl)
    .controller('incluiEANModalCtrl', incluiEANModalCtrl).directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
    .controller('altProd', altProd)
    .controller('listaAltProd', listaAltProd)
    .controller('solAltProdHistoricoModalCtrl', solAltProdHistoricoModalCtrl)
    .controller('rolesUserCtrl', rolesUserCtrl)
    .controller('rolesUserModalInstanceCtrl', rolesUserModalInstanceCtrl)
    .controller('adminUsuarioCtrl', adminUsuarioCtrl)
    .controller('adminUsuarioModalInstanceCtrl', adminUsuarioModalInstanceCtrl)
    .controller('balancoCtrl', balancoCtrl)
    .controller('balancoModalInstanceCtrl', balancoModalInstanceCtrl)
    .controller('inversaoCtrl', inversaoCtrl)
    .controller('ultimocustoCtrl', ultimocustoCtrl)
    .controller('geralCtrl', geralCtrl)
    .controller('observacaoModalCtrl', observacaoModalCtrl)
    .controller('historicoModalCtrl', historicoModalCtrl)
    .controller('quarentenaModalCtrl', quarentenaModalCtrl)
    .controller('observacaoTodosModalCtrl', observacaoTodosModalCtrl)
    .controller('quarentenaTodosModalCtrl', quarentenaTodosModalCtrl)
    .controller('despSituacaoCtrl', despSituacaoCtrl)
    .controller('despSituacaoModalInstanceCtrl', despSituacaoModalInstanceCtrl)
    .controller('despMotivoCtrl', despMotivoCtrl)
    .controller('despMotivoModalInstanceCtrl', despMotivoModalInstanceCtrl)
    .controller('despMotivoFilialCtrl', despMotivoFilialCtrl)
    .controller('despMotivoFilialModalInstanceCtrl', despMotivoFilialModalInstanceCtrl).directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
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
    .controller('relAcompanhamentoCtrl', relAcompanhamentoCtrl).filter('sumByKey', function () {
        return function (data, key) {
            if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
                return 0;
            }

            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                sum += data[i][key];
            }

            return sum;
        }
    })
    .controller('caixaModalInstanceCtrl', caixaModalInstanceCtrl)
    .controller('entradaModalInstanceCtrl', entradaModalInstanceCtrl)
    .controller('composicaoModalInstanceCtrl', composicaoModalInstanceCtrl)
    .controller('outrasdespesasModalInstanceCtrl', outrasdespesasModalInstanceCtrl)
    .controller('fechamentoModalInstanceCtrl', fechamentoModalInstanceCtrl)
    .controller('supcontroleCaixaCtrl', supcontroleCaixaCtrl)
    .controller('supRelAcompanhamentoCtrl', supRelAcompanhamentoCtrl).filter('sumByKey', function () {
        return function (data, key) {
            if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
                return 0;
            }

            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                sum += data[i][key];
            }

            return sum;
        }
    })
    .controller('controleCaixaLogsCtrl', controleCaixaLogsCtrl)
    .controller('parametroFilialCtrl', parametroFilialCtrl)
    .controller('parametroFilialModalInstanceCtrl', parametroFilialModalInstanceCtrl)
    .controller('estoqueFisicoCtrl', estoqueFisicoCtrl)
    .controller('estoqueModalInstanceCtrl', estoqueModalInstanceCtrl)
    .controller('estoqueContabilCtrl', estoqueContabilCtrl)
    .controller('estoqueCustoModalInstanceCtrl', estoqueCustoModalInstanceCtrl)
    .controller('cadProdutoCtrl', cadProdutoCtrl)
    .controller('bpdreCtrl', bpdreCtrl).filter('filterTreeItem', function () {
        function recursive(obj, newObj, level, itemId, isExpend) {
            console.log(obj, newObj, level, itemId, isExpend)
            angular.forEach(obj, function (o) {
                if (o.children && o.children.length != 0) {
                    o.level = level;
                    o.leaf = false;
                    newObj.push(o);
                    if (o.id == itemId) {
                        o.expend = isExpend;
                    }
                    if (o.expend == true) {
                        recursive(o.children, newObj, o.level + 1, itemId, isExpend);
                    }
                } else {
                    o.level = level;
                    o.leaf = true;
                    newObj.push(o);
                    return false;
                }
            });
        }

        return function (obj, itemId, isExpend) {
            var newObj = [];
            recursive(obj, newObj, 0, itemId, isExpend);
            return newObj;
        }
    })
    .controller('promocaoCtrl', promocaoCtrl)
    .controller('promocaoModalInstanceCtrl', promocaoModalInstanceCtrl)
    .controller('classificacaoProdutoCtrl', classificacaoProdutoCtrl).filter('filterTreeItem', function () {
        function recursive(obj, newObj, level, itemId, isExpend) {
            angular.forEach(obj, function (o) {
                if (o.children && o.children.length != 0) {
                    o.level = level;
                    o.leaf = false;
                    newObj.push(o);
                    if (o.id == itemId) {
                        o.expend = isExpend;
                    }
                    if (o.expend == true) {
                        recursive(o.children, newObj, o.level + 1, itemId, isExpend);
                    }
                } else {
                    o.level = level;
                    o.leaf = true;
                    newObj.push(o);
                    return false;
                }
            });
        }

        return function (obj, itemId, isExpend) {
            var newObj = [];
            recursive(obj, newObj, 0, itemId, isExpend);
            return newObj;
        }
    })
    .controller('classificacaoModalInstanceCtrl', classificacaoModalInstanceCtrl)
    .controller('associacaoProdutoCtrl', associacaoProdutoCtrl)
    .controller('associacaoProdutoModalInstanceCtrl', associacaoProdutoModalInstanceCtrl)
    .controller('assProdHistoricoModalCtrl', assProdHistoricoModalCtrl)
    .controller('incluiEANAssModalCtrl', incluiEANAssModalCtrl)
    .controller('cadUsuarioCtrl', cadUsuarioCtrl)
    .controller('cadUsuarioCtrlModalInstance', cadUsuarioCtrlModalInstance).directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
    .controller('cadUsuarioHistoricoModalCtrl', cadUsuarioHistoricoModalCtrl)
    .controller('operadorCtrl', operadorCtrl)
    .controller('operadorCtrlModal', operadorCtrlModal).directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
    .controller('operadorHistoricoCtrlModal', operadorHistoricoCtrlModal)
    .controller('chamSuporteCtrl', chamSuporteCtrl)
    .controller('chamSuporteCtrlModalInstance', chamSuporteCtrlModalInstance)
    .controller('chamSuporteVinculoCtrlModalInstance', chamSuporteVinculoCtrlModalInstance)
    .controller('historicoChamSuporteModalCtrl', historicoChamSuporteModalCtrl)
    .controller('chamSuporteAssuntoCtrl', chamSuporteAssuntoCtrl)
    .controller('chamSuporteAssuntoCtrlModalInstance', chamSuporteAssuntoCtrlModalInstance)
    .controller('estoqueNotaCtrl', estoqueNotaCtrl)
    .controller('maloteCtrl', maloteCtrl)
    .controller('maloteCtrlModalInstance', maloteCtrlModalInstance).directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
    .controller('maloteHistoricoCtrlModalInstance', maloteHistoricoCtrlModalInstance)
    .controller('tiposMaloteCtrl', tiposMaloteCtrl)
    .controller('tiposMaloteCtrlModalInstance', tiposMaloteCtrlModalInstance)
    .controller('estoqueMinimoCtrl', estoqueMinimoCtrl)
    .controller('listaEstoqueMinimoCtrl', listaEstoqueMinimoCtrl)
    .controller('listaEstoqueMinimoCtrlModalInstance', listaEstoqueMinimoCtrlModalInstance)
    .controller('abastecimentoParametro', abastecimentoParametro)
    .controller('abastecimentoParametroModalInstance', abastecimentoParametroModalInstance)
    .controller('abastecimentoMassaCtrl', abastecimentoMassaCtrl)
    .controller('abastecimentoMassaModalCtrl', abastecimentoMassaModalCtrl)
    .controller('abastecimentoMassaLog', abastecimentoMassaLog)
    .controller('abastecimentoTrocaCtrl', abastecimentoTrocaCtrl)
    .controller('clusterCtrl', clusterCtrl)
    .controller('clusterModalCtrl', clusterModalCtrl)
    .controller('inventarioParcialCtrl', inventarioParcialCtrl)
    .controller('inventarioProdutoCtrl', inventarioProdutoCtrl)
    .controller('inventarioProdutoModalInstanceCtrl', inventarioProdutoModalInstanceCtrl)
    .controller('inventarioParcialConsolidadoCtrl', inventarioParcialConsolidadoCtrl)
    .controller('cadFornecedorCtrl', cadFornecedorCtrl)
    .controller('CalendarCtrl', CalendarCtrl)
    .controller('CalendarModalCtrl', CalendarModalCtrl)
    .controller('confAntecipadaCtrl', confAntecipadaCtrl)
    .controller('confAntecipadaModalInstanceCtrl', confAntecipadaModalInstanceCtrl)
    .controller('confAntecipadaIndicadoresCtrl', confAntecipadaIndicadoresCtrl);