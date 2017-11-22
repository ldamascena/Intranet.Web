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
    [Table("tbAlertaHistorico")]
    public class AlertaHistorico
    {
        [DataMember]
        [Key]
        public int CdHistoricoAlerta { get; set; }

        [DataMember]
        public int CdProduto { get; set; }

        [DataMember]
        [Column("dataHistorico")]
        public DateTime DataDoHistorico { get; set; }

        [DataMember]
        public string StatusAlertaAtual { get; set; }

        [DataMember]
        public string StatusAlertaAnterior { get; set; }

        [DataMember]
        public string DescricaoHistorico { get; set; }

        [DataMember]
        public int CdTipoAlerta { get; set; }

        [DataMember]
        public int CdPessoaFilial { get; set; }

        [DataMember]
        [Column("idUsuario")]
        public int? IdUsuario { get; set; }

        [DataMember]
        public virtual AlertaTipo AlertaTipo { get; set; }

        [DataMember]
        public virtual Pessoa Pessoa { get; set; }

        public virtual AlertaGeral AlertaGeral { get; set; }

        [DataMember]
        public virtual Usuario Usuario { get; set; }
    }
}
