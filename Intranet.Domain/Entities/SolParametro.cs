using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{

    [DataContract]
    [Table("tbSolParametro")]
    public partial class SolParametro
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdEmpresa { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdPessoaFilial { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 2)]
        [StringLength(30)]
        public string NmParametro { get; set; }

        [DataMember]
        [StringLength(100)]
        public string Valor { get; set; }

        [DataMember]
        [StringLength(50)]
        public string Descricao { get; set; }

        [DataMember]
        public virtual Pessoa Pessoa { get; set; }
    }
}
