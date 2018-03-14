using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("vwPromocao")]
    public partial class VwPromocao
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdPromocao { get; set; }

        [DataMember]
        [StringLength(50)]
        public string nmTipoPromocao { get; set; }

        [DataMember]
        [StringLength(50)]
        public string nmPromocao { get; set; }

        [DataMember]
        public DateTime? dtInicio { get; set; }

        [DataMember]
        public DateTime? dtFim { get; set; }

        public bool? inAtiva { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        public bool Ativo { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 2)]
        public bool Concluido { get; set; }
    }
}
