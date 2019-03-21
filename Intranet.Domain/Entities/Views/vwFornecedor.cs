using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities.Views
{

    [DataContract]
    [Table("vwFornecedor")]
    public partial class vwFornecedor
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdPessoa { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [StringLength(30)]
        public string nmPessoa { get; set; }

        [DataMember]
        [StringLength(30)]
        public string CNPJCPF { get; set; }

        [DataMember]
        public string dFornecedor { get; set; }
    }
}
