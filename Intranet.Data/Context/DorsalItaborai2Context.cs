using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Context
{
    public class DorsalItaborai2Context : DbContext 
    {
        public DorsalItaborai2Context()
            : base("DorsalItaborai2Context")
        { }

        public virtual DbSet<Operador> Operadores { get; set; }
    }
}
