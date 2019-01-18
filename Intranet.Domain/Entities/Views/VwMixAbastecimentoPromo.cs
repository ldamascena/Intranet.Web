using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{

    [DataContract]
    [Table("Vw_Mix_Abastecimento_Promo")]
    public partial class VwMixAbastecimentoPromo
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdProduto { get; set; }

        [DataMember]
        [StringLength(130)]
        public string Produto { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdPessoaFilial { get; set; }

        [DataMember]
        [StringLength(130)]
        public string Filial { get; set; }

        [DataMember]
        [StringLength(130)]
        public string Comprador { get; set; }

        [DataMember]
        public decimal? VMN { get; set; }

        [DataMember]
        public decimal? VMP { get; set; }

        [DataMember]
        public decimal? EstMin { get; set; }

        [DataMember]
        public decimal? EstLJ { get; set; }

        [DataMember]
        public decimal? EstCD_UND { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdPromocao { get; set; }

        [DataMember]
        public decimal? QtdEmb { get; set; }

        [DataMember]
        public int? sugestaoComprador { get; set; }

        [DataMember]
        public int? conferido { get; set; }
    }
}
