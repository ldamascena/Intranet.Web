﻿using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Applications
{
    public interface IAlertaGeralApp : IAppBase<AlertaGeral>
    {
        AlertaGeral GetGeralPorProduto(int cdProduto);
        AlertaGeral GetGeralPorProdutoNome(string nomeProduto);
        IEnumerable<AlertaGeral> Get(int? tipoAlerta = null, int? situacao = null);
    }
}
