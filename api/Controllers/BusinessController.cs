using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessController : ControllerBase
    {
        // GET: api/Business
        [HttpGet]
        public IEnumerable<Business> Get()
        {
            List<Business> businesses = BusinessUtility.GetBusinessData();
            return businesses;
        }

        // GET: api/Business/5
        [HttpGet("{id}")]
        public Business Get(int id)
        {
            BusinessUtility utility = new BusinessUtility();
            List<Business> businesses = BusinessUtility.GetBusinessData();
            foreach(Business b in businesses){
                if(b.BusinessID == id){
                    return b;
                }
            }
                return new Business();
        }

        // POST: api/Business
        [HttpPost]
        public void Post([FromBody] Business business)
        {
            if (business != null)
            {
                BusinessUtility.InsertBusinessData(business);
            }
        }

        // PUT: api/Business/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Business/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] BusinessLogin loginBusiness)
        {
            var businesses = BusinessUtility.GetBusinessData();
            var business = businesses.FirstOrDefault(b => b.Email == loginBusiness.Email && b.Password == loginBusiness.Password);
            
            if (business != null)
            {
                return Ok(new { success = true, businessid = business.BusinessID });
            }
            else
            {
                return Ok(new { success = false });
            }
        }
    }
}
