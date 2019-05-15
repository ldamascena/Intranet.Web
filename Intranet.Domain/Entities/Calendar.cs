using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{

    [DataContract]
    [Table("calendar")]
    public partial class Calendar
    {
        [DataMember]
        public int id { get; set; }

        [DataMember]
        public DateTime start { get; set; }

        [DataMember]
        public DateTime end { get; set; }

        [DataMember]
        [Required]
        public string title { get; set; }

        [DataMember]
        public string observacao { get; set; }

        [DataMember]
        public string url { get; set; }

        [DataMember]
        [StringLength(50)]
        public string backgroundColor { get; set; }

        [DataMember]
        [StringLength(50)]
        public string borderColor { get; set; }

        [DataMember]
        public int? idUsuario { get; set; }

        [DataMember]
        public int? idGrupo { get; set; }
    }
}
