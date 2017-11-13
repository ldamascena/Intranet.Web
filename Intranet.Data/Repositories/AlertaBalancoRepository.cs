using Intranet.Solidcon.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Repositories
{
    public class AlertaBalancoRepository : RepositoryBase<AlertaBalanco>, IAlertaBalancoRepository
    {
        public AlertaBalancoRepository(CentralContext context)
            : base(context)
        { }

        public List<AlertaBalanco> GetBalancoContainsNomeProduto(string nomeProduto)
        {
            return Db.AlertasBalanco.Where(x => x.NomeProduto.Contains(nomeProduto)).ToList();
        }
        public List<AlertaBalanco> GetBalancoPorProduto(int cdProduto)
        {
            return Db.AlertasBalanco.Where(x => x.CdProduto == cdProduto).ToList();
        }

        public List<AlertaBalanco> GetAll(int? situacao = null, DateTime? dataInclusao = null)
        {
            if (situacao == null && dataInclusao == null)
            {
                return Db.AlertasBalanco.ToList();
            }

            else if (situacao == null && dataInclusao != null)
            {
                return Db.AlertasBalanco.Where(x => x.DtInclusao == dataInclusao).ToList();
            }

            else if (situacao != null && dataInclusao == null)
            {
                return Db.AlertasBalanco.Where(x => x.Status == situacao).ToList();
            }

            else
            {
                return Db.AlertasBalanco.Where(x => x.Status == situacao && x.DtInclusao == dataInclusao).ToList();
            }
        }
    }
}
