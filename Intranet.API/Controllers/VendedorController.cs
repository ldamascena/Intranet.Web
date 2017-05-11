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

        public IEnumerable<Vendedor> GetAllByNameLike(string nome)
        {
            // Inicialização das instancias
            _repository = new VendedorRepository(new CentralContext());
            _service = new VendedorService(_repository);
            _app = new VendedorApp(_service);

            return _app.GetAll().Where(x => x.Nome.Contains(nome)).GroupBy(i => i.Nome, (key, group) => group.First()).ToList();
        }

        public IEnumerable<Vendedor> GetAllByNameGrouped(string nome)
        {
            // Inicialização das instancias
            _repository = new VendedorRepository(new CentralContext());
            _service = new VendedorService(_repository);
            _app = new VendedorApp(_service);


            return _app.GetVendedorByNome(nome).GroupBy(i => i.CdComprador, (key, group) => group.First()).ToList();
        }

        public IEnumerable<Vendedor> GetAllByName(string nome)
        {
            // Inicialização das instancias
            _repository = new VendedorRepository(new CentralContext());
            _service = new VendedorService(_repository);
            _app = new VendedorApp(_service);


            return _app.GetVendedorByNome(nome).ToList();
        }

        public IEnumerable<Vendedor> GetAllFornecedorByName(string nome)
        {
            // Inicialização das instancias
            _repository = new VendedorRepository(new CentralContext());
            _service = new VendedorService(_repository);
            _app = new VendedorApp(_service);


            return _app.GetVendedorByNome(nome).GroupBy(i => i.Empresa, (key, group) => group.First()).ToList();
        }

        public IEnumerable<Vendedor> GetByEmpresa(string empresa, string nome)
        {
            // Inicialização das instancias
            _repository = new VendedorRepository(new CentralContext());
            _service = new VendedorService(_repository);
            _app = new VendedorApp(_service);


            return _app.GetVendedorByEmpresa(empresa, nome);
        }

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

        public HttpResponseMessage AtulizarVendedor(Vendedor obj)
        {
            // Inicialização das instancias
            _repository = new VendedorRepository(new CentralContext());
            _service = new VendedorService(_repository);
            _app = new VendedorApp(_service);



            try
            {
                _app.AtulizarVendedor(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage IncluirComprador(Vendedor obj)
        {
            // Inicialização das instancias
            _repository = new VendedorRepository(new CentralContext());
            _service = new VendedorService(_repository);
            _app = new VendedorApp(_service);

            try
            {
                _app.IncluirComprador(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage ExcluirComprador(Vendedor obj)
        {
            // Inicialização das instancias
            _repository = new VendedorRepository(new CentralContext());
            _service = new VendedorService(_repository);
            _app = new VendedorApp(_service);

            try
            {
                _app.ExcluirComprador(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage IncluirFornecedor(Vendedor obj)
        {
            // Inicialização das instancias
            _repository = new VendedorRepository(new CentralContext());
            _service = new VendedorService(_repository);
            _app = new VendedorApp(_service);

            try
            {
                _app.IncluirFornecedor(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage ExcluirFornecedor(Vendedor obj)
        {
            // Inicialização das instancias
            _repository = new VendedorRepository(new CentralContext());
            _service = new VendedorService(_repository);
            _app = new VendedorApp(_service);

            try
            {
                _app.ExcluirEmpresa(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage AlterarStatus(Vendedor obj)
        {
            // Inicialização das instancias
            _repository = new VendedorRepository(new CentralContext());
            _service = new VendedorService(_repository);
            _app = new VendedorApp(_service);

            try
            {
                _app.AlterarStatus(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
