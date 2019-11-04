using senai.Roman.WebApi.Domains;
using senai.Roman.WebApi.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.Roman.WebApi.Repositories
{
    public class UsuariosRepository
    {
        public List<Usuarios> Listar()
        {
            using (RomanContext ctx = new RomanContext())
                return ctx.Usuarios.ToList();
        }
        public void CadastrarUser(Usuarios user)
        {
            using (RomanContext ctx = new RomanContext())
            {

                ctx.Usuarios.Add(user);
                ctx.SaveChanges();
            };
        }
        public Usuarios Login(LoginViewModel Login)
        {
            using (RomanContext ctx = new RomanContext())
            {
                Usuarios usuario = ctx.Usuarios.FirstOrDefault(x => x.Email == Login.Email && x.Senha == Login.Senha);
                if (usuario == null)
                    return null;
                return usuario;
            }
        }
    }
}
