using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class SolitDespController : ApiController
    {
        public IEnumerable<CadSolDesp> GetAll()
        {
            var context = new AlvoradaContext();

            var result = context.CadSolicitacoesDesp.ToList();

            return result;
        }
        public IEnumerable<CadSolDesp> GetAllByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            var result = context.CadSolicitacoesDesp.Where(x => x.IdUsuarioInclusao == idUsuario || x.IdAprovador == idUsuario).ToList();

            return result;
        }

        public IEnumerable<CadSolDesp> GetAllByUserAprovado(int idUsuario)
        {
            var context = new AlvoradaContext();

            var result = context.CadSolicitacoesDesp
                .Where(x => (x.IdUsuarioInclusao == idUsuario || x.IdAprovador == idUsuario) && x.IdSitDesp == 6)
                //&& x.DataInclusao.Date.Year == DateTime.Now.Year && x.DataInclusao.Date.Month == DateTime.Now.Month && x.DataInclusao.Date.Day == DateTime.Now.Day)
                .ToList();

            return result;
        }

        public CadSolDesp Get(int idUsuario)
        {
            var context = new AlvoradaContext();

            var result = context.CadSolicitacoesDesp.Where(x => x.IdUsuarioInclusao == idUsuario).FirstOrDefault();

            return result;
        }

        public HttpResponseMessage Incluir([FromBody] CadSolDesp obj)
        {

            var context = new AlvoradaContext();

            try
            {
                obj.DataInclusao = DateTime.Now;
                context.CadSolicitacoesDesp.Add(obj);
                context.SaveChanges();
            }

            //catch (DbEntityValidationException e)
            //{
            //    foreach (var eve in e.EntityValidationErrors)
            //    {
            //        var erro = eve.Entry.Entity.GetType().Name;
            //        var state = eve.Entry.State;

            //        foreach (var ve in eve.ValidationErrors)
            //        {
            //            var property = ve.PropertyName;
            //            var erroprop = ve.ErrorMessage;
            //        }
            //    }
            //    throw;
            //}

            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new
                {
                    Error = ex.Message
                });
            }

            return Request.CreateResponse(HttpStatusCode.OK);

        }

        public HttpResponseMessage Alterar([FromBody] CadSolDesp obj)
        {

            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new
                {
                    Error = ex.Message
                });
            }

            return Request.CreateResponse(HttpStatusCode.OK);

        }

        public HttpResponseMessage Excluir([FromBody] CadSolDesp obj)
        {

            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Deleted;
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new
                {
                    Error = ex.Message
                });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Cancelar([FromBody] CadSolDesp obj)
        {

            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new
                {
                    Error = ex.Message
                });
            }

            return Request.CreateResponse(HttpStatusCode.OK);

        }

        public HttpResponseMessage AprovarReprovar([FromBody] CadSolDesp obj)
        {

            var context = new AlvoradaContext();
            obj.DataAprovacao = DateTime.Now;

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new
                {
                    Error = ex.Message
                });
            }

            return Request.CreateResponse(HttpStatusCode.OK);

        }

        public HttpResponseMessage Baixar([FromBody] CadSolDesp obj)
        {

            var context = new AlvoradaContext();
            
            try
            {
                var result = context.CadSolicitacoesDesp.Where(x => x.IdCadSolDesp == obj.IdCadSolDesp).FirstOrDefault();
                result.Baixa = true;
                result.DataBaixa = DateTime.Now;
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new
                {
                    Error = ex.Message
                });
            }

            return Request.CreateResponse(HttpStatusCode.OK);

        }

        public decimal GetTotalByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            var result = context.CadSolicitacoesDesp.Where(x => x.DataBaixa != null).ToList();

            var total = result.Where(x => x.IdUsuarioInclusao == idUsuario && x.IdSitDesp == 6 && x.DataBaixa.Value.Date.Year == DateTime.Now.Year && x.DataBaixa.Value.Date.Month == DateTime.Now.Month && x.DataBaixa.Value.Date.Day == DateTime.Now.Day)
                .GroupBy(x => x.IdUsuarioInclusao)
                .Select(y => y.Sum(x => x.VlDespesa)).FirstOrDefault();

            return total;
        }

        public decimal GetTotalByUserAndDate(int idUsuario, DateTime date)
        {
            var context = new AlvoradaContext();

            var result = context.CadSolicitacoesDesp.Where(x => x.DataBaixa != null).ToList();

            var total = result.Where(x => x.IdUsuarioInclusao == idUsuario && x.IdSitDesp == 6 && x.DataBaixa.Value.Date.Year == date.Year && x.DataBaixa.Value.Date.Month == date.Month && x.DataBaixa.Value.Date.Day == date.Day)
                .GroupBy(x => x.IdUsuarioInclusao)
                .Select(y => y.Sum(x => x.VlDespesa)).FirstOrDefault();

            return total;
        }
    }
}
