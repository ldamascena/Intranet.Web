using Intranet.Solidcon.Data.Context;
using Intranet.Data.Repositories;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Domain.Interfaces.Services;
using Intranet.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using Intranet.Data.Context;
using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities.Views;

namespace Intranet.API.Controllers
{
    public class TesteController : ApiController
    {
        public string GetPostCST000()
        {
            List<int> cdFiliais = new List<int> { 1, 3, 5, 6, 9, 10, 11, 12, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27 };
            List<string> retorno = new List<string>();
            var query = "Update dbo.tbTributacao set TributacaoPDV = '7', prTributacao =  7.00, inISS = 0, CST = '000' where cdTributacao =  10 and cdEmpresa =  10 ";
            try
            {
                var context = new DorsalHomologacaoContext();

                //context.Database.ExecuteSqlCommand("Update dbo.tbTributacao set TributacaoPDV = '7', prTributacao =  7.00, inISS = 0, CST = '000' where cdTributacao =  10 and cdEmpresa =  10 ");

                foreach (var item in cdFiliais)
                {
                    switch (item)
                    {
                        case 1:
                            var tanguaContext = new DorsalTanguaContext();
                            tanguaContext.Database.ExecuteSqlCommand(query);

                            break;
                        case 3:
                            var mageContext = new DorsalMageContext();
                            mageContext.Database.ExecuteSqlCommand(query);

                            break;
                        case 5:
                            var catarinaContext = new DorsalCatarinaContext();
                            catarinaContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 6:
                            var maricaContext = new DorsalMaricaContext();
                            maricaContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 9:
                            var arsenalContext = new DorsalArsenalContext();
                            arsenalContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 10:
                            var aguamineralContext = new DorsalAguaMineralContext();
                            aguamineralContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 11:
                            var riobonitoContext = new DorsalRioBonitoContext();
                            riobonitoContext.Database.ExecuteSqlCommand(query);

                            break;
                        case 12:
                            var itaboraiContext = new DorsalItaboraiContext();
                            itaboraiContext.Database.ExecuteSqlCommand(query);

                            break;
                        case 14:
                            var mage2Context = new DorsalMage2Context();
                            mage2Context.Database.ExecuteSqlCommand(query);

                            break;
                        case 15:
                            var bacaxaContext = new DorsalBacaxaContext();
                            bacaxaContext.Database.ExecuteSqlCommand(query);

                            break;
                        case 17:
                            var araruamaContext = new DorsalAraruamaContext();
                            araruamaContext.Database.ExecuteSqlCommand(query);

                            break;
                        case 18:
                            var cabofrioContext = new DorsalCaboFrioContext();
                            cabofrioContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 20:
                            var esperancaContext = new DorsalEsperancaContext();
                            esperancaContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 21:
                            var macaeContext = new DorsalMacaeContext();
                            macaeContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 22:
                            var rioDoOuroContext = new DorsalRioDoOuroContext();
                            rioDoOuroContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 23:
                            var inoaContext = new DorsalInoaContext();
                            inoaContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 24:
                            var rioBonito2Context = new DorsalRioBonito2Context();
                            rioBonito2Context.Database.ExecuteSqlCommand(query);

                            break;

                        case 25:
                            var itaborai2Context = new DorsalItaborai2Context();
                            itaborai2Context.Database.ExecuteSqlCommand(query);

                            break;
                        case 26:
                            var trindadeContext = new DorsalTrindadeContext();
                            trindadeContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 27:
                            var novaCidadeContext = new DorsalNovaCidadeContext();
                            novaCidadeContext.Database.ExecuteSqlCommand(query);

                            break;

                    }
                }

                //retorno.Add('Tangua - Feito');


            }
            catch (Exception ex)
            {
                throw ex;
            }


            return "Executado com sucesso!";
        }

