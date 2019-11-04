using senai.Roman.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.Roman.WebApi.Repositories
{
    public class TemaRepository
    {
        public List<Temas> Listar()
        {
            using (RomanContext ctx = new RomanContext())
                return ctx.Temas.ToList();
        }
        public void CadastrarTema(Temas tem)
        {
            using (RomanContext ctx = new RomanContext())
            {

                ctx.Temas.Add(tem);
                ctx.SaveChanges();
            };
        }
    }
}
