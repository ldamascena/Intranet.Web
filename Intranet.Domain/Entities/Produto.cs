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
    [Table("tbProduto")]
    public partial class Produto
    {
        //public Produto()
        //{
        //    EstoqueProdutos = new HashSet<EstoqueFisico>();
        //}

        [DataMember]
        [Key]
        [Column(Order = 1)]
        public byte CdEmpresa { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdProduto { get; set; }

        [DataMember]
        [Column(Order = 0)]
        public int CdSuperProduto { get; set; }

        [DataMember]
        [Column("nmProduto")]
        public string NomeProduto { get; set; }

        public bool? InAtivo { get; set; }

        public string CdFabrica { get; set; }

        public bool? InEstoque { get; set; }

        public bool? InTeste { get; set; }

        public DateTime? DtCadastro { get; set; }

        [DataMember]
        public DateTime? DtExclusao { get; set; }

        public int? CdMixTamanho { get; set; }

        public int? CdMixRenda { get; set; }

        public bool? InMorto { get; set; }

        public string NCM { get; set; }

        public string ExIPI { get; set; }

        public int? PesoLiqProduto { get; set; }

        public string DescricaoPDV { get; set; }

        public string CEST { get; set; }

        public string DescricaoEcommerce { get; set; }

        //public virtual ICollection<EstoqueFisico> EstoqueProdutos { get; set; }

        public virtual SuperProduto SuperProduto { get; set; }
    }
}
