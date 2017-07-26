using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Application
{
    public class AlertaGeralApp : AppBase<AlertaGeral>, IAlertaGeralApp
    {
        private readonly IAlertaGeralService _service;
        

        public AlertaGeralApp(IAlertaGeralService service)
            : base (service)
        {

            this._service = service;
        }


        public AlertaGeral GetGeralPorProduto(int cdProduto)
        {
            return _service.GetGeralPorProduto(cdProduto);
        }

        public AlertaGeral GetGeralPorProdutoNome(string nomeProduto)
        {
            return _service.GetGeralPorProdutoNome(nomeProduto);
        }

        public IEnumerable<AlertaGeral> Get(int? tipoAlerta = null, int? situacao = null)
        {
            return _service.Get(tipoAlerta, situacao);
        }
    }
}
