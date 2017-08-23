using Intranet.Data.Context;
using Intranet.Data.Repositories;
using Intranet.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class SuperProdutoController : ApiController
    {
        private ISuperProdutoRepository _repository;

        // GET: api/SuperProduto
        public IEnumerable<string> GetAllSuperProdutos()
        {
            var context = new CentralContext();
            _repository = new SuperProdutoRepository(context);

            return _repository.GetAll().Select(x => x.NmProdutoPai);
        }
    }
}
