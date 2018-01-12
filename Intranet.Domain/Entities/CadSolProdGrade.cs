using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cad_Sol_Prod_Grade")]
    public partial class CadSolProdGrade
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdCadSolProd { get; set; }

        [DataMember]
        public int? CodFornecedor { get; set; }

        [DataMember]
        [Required]
        [StringLength(100)]
        public string DescricaoSabor { get; set; }

        [DataMember]
        [Required]
        [StringLength(15)]
        public string EAN { get; set; }

        [DataMember]
        [Required]
        [StringLength(15)]
        public string DUN { get; set; }
    }
}
