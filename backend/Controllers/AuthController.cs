using Microsoft.AspNetCore.Mvc;
using TransactionApp.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TransactionApp.Constants;
using TransactionApp.Repositories;

namespace TransactionApp.Controllers;


[Route("api/[controller]")]
[ApiController]
public class AuthController(IUserRepository userRepository, IConfiguration _config) : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequestDTO requestDto)
    {
        var user = userRepository.GetByEmailAsync(requestDto.Email).Result;
        if (user == null)
        {
            return Unauthorized();
        }
        
        var password = requestDto.Password;
        if (!BCrypt.Net.BCrypt.EnhancedVerify(password, user.password))
        {
            return  Unauthorized();
        }

        var userId = user.id.ToString();
        var role = user.role;
        var token = GenerateJwtToken(requestDto.Email, role, userId);
        return Ok(new
        {
            username = requestDto.Email,
            role = role,
            token = token
        });
    }

    private string GenerateJwtToken(string username, string role, string userId)
    {
        var jwtSecret = _config["JwtSecret:Secret"];
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, userId),
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role)
        };
        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: credentials);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}