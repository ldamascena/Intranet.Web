using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{

    [DataContract]
    [Table("VwInventarioParcial")]
    public partial class VwInventarioParcial
    {
        [DataMember]
        [StringLength(130)]
        public string Filial { get; set; }

        [DataMember]
        public int? cdPessoaFilial { get; set; }

        [DataMember]
        public DateTime? Data { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdProduto { get; set; }

        [DataMember]
        [StringLength(130)]
        public string Produto { get; set; }

        [DataMember]
        [StringLength(80)]
        public string Categoria { get; set; }

        [DataMember]
        [StringLength(80)]
        public string Secao { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        public decimal Qtd { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 2)]
        public decimal Venda { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 3)]
        public decimal Custo { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 4)]
        public decimal Estoque { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 5)]
        public decimal qtItemInventario { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 6)]
        public decimal qtAjusteItem { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 7)]
        public decimal vlAjuste { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 8)]
        public decimal QtdQuebra { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 9)]
        public decimal qtItemQuebra { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 10)]
        public decimal Unitario { get; set; }

        [DataMember]
        public string Referencia { get; set; }
    }
}
