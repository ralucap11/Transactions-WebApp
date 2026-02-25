using System.ComponentModel.DataAnnotations;

namespace TransactionApp.Models;

public class UserTransaction
{
    [Key]
    public long id { get; set; }
    public string name { get; set; }
    public decimal transactionValue { get; set; }
    public  DateTime date { get; set; }
    
}