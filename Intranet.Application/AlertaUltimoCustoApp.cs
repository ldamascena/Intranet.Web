using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Application
{
    public class AlertaUltimoCustoApp : AppBase<AlertaUltimoCusto>, IAlertaUltimoCustoApp
    {
        private readonly IAlertaUltimoCustoService _service;

        public AlertaUltimoCustoApp(IAlertaUltimoCustoService service)
           : base(service)
        {
            this._service = service;
        }
    }
}
