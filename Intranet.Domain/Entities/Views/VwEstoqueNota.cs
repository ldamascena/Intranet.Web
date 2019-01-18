using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("VW_EstoqueNota")]
    public partial class VwEstoqueNota
    {
        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdEstoqueNota { get; set; }

        [DataMember]
        [StringLength(30)]
        public string Filial { get; set; }

        [DataMember]
        [StringLength(30)]
        public string CentroDeCusto { get; set; }

        [DataMember]
        [StringLength(30)]
        public string TipoDeEstoque { get; set; }

        [DataMember]
        [StringLength(7)]
        public string Tipo { get; set; }

        [DataMember]
        public DateTime? DtEstoqueNota { get; set; }

        [DataMember]
        [StringLength(80)]
        public string Historico { get; set; }
    }
}
