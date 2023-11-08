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
    public class EventController : ControllerBase
    {
        // GET: api/Event
        [HttpGet]
        public IEnumerable<Event> Get()
        {
            List<Event> events = EventUtility.GetEventData();
            return events;
        }

        // GET: api/Event/5
        [HttpGet("{id}")]
        public Event Get(int id)
        {
            EventUtility utility = new EventUtility();
            List<Event> events = EventUtility.GetEventData();
            foreach(Event e in events){
                if(e.EventID == id){
                    return e;
                }
            }
                return new Event();
        }

        // POST: api/Event
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Event/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Event/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
