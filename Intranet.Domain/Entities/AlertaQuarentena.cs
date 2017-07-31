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
    [Table("tbAlertaQuarentena")]
    public partial class AlertaQuarentena
    {
        [DataMember]
        [Key]
        public int CdAlertaQuarentena { get; set; }

        [DataMember]
        public int CdProduto { get; set; }

        [DataMember]
        public int CdPessoaFilial { get; set; }

        [DataMember]
        public int CdTipoAlerta { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime DtInclusao { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime DtSaida { get; set; }

        [DataMember]
        public int CdAlerta { get; set; }

        [DataMember]
        public int Dias { get; set; }

        [DataMember]
        public string NomeUsuario { get; set; }

        [DataMember]
        public string Motivo { get; set; }

        [DataMember]
        public virtual Pessoa Pessoa { get; set; }

        [DataMember]
        public virtual AlertaTipo AlertaTipo { get; set; }

        public virtual AlertaInversao AlertaInversao { get; set; }

        public virtual AlertaUltimoCusto AlertaUltimoCusto { get; set; }

        public virtual AlertaGeral AlertaGeral { get; set; }

    }
}
