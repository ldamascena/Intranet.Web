using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Vw_Produtos_Classificacao_Comprador")]
    public partial class VwProdutosClassificacaoComprador
    {
        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdProduto { get; set; }

        [DataMember]
        [StringLength(130)]
        public string Produto { get; set; }

        [DataMember]
        [StringLength(130)]
        public string Comprador { get; set; }

        [DataMember]
        [StringLength(80)]
        public string Classificacao { get; set; }

        [DataMember]
        public int? cdClassificacaoProduto { get; set; }

        [DataMember]
        public bool? Tangua { get; set; }

        [DataMember]
        public bool? Mage { get; set; }

        [DataMember]
        public bool? Catarina { get; set; }

        [DataMember]
        public bool? Marica { get; set; }

        [DataMember]
        public bool? CdItaborai { get; set; }

        [DataMember]
        public bool? Arsenal { get; set; }

        [DataMember]
        public bool? AgMineral { get; set; }

        [DataMember]
        public bool? RioBonito { get; set; }

        [DataMember]
        public bool? Itaborai { get; set; }

        [DataMember]
        public bool? Mage2 { get; set; }

        [DataMember]
        public bool? CdManilha { get; set; }

        [DataMember]
        public bool? Bacaxa { get; set; }

        [DataMember]
        public bool? Araruama { get; set; }

        [DataMember]
        public bool? CaboFrio { get; set; }

        [DataMember]
        public bool? SaoPedro { get; set; }

        [DataMember]
        public bool? Esperanca { get; set; }

        [DataMember]
        public bool? Macae { get; set; }

        [DataMember]
        public bool? RioDoOuro { get; set; }

        [DataMember]
        public bool? Inoa { get; set; }

        [DataMember]
        public bool? RioBonito2 { get; set; }

        [DataMember]
        public bool? Itaborai2 { get; set; }

        [DataMember]
        public bool? Trindade { get; set; }

        [DataMember]
        public bool? NovaCidade { get; set; }

        [DataMember]
        public bool? Araruama2 { get; set; }

        [DataMember]
        public bool? Ativo { get; set; }

        [DataMember]
        public DateTime? dtAlteracao { get; set; }

        [DataMember]
        public bool? ITA { get; set; }

        [DataMember]
        public bool? ITA2 { get; set; }

        [DataMember]
        public bool? MGE { get; set; }

        [DataMember]
        public bool? MGE2 { get; set; }

        [DataMember]
        public bool? RBO { get; set; }

        [DataMember]
        public bool? RBO2 { get; set; }

        [DataMember]
        public bool? TNG { get; set; }

        [DataMember]
        public bool? ASN { get; set; }

        [DataMember]
        public bool? AGM { get; set; }

        [DataMember]
        public bool? INO { get; set; }

        [DataMember]
        public bool? JDC { get; set; }

        [DataMember]
        public bool? MRC { get; set; }

        [DataMember]
        public bool? NCE { get; set; }

        [DataMember]
        public bool? RDO { get; set; }

        [DataMember]
        public bool? TND { get; set; }

        [DataMember]
        public bool? ARM { get; set; }

        [DataMember]
        public bool? BCX { get; set; }

        [DataMember]
        public bool? CBF { get; set; }

        [DataMember]
        public bool? JDE { get; set; }

        [DataMember]
        public bool? MCE { get; set; }

        [DataMember]
        public bool? SPD { get; set; }

        [DataMember]
        public bool? CDI { get; set; }

        [DataMember]
        public bool? CDM { get; set; }

        [DataMember]
        public bool? Inativo { get; set; }
    }
}
