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
    public class ClassificacaoProdutoApp : AppBase<ClassificacaoProduto>, IClassificacaoProdutoApp
    {
        private readonly IClassificacaoProdutoService _service;

        public ClassificacaoProdutoApp(IClassificacaoProdutoService service)
            : base(service)
        {
            this._service = service;
        }

        public List<ClassificacaoProduto> GetAllVinculado(string nomeClassificacao)
        {
            return _service.GetAllVinculado(nomeClassificacao);
        }

        public void AlterarClassificacaoProduto(ClassificacaoProduto objView)
        {
            _service.AlterarClassificacaoProduto(objView);
        }

    }
}
