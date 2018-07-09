using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("tbOperador")]
    public partial class Operador
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        public byte CdEmpresa { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdFilial { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdOperador { get; set; }

        [DataMember]
        [StringLength(50)]
        public string NmOperador { get; set; }

        [DataMember]
        public byte? CdNivel { get; set; }

        [DataMember]
        public int? Senha { get; set; }

        [DataMember]
        public bool? InInativo { get; set; }

        public int? nrTurno { get; set; }

        [MaxLength(3000)]
        public byte[] Digital { get; set; }
    }
}
