using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities.Views
{

    [DataContract]
    [Table("vwSuperProduto")]
    public partial class vwSuperProduto
    {
        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdSuperProduto { get; set; }

        [DataMember]
        [StringLength(80)]
        public string SuperProduto { get; set; }

        [DataMember]
        public string CodigoNome { get; set; }
    }
}
