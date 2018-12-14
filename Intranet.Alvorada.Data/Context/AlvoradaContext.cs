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
        public virtual DbSet<CadMotivoDespFilial> CadMotivoDespFiliais { get; set; }
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
        public virtual DbSet<CadSaldoControleLog> CadSaldosControleLogs { get; set; }
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

        #region LancamentoContabil

        public virtual DbSet<VwLancamentoContabilRaizFive> VwLancamentoContabilRaizFive { get; set; }
        public virtual DbSet<VwLancamentoContabilRaizFour> VwLancamentoContabilRaizFour { get; set; }
        public virtual DbSet<VwLancamentoContabilRaizOne> VwLancamentoContabilRaizOne { get; set; }
        public virtual DbSet<VwLancamentoContabilRaizThree> VwLancamentoContabilRaizThree { get; set; }
        public virtual DbSet<VwLancamentoContabilRaizTwo> VwLancamentoContabilRaizTwo { get; set; }

        #endregion

        #region CadSol e CadAss (Produto)

        public virtual DbSet<CadSolProd> CadSolProdutos { get; set; }
        public virtual DbSet<CadSolProdGrade> CadSolProdGrades { get; set; }
        public virtual DbSet<SitCadProd> SitCadProd { get; set; }
        public virtual DbSet<CadSolProdLog> CadSolProdLogs { get; set; }

        public virtual DbSet<CadAssProd> CadAssProd { get; set; }
        public virtual DbSet<CadAssProdGrade> CadAssProdGrade { get; set; }
        public virtual DbSet<CadAssProdLog> CadAssProdLogs { get; set; }

        #endregion

        #region Cad Usuario e Operador

        public virtual DbSet<CadUsuarioOperador> CadUsuariosOperadores { get; set; }
        public virtual DbSet<CadUsuarioOperadorLog> CadUsuarioOperadorLogs { get; set; }

        public virtual DbSet<Operador> Operadores { get; set; }
        public virtual DbSet<OperadorLog> OperadoresLogs { get; set; }

        public virtual DbSet<VwOperadorLog> VwOperadoresLogs { get; set; }

        #endregion

        #region Chamado de Suporte

        public virtual DbSet<ChamSuporte> ChamadosSuporte { get; set; }
        public virtual DbSet<ChamSuporteAssunto> ChamadosSuporteAssuntos { get; set; }
        public virtual DbSet<ChamSuporteLog> ChamSuporteLogs { get; set; }

        #endregion

        #region Estoque Nota

        public virtual DbSet<VwEstoqueNota> VWEstoqueNotas { get; set; }
        public virtual DbSet<VwEstoqueNotaProduto> VWEstoqueNotasProduto { get; set; }

        #endregion

        #region Malote

        public virtual DbSet<MaloteTipo> MaloteTipos { get; set; }
        public virtual DbSet<Malote> Malotes { get; set; }
        public virtual DbSet<MaloteLog> MalotesLog { get; set; }

        #endregion

        #region Estoque Agendamento

        public virtual DbSet<CadAgendamentoEstoque> CadAgendamentosEstoque { get; set; }
        public virtual DbSet<CadAgendamentoEstoqueItens> CadAgendamentosItens { get; set; }

        #endregion

        public virtual DbSet<VwAssociacoesConcluidas> VwAssociacoesConcluidas { get; set; }

        public virtual DbSet<CadSolAlterProd> CadSolAlterProdutos { get; set; }
        public virtual DbSet<CadSolAlterProdLog> CadSolAlterProdLogs { get; set; }

        public virtual DbSet<Aniversariantes> Aniversariantes { get; set; }

        #region Abastecimento

        public virtual DbSet<ParametroAbastecimento> ParametrosAbastecimento { get; set; }
        public virtual DbSet<SugestaoAbastecimento> SugestoesAbastecimento { get; set; }
        public virtual DbSet<LogAlteracaoAbastecimento> LogAlteracaoAbastecimento { get; set; }

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

            modelBuilder.Entity<CadMotivoDesp>()
                .HasMany(e => e.CadMotivoDespFiliais)
                .WithRequired(e => e.CadMotivoDesp)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.CadMotivoDespFiliais)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario)
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

            // Situação Produto

            modelBuilder.Entity<SitCadProd>()
                .HasMany(e => e.CadSolProd)
                .WithRequired(e => e.SitCadProd)
                .HasForeignKey(e => e.IdStatus)
                .WillCascadeOnDelete(false);

            // Solicitação Cadastro de Produto

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.CadSolProd)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.UsersLock)
                .WithRequired(e => e.UsuarioLock)
                .HasForeignKey(e => e.IdUserLock)
                .WillCascadeOnDelete(false);

            // Log Solicitacao Cadastro de Produto

            modelBuilder.Entity<SitCadProd>()
                .HasMany(e => e.CadSolProdLogs)
                .WithRequired(e => e.SitCadProd)
                .HasForeignKey(e => e.IdStatus)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.CadSolProdLogs)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);

            // Solicitacao Alteração de Produto

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.CadSolAlterProdutos)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.CadSolAlterProdLogs)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SitCadProd>()
                .HasMany(e => e.CadSolAlterProd)
                .WithRequired(e => e.SitCadProd)
                .HasForeignKey(e => e.IdStatus)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SitCadProd>()
                .HasMany(e => e.CadSolAlterProdLog)
                .WithRequired(e => e.SitCadProd)
                .HasForeignKey(e => e.IdStatus)
                .WillCascadeOnDelete(false);

            // Associação de Produto

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.CadAssProd)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SitCadProd>()
                .HasMany(e => e.CadAssProd)
                .WithRequired(e => e.SitCadProd)
                .HasForeignKey(e => e.IdStatus)
                .WillCascadeOnDelete(false);

            // Log Associacao de Produto

            modelBuilder.Entity<SitCadProd>()
                .HasMany(e => e.CadAssProdLogs)
                .WithRequired(e => e.SitCadProd)
                .HasForeignKey(e => e.IdStatus)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.CadAssProdLogs)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);

            // Solicitação Cad Usuario

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.CadUsuariosOperadores)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SitCadProd>()
                .HasMany(e => e.CadUsuariosOperadores)
                .WithRequired(e => e.SitCadProd)
                .HasForeignKey(e => e.IdStatus)
                .WillCascadeOnDelete(false);


            // Log Cad Usuario

            modelBuilder.Entity<SitCadProd>()
                .HasMany(e => e.CadUsuariosOperadoresLog)
                .WithRequired(e => e.SitCadProd)
                .HasForeignKey(e => e.IdStatus)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.CadUsuariosOperadoresLog)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);

            // Chamado de Suporte

            modelBuilder.Entity<ChamSuporteAssunto>()
                .HasMany(e => e.ChamadosSuporte)
                .WithRequired(e => e.ChamadoSuporteAssunto)
                .HasForeignKey(e => e.IdAssunto)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SitCadProd>()
                .HasMany(e => e.ChamadosSuporte)
                .WithRequired(e => e.Status)
                .HasForeignKey(e => e.IdStatus)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.ChamadosSuporteVinculo)
                .WithRequired(e => e.UsuarioVinculado)
                .HasForeignKey(e => e.IdVinculado)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.ChamadosSuporteUsuario)
                .WithRequired(e => e.UsuarioCadastro)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);

            // Chamado de Suporte Logs

            modelBuilder.Entity<SitCadProd>()
                .HasMany(e => e.ChamadosSuporteLog)
                .WithRequired(e => e.Status)
                .HasForeignKey(e => e.IdStatus)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.ChamadosSuporteLogUsuario)
                .WithRequired(e => e.UsuarioLog)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);

            // Saldos Logs

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.SaldoLogsUsuario)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.SaldoLogsUsuarioReabriu)
                .WithRequired(e => e.UsuarioReabriu)
                .HasForeignKey(e => e.IdUsuarioReabriu)
                .WillCascadeOnDelete(false);

            // Malotes

            modelBuilder.Entity<MaloteTipo>()
                .HasMany(e => e.Malotes)
                .WithRequired(e => e.MaloteTipo)
                .HasForeignKey(e => e.IdMalote)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.UsuarioMalotes)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuarioInclusao)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.UsuarioRecebimentoMalotes)
                .WithRequired(e => e.UsuarioRecebimento)
                .HasForeignKey(e => e.IdUsuarioRecebimento)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.UsuarioMaloteLogs)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.UsuarioAgendamento)
                .WithRequired(e => e.UsuarioCadastro)
                .HasForeignKey(e => e.IdUsuario)
                .WillCascadeOnDelete(false);
        }
    }
}
