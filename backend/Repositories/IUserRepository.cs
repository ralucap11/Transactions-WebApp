using TransactionApp.Models;

namespace TransactionApp.Repositories;

public interface IUserRepository
{
    Task<User?>GetByIdAsync(long id);
    Task AddAsync(User user);
    void UpdateAsync(User user);
    void DeleteAsync(User user);
    Task<User?> GetByEmailAsync(string name);
}