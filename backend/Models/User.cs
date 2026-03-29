using System.ComponentModel.DataAnnotations;

namespace TransactionApp.Models;

public class User
{
    [Key]
    public Guid id { get; set; }
    public string name { get; set; }
    public string email { get; set; }
    public string password { get; set; }
    public string role { get; set; }
    
    public List<UserTransaction> transactions { get; set; }
}