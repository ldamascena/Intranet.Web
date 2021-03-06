﻿using System;
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
    [Table("tbAlertaTipo")]
    public class AlertaTipo
    {
        public AlertaTipo()
        {
            AlertasInversao = new HashSet<AlertaInversao>();
            AlertaUltimoCusto = new HashSet<AlertaUltimoCusto>();
            AlertaQuarentena = new HashSet<AlertaQuarentena>();
        }

        [DataMember]
        [Key]
        public int CdTipoAlerta { get; set; }

        [DataMember]
        [StringLength(100)]
        public string NomeAlerta { get; set; }

        public bool? Aprovado { get; set; }

        public bool? Vinculado { get; set; }

        public string Observacao { get; set; }

        public DateTime DtInclusao { get; set; }

        public virtual ICollection<AlertaInversao> AlertasInversao { get; set; }

        public virtual ICollection<AlertaUltimoCusto> AlertaUltimoCusto { get; set; }

        public virtual ICollection<AlertaQuarentena> AlertaQuarentena { get; set; }

        //public AlertaTipo()
        //{
        //    AlertasQuarentena = new HashSet<AlertaQuarentena>();
        //}

        //[DataMember]
        //[Key]
        //public int CdTipoAlerta { get; set; }

        //[DataMember]
        //public string NomeAlerta { get; set; }

        //[DataMember]
        //public bool Aprovado { get; set; }

        //[DataMember]
        //public bool? Vinculado { get; set; }

        //[DataMember]
        //public string Observacao { get; set; }

        //[DataMember]
        //public DateTime DtInclusao { get; set; }

        //public virtual ICollection<AlertaHistorico> AlertasHistorico { get; set; }

        //public virtual ICollection<AlertaQuarentena> AlertasQuarentena { get; set; }
    }
}

