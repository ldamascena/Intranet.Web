using Intranet.Application;
using Intranet.Solidcon.Data.Context;
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
    public class ClassificacaoMetaController : ApiController
    {
        private IClassificacaoMetaService _service;
        private IClassificacaoMetaRepository _repository;
        private IClassificacaoMetaApp _app;

        [HttpGet]
        // GET: api/ClassificacaoMeta
        public IEnumerable<ClassificacaoMeta> GetAll()
        {
            // Inicialização das instancias
            _repository = new ClassificacaoMetaRepository(new CentralContext());
            _service = new ClassificacaoMetaService(_repository);
            _app = new ClassificacaoMetaApp(_service);

            return _app.GetAll().Where(x => x.CdOrdem.Length == 3).OrderBy(x => x.nmClassificacaoProduto);
        }

        [HttpGet]
        public IEnumerable<VwClassificacaoMetaMes> GetClassificacaoMetaMes()
        {
            var context = new CentralContext();

            return context.VwClassificacaoMetaMes.ToList();
        }

        [HttpGet]
        public IEnumerable<VwClassificacaoMeta> GetClassificacaoMetaByMes(string nomeMes)
        {
            var context = new CentralContext();

            return context.VwClassificacaoMeta.ToList().Where(w => w.nomeMes == nomeMes).OrderBy(x => x.nmUsuario).ThenBy(y => y.Nivel1).Distinct();
        }

        public HttpResponseMessage AlterarClassificacao([FromBody] ClassificacaoMeta objView)
        {
            // Inicialização das instancias
            _repository = new ClassificacaoMetaRepository(new CentralContext());
            _service = new ClassificacaoMetaService(_repository);
            _app = new ClassificacaoMetaApp(_service);

            try
            {
                _app.AlterarClassificacaoMeta(objView);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);

        }

    }
}
