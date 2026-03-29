using Microsoft.AspNetCore.Mvc;
using TransactionApp.Models;
using TransactionApp.Repositories;

namespace TransactionApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController(IUserRepository _repository) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<UserDTO>> Post(UserDTO user)
    {
        User newUser = new User
        {
            id = Guid.NewGuid(),
            name = user.name,
            email = user.email,
            password = BCrypt.Net.BCrypt.EnhancedHashPassword(user.password, 13),
            role = user.role
        };
        await _repository.AddAsync(newUser);
        return Ok(user);
    }
}