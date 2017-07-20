using Intranet.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Repositories
{
    public class AlertaQuarentenaRepository : RepositoryBase<AlertaQuarentena>, IAlertaQuarentenaRepository
    {
        public AlertaQuarentenaRepository(CentralContext context)
            : base(context)
        { }
    }
}
