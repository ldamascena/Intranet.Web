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


        public IEnumerable<AlertaGeral> ObterTodas()
        {
            return _service.GetAll();
        }
    }
}
