using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{

    [DataContract]
    [Table("Vw_Produtos_Mudanca_Abastecimento")]
    public partial class VwProdutosMudancaAbastecimento
    {
        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Codigo { get; set; }

        [DataMember]
        [StringLength(80)]
        public string SuperProduto { get; set; }

        [DataMember]
        [StringLength(30)]
        public string AlteradoDe { get; set; }
    }
}
