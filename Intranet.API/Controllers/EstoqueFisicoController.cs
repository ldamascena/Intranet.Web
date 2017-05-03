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
    public class EstoqueFisicoController : ApiController
    {
        private IEstoqueFisicoService _service;
        private IEstoqueFisicoRepository _repositoryFisico;
        private IEstoqueFisicoApp _app;

        private IEstoqueMovimentoRepository _repositoryMovimento;

        // GET: api/EstoqueFisico
        public IEnumerable<EstoqueFisico> Get()
        {
            // Inicialização das instancias
            _repositoryFisico = new EstoqueFisicoRepository(new CentralContext());
            _repositoryMovimento = new EstoqueMovimentoRepository(new CentralContext());
            _service = new EstoqueFisicoService(_repositoryFisico, _repositoryMovimento);
            _app = new EstoqueFisicoApp(_service);

            return _app.GetAllTipoProduto();
        }

        public IEnumerable<EstoqueFisico> GetPorProduto(int cdProduto)
        {
            // Inicialização das instancias
            _repositoryFisico = new EstoqueFisicoRepository(new CentralContext());
            _repositoryMovimento = new EstoqueMovimentoRepository(new CentralContext());
            _service = new EstoqueFisicoService(_repositoryFisico, _repositoryMovimento);
            _app = new EstoqueFisicoApp(_service);

            return _app.GetAllTipoProdutoPorProduto(cdProduto);
        }

        [HttpPost]
        public HttpResponseMessage AtualizarEstoque([FromBody] EstoqueFisico[] objs)
        {
            _repositoryFisico = new EstoqueFisicoRepository(new CentralContext());
            _repositoryMovimento = new EstoqueMovimentoRepository(new CentralContext());
            _service = new EstoqueFisicoService(_repositoryFisico, _repositoryMovimento);
            _app = new EstoqueFisicoApp(_service);

            try
            {
                _app.AtualizarEstoque(objs);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }


        [HttpPost]
        public HttpResponseMessage AdicionarEstoque([FromBody] EstoqueFisico obj)
        {
            _repositoryFisico = new EstoqueFisicoRepository(new CentralContext());
            _repositoryMovimento = new EstoqueMovimentoRepository(new CentralContext());
            _service = new EstoqueFisicoService(_repositoryFisico, _repositoryMovimento);
            _app = new EstoqueFisicoApp(_service);

            try
            {
                _app.AdicionarEstoque(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
