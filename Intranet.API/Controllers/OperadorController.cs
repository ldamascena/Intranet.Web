using Intranet.Alvorada.Data.Context;
using Intranet.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Domain.Entities.DTOS;
using Intranet.Solidcon.Data.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class OperadorController : ApiController
    {
        public IEnumerable<Operador> GetAll()
        {
            var context = new AlvoradaContext();

            return context.Operadores;
        }

        public IEnumerable<Operador> GetAllByOperador(string nomeOperador)
        {
            var context = new AlvoradaContext();

            return context.Operadores.Where(x => x.NmOperador == nomeOperador);
        }

        public int GetLastIdOperador()
        {
            var context = new AlvoradaContext();
            
            return context.Operadores.ToList().LastOrDefault().CdOperador + 1;
        }

        public HttpResponseMessage IncluirIntranet(Operador obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Operadores.Add(obj);
                context.SaveChanges();
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage IncluirDorsais(Operador obj)
        {
            var alvoradaContext = new AlvoradaContext();

            switch (obj.CdFilial)
            {
                case 1:
                    var tanguaContext = new DorsalTanguaContext();
                    if (tanguaContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        tanguaContext.Operadores.Add(obj);
                        tanguaContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;
                case 3:
                    var mageContext = new DorsalMageContext();
                    if (mageContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        mageContext.Operadores.Add(obj);
                        mageContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;
                case 5:
                    var catarinaContext = new DorsalCatarinaContext();
                    if (catarinaContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        catarinaContext.Operadores.Add(obj);
                        catarinaContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;

                case 6:
                    var maricaContext = new DorsalMaricaContext();
                    if (maricaContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        maricaContext.Operadores.Add(obj);
                        maricaContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;

                case 9:
                    var arsenalContext = new DorsalArsenalContext();
                    if (arsenalContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        arsenalContext.Operadores.Add(obj);
                        arsenalContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;

                case 10:
                    var aguamineralContext = new DorsalAguaMineralContext();
                    if (aguamineralContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        aguamineralContext.Operadores.Add(obj);
                        aguamineralContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;

                case 11:
                    var riobonitoContext = new DorsalRioBonitoContext();
                    if (riobonitoContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        riobonitoContext.Operadores.Add(obj);
                        riobonitoContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;
                case 12:
                    var itaboraiContext = new DorsalItaboraiContext();
                    if (itaboraiContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        itaboraiContext.Operadores.Add(obj);
                        itaboraiContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;
                case 14:
                    var mage2Context = new DorsalMage2Context();
                    if (mage2Context.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        mage2Context.Operadores.Add(obj);
                        mage2Context.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;
                case 15:
                    var bacaxaContext = new DorsalBacaxaContext();
                    if (bacaxaContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        bacaxaContext.Operadores.Add(obj);
                        bacaxaContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;
                case 17:
                    var araruamaContext = new DorsalAraruamaContext();
                    if (araruamaContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        araruamaContext.Operadores.Add(obj);
                        araruamaContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;
                case 18:
                    var cabofrioContext = new DorsalCaboFrioContext();
                    if (cabofrioContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        cabofrioContext.Operadores.Add(obj);
                        cabofrioContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;

                case 20:
                    var esperancaContext = new DorsalEsperancaContext();
                    if (esperancaContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        esperancaContext.Operadores.Add(obj);
                        esperancaContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;

                case 21:
                    var macaeContext = new DorsalMacaeContext();
                    if (macaeContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        macaeContext.Operadores.Add(obj);
                        macaeContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;

                case 22:
                    var rioDoOuroContext = new DorsalRioDoOuroContext();
                    if (rioDoOuroContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        rioDoOuroContext.Operadores.Add(obj);
                        rioDoOuroContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;

                case 23:
                    var inoaContext = new DorsalInoaContext();
                    if (inoaContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        inoaContext.Operadores.Add(obj);
                        inoaContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;

                    

                case 24:
                    var rioBonito2Context = new DorsalRioBonito2Context();
                    if (rioBonito2Context.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        rioBonito2Context.Operadores.Add(obj);
                        rioBonito2Context.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;

                case 25:
                    var itaborai2Context = new DorsalItaborai2Context();
                    if (itaborai2Context.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        itaborai2Context.Operadores.Add(obj);
                        itaborai2Context.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;
                case 26:
                    var trindadeContext = new DorsalTrindadeContext();
                    if (trindadeContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        trindadeContext.Operadores.Add(obj);
                        trindadeContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;

                case 27:
                    var novaCidadeContext = new DorsalNovaCidadeContext();
                    if (novaCidadeContext.Operadores.Where(x => x.NmOperador == obj.NmOperador).Count() == 0)
                    {
                        novaCidadeContext.Operadores.Add(obj);
                        novaCidadeContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inclusão"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;

            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage InativarDorsais(Operador obj)
        {
            var alvoradaContext = new AlvoradaContext();

            switch (obj.CdFilial)
            {
                case 1:
                    var tanguaContext = new DorsalTanguaContext();
                    if (tanguaContext.Operadores.Where(x => x.NmOperador == obj.NmOperador && x.InInativo == false).Count() > 0)
                    {
                        tanguaContext.Entry(obj).State = EntityState.Modified;
                        obj.InInativo = true;
                        tanguaContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inativação"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;
                case 3:
                    var mageContext = new DorsalMageContext();
                    if (mageContext.Operadores.Where(x => x.NmOperador == obj.NmOperador && x.InInativo == false).Count() > 0)
                    {
                        mageContext.Entry(obj).State = EntityState.Modified;
                        obj.InInativo = true;
                        mageContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inativação"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;
                case 5:
                    var catarinaContext = new DorsalCatarinaContext();
                    if (catarinaContext.Operadores.Where(x => x.NmOperador == obj.NmOperador && x.InInativo == false).Count() > 0)
                    {
                        catarinaContext.Entry(obj).State = EntityState.Modified;
                        obj.InInativo = true;
                        catarinaContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inativação"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;

                case 6:
                    var maricaContext = new DorsalMaricaContext();
                    if (maricaContext.Operadores.Where(x => x.NmOperador == obj.NmOperador && x.InInativo == false).Count() > 0)
                    {
                        maricaContext.Entry(obj).State = EntityState.Modified;
                        obj.InInativo = true;
                        maricaContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inativação"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;

                case 9:
                    var arsenalContext = new DorsalArsenalContext();
                    if (arsenalContext.Operadores.Where(x => x.NmOperador == obj.NmOperador && x.InInativo == false).Count() > 0)
                    {
                        arsenalContext.Entry(obj).State = EntityState.Modified;
                        obj.InInativo = true;
                        arsenalContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inativação"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;

                case 10:
                    var aguamineralContext = new DorsalAguaMineralContext();
                    if (aguamineralContext.Operadores.Where(x => x.NmOperador == obj.NmOperador && x.InInativo == false).Count() > 0)
                    {
                        aguamineralContext.Entry(obj).State = EntityState.Modified;
                        obj.InInativo = true;
                        aguamineralContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inativação"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;

                case 11:
                    var riobonitoContext = new DorsalRioBonitoContext();
                    if (riobonitoContext.Operadores.Where(x => x.NmOperador == obj.NmOperador && x.InInativo == false).Count() > 0)
                    {
                        riobonitoContext.Entry(obj).State = EntityState.Modified;
                        obj.InInativo = true;
                        riobonitoContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inativação"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;
                case 12:
                    var itaboraiContext = new DorsalItaboraiContext();
                    if (itaboraiContext.Operadores.Where(x => x.NmOperador == obj.NmOperador && x.InInativo == false).Count() > 0)
                    {
                        itaboraiContext.Entry(obj).State = EntityState.Modified;
                        obj.InInativo = true;
                        itaboraiContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inativação"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;
                case 14:
                    var mage2Context = new DorsalMage2Context();
                    if (mage2Context.Operadores.Where(x => x.NmOperador == obj.NmOperador && x.InInativo == false).Count() > 0)
                    {
                        mage2Context.Entry(obj).State = EntityState.Modified;
                        obj.InInativo = true;
                        mage2Context.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inativação"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }
                    break;
                case 15:
                    var bacaxaContext = new DorsalBacaxaContext();
                    if (bacaxaContext.Operadores.Where(x => x.NmOperador == obj.NmOperador && x.InInativo == false).Count() > 0)
                    {
                        bacaxaContext.Entry(obj).State = EntityState.Modified;
                        obj.InInativo = true;
                        bacaxaContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inativação"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;
                case 17:
                    var araruamaContext = new DorsalAraruamaContext();
                    if (araruamaContext.Operadores.Where(x => x.NmOperador == obj.NmOperador && x.InInativo == false).Count() > 0)
                    {
                        araruamaContext.Entry(obj).State = EntityState.Modified;
                        obj.InInativo = true;
                        araruamaContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inativação"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;
                case 18:
                    var cabofrioContext = new DorsalCaboFrioContext();
                    if (cabofrioContext.Operadores.Where(x => x.NmOperador == obj.NmOperador && x.InInativo == false).Count() > 0)
                    {
                        cabofrioContext.Entry(obj).State = EntityState.Modified;
                        obj.InInativo = true;
                        cabofrioContext.SaveChanges();
                        var log = new OperadorLog
                        {
                            CdFilial = obj.CdFilial,
                            CdOperador = obj.CdOperador,
                            Data = DateTime.Now,
                            Tipo = "Inativação"
                        };
                        alvoradaContext.OperadoresLogs.Add(log);
                        alvoradaContext.SaveChanges();
                    }

                    break;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public IEnumerable<VwOperadorLog> GetLogByCodigo(int codigo)
        {
            var context = new AlvoradaContext();

            return context.VwOperadoresLogs.Where(x => x.CdOperador == codigo);
        }
    }
}
