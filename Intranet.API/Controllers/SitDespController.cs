using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using WebApi.OutputCache.V2;

namespace Intranet.API.Controllers
{
    public class SitDespController : ApiController
    {
        
        public IEnumerable<SituacaoDesp> GetAll()
        {
            var context = new AlvoradaContext();

            var result = context.SituacoesDesp.ToList();

            return result;
        }
    }
}
