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
    public class AlertaTipoApp : AppBase<AlertaTipo>, IAlertaTipoApp
    {
        private readonly IAlertaTipoService _service;

        public AlertaTipoApp(IAlertaTipoService service)
            : base(service)
        {
            this._service = service;
        }

        public void IncluirTipoAlerta(AlertaTipo obj)
        {
            _service.IncluirTipoAlerta(obj);
        }

        public void AprovarTipoAlerta(AlertaTipo obj)
        {
            _service.AprovarTipoAlerta(obj);
        }

        public void VincularTipoAlerta(List<AlertaTipo> objs)
        {
            _service.VincularTipoAlerta(objs);
        }
    }
}
