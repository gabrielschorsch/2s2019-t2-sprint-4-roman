using senai.Roman.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.Roman.WebApi.Repositories
{
    public class PermissaoRepository
    {
        public List<Permissao> Listar()
        {
            using (RomanContext ctx = new RomanContext())
                return ctx.Permissao.ToList();
        }
        public void CadastrarPermissao(Permissao perm)
        {
            using (RomanContext ctx = new RomanContext())
            {

                ctx.Permissao.Add(perm);
                ctx.SaveChanges();
            };
        }
    }
}
