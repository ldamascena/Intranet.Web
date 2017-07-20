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
    [Table("tbAlertaUltimoCusto")]
    public class AlertaUltimoCusto
    {

        [DataMember]
        [Key]
        public int CdAlertaUltCusto { get; set; }

        [DataMember]
        public int CdProduto { get; set; }

        public int CdPessoaFilial { get; set; }

        [DataMember]
        public int? Nota { get; set; }

        [DataMember]
        public decimal UltimoCusto { get; set; }

        [DataMember]
        public decimal PenultimoCusto { get; set; }

        [Required]
        public string Classificacao { get; set; }

        [DataMember]
        public decimal Diferenca { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime DataCriacaoAlerta { get; set; }

        [DataMember]
        [Required]
        [StringLength(30)]
        public string StatusAlerta { get; set; }

        public int CdTipoAlerta { get; set; }

        public virtual AlertaGeral AlertaGeral { get; set; }

        [DataMember]
        public virtual Pessoa Pessoa { get; set; }

        [DataMember]
        public virtual AlertaTipo AlertaTipo { get; set; }
        //[DataMember]
        //[Key]
        //public int CdAlertaUltCusto { get; set; }

        //[DataMember]
        //public int CdProduto { get; set; }

        //[DataMember]
        //[Required]
        //public string NomeProduto { get; set; }

        //[DataMember]
        //public int CdPessoaFilial { get; set; }

        //[DataMember]
        //public int? Nota { get; set; }

        //[DataMember]
        //public decimal UltimoCusto { get; set; }

        //[DataMember]
        //public decimal PenultimoCusto { get; set; }

        //[DataMember]
        //[Required]
        //public string Classificacao { get; set; }

        //[DataMember]
        //public decimal Diferenca { get; set; }

        //public int Severidade { get; set; }

        //[Required]
        //[StringLength(30)]
        //public string TipoAlerta { get; set; }

        //[DataMember]
        //[Column(TypeName = "date")]
        //public DateTime DataCriacaoAlerta { get; set; }

        //[DataMember]
        //[Required]
        //[StringLength(30)]
        //public string StatusAlerta { get; set; }

        //[DataMember]
        //public virtual Pessoa Pessoa { get; set; }
    }
}
