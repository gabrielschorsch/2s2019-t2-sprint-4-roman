using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai.Roman.WebApi.Domains;
using senai.Roman.WebApi.Repositories;

namespace senai.Roman.WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjetosController : ControllerBase
    {
        ProjetosRepository projetosRepository = new ProjetosRepository();
        
        [HttpGet]
        public IEnumerable<Projetos> Listar()
        {
            return projetosRepository.Listar();
        }
        [HttpPost]
        public IActionResult Cadastrar (Projetos pro)
        {
            try
            {
                projetosRepository.CadastrarPro(pro);
                    return Ok();

            }
            catch(Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
        [HttpPut("{id}")]
        public IActionResult Atualizar(Projetos Pro, int id)
        {
            Projetos Atualizarpro = projetosRepository.BuscarId(id);
            if (Atualizarpro == null)
                return NotFound();
            Pro.IdProjeto = id;
            projetosRepository.Atualizar(Pro);
            return Ok();

        }


    }
}