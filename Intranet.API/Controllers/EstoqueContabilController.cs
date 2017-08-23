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
    public class EstoqueContabilController : ApiController
    {

        private IEstoqueContabilRepository _repository;
        private ILogAlteracaoCustoRepository _repositoryLog;
        private IEstoqueContabilService _service;
        private IEstoqueContabilApp _app;

        // GET: api/EstoqueContabil
        public EstoqueContabil GetBySuperProduto(int cdSuperProduto, int cdPessoaFilial)
        {
            var context = new CentralContext();
            _repository = new EstoqueContabilRepository(context);
            _repositoryLog = new LogAlteracaoCustoRepository(context);
            _service = new EstoqueContabilService(_repository, _repositoryLog);
            _app = new EstoqueContabilApp(_service);

            return _app.GetByIdSuperProduto(cdSuperProduto, cdPessoaFilial);
        }

        public EstoqueContabil GetBySuperProdutoNome(string nomeSuperProduto, int cdPessoaFilial)
        {
            var context = new CentralContext();
            _repository = new EstoqueContabilRepository(context);
            _repositoryLog = new LogAlteracaoCustoRepository(context);
            _service = new EstoqueContabilService(_repository, _repositoryLog);
            _app = new EstoqueContabilApp(_service);

            return _app.GetByNomeSuperProduto(nomeSuperProduto, cdPessoaFilial);
        }

        [HttpPost]
        public HttpResponseMessage AlterarValorDeCusto([FromBody] EstoqueContabil obj)
        {
            var context = new CentralContext();
            _repository = new EstoqueContabilRepository(context);
            _repositoryLog = new LogAlteracaoCustoRepository(context);
            _service = new EstoqueContabilService(_repository, _repositoryLog);
            _app = new EstoqueContabilApp(_service);

            try
            {
                _app.AlterarValorDeCusto(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
