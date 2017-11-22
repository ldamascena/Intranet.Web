using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Usuario")]
    public partial class Usuario
    {
        public Usuario()
        {
            Grupo = new HashSet<Grupo>();
            Aprovadores = new HashSet<CadSolDesp>();
            UsuariosInclusao = new HashSet<CadSolDesp>();
            CaixasControleUsuario = new HashSet<CadCaixaControle>();
            EntradasControleUsuario = new HashSet<CadEntradaControle>();
            ComposicaoControleUsuario = new HashSet<CadComposicaoControle>();
            OutrasDespControleUsuario = new HashSet<CadOutrasDespControle>();
            CaixasControleUsuarioAlteracao = new HashSet<CadCaixaControle>();
            EntradasControleUsuarioAlteracao = new HashSet<CadEntradaControle>();
            ComposicaoControleUsuarioAlteracao = new HashSet<CadComposicaoControle>();
            OutrasDespControleUsuarioAlteracao = new HashSet<CadOutrasDespControle>();
            SaldosUsuario = new HashSet<CadSaldoControle>();
            SaldosUsuarioAlteracao = new HashSet<CadSaldoControle>();
            AlertaHistoricos = new HashSet<AlertaHistorico>();
            AlertasQuarentena = new HashSet<AlertaQuarentena>();
        }

        [DataMember]
        public int Id { get; set; }

        [DataMember]
        [Required]
        public string Username { get; set; }

        [DataMember]
        [Required]
        public string Nome { get; set; }

        [DataMember]
        [Required]
        public string Sobrenome { get; set; }

        [DataMember]
        [Required]
        public string Email { get; set; }

        [DataMember]
        public bool EmailConfirmed { get; set; }

        [DataMember]
        [Required]
        public string PasswordHash { get; set; }

        [DataMember]
        public bool Bloqueado { get; set; }

        [DataMember]
        public DateTime DataInclusao { get; set; }

        [DataMember]
        public DateTime? DataAlteracao { get; set; }

        [DataMember]
        public DateTime? DataBloqueio { get; set; }

        [DataMember]
        public virtual ICollection<Grupo> Grupo { get; set; }

        public virtual ICollection<CadSolDesp> Aprovadores { get; set; }

        public virtual ICollection<CadSolDesp> UsuariosInclusao { get; set; }

        public virtual ICollection<CadCaixaControle> CaixasControleUsuario { get; set; }

        public virtual ICollection<CadEntradaControle> EntradasControleUsuario { get; set; }

        public virtual ICollection<CadComposicaoControle> ComposicaoControleUsuario { get; set; }

        public virtual ICollection<CadOutrasDespControle> OutrasDespControleUsuario { get; set; }

        public virtual ICollection<CadCaixaControle> CaixasControleUsuarioAlteracao { get; set; }

        public virtual ICollection<CadEntradaControle> EntradasControleUsuarioAlteracao { get; set; }

        public virtual ICollection<CadComposicaoControle> ComposicaoControleUsuarioAlteracao { get; set; }

        public virtual ICollection<CadOutrasDespControle> OutrasDespControleUsuarioAlteracao { get; set; }

        public virtual ICollection<CadSaldoControle> SaldosUsuario { get; set; }

        public virtual ICollection<CadSaldoControle> SaldosUsuarioAlteracao { get; set; }

        public virtual ICollection<AlertaHistorico> AlertaHistoricos { get; set; }

        public virtual ICollection<AlertaQuarentena> AlertasQuarentena { get; set; }
        

    }
}
