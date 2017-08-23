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
    [Table("tbSuperProduto")]
    public partial class SuperProduto
    {
        public SuperProduto()
        {
            EstoqueContabil = new HashSet<EstoqueContabil>();
            Produto = new HashSet<Produto>();
        }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        public byte CdEmpresa { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdSuperProduto { get; set; }

        public int? CdClassificacaoProduto { get; set; }

        public int? CdTributacao { get; set; }

        [StringLength(2)]
        public string CdUnidadeMedida { get; set; }

        [DataMember]
        [StringLength(50)]
        public string NmProdutoPai { get; set; }

        public int? PesoLiquido { get; set; }

        public int? PesoBrutog { get; set; }

        public bool? InFracionado { get; set; }

        public bool? InIsentoPIS { get; set; }

        public bool? InControlaEstoque { get; set; }

        public bool? InImportado { get; set; }

        public DateTime? DtCadastro { get; set; }

        public DateTime? DtAlteracao { get; set; }

        public bool? InUsoConsumo { get; set; }

        public bool? InSazonal { get; set; }

        public int CdCompraTipo { get; set; }

        public decimal? PrQuebra { get; set; }

        public decimal? PrCofinsPIS { get; set; }

        public decimal? PrLogistico { get; set; }

        public int? DiasPrazoValidade { get; set; }

        public decimal? PrCofins { get; set; }

        public decimal? PrPIS { get; set; }

        public decimal? QtEmbalagemExpedicao { get; set; }

        public byte? CdTipoAtividade { get; set; }

        public decimal? PrPISST { get; set; }

        public decimal? PrCofinsST { get; set; }

        [Column(TypeName = "money")]
        public decimal? VlAliqPIS { get; set; }

        [Column(TypeName = "money")]
        public decimal? VlAliqPISST { get; set; }

        [Column(TypeName = "money")]
        public decimal? VlAliqCofins { get; set; }

        [Column(TypeName = "money")]
        public decimal? VlAliqCofinsST { get; set; }

        public byte? CSTPIS { get; set; }

        public byte? CSTCofins { get; set; }

        public byte? CSTICMS { get; set; }

        public byte? OrigemICMS { get; set; }

        public byte? ModBCICMS { get; set; }

        public byte? ModBCICMSST { get; set; }

        public decimal? PrRedBCICMS { get; set; }

        public decimal? PrICMS { get; set; }

        public decimal? PrAdicICMSST { get; set; }

        public decimal? PrRedBCICMSST { get; set; }

        public decimal? PrICMSST { get; set; }

        public bool? InAtivoEtiquetado { get; set; }

        public int? QtMesesDepreciacao { get; set; }

        public short? PISCreditoCST { get; set; }

        public decimal? PISCreditovAliqProd { get; set; }

        public short? COFINSCreditoCST { get; set; }

        public decimal? COFINSCreditovAliqProd { get; set; }

        public decimal? PISCreditopPIS { get; set; }

        public decimal? COFINSCreditopCOFINS { get; set; }

        public int? CdNatRecPIS { get; set; }

        public int? CdNatRecCOFINS { get; set; }

        public bool? InRefeitorio { get; set; }

        public decimal? PrAdicICMSSTInterEst { get; set; }

        public int? CdEANVasilhame { get; set; }

        public int? CdTributacaoSegmento { get; set; }

        public decimal? PrTotalTributos { get; set; }

        public byte? CSTIPI { get; set; }

        public decimal? IPIpIPI { get; set; }

        public short? CdNatBCCred { get; set; }

        public int? TamanhoLarguracm { get; set; }

        public int? TamanhoAlturacm { get; set; }

        public int? TamanhoProfundidadecm { get; set; }

        [StringLength(30)]
        public string Marca { get; set; }

        public bool? InLiberaVerificacaoPeso { get; set; }

        public decimal? IPIvUnid { get; set; }

        public decimal? PrAdicICMSSTImportado { get; set; }

        public bool? InCotacao { get; set; }

        public bool? InCustoPorUltimaCompra { get; set; }

        public decimal? PrTotTribFed { get; set; }

        public decimal? PrTotTribEst { get; set; }

        public decimal? PrTotTribMun { get; set; }

        public bool? InIntegracaoFiscalAltera { get; set; }

        [StringLength(10)]
        public string Embalagem { get; set; }

        public virtual ICollection<EstoqueContabil> EstoqueContabil { get; set; }

        [DataMember]
        public virtual ICollection<Produto> Produto { get; set; }
    }
}
