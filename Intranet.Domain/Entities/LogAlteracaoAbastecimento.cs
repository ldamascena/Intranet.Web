using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{

    [DataContract]
    [Table("LogAlteracaoAbastecimento")]
    public partial class LogAlteracaoAbastecimento
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int? Codigo { get; set; }

        [DataMember]
        [StringLength(100)]
        public string SuperProduto { get; set; }

        [DataMember]
        public DateTime? Data { get; set; }

        [DataMember]
        [StringLength(100)]
        public string Responsavel { get; set; }

        [DataMember]
        [StringLength(50)]
        public string AlteradoDe { get; set; }

        [DataMember]
        [StringLength(50)]
        public string AlteradoPara { get; set; }
    }
}
