using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("ConfAntecipada")]
    public partial class ConfAntecipada
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        [Required]
        [StringLength(50)]
        public string Indicador { get; set; }

        [DataMember]
        [Required]
        [StringLength(50)]
        public string Filial { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime Data { get; set; }

        [DataMember]
        public DateTime DataInclusao { get; set; }

        [DataMember]
        [Required]
        [StringLength(100)]
        public string Fornecedor { get; set; }

        [DataMember]
        [Column("Pedido no Rodapé")]
        [Required]
        [StringLength(10)]
        public string Pedido_no_Rodapé { get; set; }

        [DataMember]
        [Column("Número NFe")]
        public long Numero_NFe { get; set; }

        [DataMember]
        public string Erro { get; set; }

        [DataMember]
        [Column("Observação")]
        public string Observacao { get; set; }

        [DataMember]
        public string Resolução { get; set; }

        [DataMember]
        public int IdUsuarioComprador { get; set; }

        [DataMember]
        public bool? Visualizado { get; set; }

        [DataMember]
        public bool? Feito { get; set; }

        [DataMember]
        public DateTime? DataConclusao { get; set; }

        [DataMember]
        public virtual Usuario Usuario { get; set; }
    }
}
