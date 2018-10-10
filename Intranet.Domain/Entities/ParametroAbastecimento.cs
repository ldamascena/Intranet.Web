using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Parametro_Abastecimento")]
    public partial class ParametroAbastecimento
    {
        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdPromocao { get; set; }

        [DataMember]
        public int? Cobertura { get; set; }

        [DataMember]
        public int? CoberturaPromocional { get; set; }

        [DataMember]
        public string Promocao { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime? DataInclusao { get; set; }
    }
}
