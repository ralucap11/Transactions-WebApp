using Microsoft.EntityFrameworkCore;
using TransactionApp.Data;
using TransactionApp.Models;

namespace TransactionApp.Repositories;

public class UserRepository(ApplicationDbContext context) : IUserRepository
{
    public async Task<User?> GetByIdAsync(long id)
    {
        return await context.User.FindAsync(id);
    }

    public async Task AddAsync(User user)
    {
        await context.User.AddAsync(user);
        await context.SaveChangesAsync();
    }

    public void UpdateAsync(User user)
    {
        context.User.Update(user);
    }

    public void DeleteAsync(User user)
    {
        context.User.Remove(user);
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await context.User
            .Where(u => u.email == email)
            .FirstAsync();
    }
}