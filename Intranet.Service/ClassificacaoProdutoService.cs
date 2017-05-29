using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Service
{
    public class ClassificacaoProdutoService : ServiceBase<ClassificacaoProduto>, IClassificacaoProdutoService
    {
        private readonly IClassificacaoProdutoRepository _repository;

        public ClassificacaoProdutoService(IClassificacaoProdutoRepository repository)
            : base(repository)
        {
            this._repository = repository;
        }

        public List<ClassificacaoProduto> GetAllVinculado(string nomeClassificacao)
        {

            var result = new List<ClassificacaoProduto>();

            var raiz = _repository.GetAll().Where(x => x.NmClassificacaoProduto == nomeClassificacao).FirstOrDefault();

            if (raiz != null)
            {
                result.Add(raiz);
                var raizDois = _repository.GetAll().Where(x => x.CdClassificacaoProdutoPai == raiz.CdClassificacaoProduto);
                if (raizDois != null)
                {
                    foreach (var obj in raizDois)
                    {
                        result.Add(obj);

                        var raizTres = _repository.GetAll().Where(x => x.CdClassificacaoProdutoPai == obj.CdClassificacaoProduto);
                        if (raizTres != null)
                        {
                            foreach (var obj2 in raizTres)
                            {
                                result.Add(obj2);

                                var raizQuatro = _repository.GetAll().Where(x => x.CdClassificacaoProdutoPai == obj2.CdClassificacaoProduto);
                                if (raizQuatro != null)
                                {
                                    foreach (var obj3 in raizQuatro)
                                    {
                                        result.Add(obj3);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return result;
        }

        public void AlterarClassificacaoProduto(ClassificacaoProduto objView)
        {
            var result = new List<ClassificacaoProduto>();

            var raiz = _repository.GetAll().Where(x => x.NmClassificacaoProduto == objView.NmClassificacaoProduto).FirstOrDefault();

            if (raiz != null)
            {
                raiz.CdComprador = objView.CdComprador == null ? raiz.CdComprador : objView.CdComprador;
                raiz.PrMargem = objView.PrMargem == null ? raiz.PrMargem : objView.PrMargem;
                raiz.NrCobertura = objView.NrCobertura == null ? raiz.NrCobertura : objView.NrCobertura;
                raiz.PrMargemMinima = objView.PrMargemMinima == null ? raiz.PrMargemMinima : objView.PrMargemMinima;

                _repository.Update(raiz);

                var raizDois = _repository.GetAll().Where(x => x.CdClassificacaoProdutoPai == raiz.CdClassificacaoProduto);
                if (raizDois != null)
                {
                    foreach (var obj in raizDois)
                    {
                        obj.CdComprador = objView.CdComprador == null ? obj.CdComprador : objView.CdComprador;
                        obj.PrMargem = objView.PrMargem == null ? obj.PrMargem : objView.PrMargem;
                        obj.NrCobertura = objView.NrCobertura == null ? obj.NrCobertura : objView.NrCobertura;
                        obj.PrMargemMinima = objView.PrMargemMinima == null ? obj.PrMargemMinima : objView.PrMargemMinima;

                        _repository.Update(obj);

                        var raizTres = _repository.GetAll().Where(x => x.CdClassificacaoProdutoPai == obj.CdClassificacaoProduto);
                        if (raizTres != null)
                        {
                            foreach (var obj2 in raizTres)
                            {
                                obj2.CdComprador = objView.CdComprador == null ? obj2.CdComprador : objView.CdComprador;
                                obj2.PrMargem = objView.PrMargem == null ? obj2.PrMargem : objView.PrMargem;
                                obj2.NrCobertura = objView.NrCobertura == null ? obj2.NrCobertura : objView.NrCobertura;
                                obj2.PrMargemMinima = objView.PrMargemMinima == null ? obj2.PrMargemMinima : objView.PrMargemMinima;

                                _repository.Update(obj2);

                                var raizQuatro = _repository.GetAll().Where(x => x.CdClassificacaoProdutoPai == obj2.CdClassificacaoProduto);
                                if (raizQuatro != null)
                                {
                                    foreach (var obj3 in raizQuatro)
                                    {
                                        obj3.CdComprador = objView.CdComprador == null ? obj3.CdComprador : objView.CdComprador;
                                        obj3.PrMargem = objView.PrMargem == null ? obj3.PrMargem : objView.PrMargem;
                                        obj3.NrCobertura = objView.NrCobertura == null ? obj3.NrCobertura : objView.NrCobertura;
                                        obj3.PrMargemMinima = objView.PrMargemMinima == null ? obj3.PrMargemMinima : objView.PrMargemMinima;

                                        _repository.Update(obj3);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        //public void AlterarClassificacaoProduto(ClassificacaoProduto obj)
        //{
        //    var result = this.GetAllVinculado(obj.NmClassificacaoProduto);
        //    foreach (var objAtual in result)
        //    {
        //        objAtual.CdComprador = obj.CdComprador;
        //        objAtual.PrMargem = obj.PrMargem;
        //        objAtual.NrCobertura = obj.NrCobertura;
        //        _repository.Update(objAtual);
        //    }
        //}


    }
}
