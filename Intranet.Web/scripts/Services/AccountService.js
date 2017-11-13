app.service('AccountService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    this.Autenticate = function (user, password) {
        return $http.get(serviceBase + "api/Account/Autenticate?user=" + user + "&password=" + password).then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});