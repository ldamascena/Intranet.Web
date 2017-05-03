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
    
    [Table("tbProduto")]
    public partial class Produto
    {
        //public Produto()
        //{
        //    EstoqueProdutos = new HashSet<EstoqueFisico>();
        //}

        [Key]
        [Column(Order = 0)]
        public byte CdEmpresa { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdProduto { get; set; }

        public int CdSuperProduto { get; set; }

        [Column("nmPessoa")]
        public string NomeProduto { get; set; }

        public bool? Ativo { get; set; }

        public string CdFabrica { get; set; }

        public bool? Estoque { get; set; }

        public bool? Teste { get; set; }

        public DateTime? DtCadastro { get; set; }

        public DateTime? DtExclusao { get; set; }

        public int? CdMixTamanho { get; set; }

        public int? CdMixRenda { get; set; }

        public bool? Morto { get; set; }

        public string NCM { get; set; }

        public string ExIPI { get; set; }

        public int? PesoLiqProduto { get; set; }

        public string DescricaoPDV { get; set; }

        public string CEST { get; set; }

        public string DescricaoEcommerce { get; set; }

        //public virtual ICollection<EstoqueFisico> EstoqueProdutos { get; set; }
    }
}
