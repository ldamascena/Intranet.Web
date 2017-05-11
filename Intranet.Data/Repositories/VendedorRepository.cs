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
    public class VendedorRepository : RepositoryBase<Vendedor>, IVendedorRepository
    {
        public VendedorRepository(CentralContext context)
            : base(context)
        { }

        public IEnumerable<Vendedor> GetVendedorByNome(string nome)
        {
            return Db.Vendedores.Where(x => x.Nome == nome);
        }

        public IEnumerable<Vendedor> GetVendedorByEmpresa(string empresa, string nome)
        {
            return Db.Vendedores.Where(x => x.Empresa == empresa && x.Nome == nome);
        }
    }
}
