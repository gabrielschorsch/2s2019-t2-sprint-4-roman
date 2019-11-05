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
        public  Temas BuscarPorId (int id)
        {
            using (RomanContext ctx = new RomanContext())
            {
                Temas temaBuscado = ctx.Temas.FirstOrDefault(x => x.IdTema == id);
                return temaBuscado;
            }
        }
        public void Atualizar(Temas Tem)
        {
            using (RomanContext ctx = new RomanContext())
            {
                Temas AtualizarTem = ctx.Temas.FirstOrDefault(x => x.IdTema == Tem.IdTema);
                AtualizarTem.Nome = Tem.Nome;
                AtualizarTem.IdTema = Tem.IdTema;

                ctx.Temas.Update(AtualizarTem);
                ctx.SaveChanges();
            }
        }
    }
}
