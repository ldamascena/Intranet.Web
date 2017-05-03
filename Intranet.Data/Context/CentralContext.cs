using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Context
{
    public class CentralContext : DbContext
    {
        public CentralContext()
            : base("CentralContext")
        {

        }

        //public virtual DbSet<OrdemServicoDTO> Produtos { get; set; }
        public virtual DbSet<Alerta> Alertas { get; set; }
        public virtual DbSet<AlertaInversao> AlertasInversao { get; set; }
        public virtual DbSet<Pessoa> Pessoas { get; set; }
        public virtual DbSet<AlertaGeral> AlertasGeral { get; set; }
        public virtual DbSet<AlertaHistorico> AlertasHistorico { get; set; }
        public virtual DbSet<AlertaTipo> AlertasTipo { get; set; }
        public virtual DbSet<EstoqueFisico> EstoquesFisico { get; set; }
        public virtual DbSet<EstoqueMovimento> EstoquesMovimento { get; set; }
        public virtual DbSet<Produto> Produtos { get; set; }
        public virtual DbSet<ClassificacaoProduto> ClassificacaoProdutos { get; set; }
        public virtual DbSet<SolUsuario> SolUsuarios { get; set; }
        public virtual DbSet<PessoaJuridica> PessoasJuridica { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();

            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.AlertasInversao)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.AlertasHistorico)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<AlertaTipo>()
                .HasMany(e => e.AlertasHistorico)
                .WithRequired(e => e.AlertaTipo)
                .HasForeignKey(e => e.CdTipoAlerta)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ClassificacaoProduto>()
                .HasMany(e => e.ClassificacaoProduto1)
                .WithOptional(e => e.ClassificacaoProduto2)
                .HasForeignKey(e => new { e.CdEmpresaPai, e.CdClassificacaoProdutoPai });

            modelBuilder.Entity<SolUsuario>()
                .HasMany(e => e.ClassificacaoProdutos)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.CdComprador)
                .WillCascadeOnDelete(false);
        }


        //public override int SaveChanges()
        //{
        //    return base.SaveChanges();
        //}
    }
}
