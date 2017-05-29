using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Services
{
    public interface IAlertaTipoService : IServiceBase<AlertaTipo>
    {
        void IncluirTipoAlerta(AlertaTipo obj);
        void AprovarTipoAlerta(AlertaTipo obj);
        void VincularTipoAlerta(List<AlertaTipo> objs);
    }
}
