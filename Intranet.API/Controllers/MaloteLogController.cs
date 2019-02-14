﻿using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class MaloteLogController : ApiController
    {
        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<MaloteLog> GetAll()
        {
            var context = new AlvoradaContext();

            return context.MalotesLog;
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<MaloteLog> GetById(int Id)
        {
            var context = new AlvoradaContext();

            return context.MalotesLog.Where(x => x.IdMalote == Id);
        }
    }
}
