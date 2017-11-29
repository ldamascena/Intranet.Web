using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Intranet.Domain;
using Intranet.Alvorada.Data.Context;

namespace Intranet.API.Controllers
{
    public class AlertaGeralController : ApiController
    {
        // GET: api/AlertaInversao
        public IEnumerable<VwAlertaGeralAnalitico> GetAllAnalitico()
        {
            var context = new AlvoradaContext();

            return context.VwAlertasGeralAnalitico.OrderByDescending(x => x.Abertos).ToList();
        }
    }
}
