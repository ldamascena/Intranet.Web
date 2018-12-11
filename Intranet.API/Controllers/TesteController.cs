using Intranet.Alvorada.Data.Context;
using Intranet.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Solidcon.Data.Context;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class TesteController : ApiController
    {
        public IEnumerable<decimal> GetAll() {
            List<decimal> dados = new List<decimal>();
            var query = @"SELECT
                          SUM(ROUND(tbCupomItem.vlItem * tbCupomItem.qtItem, 2, 1) - ISNULL(tbCupomItem.vlDesconto, 0)) + SUM((ROUND(tbCupomItem.vlItem * tbCupomItem.qtItem, 2, 1) - ISNULL(tbCupomItem.vlDesconto, 0)) * tbCupom.Acrescimo / tbCupom.vlCupom) - SUM((ROUND(tbCupomItem.vlItem * tbCupomItem.qtItem, 2, 1) - ISNULL(tbCupomItem.vlDesconto, 0)) * tbCupom.Desconto / tbCupom.vlCupom) AS vlCupom 
                        FROM tbSuperProduto
                        INNER JOIN tbProduto
                          ON tbSuperProduto.cdEmpresa = tbProduto.cdEmpresa
                          AND tbSuperProduto.cdFilial = tbProduto.cdFilial
                          AND tbSuperProduto.cdSuperProduto = tbProduto.cdSuperProduto
                        RIGHT OUTER JOIN tbCupom
                        INNER JOIN tbCupomItem
                          ON tbCupom.gdCupom = tbCupomItem.gdCupom
                          ON tbProduto.cdEmpresa = tbCupom.cdEmpresa
                          AND tbProduto.cdFilial = tbCupom.cdFilial
                          AND tbProduto.cdProduto = tbCupomItem.cdProduto
                        WHERE (tbCupom.dtCupom = '2018-12-02')
                        AND (tbCupom.cdEmpresa = 10)
                        AND (tbCupom.vlCupom > 0)";
            foreach (ConnectionStringSettings c in System.Configuration.ConfigurationManager.ConnectionStrings)
            {

                switch (c.Name)
                {
                    case "DorsalTanguaContext":
                        var tanguaContext = new DorsalTanguaContext();
                        tanguaContext.Database.CommandTimeout = 999999999;
                        dados.Add(tanguaContext.Database.SqlQuery<decimal>(query).FirstOrDefault());
                        break;
                    case "DorsalMageContext":
                        var mageContext = new DorsalMageContext();
                        mageContext.Database.CommandTimeout = 999999999;
                        dados.Add(mageContext.Database.SqlQuery<decimal>(query).FirstOrDefault());
                        break;
                    case "DorsalCatarinaContext":
                        var catarinaContext = new DorsalCatarinaContext();
                        catarinaContext.Database.CommandTimeout = 999999999;
                        dados.Add(catarinaContext.Database.SqlQuery<decimal>(query).FirstOrDefault());
                        break;
                }
                //dados.Add(c.ConnectionString);
            }

            return dados;
        }
    }
}
