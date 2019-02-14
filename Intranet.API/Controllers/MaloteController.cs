using Intranet.Alvorada.Data.Context;
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
    public class MaloteController : ApiController
    {
        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<Malote> GetAllMalotes()
        {
            var context = new AlvoradaContext();

            return context.Malotes;
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<Malote> GetAllMalotesDP()
        {
            var context = new AlvoradaContext();

            return context.Malotes.Where(x => x.MaloteTipo.Setor == "Departamento Pessoal");
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<Malote> GetAllMalotesTesourariaAndCPD()
        {
            var context = new AlvoradaContext();
            return context.Malotes.Where(x => x.MaloteTipo.Setor == "Tesouraria" || x.MaloteTipo.Setor == "CPD");
            //return context.MaloteTipos.Where(x => x.Setor == "Tesouraria" || x.Setor == "CPD");
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<Malote> GetAllMalotesByUsuario(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.Malotes.Where(x => x.IdUsuarioInclusao == idUsuario || x.IdUsuarioEnviado == idUsuario);
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public bool GetAllMalotesByUsuarioDisp(int idUsuario)
        {
            var context = new AlvoradaContext();

            if (context.Malotes.Where(x => (x.IdUsuarioInclusao == idUsuario || x.IdUsuarioEnviado == idUsuario) && x.Status != 2).Count() < 3)
                return true;

            return false;
        }

        public HttpResponseMessage IncluirMalote(Malote obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.DtEnvio = DateTime.Now;
                obj.Status = 1;
                context.Malotes.Add(obj);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage IncluirMaloteDeposito(Malote obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.DtEnvio = DateTime.Now;
                obj.Status = 4;
                context.Malotes.Add(obj);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage AlterarMalote(Malote obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage ExcluirMalote(Malote obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Deleted;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage ConfirmarMalote(Malote obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.DtRecebimento = DateTime.Now;
                context.Entry(obj).State = EntityState.Modified;
                var log = new MaloteLog
                {
                    IdMalote = obj.Id,
                    DataLog = DateTime.Now,
                    IdUsuario = obj.IdUsuarioRecebimento.Value,
                    Status = obj.Status
                };
                context.MalotesLog.Add(log);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage PendurarMalote(Malote obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.DtRecebimento = DateTime.Now;
                context.Entry(obj).State = EntityState.Modified;
                var log = new MaloteLog
                {
                    IdMalote = obj.Id,
                    DataLog = DateTime.Now,
                    IdUsuario = obj.IdUsuarioRecebimento.Value,
                    Status = obj.Status
                };
                context.MalotesLog.Add(log);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<MaloteTipo> GetAllTiposMalote()
        {
            var context = new AlvoradaContext();

            return context.MaloteTipos;
        }

        public HttpResponseMessage IncluirTiposMalote(MaloteTipo obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.MaloteTipos.Add(obj);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage AlterarTiposMalote(MaloteTipo obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<MaloteTipo> GetAllTiposMaloteDP()
        {
            var context = new AlvoradaContext();

            return context.MaloteTipos.Where(x => x.Setor == "Departamento Pessoal");
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<MaloteTipo> GetAllTiposMaloteTesourariaAndCPD()
        {
            var context = new AlvoradaContext();

            return context.MaloteTipos.Where(x => x.Setor == "Tesouraria" || x.Setor == "CPD");
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<MaloteTipo> GetAllTiposMaloteTesouraria()
        {
            var context = new AlvoradaContext();
            return context.MaloteTipos.Where(x => x.Setor == "Tesouraria");
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<MaloteTipo> GetAllTiposMaloteCPD()
        {
            var context = new AlvoradaContext();
            return context.MaloteTipos.Where(x => x.Setor == "CPD");
        }
    }
}
