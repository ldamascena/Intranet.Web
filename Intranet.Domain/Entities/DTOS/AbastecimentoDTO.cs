using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Entities.DTOS
{
    [DataContract]
    public class AbastecimentoDTO
    {
        [DataMember]
        public int cdCompraTipo { get; set; }

        [DataMember]
        public string Responsavel { get; set; }

        [DataMember]
        public int cdPessoaComercial { get; set; }

        [DataMember]
        public int cdSuperProduto { get; set; }
    }
}
