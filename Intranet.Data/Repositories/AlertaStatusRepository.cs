using Intranet.Solidcon.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Repositories
{
    public class AlertaStatusRepository : RepositoryBase<AlertaStatus>, IAlertaStatusRepository
    {
        public AlertaStatusRepository(CentralContext context)
            : base(context)
        {

        }
    }
}
