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
    [Table("tbAlertaStatus")]
    public partial class AlertaStatus
    {
        public AlertaStatus()
        {
            AlertaInversao = new HashSet<AlertaInversao>();
            AlertaUltimoCusto = new HashSet<AlertaUltimoCusto>();
        }

        [DataMember]
        [Key]
        public int cdAlertaStatus { get; set; }

        [DataMember]
        [StringLength(30)]
        public string nomeStatus { get; set; }

        public virtual ICollection<AlertaInversao> AlertaInversao { get; set; }

        public virtual ICollection<AlertaUltimoCusto> AlertaUltimoCusto { get; set; }
    }
}
