using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{

    [DataContract]
    [Table("ClusterConfig")]
    public partial class ClusterConfig
    {
        [DataMember]
        [Key]
        public int Id { get; set; }

        [DataMember]
        public bool Ativo { get; set; }

        [DataMember]
        public DateTime? UltDataInativacao { get; set; }

        [DataMember]
        public DateTime? UltDataReativacao { get; set; }
    }
}
