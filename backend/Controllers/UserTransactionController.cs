using Microsoft.AspNetCore.Mvc;
using TransactionApp.Models;
using TransactionApp.Repositories;

namespace TransactionApp.Controllers;


    [Route("api/[controller]")]
    [ApiController]
    public class UserTransactionController : ControllerBase
    {
        private readonly ITransactionRepository _repository;

        public UserTransactionController(ITransactionRepository repository)
        {
            _repository = repository;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<UserTransaction>>> Get([FromQuery] string? type,
            [FromQuery] string? dateFilter,
            [FromQuery] string? sortOrder)
        {
            var transactions = await _repository.GetAllTransactionsAsync(type, dateFilter, sortOrder);
            return Ok(transactions);
        }

        [HttpPost]
        public async Task<ActionResult<UserTransaction>> Post(UserTransaction userTransaction)
        {
            await  _repository.AddAsync(userTransaction);
            await _repository.SaveChangesAsync();
            return Ok(userTransaction);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserTransaction>> GetAll(int id)
        {
            var transaction = await _repository.GetByIdAsync(id);
            if(transaction == null) return NotFound();
            return transaction;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<UserTransaction>> Delete(long id)
        {
            var transaction = await _repository.GetByIdAsync(id);
            if(transaction == null) return NotFound();
            await  _repository.DeleteAsync(transaction);
            await _repository.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserTransaction>> Put(int id, UserTransaction userTransaction)
        {
            if (id != userTransaction.id)
            {
                return BadRequest("id is not correct");
            }

            await _repository.UpdateAsync(userTransaction);
            await _repository.SaveChangesAsync();
            return NoContent();
        }
        
        [HttpGet("user/{name}")]
        public async Task<ActionResult<IEnumerable<UserTransaction>>> GetUserTransactions(string name)
        {
            var transactions = await _repository.GetByNameAsync(name);

            if (transactions == null)
            {
                return NotFound();
            }
            
            return Ok(transactions);
        }
    }
