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
    [Table("tbAlertaGeral")]
    public class AlertaGeral
    {
        [DataMember]
        [Key]
        [Column("cdAlertaGeral")]
        public int CdAlertaGeral { get; set; }

        [DataMember]
        public int CdProduto { get; set; }

        [DataMember]
        public string NomeProduto { get; set; }

        [DataMember]
        public int Severidade { get; set; }

        [DataMember]
        [Column("alertaAberto")]
        public int AlertaEmAberto { get; set; }

        [DataMember]
        [Column("dataUltimoAlerta")]
        public DateTime DataDoUltimoAlerta { get; set; }
    }
}
