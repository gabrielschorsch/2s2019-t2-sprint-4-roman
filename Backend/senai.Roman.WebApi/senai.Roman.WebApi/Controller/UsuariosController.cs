using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using senai.Roman.WebApi.Domains;
using senai.Roman.WebApi.Repositories;
using senai.Roman.WebApi.ViewModel;

namespace senai.Roman.WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        UsuariosRepository usuariosRepository = new UsuariosRepository();

        [HttpPost]
        public IActionResult Login(LoginViewModel login)
        {
          
            try
            {
                Usuarios usuarioBuscado = usuariosRepository.Login(login);
                if (usuarioBuscado == null)
                    return NotFound(new { mensagem = "Email ou Senha Inválidos." });

                // informacoes referentes ao usuarios
                var claims = new[]
               {
                        new Claim("chave", "0123456789"),
                        new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email),
                        new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.IdUsuario.ToString()),
                        new Claim(ClaimTypes.Role, usuarioBuscado.IdPermissaoNavigation.Nome),
                    };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("Roman-chave-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "Roman.WebApi",
                    audience: "Roman.WebApi",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro ao cadastrar." + ex.Message });
            }
        }
        [Route("Cadastrar")]
        [HttpPost]
        public IActionResult Cadastrar(Usuarios user)
        {
            usuariosRepository.CadastrarUser(user);
            return Ok();
        }
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(usuariosRepository.Listar());
        }
    }
}