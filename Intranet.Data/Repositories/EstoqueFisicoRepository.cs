using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Solidcon.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Repositories
{
    public class EstoqueFisicoRepository : RepositoryBase<EstoqueFisico>, IEstoqueFisicoRepository
    {
        public EstoqueFisicoRepository(CentralContext context)
            : base(context)
        {
        }

        public List<EstoqueFisico> GetAllTipoProduto()
        {
            return Db.EstoquesFisico.Where(x => x.CdEstoqueTipo == 1 && x.CdPessoaFilial == 13).ToList();
        }

        public List<EstoqueFisico> GetAllTipoProdutoPorProduto(int cdProduto)
        {
            return Db.EstoquesFisico.Where(x => x.CdEstoqueTipo == 1 && x.CdPessoaFilial == 13 && x.CdProduto == cdProduto).ToList();
        }

        public EstoqueFisico GetAllTipoProdutoPorProdutoEmbalagemEQuantidade(int cdProduto, string cdEmbalagem, decimal qtEmbalagem)
        {
            return Db.EstoquesFisico.Where(x => x.CdEstoqueTipo == 1
            && x.CdPessoaFilial == 13
            && x.CdProduto == cdProduto
            && x.CdEmbalagem == cdEmbalagem
            && x.QtEmbalagem == qtEmbalagem).FirstOrDefault();
        }

        public EstoqueFisico GetByProduto(int cdProduto, int cdPessoaFilial)
        {
            return Db.EstoquesFisico.Where(x => x.CdProduto == cdProduto 
            && x.CdPessoaFilial == cdPessoaFilial 
            && x.CdEstoqueTipo == 1).FirstOrDefault();
        }
    }
}
