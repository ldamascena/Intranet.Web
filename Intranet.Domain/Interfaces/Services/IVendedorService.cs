using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Services
{
    public interface IVendedorService : IServiceBase<Vendedor>
    {
        IEnumerable<Vendedor> GetVendedorByNome(string nome);
        IEnumerable<Vendedor> GetVendedorByEmpresa(string empresa, string nome);
        void AtulizarVendedor(Vendedor obj);
        void IncluirComprador(Vendedor obj);
        void ExcluirComprador(Vendedor obj);
        void IncluirFornecedor(Vendedor obj);
        void ExcluirEmpresa(Vendedor obj);
        void AlterarStatus(Vendedor obj);
    }
}
