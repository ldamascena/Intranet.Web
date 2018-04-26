using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cad_Ass_Prod")]
    public partial class CadAssProd
    {
        [DataMember]
        [Key]
        public int Id { get; set; }

        [DataMember]
        public int IdCadAssProd { get; set; }

        [DataMember]
        [Required]
        [StringLength(100)]
        public string ChaveNFE { get; set; }

        [DataMember]
        [Required]
        [StringLength(100)]
        public string CNPJ { get; set; }

        [DataMember]
        public int IdStatus { get; set; }

        [DataMember]
        public DateTime DataInclusao { get; set; }

        [DataMember]
        public DateTime? DataAlteracao { get; set; }

        [DataMember]
        public int IdUsuario { get; set; }

        [DataMember]
        public string Observacao { get; set; }

        [DataMember]
        public virtual Usuario Usuario { get; set; }

        [DataMember]
        public virtual SitCadProd SitCadProd { get; set; }
    }
}
