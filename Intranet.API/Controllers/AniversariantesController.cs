using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.OutputCache.V2;

namespace Intranet.API.Controllers
{
    public class AniversariantesController : ApiController
    {
        
        public IEnumerable<Aniversariantes> GetAll()
        {
            var context = new AlvoradaContext();

            return context.Aniversariantes;
        }

        
        public IEnumerable<Aniversariantes> GetAllByMonth()
        {
            var context = new AlvoradaContext();

            return context.Aniversariantes.Where(x => x.Aniversario.Month == DateTime.Now.Month).OrderBy(x => x.Aniversario.Day);
        }

        
        public IEnumerable<Aniversariantes> GetAllByDay()
        {
            var context = new AlvoradaContext();

            return context.Aniversariantes.Where(x => x.Aniversario.Month == DateTime.Now.Month && x.Aniversario.Day == DateTime.Now.Day);
        }

        
        public bool GetBirthdayToday()
        {
            var context = new AlvoradaContext();

            var result = false;

            if (context.Aniversariantes.Where(x => x.Mes == DateTime.Now.Month && x.Dia == DateTime.Now.Day).FirstOrDefault() != null)
                result = true;

            return result;
        }
    }
}
