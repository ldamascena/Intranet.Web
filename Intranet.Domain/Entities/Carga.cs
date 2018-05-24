using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("tbCarga")]
    public partial class Carga
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        public byte cdEmpresaProduto { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        public byte cdCarga { get; set; }

        [DataMember]
        [StringLength(50)]
        public string nmCarga { get; set; }

        public byte? cdBoxTipo { get; set; }
    }
}
