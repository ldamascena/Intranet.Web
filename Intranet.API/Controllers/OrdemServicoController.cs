using System.Web.Http;
using System.Web.Security;

namespace Intranet.API.Controllers
{
    public class OrdemServicoController : ApiController
    {
        // GET: api/OrdemServico

        [HttpPost]
        public void postUser()
        {
            var _status = new MembershipCreateStatus();

            MembershipUser user = Membership.CreateUser("Leonardo", "1234", "userName@emailAddress", "teste", "teste", true, out _status);
            
        }
    }
}
