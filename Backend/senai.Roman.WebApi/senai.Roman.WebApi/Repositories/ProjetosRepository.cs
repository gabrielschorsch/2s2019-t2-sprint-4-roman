using Microsoft.EntityFrameworkCore;
using senai.Roman.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.Roman.WebApi.Repositories
{
    public class ProjetosRepository
    {
        public List<Projetos> Listar()
        {
            using (RomanContext ctx = new RomanContext())
                return ctx.Projetos.Include(x => x.IdTemaNavigation).ToList();
        }
        public void CadastrarPro(Projetos pro)
        {
            using (RomanContext ctx = new RomanContext())
            {

                ctx.Projetos.Add(pro);
                ctx.SaveChanges();
            };
        }
        public Projetos BuscarId (int id)
        {
            using (RomanContext ctx = new RomanContext())
            {
                return ctx.Projetos.FirstOrDefault(x => x.IdProjeto == id);
            }
        }


        public void Atualizar (Projetos pro)
        {
            using (RomanContext ctx = new RomanContext())
            {
                Projetos AtualizarPro = ctx.Projetos.FirstOrDefault(x => x.IdProjeto == pro.IdProjeto);
                AtualizarPro.Nome = pro.Nome;
                AtualizarPro.IdTema = pro.IdTema;

                ctx.Projetos.Update(AtualizarPro);
                ctx.SaveChanges();
            }
        }
    }
}
