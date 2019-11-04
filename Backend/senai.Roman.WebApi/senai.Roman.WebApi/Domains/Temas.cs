using System;
using System.Collections.Generic;

namespace senai.Roman.WebApi.Domains
{
    public partial class Temas
    {
        public Temas()
        {
            Projetos = new HashSet<Projetos>();
        }

        public int IdTema { get; set; }
        public string Nome { get; set; }
        public bool? Ativo { get; set; }

        public ICollection<Projetos> Projetos { get; set; }
    }
}
