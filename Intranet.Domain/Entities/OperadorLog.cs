using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("tbOperador_Log")]
    public partial class OperadorLog
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdOperador { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        public DateTime Data { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdFilial { get; set; }

        [DataMember]
        [StringLength(100)]
        public string Tipo { get; set; }
    }
}
