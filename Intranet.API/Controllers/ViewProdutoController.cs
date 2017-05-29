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
    public class ViewProdutoController : ApiController
    {
        private IViewProdutoRepository _repository;
        private IViewProdutoService _service;
        private IViewProdutoApp _app;

        // GET: api/ViewProduto
        public ViewProduto GetByNomeProduto(string nomeProduto)
        {
            _repository = new ViewProdutoRepository(new CentralContext());
            _service = new ViewProdutoService(_repository);
            _app = new ViewProdutoApp(_service);

            return _app.Get(x => x.Descricao == nomeProduto);
        }

        // GET: api/ViewProduto/5
        public ViewProduto GetById(int id)
        {
            _repository = new ViewProdutoRepository(new CentralContext());
            _service = new ViewProdutoService(_repository);
            _app = new ViewProdutoApp(_service);

            return _app.Get(x => x.idProduto == id);
        }
    }
}
