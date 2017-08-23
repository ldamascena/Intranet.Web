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
    [Table("tbEmpresaFilial")]
    public class EmpresaFilial
    {
        public EmpresaFilial()
        {
            EstoqueContabil = new HashSet<EstoqueContabil>();
        }

        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdPessoaFilial { get; set; }

        public byte? cdEmpresa { get; set; }

        [StringLength(1)]
        public string cdFilialTipo { get; set; }

        public int? nrSequencialBoletim { get; set; }

        public DateTime? dtUltimaVenda { get; set; }

        public int prGrupo { get; set; }

        public bool? inCustoMedio { get; set; }

        [StringLength(3)]
        public string SerieTransferencia { get; set; }

        public bool inUltimaCompraPorTransferencia { get; set; }

        public bool? inEstoqueInativo { get; set; }

        [StringLength(20)]
        public string txCentroCustoContabil { get; set; }

        public int? cdMixTamanho { get; set; }

        public int? cdMixRenda { get; set; }

        public int? nrGrupoAtualizaCusto { get; set; }

        [DataMember]
        [StringLength(30)]
        public string nmFilial { get; set; }

        public bool? inNFe { get; set; }

        public bool? inPedidoInternet { get; set; }

        public int? cdFilialEstoqueSolicitacao { get; set; }

        public byte? nrPrioridadeXD { get; set; }

        public int? cdRegimeTributario { get; set; }

        public decimal? NFeVersao { get; set; }

        public bool? SPED { get; set; }

        public DateTime? dtConferenciaNotaFiscal { get; set; }

        public int? cdFilialSazonalidade { get; set; }

        public int? cdFreteRota { get; set; }

        public bool? inInativo { get; set; }

        public DateTime? dtConferenciaMovimentoContabil { get; set; }

        public long? NFeConsultaUltimoNSU { get; set; }

        public bool? inExcluiComparativo { get; set; }

        public bool? inErroEstoqueNegativoNaCompra { get; set; }

        public bool? DescontaVerbaDoCusto { get; set; }

        public bool? PrecoAtacarejo { get; set; }

        [StringLength(8)]
        public string nmFilialSitef { get; set; }

        public int? ScanntechLoja { get; set; }

        public bool? inCorrigeEstoqueNegativo { get; set; }

        public decimal? prAcrescimoTransferencia { get; set; }

        [Column(TypeName = "image")]
        public byte[] LogoMarcaNFeFilial { get; set; }

        public bool? inEcommerce { get; set; }

        public bool? inDepositoFechado { get; set; }

        public virtual ICollection<EstoqueContabil> EstoqueContabil { get; set; }

    }
}