        public string GetPostCST040()
        {
            List<int> cdFiliais = new List<int> { 1, 3, 5, 6, 9, 10, 11, 12, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27 };
            var query = @"Update tbTributacao set
                        TributacaoPDV = 'I',
                        prTributacao = 0.00,
                        inISS = 0, CST = '040'
                        where cdTributacao = 10
                        and cdEmpresa = 10";
            try
            {
                var context = new DorsalHomologacaoContext();

                //context.Database.ExecuteSqlCommand("Update dbo.tbTributacao set TributacaoPDV = '7', prTributacao =  7.00, inISS = 0, CST = '000' where cdTributacao =  10 and cdEmpresa =  10 ");

                foreach (var item in cdFiliais)
                {
                    switch (item)
                    {
                        case 1:
                            var tanguaContext = new DorsalTanguaContext();
                            tanguaContext.Database.ExecuteSqlCommand(query);

                            break;
                        case 3:
                            var mageContext = new DorsalMageContext();
                            mageContext.Database.ExecuteSqlCommand(query);

                            break;
                        case 5:
                            var catarinaContext = new DorsalCatarinaContext();
                            catarinaContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 6:
                            var maricaContext = new DorsalMaricaContext();
                            maricaContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 9:
                            var arsenalContext = new DorsalArsenalContext();
                            arsenalContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 10:
                            var aguamineralContext = new DorsalAguaMineralContext();
                            aguamineralContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 11:
                            var riobonitoContext = new DorsalRioBonitoContext();
                            riobonitoContext.Database.ExecuteSqlCommand(query);

                            break;
                        case 12:
                            var itaboraiContext = new DorsalItaboraiContext();
                            itaboraiContext.Database.ExecuteSqlCommand(query);

                            break;
                        case 14:
                            var mage2Context = new DorsalMage2Context();
                            mage2Context.Database.ExecuteSqlCommand(query);

                            break;
                        case 15:
                            var bacaxaContext = new DorsalBacaxaContext();
                            bacaxaContext.Database.ExecuteSqlCommand(query);

                            break;
                        case 17:
                            var araruamaContext = new DorsalAraruamaContext();
                            araruamaContext.Database.ExecuteSqlCommand(query);

                            break;
                        case 18:
                            var cabofrioContext = new DorsalCaboFrioContext();
                            cabofrioContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 20:
                            var esperancaContext = new DorsalEsperancaContext();
                            esperancaContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 21:
                            var macaeContext = new DorsalMacaeContext();
                            macaeContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 22:
                            var rioDoOuroContext = new DorsalRioDoOuroContext();
                            rioDoOuroContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 23:
                            var inoaContext = new DorsalInoaContext();
                            inoaContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 24:
                            var rioBonito2Context = new DorsalRioBonito2Context();
                            rioBonito2Context.Database.ExecuteSqlCommand(query);

                            break;

                        case 25:
                            var itaborai2Context = new DorsalItaborai2Context();
                            itaborai2Context.Database.ExecuteSqlCommand(query);

                            break;
                        case 26:
                            var trindadeContext = new DorsalTrindadeContext();
                            trindadeContext.Database.ExecuteSqlCommand(query);

                            break;

                        case 27:
                            var novaCidadeContext = new DorsalNovaCidadeContext();
                            novaCidadeContext.Database.ExecuteSqlCommand(query);

                            break;

                    }
                }

                //retorno.Add('Tangua - Feito');


            }
            catch (Exception ex)
            {
                throw ex;
            }

            return "Executado com sucesso!";
        }


        public string GetTesteEmail() {

            var emailService = new EmailService();

            emailService.SendEmail("leonardo.damascena@smalvorada.com", "teste", "teste");

            return "a";
        }

        public IEnumerable<VWEstoqueClassificacao> GetTotalLoja() {
            var centralContext = new CentralContext();

            return centralContext.VWEstoqueClassificacao.OrderBy(x => x.Filial);
        }

        public decimal GetTotalCDME()
        {
            var centralContext = new CentralContext();

            return centralContext.VWEstoqueClassificacao.Sum(x => x.CMV);
        }

        public IEnumerable<vwDadosConsolidado> Get()
        {
            var context = new CentralContext();

            return context.vwDadosConsolidado;
        }

        public IEnumerable<vwDadosLoja> GetLojas()
        {
            var context = new CentralContext();

            return context.vwDadosLoja.OrderBy(x => x.Filial);
        }

        public IEnumerable<vwDadosCompradores> GetCompradores()
        {
            var context = new CentralContext();
            context.Database.CommandTimeout = 180;

            return context.vwDadosCompradores;
        }
    }
}
