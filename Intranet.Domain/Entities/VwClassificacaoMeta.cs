using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("VwClassificacaoMeta")]
    public partial class VwClassificacaoMeta
    {
        [Key]
        [DataMember]
        public System.Int64 Id { get; set; }

        [DataMember]
        public string nomeMes { get; set; }

        [DataMember]
        public System.DateTime dtMes { get; set; }

        [StringLength(30)]
        [DataMember]
        public string nmUsuario { get; set; }

        [StringLength(40)]
        [DataMember]
        public string Nivel1 { get; set; }

        [StringLength(40)]
        [DataMember]
        public string Nivel2 { get; set; }

        [DataMember]
        public decimal? metaMarkup { get; set; }

        [Column(TypeName = "money")]
        [DataMember]
        public decimal? dispCompras { get; set; }

        [DataMember]
        public int cdNivel1 { get; set; }

        [DataMember]
        public int? cdNivel2 { get; set; }
    }
}
