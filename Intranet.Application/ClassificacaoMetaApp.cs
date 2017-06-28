using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Services;
using Intranet.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Application
{
    public class ClassificacaoMetaApp : AppBase<ClassificacaoMeta>, IClassificacaoMetaApp
    {
        public IClassificacaoMetaService _service;

        public ClassificacaoMetaApp(IClassificacaoMetaService service)
            : base(service)
        {
            this._service = service;
        }

        public void AlterarClassificacaoMeta(ClassificacaoMeta obj)
        {
            _service.AlterarClassificacaoMeta(obj);
        }
    }
}
