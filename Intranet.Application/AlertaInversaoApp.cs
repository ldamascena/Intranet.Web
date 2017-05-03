using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using Intranet.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Application
{
    public class AlertaInversaoApp : AppBase<AlertaInversao>, IAlertaInversaoApp
    {
        private readonly IAlertaInversaoService _service;

        public AlertaInversaoApp(IAlertaInversaoService service)
            : base (service)
        {

            this._service = service;
        }


        public IEnumerable<AlertaInversao> ObterPorProduto(int cdProduto)
        {
            return _service.GetInvertidosPorProduto(cdProduto);
        }
    }
}
