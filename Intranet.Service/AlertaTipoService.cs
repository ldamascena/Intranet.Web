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
    public class AlertaTipoService : ServiceBase<AlertaTipo>, IAlertaTipoService
    {
        private readonly IAlertaTipoRepository _repositoryTipoAlerta;
        private readonly IAlertaManualRepository _repositoryManual;

        public AlertaTipoService(IAlertaTipoRepository repositoryTipoAlerta, IAlertaManualRepository repositoryManual)
            : base(repositoryTipoAlerta)
        {
            this._repositoryTipoAlerta = repositoryTipoAlerta;
            this._repositoryManual = repositoryManual;
        }

        //public List<AlertaTipo> GetAlerta(string nomeAlerta, bool aprovado, bool vinculado, DateTime dtInclusao)
        //{
        //    return _repositoryTipoAlerta.GetAll().Where(x => x.NomeAlerta == nomeAlerta && x.Aprovado == aprovado && x.DtInclusao == dtInclusao).ToList();
        //}

        public void IncluirTipoAlerta(AlertaTipo obj)
        {
            if (_repositoryTipoAlerta.Get(x => x.NomeAlerta == obj.NomeAlerta) == null)
            {
                obj.DtInclusao = DateTime.Now;
                _repositoryTipoAlerta.Add(obj);
            }
        }

        public void AprovarTipoAlerta(AlertaTipo obj)
        {
            var result = _repositoryTipoAlerta.Get(x => x.CdTipoAlerta == obj.CdTipoAlerta);
            result.Aprovado = true;
            _repositoryTipoAlerta.Update(result);
        }

        public void VincularTipoAlerta(List<AlertaTipo> objs)
        {
            var resultAlertasManuais = _repositoryManual.GetAll().Where(x => x.CdTipoAlerta == objs[0].CdTipoAlerta);
            var resultTipoAlerta = _repositoryTipoAlerta.Get(x => x.CdTipoAlerta == objs[0].CdTipoAlerta);

            if (resultAlertasManuais != null) {
                foreach (var item in resultAlertasManuais)
                {
                    item.CdTipoAlerta = objs[1].CdTipoAlerta;
                    item.TipoAlerta = objs[1].NomeAlerta;
                    _repositoryManual.Update(item);
                }

                resultTipoAlerta.Vinculado = true;
                _repositoryTipoAlerta.Update(resultTipoAlerta);
            }
        }
    }
}
