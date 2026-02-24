
using Microsoft.EntityFrameworkCore;
using TransactionApp.Models;

namespace TransactionApp.Repositories;


public interface ITransactionRepository
{
    Task<List<UserTransaction>> GetAllTransactionsAsync(string? type, string? dateFilter, string? sortOrder); 
    Task<UserTransaction?>GetByIdAsync(long id);
    Task AddAsync(UserTransaction userTransaction);
    Task UpdateAsync(UserTransaction userTransaction);
    Task DeleteAsync(UserTransaction userTransaction);
    Task SaveChangesAsync(); 
 }