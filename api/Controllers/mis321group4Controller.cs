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
    public class mis321group4Controller : ControllerBase
    {
        // GET: api/mis321group4
        [HttpGet]
        public IEnumerable<Attendee> Get()
        {
            List<Attendee> attendees = AttendeeUtility.GetAttendeeData();
            return attendees;
        }

        // GET: api/mis321group4/5
        [HttpGet("{id}", Name = "Get")]
        public Attendee Get(int id)
        {
            AttendeeUtility utility = new AttendeeUtility();
            List<Attendee> attendees = AttendeeUtility.GetAttendeeData();
            foreach(Attendee attendee in attendees){
                if(attendee.AttendeeID == id){
                    return attendee;
                }
            }
            return new Attendee();
        }

        // POST: api/mis321group4
        [HttpPost]
        public void Post([FromBody] Attendee attendee)
        {
            if (attendee != null)
            {
                AttendeeUtility.InsertAttendeeData(attendee);
            }
        }


        // PUT: api/mis321group4/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/mis321group4/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
