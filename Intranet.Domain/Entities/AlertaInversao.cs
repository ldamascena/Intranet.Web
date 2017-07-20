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
    [Table("tbAlertaInversao")]
    public class AlertaInversao
    {

        [DataMember]
        [Key]
        public int CdAlertaInversao { get; set; }

        [DataMember]
        public int CdProduto { get; set; }

        public int CdPessoaFilial { get; set; }

        [DataMember]
        public decimal? QtdEstoque { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime DataCriacaoAlerta { get; set; }

        [DataMember]
        [Required]
        [StringLength(30)]
        public string StatusAlerta { get; set; }

        [DataMember]
        public virtual Pessoa Pessoa { get; set; }

        public virtual AlertaGeral AlertaGeral { get; set; }

        public int CdTipoAlerta { get; set; }

        [DataMember]
        public virtual AlertaTipo AlertaTipo{ get; set; }

        //public AlertaInversao()
        //{
        //    AlertasQuarentena = new HashSet<AlertaQuarentena>();
        //}

        //[DataMember]
        //[Key]
        //[Column("cdAlertaInversao")]
        //public int CdAlertaInversao { get; set; }

        //[DataMember]
        //public int CdProduto { get; set; }

        //[DataMember]
        //public string NomeProduto { get; set; }

        //public int CdPessoaFilial { get; set; }

        //[DataMember]
        //public decimal? QtdEstoque { get; set; } 

        //[DataMember]
        //public int Severidade { get; set; }

        //[DataMember]
        //public string TipoAlerta { get; set; }

        //[DataMember]
        //[Column("dataCriacaoAlerta")]
        //public DateTime DataDeCriacao { get; set; }

        //[DataMember]
        //[Column("statusAlerta")]
        //public string Status { get; set; }

        //[DataMember]
        //public virtual Pessoa Pessoa { get; set; }

        //[DataMember]
        //public virtual ICollection<AlertaQuarentena> AlertasQuarentena { get; set; }
    }
}
