using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Domain.Interfaces.Services;
using Intranet.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Service
{
    public class EstoqueFisicoService : ServiceBase<EstoqueFisico>, IEstoqueFisicoService
    {
        private readonly IEstoqueFisicoRepository _repositoryFisico;
        private readonly IEstoqueMovimentoRepository _repositoryMovimento;

        public EstoqueFisicoService(IEstoqueFisicoRepository repositoryFisico,
            IEstoqueMovimentoRepository repositoryMovimento)
            : base(repositoryFisico)
        {
            this._repositoryFisico = repositoryFisico;
            this._repositoryMovimento = repositoryMovimento;
        }

        public List<EstoqueFisico> GetAllTipoProduto()
        {
            return _repositoryFisico.GetAllTipoProduto();
        }

        public List<EstoqueFisico> GetAllTipoProdutoPorProduto(int cdProduto)
        {
            return _repositoryFisico.GetAllTipoProdutoPorProduto(cdProduto);
        }

        public EstoqueFisico GetAllTipoProdutoPorProdutoEmbalagemEQuantidade(int cdProduto, string cdEmbalagem, decimal qtEmbalagem)
        {
            return _repositoryFisico.GetAllTipoProdutoPorProdutoEmbalagemEQuantidade(cdProduto, cdEmbalagem, qtEmbalagem);
        }

        public void AtualizarEstoque(EstoqueFisico[] objs)
        {
            
            if (objs.Length == 4)
            {
                var objToUpdate = _repositoryFisico.GetAllTipoProdutoPorProdutoEmbalagemEQuantidade(objs[0].CdProduto, objs[0].CdEmbalagem, objs[0].QtEmbalagem);

                objToUpdate.CdEmbalagem = objs[1].CdEmbalagem;
                objToUpdate.QtEstoqueFisico = objs[1].QtEstoqueFisico;
                objToUpdate.QtVolumesFisico = objs[1].QtVolumesFisico;

                var objToUpdate2 = _repositoryFisico.GetAllTipoProdutoPorProdutoEmbalagemEQuantidade(objs[2].CdProduto, objs[2].CdEmbalagem, objs[2].QtEmbalagem);

                objToUpdate2.CdEmbalagem = objs[3].CdEmbalagem;
                objToUpdate2.QtEstoqueFisico = objs[3].QtEstoqueFisico;
                objToUpdate2.QtVolumesFisico = objs[3].QtVolumesFisico;

                _repositoryFisico.Update(objToUpdate);
                _repositoryFisico.Update(objToUpdate2);
            }

            else
            {

                var teste = _repositoryMovimento.UltimoValorItem(objs[0].CdProduto, 13, 1);

                var objToUpdate = _repositoryFisico.GetAllTipoProdutoPorProdutoEmbalagemEQuantidade(objs[0].CdProduto, objs[0].CdEmbalagem, objs[0].QtEmbalagem);

                objToUpdate.CdEmbalagem = objs[1].CdEmbalagem;
                objToUpdate.QtEstoqueFisico = objs[1].QtEstoqueFisico;
                objToUpdate.QtVolumesFisico = objs[1].QtVolumesFisico;

                _repositoryFisico.Update(objToUpdate);
            }
        }

        public void AdicionarEstoque(EstoqueFisico obj)
        {
            obj.CdEmpresaProduto = 10;
            obj.CdEstoqueTipo = 1;
            obj.CdPessoaFilial = 13;

            _repositoryFisico.Add(obj);
        }

        public void IncluirLog(int? cdProduto, string cdEmbalagem, int? qtVolumes, decimal? vlItem, bool inEntrada, decimal? qtItem, string descricao, decimal? qtEstoqueFisico, decimal? qtEstoqueFinal, int? qtVolumeFinal, decimal? qtEmbalagem, byte? cdMovimentoTipo)
        {
            _repositoryMovimento.Add(new EstoqueMovimento
            {
                CdPessoaFilial = 13,
                CdPessoaObra = 0,
                CdProduto = cdProduto,
                CdEmpresaProduto = 10,
                CdEmbalagem = cdEmbalagem,
                CdEstoqueTipo = 1,
                DtMovimento = DateTime.Now,
                QtVolumes = qtVolumes,
                VlItem = vlItem,
                QtItem = qtItem,
                InEntrada = inEntrada,
                Historico = descricao,
                QtEstoqueFinal = qtEstoqueFinal,
                QtVolumeFinal = qtVolumeFinal,
                QtEmbalagem = qtEmbalagem,
                CdMovimentoTipo = cdMovimentoTipo
            });
        }
    }
}
