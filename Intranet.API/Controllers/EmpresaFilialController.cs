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
    public class EmpresaFilialController : ApiController
    {
        private IEmpresaFilialService _service;
        private IEmpresaFilialRepository _repository;
        private IEmpresaFilialApp _app;

        // GET: api/EmpresaFilial
        public IEnumerable<EmpresaFilial> GetAll()
        {
            // Inicialização das instancias
            var context = new CentralContext();

            return context.EmpresaFiliais;
        }

        public IEnumerable<EmpresaFilial> GetAllOrdered()
        {
            var context = new CentralContext();

            return context.EmpresaFiliais.OrderBy(x => x.nmFilial);
        }

        public IEnumerable<EmpresaFilial> GetAllLojasOrdered()
        {
            var context = new CentralContext();

            return context.EmpresaFiliais.Where(x => x.cdFilialTipo == "L") .OrderBy(x => x.nmFilial);
        }
    }
}
