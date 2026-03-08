using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TransactionApp.Models;
using TransactionApp.Data;

namespace TransactionApp.Repositories;

public class TransactionRepository : ITransactionRepository
{
    private readonly ApplicationDbContext _context;
    public TransactionRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<List<UserTransaction>> GetAllTransactionsAsync(string? type, string? dateFilter, string? sortOrder)    {
        IQueryable<UserTransaction> query = _context.UserTransactions;
        if (type == "income")
        {
            query = query.Where(t => t.transactionValue > 0);
        } else if (type == "expense")
        {
            query = query.Where(t => t.transactionValue < 0);
        }

        if (!string.IsNullOrEmpty(dateFilter) && dateFilter != "all")
        {
            DateTime cutoff = DateTime.Now;

            switch (dateFilter)
            {
                case "month": cutoff  = DateTime.Now.AddMonths(-1); break;
                case "3months": cutoff = DateTime.Now.AddMonths(-3); break;
                case "6months" :  cutoff = DateTime.Now.AddMonths(-6); break;
                case "year" : cutoff =  DateTime.Now.AddYears(-1); break;
            }
            
            query = query.Where(t => t.date >= cutoff);
        }

        if (sortOrder == "priceasc")
        {
            query = query.OrderBy(t => t.transactionValue);
        }
        else if (sortOrder == "pricedesc")
        {
            query = query.OrderByDescending(t => t.transactionValue);
        }
        else
        {
            query  = query.OrderByDescending(t => t.date).ThenByDescending(t => t.id);
        }
        return await query.ToListAsync();
    }

    public async Task<UserTransaction> GetByIdAsync(long id) =>
    await _context.UserTransactions.FindAsync(id);
    
    public async Task AddAsync(UserTransaction transaction) =>
        await _context.UserTransactions.AddAsync(transaction);
    
    public async Task DeleteAsync (UserTransaction transaction) => 
        _context.UserTransactions.Remove(transaction);
    
    public async Task UpdateAsync(UserTransaction transaction) =>
    _context.UserTransactions.Update(transaction);

    public async Task<List<UserTransaction>> GetByNameAsync(string name)
    { 
        return await _context.UserTransactions
            .Where(t => t.name == name)
            .ToListAsync();
    }

    public async Task SaveChangesAsync() =>
    await _context.SaveChangesAsync();
    
    
    
}