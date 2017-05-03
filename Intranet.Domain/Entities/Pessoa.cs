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
    [Table("tbPessoa")]
    public class Pessoa
    {
        public Pessoa()
        {
            AlertasInversao = new HashSet<AlertaInversao>();
            AlertasHistorico = new HashSet<AlertaHistorico>();
        }

        [DataMember]
        [Key]
        public int CdPessoa { get; set; }

        [DataMember]
        [Column ("nmPessoa")]
        public string NomePessoa { get; set; }

        [Column("dtCadastro")]
        public DateTime? DataDeCadastro { get; set; }

        [Column("dtAlteracao")]
        public DateTime? DataDeAlteracao { get; set; }

        [Column("inPessoaJuridica")]
        public bool? PessoaJuridica { get; set; }

        [Column("inMorto")]
        public bool? Morto { get; set; }

        public virtual ICollection<AlertaInversao> AlertasInversao { get; set; }

        public virtual ICollection<AlertaHistorico> AlertasHistorico { get; set; }
    }
}
