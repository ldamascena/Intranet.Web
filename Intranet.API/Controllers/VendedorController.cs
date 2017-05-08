using Intranet.Application;
using Intranet.Data.Context;
using Intranet.Data.Repositories;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Domain.Interfaces.Services;
using Intranet.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class VendedorController : ApiController
    {
        private IVendedorRepository _repository;
        private IVendedorService _service;
        private IVendedorApp _app;

        // GET: api/Vendedor
        public IEnumerable<Vendedor> GetAll()
        {
            // Inicialização das instancias
            _repository = new VendedorRepository(new CentralContext());
            _service = new VendedorService(_repository);
            _app = new VendedorApp(_service);

            var result2 =_app.GetAll().GroupBy(c => c.Nome).Select(grp => grp.First());

            return result2;
        }

        public IEnumerable<Vendedor> GetAllByName(string nome)
        {
            // Inicialização das instancias
            _repository = new VendedorRepository(new CentralContext());
            _service = new VendedorService(_repository);
            _app = new VendedorApp(_service);


            return _app.GetVendedorByNome(nome);
        }

        [HttpPost]
        public HttpResponseMessage AddVendedor(Vendedor obj)
        {
            // Inicialização das instancias
            _repository = new VendedorRepository(new CentralContext());
            _service = new VendedorService(_repository);
            _app = new VendedorApp(_service);



            try
            {
                obj.DtInclusao = DateTime.Now;
                obj.DtAlteracao = DateTime.Now;
                _app.Add(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
