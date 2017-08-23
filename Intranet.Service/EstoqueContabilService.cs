using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Service
{
    public class EstoqueContabilService : ServiceBase<EstoqueContabil>, IEstoqueContabilService
    {
        private readonly IEstoqueContabilRepository _repository;
        private readonly ILogAlteracaoCustoRepository _repositoryLog;

        public EstoqueContabilService(IEstoqueContabilRepository repository, ILogAlteracaoCustoRepository repositoryLog)
            : base(repository)
        {
            this._repository = repository;
            this._repositoryLog = repositoryLog;
        }

        public EstoqueContabil GetByIdSuperProduto(int cdSuperProduto, int cdPessoaFilial)
        {
            return _repository.GetByIdSuperProduto(cdSuperProduto, cdPessoaFilial);
        }

        public EstoqueContabil GetByNomeSuperProduto(string nomeProduto, int cdPessoaFilial)
        {
            return _repository.GetByNomeSuperProduto(nomeProduto, cdPessoaFilial);
        }

        public void AlterarValorDeCusto(EstoqueContabil obj)
        {
            var GetSuperProdutoContabil = _repository.GetByIdSuperProduto(obj.CdSuperProduto, obj.CdPessoaFilial);

            // Log
            this.GerarLogAlteracao(obj.CdSuperProduto, GetSuperProdutoContabil.SuperProduto.NmProdutoPai, obj.CdPessoaFilial, GetSuperProdutoContabil.VlUltimaCompra, obj.VlUltimaCompra);

            // Update 
            GetSuperProdutoContabil.VlUltimaCompra = obj.VlUltimaCompra;
            _repository.Update(GetSuperProdutoContabil);
        }

        public void GerarLogAlteracao(int cdSuperProduto, string nomeProduto, int cdPessoaFilial, decimal? custoAnterior, decimal? custoAtual)
        {
            _repositoryLog.Add(new LogAlteracaoCusto {
                CdSuperProduto = cdSuperProduto,
                NomeProduto = nomeProduto,
                CdPessoaFilial = cdPessoaFilial,
                VlCustoAnterior = custoAnterior,
                VlCustoAtual = custoAtual,
                DtAlteracao = DateTime.Now
            });
        }
    }
}
