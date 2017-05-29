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
    [Table("tbAlertaManual")]
    public class AlertaManual
    {
        
        [Key]
        [DataMember]
        public int CdAlertaManual { get; set; }

        [DataMember]
        public int CdProduto { get; set; }

        [DataMember]
        [Required]
        public string NomeProduto { get; set; }

        [DataMember]
        public int CdPessoaFilial { get; set; }

        public int Severidade { get; set; }

        [DataMember]
        public int CdTipoAlerta { get; set; }

        [DataMember]
        [Required]
        [StringLength(30)]
        public string TipoAlerta { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime DataCriacaoAlerta { get; set; }

        [DataMember]
        [Required]
        [StringLength(30)]
        public string StatusAlerta { get; set; }

        [DataMember]
        public string Comentario { get; set; }

        [DataMember]
        public virtual Pessoa Pessoa { get; set; }
    }
}
