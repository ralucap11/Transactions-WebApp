using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TransactionApp.Models;
using TransactionApp.Repositories;
using TransactionApp.Constants;

namespace TransactionApp.Controllers;
 
    [Authorize] 
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController(ITransactionRepository _repository) : ControllerBase 
    {
        [HttpGet]
        public async Task<ActionResult<List<TransactionDTO>>> Get([FromQuery] string? type,
            [FromQuery] string? dateFilter,
            [FromQuery] string? sortOrder)
        {
            var transactions = await _repository.GetAllTransactionsAsync(type, dateFilter, sortOrder);

            var transactionDtos = transactions.Select(transaction => new TransactionDTO
            {
                id = transaction.id,
                userId = transaction.userId,
                name = transaction.name,
                date = transaction.date,
                transactionValue = transaction.transactionValue
            });
            
            return Ok(transactionDtos);
        }

        [HttpPost]
        public async Task<ActionResult<TransactionDTO>> Post(TransactionDTO userTransaction)
        {
            var transaction = new UserTransaction
            {
                id = userTransaction.id.Value,
                userId = userTransaction.userId,
                name = userTransaction.name,
                date = userTransaction.date,
                transactionValue = userTransaction.transactionValue
            };
            
            await  _repository.AddAsync(transaction);
            await _repository.SaveChangesAsync();
            return Ok(userTransaction);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDTO>> GetAll(int id)
        {
            var transaction = await _repository.GetByIdAsync(id);
            if(transaction == null) return NotFound();
            
            return new TransactionDTO
            {
                id = transaction.id,
                userId = transaction.userId,
                name = transaction.name,
                date = transaction.date,
                transactionValue = transaction.transactionValue
            };
        }

        [HttpDelete("{id}")]
        [Authorize (Roles = UserRoles.Admin)] 
        public async Task<ActionResult<TransactionDTO>> Delete(long id)
        {
            var transaction = await _repository.GetByIdAsync(id);
            if(transaction == null) return NotFound();
            await  _repository.DeleteAsync(transaction);
            await _repository.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TransactionDTO>> Put(string id, TransactionDTO userTransaction)
        {
            if (Guid.Parse(id) != userTransaction.id)
            {
                return BadRequest("id is not correct");
            }

            var transaction = new UserTransaction
            {
                id = userTransaction.id.Value,
                userId = userTransaction.userId,
                name = userTransaction.name,
                date = userTransaction.date,
                transactionValue = userTransaction.transactionValue
            };
            
            await _repository.UpdateAsync(transaction);
            await _repository.SaveChangesAsync();
            return NoContent();
        }
        
        [HttpGet("user/{name}")]
        public async Task<ActionResult<IEnumerable<TransactionDTO>>> GetUserTransactions(string name)
        {
            var transactions = await _repository.GetByNameAsync(name);

            if (transactions == null)
            {
                return NotFound();
            }
            
            var transactionDtos = transactions.Select(transaction => new TransactionDTO
            {
                id = transaction.id,
                userId = transaction.userId,
                name = transaction.name,
                date = transaction.date,
                transactionValue = transaction.transactionValue
            });
            
            return Ok(transactionDtos);
        }
    }
