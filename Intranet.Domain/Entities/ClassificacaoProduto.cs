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
    [Table("tbClassificacaoProduto")]
    public class ClassificacaoProduto
    {
        public ClassificacaoProduto()
        {
            children = new HashSet<ClassificacaoProduto>();
        }

        [Key]
        [Column(Order = 0)]
        [DataMember]
        public byte CdEmpresa { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [DataMember]
        public int CdClassificacaoProduto { get; set; }

        [DataMember]
        public int? CdClassificacaoProdutoPai { get; set; }

        public byte? CdEmpresaPai { get; set; }

        [DataMember]
        public string CdOrdem { get; set; }

        [DataMember]
        public float? PrMargem { get; set; }

        [DataMember]
        public int? CdComprador { get; set; }

        [DataMember]
        public int? NrCobertura { get; set; }

        [DataMember]
        public byte? CdCarga { get; set; }

        [DataMember]
        public decimal? PrMargemObjetiva { get; set; }

        public decimal? PrQuebra { get; set; }

        public decimal? PrCofinsPIS { get; set; }

        public decimal? PrLogistico { get; set; }

        [DataMember]
        public int? NrCoberturaMinima { get; set; }

        [DataMember]
        public decimal? PrMargemMinima { get; set; }

        [DataMember]
        public virtual ICollection<ClassificacaoProduto> children { get; set; }

        [DataMember]
        [Column("NmClassificacaoProduto")]
        public string label { get; set; }

        public virtual ClassificacaoProduto ClassificacaoProduto2 { get; set; }

        [DataMember]
        public virtual SolUsuario Usuario { get; set; }

    }
}
