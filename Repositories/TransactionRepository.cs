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
    
    public async Task<List<UserTransaction>> GetAllTransactionsAsync(string? type, string? dateFilter)    {
        IQueryable<UserTransaction> query = _context.UserTransactions;
        if (type == "income")
        {
            query = query.Where(t => t.transactionValue > 0);
        } else if (type == "expense")
        {
            query = query.Where(t => t.transactionValue < 0);
        }

        if (!string.IsNullOrEmpty(dateFilter))
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
        return await query
            .OrderByDescending(t => t.date)
            .ThenByDescending(t => t.id)
            .ToListAsync();
    }

    public async Task<UserTransaction> GetByIdAsync(long id) =>
    await _context.UserTransactions.FindAsync(id);
    
    public async Task AddAsync(UserTransaction transaction) =>
        await _context.UserTransactions.AddAsync(transaction);
    
    public async Task DeleteAsync (UserTransaction transaction) => 
        _context.UserTransactions.Remove(transaction);
    
    public async Task UpdateAsync(UserTransaction transaction) =>
    _context.UserTransactions.Update(transaction);
    
    public async Task SaveChangesAsync() =>
    await _context.SaveChangesAsync();
    
    
    
}