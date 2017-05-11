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
    public class VendedorApp : AppBase<Vendedor>, IVendedorApp
    {
        private readonly IVendedorService _service;

        public VendedorApp(IVendedorService service)
            : base(service)
        {
            this._service = service;
        }

        public IEnumerable<Vendedor> GetVendedorByNome(string nome)
        {
            return _service.GetVendedorByNome(nome);
        }

        public IEnumerable<Vendedor> GetVendedorByEmpresa(string empresa, string nome)
        {
            return _service.GetVendedorByEmpresa(empresa, nome);
        }

        public void AtulizarVendedor(Vendedor obj)
        {
            _service.AtulizarVendedor(obj);
        }

        public void IncluirComprador(Vendedor obj)
        {
            _service.IncluirComprador(obj);
        }

        public void ExcluirComprador(Vendedor obj)
        {
            _service.ExcluirComprador(obj);
        }

        public void IncluirFornecedor(Vendedor obj)
        {
            _service.IncluirFornecedor(obj);
        }

        public void ExcluirEmpresa(Vendedor obj)
        {
            _service.ExcluirEmpresa(obj);
        }

        public void AlterarStatus(Vendedor obj)
        {
            _service.AlterarStatus(obj);
        }
    }
}
