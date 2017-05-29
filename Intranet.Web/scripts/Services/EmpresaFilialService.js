app.service('EmpresaFilialService', function ($http) {
    var serviceBase = 'http://localhost:50837/';
    var serviceBaseProducao = 'http://192.168.1.199:9810/Intranet.API/';

    this.GetAll = function () {
        return $http.get(serviceBase + "api/EmpresaFilial/GetAll").then(function (response) {
            return response
        }, function (response) {
            return alert("Erro: " + response.status);
        });
    }
});