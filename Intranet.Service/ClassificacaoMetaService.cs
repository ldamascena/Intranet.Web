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
    public class ClassificacaoMetaService : ServiceBase<ClassificacaoMeta>, IClassificacaoMetaService
    {
        public IClassificacaoMetaRepository _repository;

        public ClassificacaoMetaService(IClassificacaoMetaRepository repository)
            : base(repository)
        {
            this._repository = repository;
        }

        public void AlterarClassificacaoMeta(ClassificacaoMeta obj)
        {
            var getMetaByName = _repository.GetAll().Where(x => x.nmClassificacaoProduto == obj.nmClassificacaoProduto && x.nomeMes == obj.nomeMes).FirstOrDefault();

            if (getMetaByName != null)
            {
                getMetaByName.dispCompras = obj.dispCompras;
                getMetaByName.metaMarkup = obj.metaMarkup;
                _repository.Update(getMetaByName);
            }
        }
    }
}
