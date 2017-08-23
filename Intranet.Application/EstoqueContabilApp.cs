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
    public class EstoqueContabilApp : AppBase<EstoqueContabil>, IEstoqueContabilApp
    {
        public IEstoqueContabilService _service;

        public EstoqueContabilApp(IEstoqueContabilService service)
            : base(service)
        {
            this._service = service;
        }

        public EstoqueContabil GetByIdSuperProduto(int cdSuperProduto, int cdPessoaFilial)
        {
            return _service.GetByIdSuperProduto(cdSuperProduto, cdPessoaFilial);
        }

        public EstoqueContabil GetByNomeSuperProduto(string nomeProduto, int cdPessoaFilial)
        {
            return _service.GetByNomeSuperProduto(nomeProduto, cdPessoaFilial);
        }

        public void AlterarValorDeCusto(EstoqueContabil obj)
        {
            _service.AlterarValorDeCusto(obj);
        }
    }
}
