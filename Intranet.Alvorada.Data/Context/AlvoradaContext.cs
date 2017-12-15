namespace Intranet.Alvorada.Data.Context
{
    using Domain;
    using Domain.Entities;
    using System.Data.Entity;
    using System.Data.Entity.ModelConfiguration.Conventions;

    public partial class AlvoradaContext : DbContext
    {
        public AlvoradaContext()
            : base("AlvoradaContext")
        {
        }

        
        public virtual DbSet<Usuario> Usuarios { get; set; }
        public virtual DbSet<Grupo> Grupos { get; set; }

        #region Despesas

        public virtual DbSet<CadMotivoDesp> CadMotivosDesp { get; set; }
        public virtual DbSet<CadSitDesp> CadSituacoesDesp { get; set; }
        public virtual DbSet<CadFornecedorDesp> CadFornecedoresDesp { get; set; }
        public virtual DbSet<CadSolDesp> CadSolicitacoesDesp { get; set; }
        public virtual DbSet<SituacaoDesp> SituacoesDesp { get; set; }

        #endregion

        #region Controle de Caixa

        public virtual DbSet<CadAtendente> CadAtendentes { get; set; }
        public virtual DbSet<CadSupervisor> CadSupervisores { get; set; }
        public virtual DbSet<Caixa> Caixas { get; set; }
        public virtual DbSet<CadCaixaControle> CadCaixasControle { get; set; }
        public virtual DbSet<CadEntradaControle> CadEntradasControle { get; set; }
        public virtual DbSet<CadComposicaoControle> CadComposicoesControle { get; set; }
        public virtual DbSet<CadOutrasDespControle> CadOutrasDespsControle { get; set; }
        public virtual DbSet<CadSaldoControle> CadSaldosControle { get; set; }
        public virtual DbSet<VwAcompanhamentoControleCaixa> VwAcompanhamentoControleCaixa { get; set; }

        #endregion

        #region Inversão

        public virtual DbSet<AlertaInversaoHistorico> AlertasInversaoHistorico { get; set; }
        public virtual DbSet<AlertaInversao> AlertasInversao { get; set; }
        public virtual DbSet<VwAlertaInversaoAnalitico> VwAlertasInversaoAnalitico { get; set; }

        #endregion

        #region Ultimo Custo

        public virtual DbSet<AlertaUltimoCustoHistorico> AlertaUltimoCustoHistorico { get; set; }
        public virtual DbSet<AlertaUltimoCusto> AlertasUltimoCusto { get; set; }
        public virtual DbSet<VwAlertaUltCustoAnalitico> VwAlertasUltCustoAnalitico { get; set; }

        #endregion

        #region Outras

        public virtual DbSet<AlertaManual> AlertaManuais { get; set; }
        public virtual DbSet<AlertaHistorico> AlertasHistorico { get; set; }
        public virtual DbSet<AlertaTipo> AlertasTipo { get; set; }
        public virtual DbSet<AlertaQuarentena> AlertasQuarentena { get; set; }
        public virtual DbSet<AlertaStatus> AlertaStatus { get; set; }
        public virtual DbSet<AlertaBalanco> AlertasBalanco { get; set; }
        public virtual DbSet<VwAlertasAnalitico> VwAlertasAnalitico { get; set; }
        public virtual DbSet<VwAlertaGeralAnalitico> VwAlertasGeralAnalitico { get; set; }

        #endregion

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();

            modelBuilder.Entity<Grupo>()
                .HasMany(e => e.Usuarios)
                .WithMany(e => e.Grupo)
                .Map(m => m.ToTable("UsuarioGrupo").MapLeftKey("GrupoId").MapRightKey("UsuarioId"));

            modelBuilder.Entity<CadMotivoDesp>()
                .Property(e => e.Motivo)
                .IsUnicode(false);

            modelBuilder.Entity<CadMotivoDesp>()
                .HasMany(e => e.CadSolicitacoesDesp)
                .WithRequired(e => e.CadMotivoDesp)
                .HasForeignKey(e => e.IdMotivo)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CadSitDesp>()
                .Property(e => e.Descricao)
                .IsUnicode(false);

            modelBuilder.Entity<CadSitDesp>()
                .HasMany(e => e.CadSolicitacoesDesp)
                .WithRequired(e => e.CadSitDesp)
                .HasForeignKey(e => e.IdSitDesp)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CadSolDesp>()
                .Property(e => e.VlDespesa)
                .HasPrecision(15, 2)
                .HasColumnType("money");

            modelBuilder.Entity<CadSolDesp>()
                .Property(e => e.Documento)
                .IsUnicode(false);

            modelBuilder.Entity<CadSolDesp>()
                .Property(e => e.Observacao)
                .IsUnicode(false);

            modelBuilder.Entity<CadSolDesp>()
                .Property(e => e.ObservacaoAprovacao)
                .IsUnicode(false);

            modelBuilder.Entity<SituacaoDesp>()
                .Property(e => e.Situacao)
                .IsUnicode(false);

            modelBuilder.Entity<SituacaoDesp>()
                .HasMany(e => e.CadSituacoesDesp)
                .WithRequired(e => e.SitDesp)
                .HasForeignKey(e => e.IdSit)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.Aprovadores)
                .WithRequired(e => e.Aprovador)
                .HasForeignKey(e => e.IdAprovador)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.UsuariosInclusao)
                .WithRequired(e => e.UsuarioInclusao)
                .HasForeignKey(e => e.IdUsuarioInclusao)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.CaixasControleUsuario)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Caixa>()
                .HasMany(e => e.CadCaixaControle)
                .WithRequired(e => e.Caixa)
                .HasForeignKey(e => e.IdCaixa)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CadSupervisor>()
                .HasMany(e => e.CaixasControle)
                .WithRequired(e => e.Supervisor)
                .HasForeignKey(e => e.IdSupervisor)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CadAtendente>()
                .HasMany(e => e.CaixasControle)
                .WithRequired(e => e.Atendente)
                .HasForeignKey(e => e.IdAtendente)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.EntradasControleUsuario)
                .WithOptional(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.ComposicaoControleUsuario)
                .WithOptional(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.OutrasDespControleUsuario)
                .WithOptional(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.SaldosUsuario)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);


            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.CaixasControleUsuarioAlteracao)
                .WithOptional(e => e.UsuarioAlteracao)
                .HasForeignKey(e => e.IdUsuarioAlteracao);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.EntradasControleUsuarioAlteracao)
                .WithOptional(e => e.UsuarioAlteracao)
                .HasForeignKey(e => e.IdUsuarioAlteracao);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.ComposicaoControleUsuarioAlteracao)
                .WithOptional(e => e.UsuarioAlteracao)
                .HasForeignKey(e => e.IdUsuarioAlteracao);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.OutrasDespControleUsuarioAlteracao)
                .WithOptional(e => e.UsuarioAlteracao)
                .HasForeignKey(e => e.IdUsuarioAlteracao);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.SaldosUsuarioAlteracao)
                .WithRequired(e => e.UsuarioAlteracao)
                .HasForeignKey(e => e.IdUsuarioAlteracao)
                .WillCascadeOnDelete(false);

            //Alerta Histórico

            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.AlertasHistorico)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.AlertaHistoricos)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);

            // Inversão

            modelBuilder.Entity<AlertaTipo>()
                .HasMany(e => e.AlertasInversao)
                .WithRequired(e => e.AlertaTipo)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<AlertaStatus>()
                .HasMany(e => e.AlertaInversao)
                .WithRequired(e => e.AlertaStatus)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.AlertasInversao)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);

            // Ultimo Custo

            modelBuilder.Entity<AlertaTipo>()
                .HasMany(e => e.AlertaUltimoCusto)
                .WithRequired(e => e.AlertaTipo)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<AlertaStatus>()
                .HasMany(e => e.AlertaUltimoCusto)
                .WithRequired(e => e.AlertaStatus)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.AlertaUltimoCusto)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);

            // Quarentena

            modelBuilder.Entity<AlertaInversao>()
                .HasMany(e => e.AlertasQuarentena)
                .WithRequired(e => e.AlertaInversao)
                .HasForeignKey(e => new { e.CdProduto, e.CdPessoaFilial, e.CdTipoAlerta })
                .WillCascadeOnDelete(false);


            modelBuilder.Entity<AlertaUltimoCusto>()
                .HasMany(e => e.AlertasQuarentena)
                .WithRequired(e => e.AlertaUltimoCusto)
                .HasForeignKey(e => new { e.CdProduto, e.CdPessoaFilial, e.CdTipoAlerta })
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.AlertaQuarentena)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.AlertasQuarentena)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);

            // Balanço

            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.AlertasBalanco)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);
        }
    }
}
