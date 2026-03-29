namespace TransactionApp.Models;

public class TransactionDTO
{
    public Guid? id { get; set; }
    public Guid userId { get; set; }
    public string name { get; set; }
    public decimal transactionValue { get; set; }
    public  DateTime date { get; set; }
}