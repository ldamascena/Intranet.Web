using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Application
{
    public class EstoqueFisicoApp : AppBase<EstoqueFisico>, IEstoqueFisicoApp
    {
        private readonly IEstoqueFisicoService _service;

        public EstoqueFisicoApp(IEstoqueFisicoService service)
            : base(service)
        {
            this._service = service;
        }

        public List<EstoqueFisico> GetAllTipoProduto()
        {
            return _service.GetAllTipoProduto();
        }

        public List<EstoqueFisico> GetAllTipoProdutoPorProduto(int cdProduto)
        {
            return _service.GetAllTipoProdutoPorProduto(cdProduto);
        }

        public EstoqueFisico GetAllTipoProdutoPorProdutoEmbalagemEQuantidade(int cdProduto, string cdEmbalagem, decimal qtEmbalagem)
        {
            return _service.GetAllTipoProdutoPorProdutoEmbalagemEQuantidade(cdProduto, cdEmbalagem, qtEmbalagem);
        }

        public void AtualizarEstoque(EstoqueFisico[] objs)
        {
            _service.AtualizarEstoque(objs);
        }

        public void AdicionarEstoque(EstoqueFisico obj)
        {
            _service.AdicionarEstoque(obj);
        }
    }
}
