using Intranet.Solidcon.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Repositories
{
    public class PessoaRepository : RepositoryBase<Pessoa>, IPessoaRepository
    {
        public PessoaRepository(CentralContext context)
            : base(context)
        {

        }
    }
}
