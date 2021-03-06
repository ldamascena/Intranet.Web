﻿using Intranet.Solidcon.Data.Context;
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
    public class ClassificacaoProdutoController : ApiController
    {

        private IClassificacaoProdutoService _service;
        private IClassificacaoProdutoRepository _repository;
        private IClassificacaoProdutoApp _app;

        [HttpGet]
        // GET: api/ClassificacaoProduto
        public IEnumerable<ClassificacaoProduto> GetAll()
        {
            // Inicialização das instancias
            _repository = new ClassificacaoProdutoRepository(new CentralContext());
            _service = new ClassificacaoProdutoService(_repository);

            return _service.GetAll().Where(x => x.CdOrdem.Length == 3).OrderBy(x => x.label);
        }

        [HttpGet]
        // GET: api/ClassificacaoProduto
        public IEnumerable<ClassificacaoProduto> Get(string nomeClassificacao)
        {
            // Inicialização das instancias
            _repository = new ClassificacaoProdutoRepository(new CentralContext());
            _service = new ClassificacaoProdutoService(_repository);

            return _service.GetAll().Where(x => x.label == nomeClassificacao);
        }

        [HttpGet]
        // GET: api/ClassificacaoProduto
        public ClassificacaoProduto GetByCdClassificacao(int cdClassificacao)
        {
            // Inicialização das instancias
            _repository = new ClassificacaoProdutoRepository(new CentralContext());
            _service = new ClassificacaoProdutoService(_repository);
            

            return _service.GetAll().Where(x => x.CdClassificacaoProduto == cdClassificacao).FirstOrDefault();
        }

        [HttpGet]
        public IEnumerable<ClassificacaoProduto> GetAllVinculado(string nomeClassificacao)
        {
            // Inicialização das instancias
            _repository = new ClassificacaoProdutoRepository(new CentralContext());
            _service = new ClassificacaoProdutoService(_repository);
            

            return _service.GetAllVinculado(nomeClassificacao);
        }

        [HttpPost]
        public HttpResponseMessage AlterarClassificacaoProduto([FromBody] ClassificacaoProduto objView)
        {
            // Inicialização das instancias
            _repository = new ClassificacaoProdutoRepository(new CentralContext());
            _service = new ClassificacaoProdutoService(_repository);
            

            try
            {
                _service.AlterarClassificacaoProduto(objView);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);

        }
    }
}
