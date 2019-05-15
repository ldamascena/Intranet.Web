using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Domain.Entities.DTOS;
using Intranet.Service;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class ConfAntecipadaController : ApiController
    {
        public IQueryable<ConfAntecipada> GetAntecipadas()
        {
            var context = new AlvoradaContext();

            return context.ConfAntecipada;
        }

        public IQueryable<ConfAntecipada> GetAntecipadasByUser(int idUsuario)
        {
            var context = new AlvoradaContext();
            var date = DateTime.Now;
            var dateWithoutHour = date.Date;

            return context.ConfAntecipada.Where(x => x.IdUsuarioComprador == idUsuario && x.Data == dateWithoutHour);
        }

        public IQueryable<ConfAntecipada> GetAntecipadasByUserDateErro(int idUsuario, DateTime dtInicio, DateTime dtFim, string tipoErro)
        {
            var context = new AlvoradaContext();

            if (tipoErro != null && tipoErro != "undefined")
            {
                return context.ConfAntecipada.Where(x => x.IdUsuarioComprador == idUsuario && x.Data >= dtInicio && x.Data <= dtFim && x.Erro == tipoErro);
            }
            else
            {
                return context.ConfAntecipada.Where(x => x.IdUsuarioComprador == idUsuario && x.Data >= dtInicio && x.Data <= dtFim);
            }
        }

        public IQueryable<ConfAntecipada> GetAntecipadasByIndicador(string indicador)
        {
            var context = new AlvoradaContext();
            var date = DateTime.Now;
            var dateWithoutHour = date.Date;

            return context.ConfAntecipada.Where(x => x.Indicador == indicador && x.Data == dateWithoutHour);
        }

        public IQueryable<ConfAntecipada> GetAntecipadasByIndicadorDateErro(string indicador, DateTime dtInicio, DateTime dtFim, string tipoErro)
        {
            var context = new AlvoradaContext();

            if (tipoErro != null && tipoErro != "undefined")
            {
                return context.ConfAntecipada.Where(x => x.Indicador == indicador && x.Data >= dtInicio && x.Data <= dtFim && x.Erro == tipoErro);
            }
            else
            {
                return context.ConfAntecipada.Where(x => x.Indicador == indicador && x.Data >= dtInicio && x.Data <= dtFim);
            }
        }

        public HttpResponseMessage ImportarCristiane()
        {
            var contextAlvorada = new AlvoradaContext();
            var emailService = new EmailService();
            try
            {
                contextAlvorada.Database.ExecuteSqlCommand("spInsertAntecipadaCristiane");
                var query = contextAlvorada.Database.SqlQuery<ConfEmailDTO>(@"Select count(IdUsuarioComprador) as Qtd, Usuario.Email
                                                    from ConfAntecipada
                                                    INNER JOIN Usuario

                                                        on Usuario.Id = ConfAntecipada.IdUsuarioComprador
                                                    where Data = CONVERT(date, getdate())
                                                    and(Feito != 1 or Feito is null)
                                                    group by Usuario.Email");

                foreach (var item in query.ToList())
                {
                    emailService.SendEmail(item.Email, "Conferência Antecipada - Pendente", emailService.BodyConfAntecipada(item.Qtd));
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage ImportarBruno()
        {
            var contextAlvorada = new AlvoradaContext();
            var emailService = new EmailService();
            try
            {
                contextAlvorada.Database.ExecuteSqlCommand("spInsertAntecipadaBruno");
                var query = contextAlvorada.Database.SqlQuery<ConfEmailDTO>(@"Select count(IdUsuarioComprador) as Qtd, Usuario.Email
                                                    from ConfAntecipada
                                                    INNER JOIN Usuario

                                                        on Usuario.Id = ConfAntecipada.IdUsuarioComprador
                                                    where Data = CONVERT(date, getdate())
                                                    and(Feito != 1 or Feito is null)
                                                    group by Usuario.Email");

                foreach (var item in query.ToList())
                {
                    emailService.SendEmail(item.Email, "Conferência Antecipada - Pendente", emailService.BodyConfAntecipada(item.Qtd));
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage ImportarMarcelo()
        {
            var contextAlvorada = new AlvoradaContext();
            var emailService = new EmailService();
            try
            {
                contextAlvorada.Database.ExecuteSqlCommand("spInsertAntecipadaMarcelo");
                var query = contextAlvorada.Database.SqlQuery<ConfEmailDTO>(@"Select count(IdUsuarioComprador) as Qtd, Usuario.Email
                                                    from ConfAntecipada
                                                    INNER JOIN Usuario
                                                        on Usuario.Id = ConfAntecipada.IdUsuarioComprador
                                                    where Data = CONVERT(date, getdate())
                                                    and(Feito != 1 or Feito is null)
                                                    group by Usuario.Email");

                foreach (var item in query.ToList())
                {
                    emailService.SendEmail(item.Email, "Conferência Antecipada - Pendente", emailService.BodyConfAntecipada(item.Qtd));
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage MarcarVisualizado(ConfAntecipada obj)
        {
            var alvoradaContext = new AlvoradaContext();

            try
            {
                obj.Visualizado = true;
                alvoradaContext.Entry(obj).State = EntityState.Modified;
                alvoradaContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage FinalizarNota(ConfAntecipada obj)
        {
            var alvoradaContext = new AlvoradaContext();

            try
            {
                obj.Visualizado = true;
                obj.DataConclusao = DateTime.Now;
                obj.Feito = true;
                alvoradaContext.Entry(obj).State = EntityState.Modified;
                alvoradaContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public int GetQtdPendente(int idUsuario)
        {
            var context = new AlvoradaContext();
            var date = DateTime.Now;
            var dateWithoutHour = date.Date;

            return context.ConfAntecipada.Where(x => x.IdUsuarioComprador == idUsuario && x.Data == dateWithoutHour)
                .GroupBy(x => x.IdUsuarioComprador)
                .Count();
        }
    }
}
