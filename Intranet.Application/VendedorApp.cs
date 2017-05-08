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
    }
}
