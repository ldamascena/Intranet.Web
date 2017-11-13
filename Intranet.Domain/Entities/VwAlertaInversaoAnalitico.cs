using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("VwAlertaInversao_Analitico")]
    public partial class VwAlertaInversaoAnalitico
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdProduto { get; set; }

        [DataMember]
        [StringLength(130)]
        public string Produto { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Abertos { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Severidade { get; set; }
    }
}
