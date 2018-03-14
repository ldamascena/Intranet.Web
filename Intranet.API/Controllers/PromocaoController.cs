using Intranet.Domain.Entities;
using Intranet.Solidcon.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class PromocaoController : ApiController
    {
        public IEnumerable<VwPromocao> GetAllPromocoes()
        {
            var context = new CentralContext();

            return context.vwPromocao;
        }

        public IEnumerable<VwPromocao> GetPromocaoByTipoStatusData(string tipoPromocao, DateTime? dataInicio, DateTime? dataFim)
        {
            var context = new CentralContext();

            if (dataFim != null && dataInicio != null)
                return context.vwPromocao.Where(x => x.nmTipoPromocao == tipoPromocao && x.dtInicio >= dataInicio && x.dtFim <= dataFim);
            else if (dataFim != null)
                return context.vwPromocao.Where(x => x.nmTipoPromocao == tipoPromocao && x.dtFim <= dataFim);
            else if (dataInicio != null)
                return context.vwPromocao.Where(x => x.nmTipoPromocao == tipoPromocao && x.dtInicio >= dataInicio);
            else
                return context.vwPromocao.Where(x => x.nmTipoPromocao == tipoPromocao);
        }

        public IEnumerable<VwPromocaoItem> GetAllPromocoesItem()
        {
            var context = new CentralContext();

            return context.vwPromocaoItem;
        }

        public IEnumerable<VwPromocaoItem> GetAllPromocoesItemByCodigo(int codigo)
        {
            var context = new CentralContext();

            return context.vwPromocaoItem.Where(x => x.cdPromocao == codigo);
        }

        public HttpResponseMessage Incluir([FromBody] AjustePrecoVenda obj)
        {

            var context = new CentralContext();

            obj.DataInclusao = DateTime.Now;

            try
            {
                context.AjustePrecosVenda.Add(obj);
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
    }
}
