using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("VwLancamentoContabilRaizOne")]
    public partial class VwLancamentoContabilRaizOne
    {
        [DataMember]
        [Key]
        public Int64 Row { get; set; }

        [DataMember]
        [StringLength(50)]
        public string NomeContabil { get; set; }

        [DataMember]
        public int? CodigoContabil { get; set; }

        [DataMember]
        [StringLength(30)]
        public string nmPessoa { get; set; }

        [DataMember]
        [Column(TypeName = "money")]
        public decimal? Valor { get; set; }

        [DataMember]
        [Column(TypeName = "money")]
        public decimal? ValorMesAnt { get; set; }

        [DataMember]
        [Column(TypeName = "money")]
        public decimal? ValorAnoAnt { get; set; }

        [DataMember]
        public int? MesNumber { get; set; }

        [DataMember]
        public int? Ano { get; set; }
    }
}
