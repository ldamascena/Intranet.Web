using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Context
{
    public class DorsalItaboraiContext : DbContext 
    {
        public DorsalItaboraiContext()
            : base("DorsalItaboraiContext")
        { }

        public virtual DbSet<Operador> Operadores { get; set; }
    }
}
