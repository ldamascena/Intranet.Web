    using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Intranet.Web.Controllers
{
    public class AlertaGeralController : Controller
    {
        // GET: OrdemServico
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ListaDeAlertas(int? cdProduto)
        {
            return View();
        }
    }
}
