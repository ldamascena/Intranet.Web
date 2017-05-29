using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("tbAlertaTipo")]
    public class AlertaTipo
    {
        public AlertaTipo()
        {
            AlertasHistorico = new HashSet<AlertaHistorico>();
        }

        [DataMember]
        [Key]
        public int CdTipoAlerta { get; set; }

        [DataMember]
        public string NomeAlerta { get; set; }

        [DataMember]
        public bool Aprovado { get; set; }

        [DataMember]
        public bool? Vinculado { get; set; }

        [DataMember]
        public string Observacao { get; set; }

        [DataMember]
        public DateTime DtInclusao { get; set; }

        public virtual ICollection<AlertaHistorico> AlertasHistorico { get; set; }
    }
}

