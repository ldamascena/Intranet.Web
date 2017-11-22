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
    [Table("tbAlertaBalanco")]
    public class AlertaBalanco
    {

        [DataMember]
        [Key]
        public int CdAlertaBalanco { get; set; }

        [DataMember]
        public int CdProduto { get; set; }

        [DataMember]
        public int CdPessoaFilial { get; set; }

        [DataMember]
        [Required]
        [StringLength(100)]
        public string NomeProduto { get; set; }

        [DataMember]
        public decimal? Estoque { get; set; }

        [DataMember]
        public int Status { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime DtInclusao { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime? DtConcluido { get; set; }

        [DataMember]
        public string Motivo { get; set; }

        [DataMember]
        [Column("cdProdutoInvertido")]
        public int? CdProdutoInvertido { get; set; }

        [DataMember]
        public virtual Pessoa Pessoa { get; set; }
    }
}
