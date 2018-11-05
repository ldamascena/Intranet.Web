using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Context
{
    public class DorsalRioBonito2Context : DbContext 
    {
        public DorsalRioBonito2Context()
            : base("DorsalRioBonito2Context")
        { }

        public virtual DbSet<Operador> Operadores { get; set; }
    }
}
