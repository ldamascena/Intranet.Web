using Intranet.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Repositories
{
    public class EstoqueContabilRepository : RepositoryBase<EstoqueContabil>, IEstoqueContabilRepository
    {
        public EstoqueContabilRepository(CentralContext context)
            : base(context)
        {

        }

        public EstoqueContabil GetByIdSuperProduto(int cdSuperProduto, int cdPessoaFilial)
        {
            return Db.EstoquesContabil.Where(x => x.CdSuperProduto == cdSuperProduto 
            && x.CdPessoaFilial == cdPessoaFilial 
            && x.CdEstoqueTipo == 1
            && x.SuperProduto.Produto.Any(e => e.NomeProduto == null)).FirstOrDefault();
        }

        public EstoqueContabil GetByNomeSuperProduto(string nomeProduto, int cdPessoaFilial)
        {
            return Db.EstoquesContabil.Where(x => x.SuperProduto.NmProdutoPai == nomeProduto
            && x.CdPessoaFilial == cdPessoaFilial
            && x.CdEstoqueTipo == 1
            && x.SuperProduto.Produto.Any(e => e.NomeProduto == null)).FirstOrDefault();
        }
    }
}
