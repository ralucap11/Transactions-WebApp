using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using TransactionApp.Models;

namespace TransactionApp.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }
    public DbSet<UserTransaction> UserTransactions { get; set; }
}