using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("vwPromocaoItem")]
    public partial class VwPromocaoItem
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdPromocao { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdSuperProduto { get; set; }

        [DataMember]
        [StringLength(80)]
        public string Produto { get; set; }

        [DataMember]
        [Column(TypeName = "money")]
        public decimal? vlPromocao { get; set; }

        [DataMember]
        [Column(TypeName = "money")]
        public decimal? vlVenda { get; set; }
    }
}
