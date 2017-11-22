using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("VwAlertas_Analitico")]
    public partial class VwAlertasAnalitico
    {
        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdProduto { get; set; }

        [DataMember]
        [StringLength(130)]
        public string Produto { get; set; }

        [DataMember]
        public int? Abertos { get; set; }

        [DataMember]
        public int? Severidade { get; set; }
    }
}
