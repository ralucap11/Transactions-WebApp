using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TransactionApp.Data;
using TransactionApp.Models;

namespace TransactionApp.Controllers;


    [Route("api/[controller]")]
    [ApiController]
    public class UserTransactionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserTransactionController(ApplicationDbContext context)
        {
            _context = context; //DbContext is automatically injected
        }

        [HttpGet]
        public async Task<ActionResult<List<UserTransaction>>> Get()
        {
            return await _context.UserTransactions.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<UserTransaction>> Post(UserTransaction userTransaction)
        {
            _context.UserTransactions.Add(userTransaction);
            await _context.SaveChangesAsync();
            return Ok(userTransaction);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserTransaction>> GetAll(int id)
        {
            var transaction = await _context.UserTransactions.FindAsync(id);
            if(transaction == null) return NotFound();
            return transaction;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<UserTransaction>> Delete(int id)
        {
            var transaction = await _context.UserTransactions.FindAsync(id);
            if(transaction == null) return NotFound();
            _context.UserTransactions.Remove(transaction);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserTransaction>> Put(int id, UserTransaction userTransaction)
        {
            if (id != userTransaction.id)
            {
                return BadRequest("id is not correct");
            }

            _context.Entry(userTransaction).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
