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
    [Table("tbEstoqueMovimento")]
    public class EstoqueMovimento
    {
        [Key]
        [Column(Order = 0)]
        public int CdPessoaFilial { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CdEstoqueMovimento { get; set; }

        [DataMember]
        public int? CdPessoaObra { get; set; }

        [DataMember]
        public int? CdProduto { get; set; }

        [DataMember]
        public byte? CdEmpresaProduto { get; set; }

        [DataMember]
        public string CdEmbalagem { get; set; }

        [DataMember]
        public byte? CdEstoqueTipo { get; set; }

        [DataMember]
        public DateTime? DtMovimento { get; set; }

        [DataMember]
        public int? QtVolumes { get; set; }

        [DataMember]
        [Column(TypeName = "money")]
        public decimal? VlItem { get; set; }

        [DataMember]
        public decimal? QtItem { get; set; }

        [DataMember]
        public bool? InEntrada { get; set; }

        [DataMember]
        public string Historico { get; set; }

        [DataMember]
        public decimal? QtEstoqueFinal { get; set; }

        [DataMember]
        public int? QtVolumeFinal { get; set; }

        [DataMember]
        public decimal? QtEmbalagem { get; set; }

        [DataMember]
        public byte? CdMovimentoTipo { get; set; }

        public decimal? QtEstoqueContabilFinal { get; set; }

        public decimal? VlEstoqueContabilFinal { get; set; }

        public int? CdAtivoResponsavel { get; set; }

        public string AtivoEtiqueta { get; set; }

        public decimal? VlVerbaComercial { get; set; }

        public decimal? VlVerbaComercialFinal { get; set; }
    }
}
