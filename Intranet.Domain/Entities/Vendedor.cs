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
    [Table("tbVendedor")]
    public class Vendedor
    {
        [DataMember]
        [Key]
        public int CdVendedor { get; set; }

        [DataMember]
        public string CNPJ { get; set; }

        [DataMember]
        public string Empresa { get; set; }

        [DataMember]
        public int CdComprador { get; set; }

        [DataMember]
        public string Nome { get; set; }

        [DataMember]
        public int DDD { get; set; }

        [DataMember]
        public int Telefone { get; set; }

        [DataMember]
        public string Email { get; set; }

        [DataMember]
        public bool Status { get; set; }

        [DataMember]
        public DateTime DtInclusao { get; set; }

        [DataMember]
        public DateTime DtAlteracao { get; set; }

        [DataMember]
        public virtual SolUsuario Usuario { get; set; }

        //[DataMember]
        //public virtual PessoaJuridica PessoaJuridica { get; set; }
    }
}
