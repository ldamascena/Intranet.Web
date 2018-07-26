using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{

    [DataContract]
    [Table("Cad_Sol_Alter_Prod")]
    public partial class CadSolAlterProd
    {
        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [DataMember]
        public long Ean { get; set; }

        [DataMember]
        [Required]
        public string Campo { get; set; }

        [DataMember]
        [Column(TypeName = "text")]
        [Required]
        public string Detalhe { get; set; }

        [DataMember]
        public int IdStatus { get; set; }

        [DataMember]
        public int IdUsuario { get; set; }

        [DataMember]
        public DateTime DtInclusao { get; set; }

        [DataMember]
        public string Observacao { get; set; }

        [DataMember]
        public virtual SitCadProd SitCadProd { get; set; }

        [DataMember]
        public virtual Usuario Usuario { get; set; }
    }
}
