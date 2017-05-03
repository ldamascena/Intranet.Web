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
    [Table("tbPessoaJuridica")]
    public class PessoaJuridica
    {

        [DataMember]
        [Key]
        public int cdPessoaJuridica { get; set; }

        public int? cdPessoaJuridicaPai { get; set; }

        [DataMember]
        public string CNPJEmpresa { get; set; }

        [DataMember]
        public short? CNPJFilial { get; set; }

        [DataMember]
        public byte? CNPJDV { get; set; }

        [DataMember]
        public string RazaoSocial { get; set; }

        public string InscricaoEstadual { get; set; }

        public string InscricaoMunicipal { get; set; }

        public string CNAE { get; set; }

    }
}
