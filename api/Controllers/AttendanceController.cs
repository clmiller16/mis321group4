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
    public class AttendanceController : ControllerBase
    {
        // GET: api/Attendance
        [HttpGet]
        public IEnumerable<Attendee> Get()
        {
            List<Attendee> attendees = AttendeeUtility.GetAttendeeData();
            return attendees;
        }

        // GET: api/Attendance/5
        [HttpGet("{id}")]
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

        // POST: api/Attendance
        [HttpPost]
        public void Post([FromBody] Attendee attendee)
        {
            if (attendee != null)
            {
                AttendeeUtility.InsertAttendeeData(attendee);
            }
        }

        // PUT: api/Attendance/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {

        }

        // DELETE: api/Attendance/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

        }
    }
}
