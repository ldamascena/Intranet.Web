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
    [Table("tbSolUsuario")]
    public class SolUsuario
    {
        public SolUsuario()
        {
            ClassificacaoProdutos = new HashSet<ClassificacaoProduto>();
        }

        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdUsuario { get; set; }

        [DataMember]
        public string NmUsuario { get; set; }

        public string Conta { get; set; }

        public string Senha { get; set; }

        public byte? CdUltimaEmpresa { get; set; }

        public int? CdPessoaFilial { get; set; }

        public int CdUsuarioGrupo { get; set; }

        [DataMember]
        public string Email { get; set; }

        public int InAtivo { get; set; }

        public DateTime? DtUltimaSenha { get; set; }

        public int? TentativasErradas { get; set; }

        public virtual ICollection<ClassificacaoProduto> ClassificacaoProdutos { get; set; }
    }
}
