using System;
using System.Collections.Generic;

namespace senai.Roman.WebApi.Domains
{
    public partial class Usuarios
    {
        public int IdUsuario { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Foto { get; set; }
        public int? IdPermissao { get; set; }

        public Permissao IdPermissaoNavigation { get; set; }
    }
}
