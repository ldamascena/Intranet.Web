app.controller('accountCtrl', function ($scope, AccountService, growl, $sessionStorage) {
    $scope.passwordLogin = "Leon@rd3";
    
    
    $scope.logar = function () {

        if (($scope.userLogin == "" || $scope.userLogin == undefined) || ($scope.passwordLogin == "" || $scope.passwordLogin == undefined)) {
            growl.error("Preencha os campos corretamente!", { title: 'Erro' });
        }

        else {

            AccountService.Autenticate($scope.userLogin, $scope.passwordLogin).then(function (response) {
                switch (response.data) {
                    case 1:
                        growl.success("Log in feito com sucesso. Você será redirecionado em alguns segundos!", { title: 'Sucesso' });
                        $sessionStorage.userLogin = $scope.userLogin;
                        window.location = "Index";
                        break;
                    case 2:
                        growl.error("Usuário bloqueado!", { title: 'Erro' });
                        break;
                    case 5:
                        growl.warning("Pendente de confirmação de email!", { title: 'Atenção' });
                        break;
                    case 4:
                    default:
                        growl.error("Usuário ou senha incorretos!", { title: 'Erro' });
                        break;
                }
            });
        }
    }

    //$scope.solicitarCadastro = function () {

    //} 

    $scope.testeSession = function (){
        alert($sessionStorage.userLogin);
    }
});