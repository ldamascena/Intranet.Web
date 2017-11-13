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
    [Table("tbEstoqueContabil")]
    public partial class EstoqueContabil
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdPessoaFilial { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdPessoaObra { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdSuperProduto { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 3)]
        public byte CdEmpresaProduto { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 4)]
        public byte CdEstoqueTipo { get; set; }

        [DataMember]
        [Column(TypeName = "money")]
        public decimal? VlEstoqueContabil { get; set; }

        [DataMember]
        public decimal? QtEstoqueContabil { get; set; }

        [DataMember]
        [Column(TypeName = "money")]
        public decimal? VlUltimaCompra { get; set; }

        [DataMember]
        public decimal? VlVerbaComercial { get; set; }

        [DataMember]
        public virtual EmpresaFilial EmpresaFilial { get; set; }

        [DataMember]
        public virtual SuperProduto SuperProduto { get; set; }

        [DataMember]
        public virtual EstoqueTipo EstoqueTipo { get; set; }
    }
}
