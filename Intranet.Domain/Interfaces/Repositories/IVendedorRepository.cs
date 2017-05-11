using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Repositories
{
    public interface IVendedorRepository : IRepositoryBase<Vendedor>
    {
        IEnumerable<Vendedor> GetVendedorByNome(string nome);
        IEnumerable<Vendedor> GetVendedorByEmpresa(string empresa, string nome);
    }
}
