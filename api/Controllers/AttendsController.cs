using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;
using api.utilities;
using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendsController : ControllerBase
    {
        // GET: api/Attends
        [HttpGet]
        public IEnumerable<Attends> Get()
        {
            List<Attends> attendsplural = AttendsUtility.GetAttendsData();
            return attendsplural;

        }

        // GET: api/Attends/5
        [HttpGet("{id}")]
        // public Attends Get(int id)
        // {
        //     List<Attends> attendsplural = AttendsUtility.GetAttendsData();
        //     foreach(Attends a in attendsplural){
        //         if(a. == id){
        //             return a;
        //         }
        //     }
        //     return new Attends();
        // }

        // POST: api/Attends
        [HttpPost]
        public void Post([FromBody] Attends attends)
        {
            if(attends != null)
            {
                AttendsUtility.InsertAttendsData(attends);
            }
        }

        // PUT: api/Attends/5
        [HttpPut("{eventID}/{businessID}")]
        public void Put([FromBody] Attends attends)
        {
            if (attends != null)
            {
                AttendsUtility.EditAttendance(attends);
            }
        }

        // DELETE: api/Attends/5
        [HttpDelete("{eventID}/{businessID}")]
        public void Delete(Attends attends)
        {
            if (attends != null)
            {
                AttendsUtility.DeleteAttends(attends);
            }
            
        }
    }
}
