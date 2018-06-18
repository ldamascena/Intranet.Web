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
            CadSolProd = new HashSet<CadSolProd>();
            CadSolProdLogs = new HashSet<CadSolProdLog>();
            CadSolAlterProdutos = new HashSet<CadSolAlterProd>();
            CadSolAlterProdLogs = new HashSet<CadSolAlterProdLog>();
            UsersLock = new HashSet<CadSolProd>();
            CadAssProd = new HashSet<CadAssProd>();
            CadAssProdLogs = new HashSet<CadAssProdLog>();
            CadUsuariosOperadores = new HashSet<CadUsuarioOperador>();
            CadUsuariosOperadoresLog = new HashSet<CadUsuarioOperadorLog>();
            ChamadosSuporteVinculo = new HashSet<ChamSuporte>();
            ChamadosSuporteUsuario = new HashSet<ChamSuporte>();
            ChamadosSuporteLogUsuario = new HashSet<ChamSuporteLog>();
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

        //[DataMember]
        public bool EmailConfirmed { get; set; }

        [DataMember]
        [Required]
        public string PasswordHash { get; set; }

        //[DataMember]
        public bool Bloqueado { get; set; }

        //[DataMember]
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

        public virtual ICollection<CadSolProd> CadSolProd { get; set; }
        
        public virtual ICollection<CadSolProdLog> CadSolProdLogs { get; set; }

        public virtual ICollection<CadSolAlterProd> CadSolAlterProdutos { get; set; }

        public virtual ICollection<CadSolAlterProdLog> CadSolAlterProdLogs { get; set; }

        public virtual ICollection<CadSolProd> UsersLock { get; set; }

        public virtual ICollection<CadAssProd> CadAssProd { get; set; }

        public virtual ICollection<CadAssProdLog> CadAssProdLogs { get; set; }

        public virtual ICollection<CadUsuarioOperador> CadUsuariosOperadores { get; set; }

        public virtual ICollection<CadUsuarioOperadorLog> CadUsuariosOperadoresLog { get; set; }

        public virtual ICollection<ChamSuporte> ChamadosSuporteVinculo { get; set; }

        public virtual ICollection<ChamSuporte> ChamadosSuporteUsuario { get; set; }

        public virtual ICollection<ChamSuporteLog> ChamadosSuporteLogUsuario { get; set; }
    }
}
