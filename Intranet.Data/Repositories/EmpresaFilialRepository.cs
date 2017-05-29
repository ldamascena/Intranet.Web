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
    public class EmpresaFilialRepository : RepositoryBase<EmpresaFilial>, IEmpresaFilialRepository
    {
        public EmpresaFilialRepository(CentralContext context)
            : base(context)
        {
        }
    }
}
