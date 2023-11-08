using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.models;
using api.utilities;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        // GET: api/Transaction
        [HttpGet]
        public IEnumerable<Transaction> Get()
        {
            List<Transaction> transactions = TransactionUtility.GetTransactionData();
            return transactions;
        }

        // GET: api/Transaction/5
        [HttpGet("{id}")]
        public Transaction Get(int id)
        {
            List<Transaction> transactions = TransactionUtility.GetTransactionData();
            foreach(Transaction t in transactions){
                if(t.TransactionID == id){
                    return t;
                }
            }
            return new Transaction();
        }

        // POST: api/Transaction
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Transaction/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Transaction/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
