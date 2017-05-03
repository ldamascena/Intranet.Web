using Intranet.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Repositories
{
    public class AlertaRepository : RepositoryBase<Alerta>,  IAlertaRepository
    {

        public AlertaRepository(CentralContext context)
            : base(context)
        {

        }
    }
}
