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
    public class AlertaBalancoApp : AppBase<AlertaBalanco>, IAlertaBalancoApp
    {
        private readonly IAlertaBalancoService _service;

        public AlertaBalancoApp(IAlertaBalancoService service)
            : base(service)
        {
            this._service = service;
        }

        public List<AlertaBalanco> GetBalancoContainsNomeProduto(string nomeProduto)
        {
            return _service.GetBalancoContainsNomeProduto(nomeProduto);
        }

        public List<AlertaBalanco> GetBalancoPorProduto(int cdProduto)
        {
            return _service.GetBalancoPorProduto(cdProduto);
        }

        public void UpdateBalanco(AlertaBalanco obj)
        {
            _service.UpdateBalanco(obj);
        }

        public List<AlertaBalanco> GetAll(int? situacao = null, DateTime? dataInclusao = null)
        {
            return _service.GetAll(situacao, dataInclusao);
        }
    }
}
