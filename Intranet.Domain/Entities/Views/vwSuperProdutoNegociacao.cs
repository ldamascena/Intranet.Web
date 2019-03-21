using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities.Views
{

    [DataContract]
    [Table("vwSuperProdutoNegociacao")]
    public partial class vwSuperProdutoNegociacao
    {
        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int cdSuperProduto { get; set; }

        [DataMember]
        [StringLength(80)]
        public string SuperProduto { get; set; }

        [DataMember]
        public int? cdCompraTipo { get; set; }

        [DataMember]
        [StringLength(30)]
        public string nmCompraTipo { get; set; }

        [DataMember]
        public int? cdPessoa { get; set; }

        [DataMember]
        [StringLength(30)]
        public string nmPessoa { get; set; }
    }
}
