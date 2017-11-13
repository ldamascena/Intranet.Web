using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class CadSaldoController : ApiController
    {
        public CadSaldoControle GetLastSaldoByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadSaldosControle.ToList().Where(x => x.IdUsuario == idUsuario
              && x.DataInclusao.Date != DateTime.Now.Date)
              .OrderByDescending(x => x.DataInclusao).FirstOrDefault();
        }

        public HttpResponseMessage Incluir(CadSaldoControle model)
        {
            var context = new AlvoradaContext();

            try
            {
                model.DataInclusao = DateTime.Now;
                context.CadSaldosControle.Add(model);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public bool GetCurrentSaldoByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            var result = context.CadSaldosControle.ToList().Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao.Date == DateTime.Now.Date)
              .OrderByDescending(x => x.DataInclusao).FirstOrDefault();

            if (result == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public CadSaldoControle GetSaldoByUserAndDate(int idUsuario, DateTime date)
        {
            var context = new AlvoradaContext();

            return context.CadSaldosControle.ToList().Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao.Date== date.Date).OrderByDescending(x => x.DataInclusao).FirstOrDefault();
        }


        public HttpResponseMessage Alterar(CadSaldoControle model)
        {
            var context = new AlvoradaContext();

            var result = context.CadSaldosControle.ToList().Where(x => x.IdUsuario == model.IdUsuario
            && x.DataInclusao.Date == model.DataInclusao.Date).FirstOrDefault();

            var saldoAtual = model.Saldo - result.Saldo;

            var list = context.CadSaldosControle.ToList().Where(x => x.IdUsuario == model.IdUsuario && x.DataInclusao > model.DataInclusao).ToList();

            try
            {
                foreach (var item in list)
                {
                    item.Saldo = item.Saldo + saldoAtual;
                    item.DataAlteracao = DateTime.Now;
                    context.CadSaldosControle.Add(model);
                    context.SaveChanges();
                }
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

    }
}
