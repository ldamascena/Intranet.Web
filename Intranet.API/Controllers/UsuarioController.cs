using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Intranet.Domain.Entities;
using Intranet.Alvorada.Data.Context;
using System.Web.Helpers;
using System.Data.Entity;

namespace Intranet.API.Controllers
{

    public class UsuarioController : ApiController
    {

        public IEnumerable<Usuario> GetAll()
        {
            var context = new AlvoradaContext();

            return context.Usuarios.ToList();
        }

        public Usuario GetUser(string username)
        {
            var context = new AlvoradaContext();

            return context.Usuarios.Where(x => x.Username == username).FirstOrDefault();
        }

        public IEnumerable<Usuario> GetAllTesoureirasAndDepositos()
        {
            var context = new AlvoradaContext();

            return context.Usuarios.Where(x => x.Nome == "Tesouraria" || x.Nome == "Deposito").ToList();
        }

        public int Autenticate(Usuario model)
        {
            var context = new AlvoradaContext();

            var result = context.Usuarios.Where(x => x.Username == model.Username).FirstOrDefault();

            if (result != null)
            {
                if (result.Bloqueado)
                {
                    return 2;
                }
                else
                {
                    if (Crypto.VerifyHashedPassword(result.PasswordHash, model.PasswordHash))
                    {
                        return 1;
                    }
                    else
                    {
                        return 4;
                    }
                }
            }
            return 4;
        }

        public int Autenticate2(Usuario model)
        {
            var context = new AlvoradaContext();

            var result = context.Usuarios.Where(x => x.Username == model.Username).FirstOrDefault();

            if (result != null)
            {
                return 1;
            }
            return 4;
        }

        public HttpResponseMessage Register(Usuario model)
        {
            var context = new AlvoradaContext();

            try
            {
                model.PasswordHash = Crypto.HashPassword(model.PasswordHash);
                model.DataInclusao = DateTime.Now;
                context.Usuarios.Add(model);
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

        public HttpResponseMessage ChangePassword(Usuario model)
        {
            var context = new AlvoradaContext();

            try
            {
                model.PasswordHash = Crypto.HashPassword(model.PasswordHash);
                context.Entry(model).State = EntityState.Modified;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Bloquear(Usuario model)
        {
            var context = new AlvoradaContext();

            try
            {
                model.DataBloqueio = DateTime.Now;
                model.DataAlteracao = DateTime.Now;
                model.Bloqueado = true;
                context.Entry(model).State = EntityState.Modified;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Desbloquear(Usuario model)
        {
            var context = new AlvoradaContext();

            try
            {
                model.DataAlteracao = DateTime.Now;
                model.Bloqueado = false;
                context.Entry(model).State = EntityState.Modified;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Editar(Usuario model)
        {
            var context = new AlvoradaContext();

            try
            {
                model.DataAlteracao = DateTime.Now;
                context.Entry(model).State = EntityState.Modified;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

    }
}
