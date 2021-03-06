﻿using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.OutputCache.V2;

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
                context.CadSaldosControle.Add(model);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        
        public CadSaldoControle GetSaldoByUserAndDate(int idUsuario, DateTime date)
        {
            var context = new AlvoradaContext();

            var dataOntem = date.AddDays(-1);
            var dataAnteOntem = date.AddDays(-2);
            var dataTresontonte = date.AddDays(-3);
            var dataQuatroontonte = date.AddDays(-4);
            var dataCincoontonte = date.AddDays(-5);

            var result = context.CadSaldosControle.Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao == dataOntem).FirstOrDefault();

            if (result == null)
            { 
                result = context.CadSaldosControle.Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao == dataAnteOntem).FirstOrDefault();

            }
            if (result == null)
            {
                result = context.CadSaldosControle.Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao == dataTresontonte).FirstOrDefault();
            }
            if (result == null)
            {
                result = context.CadSaldosControle.Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao == dataQuatroontonte).FirstOrDefault();
            }
            if (result == null)
            {
                result = context.CadSaldosControle.Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao == dataCincoontonte).FirstOrDefault();
            }

            return result;
        }

        public HttpResponseMessage Excluir(CadSaldoControle model)
        {
            var context = new AlvoradaContext();
            var result = context.CadSaldosControle.ToList().Where(x => x.DataInclusao.Date == model.DataInclusao.Date && x.IdUsuario == model.IdUsuario).FirstOrDefault();
            var saldosPosteriores = context.CadSaldosControle.ToList().Where(x => x.DataInclusao.Date > model.DataInclusao.Date && x.IdUsuario == model.IdUsuario).ToList();

            try
            {
                context.CadSaldosControle.Remove(result);
                context.CadSaldosControle.RemoveRange(saldosPosteriores);
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

        public bool GetFechado(int idUsuario, DateTime date)
        {

            var context = new AlvoradaContext();

            var result = context.CadSaldosControle.ToList().Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao.Date == date.Date).FirstOrDefault();

            if (result != null)
                return true;

            return false;
        }

        public HttpResponseMessage IncluirLog(CadSaldoControleLog model)
        {
            var context = new AlvoradaContext();

            try
            {
                model.DataLog = DateTime.Now;
                context.CadSaldosControleLogs.Add(model);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        
        public IEnumerable<CadSaldoControleLog> GetAllLogs()
        {
            var context = new AlvoradaContext();

            return context.CadSaldosControleLogs;
        }

        
        public IEnumerable<CadSaldoControleLog> GetAllLogsByUser(int IdUsuario, DateTime dataInicial, DateTime dataFinal)
        {
            var context = new AlvoradaContext();

            return context.CadSaldosControleLogs.Where(x => x.IdUsuario == IdUsuario && x.DataLog >= dataInicial && x.DataLog <= dataFinal).OrderByDescending(x => x.DataLog);
        }
    }
}
