using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("ClusterLojas")]
    public partial class ClusterLojas
    {
        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdProduto { get; set; }

        [DataMember]
        public DateTime? dtAlteracao { get; set; }

        [DataMember]
        public bool? ITA { get; set; }

        [DataMember]
        public bool? ITA2 { get; set; }

        [DataMember]
        public bool? MGE { get; set; }

        [DataMember]
        public bool? MGE2 { get; set; }

        [DataMember]
        public bool? RBO { get; set; }

        [DataMember]
        public bool? RBO2 { get; set; }

        [DataMember]
        public bool? TNG { get; set; }

        [DataMember]
        public bool? ASN { get; set; }

        [DataMember]
        public bool? AGM { get; set; }

        [DataMember]
        public bool? INO { get; set; }

        [DataMember]
        public bool? JDC { get; set; }

        [DataMember]
        public bool? MRC { get; set; }

        [DataMember]
        public bool? NCE { get; set; }

        [DataMember]
        public bool? RDO { get; set; }

        [DataMember]
        public bool? TND { get; set; }

        [DataMember]
        public bool? ARM { get; set; }

        [DataMember]
        public bool? BCX { get; set; }

        [DataMember]
        public bool? CBF { get; set; }

        [DataMember]
        public bool? JDE { get; set; }

        [DataMember]
        public bool? MCE { get; set; }

        [DataMember]
        public bool? SPD { get; set; }

        [DataMember]
        public bool? CDI { get; set; }

        [DataMember]
        public bool? CDM { get; set; }

        [DataMember]
        public bool? ARM2 { get; set; }

        [DataMember]
        public bool? Pequenas { get; set; }

        [DataMember]
        public bool? Medias { get; set; }

        [DataMember]
        public bool? Premium { get; set; }

        [DataMember]
        public bool? Grandes { get; set; }

        [DataMember]
        public bool? Inativo { get; set; }

    }
}
