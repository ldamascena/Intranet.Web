using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("tbPromocao")]
    public partial class Promocao
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        public byte cdEmpresa { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdPromocao { get; set; }

        [DataMember]
        public short? cdTipoPromocao { get; set; }

        [DataMember]
        [StringLength(50)]
        public string nmPromocao { get; set; }

        [DataMember]
        public DateTime? dtInicio { get; set; }

        [DataMember]
        public bool? inAtiva { get; set; }

        [DataMember]
        public DateTime? dtFim { get; set; }

        [DataMember]
        public int? cdPessoaPagaSellOut { get; set; }

        [DataMember]
        public int? cdUsuarioInclusao { get; set; }

        [DataMember]
        public DateTime? dtPagamentoReceitaSellOut { get; set; }

        [DataMember]
        public int? cdComprador { get; set; }

        [DataMember]
        public DateTime? hrInicio { get; set; }

        [DataMember]
        public DateTime? hrFim { get; set; }
    }
}
