using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("VwAcompanhamentoControleCaixa")]
    public partial class VwAcompanhamentoControleCaixa
    {
        [DataMember]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string CustomId { get; set; }

        [DataMember]
        public int IdUsuario { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime? Data { get; set; }

        [DataMember]
        public decimal? CxGeral { get; set; }

        [DataMember]
        public decimal? Caixas { get; set; }

        [DataMember]
        public decimal? Composicao { get; set; }

        [DataMember]
        public decimal? Desp { get; set; }

        [DataMember]
        public decimal? Entradas { get; set; }

        [DataMember]
        public decimal? OutrasDesp { get; set; }

        [DataMember]
        public decimal? CxGeralAtualizado { get; set; }
    }
}
