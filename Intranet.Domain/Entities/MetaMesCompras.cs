using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("tbMetaMesCompras")]
    public class MetaMesCompras
    {
        public MetaMesCompras()
        {
            ClassificacoesProduto = new HashSet<ClassificacaoProduto>();
        }

        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdClassificacaoProduto { get; set; }

        [Key]
        [Column(Order = 1)]
        public byte CdEmpresa { get; set; }

        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdComprador { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 3, TypeName = "date")]
        public DateTime DtMes { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 4)]
        [StringLength(20)]
        public string NomeMes { get; set; }

        [DataMember]
        [Column(TypeName = "money")]
        public decimal? DispCompras { get; set; }

        [DataMember]
        public decimal? MetaMarkup { get; set; }

        [DataMember]
        public virtual ICollection<ClassificacaoProduto> ClassificacoesProduto { get; set; }
    }
}
