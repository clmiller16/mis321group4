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
    public class AdminController : ControllerBase
    {
        // GET: api/Admin
        [HttpGet]
        public IEnumerable<Admin> Get()
        {
            List<Admin> admins = AdminUtility.GetAdminData();
            return admins;
        }

        // GET: api/Admin/5
        [HttpGet("{id}", Name = "Get")]
        public Admin Get(int id)
        {
            List<Admin> admins = AdminUtility.GetAdminData();
            foreach(Admin a in admins){
                if (a.AdminID == id){
                    return a;
                }
            }
            return new Admin();
        }

        // POST: api/Admin
        [HttpPost]
        public void Post([FromBody] Admin admin)
        {
            if (admin != null)
            {
                AdminUtility.InsertAdminData(admin);
            }
        }

        // PUT: api/Admin/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Admin/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        
        [HttpPost("Login")]
        public IActionResult Login([FromBody] Admin loginAdmin)
        {
            var admins = AdminUtility.GetAdminData();
            var admin = admins.FirstOrDefault(a => a.Email == loginAdmin.Email && a.Password == loginAdmin.Password);
            
            if (admin != null)
            {
                return Ok(new { success = true });
            }
            else
            {
                return Ok(new { success = false });
            }
        }
    }
}
