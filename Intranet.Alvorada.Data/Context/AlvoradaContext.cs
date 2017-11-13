namespace Intranet.Alvorada.Data.Context
{
    using Domain.Entities;
    using System.Data.Entity;
    using System.Data.Entity.ModelConfiguration.Conventions;

    public partial class AlvoradaContext : DbContext
    {
        public AlvoradaContext()
            : base("AlvoradaContext")
        {
        }

        public virtual DbSet<CadMotivoDesp> CadMotivosDesp { get; set; }
        public virtual DbSet<CadSitDesp> CadSituacoesDesp { get; set; }
        public virtual DbSet<CadFornecedorDesp> CadFornecedoresDesp { get; set; }
        public virtual DbSet<CadSolDesp> CadSolicitacoesDesp { get; set; }
        public virtual DbSet<SituacaoDesp> SituacoesDesp { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }
        public virtual DbSet<Grupo> Grupos { get; set; }
        public virtual DbSet<CadAtendente> CadAtendentes { get; set; }
        public virtual DbSet<CadSupervisor> CadSupervisores { get; set; }
        public virtual DbSet<Caixa> Caixas { get; set; }
        public virtual DbSet<CadCaixaControle> CadCaixasControle { get; set; }
        public virtual DbSet<CadEntradaControle> CadEntradasControle { get; set; }
        public virtual DbSet<CadComposicaoControle> CadComposicoesControle { get; set; }
        public virtual DbSet<CadOutrasDespControle> CadOutrasDespsControle { get; set; }
        public virtual DbSet<CadSaldoControle> CadSaldosControle { get; set; }

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
        }
    }
}
