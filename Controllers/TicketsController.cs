using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketManager.Data;
using TicketManager.Models;

namespace TicketManager.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketRepository _tickets;

        public TicketsController(ITicketRepository tickets)
        {
            _tickets = tickets;
        }

        // GET: api/Tickets
        [HttpGet]
        public async Task<IEnumerable<Ticket>> GetTickets()
        {
            return await _tickets.List();
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _tickets.Get(id);
            if (ticket == null)
            {
                return NotFound();
            }
            return ticket;
        }

        // PUT: api/Tickets/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, Ticket ticket)
        {
            if (id != ticket.Id)
            {
                return BadRequest();
            }
            try
            {
                await _tickets.Update(ticket);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_tickets.Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // POST: api/Tickets
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
        {
            await _tickets.Add(ticket);
            return CreatedAtAction("GetTicket", new { id = ticket.Id }, ticket);
        }

        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ticket>> DeleteTicket(int id)
        {
            var ticket = await _tickets.Get(id);
            if (ticket == null)
            {
                return NotFound();
            }
            await _tickets.Delete(ticket);
            return ticket;
        }

        [HttpGet("{id}/assignees")]
        public async Task<ActionResult<List<AppUser>>> GetTicketAssignees(int id)
        {
            Ticket ticket = await _tickets.Get(id);
            return ticket.GetAssignees();
        }

        [HttpPut("{id}/closed")]
        public async Task<IActionResult> CloseTicket(int id)
        {
            Ticket ticket = await _tickets.Get(id);
            ticket.Close();
            return await PutTicket(ticket.Id, ticket);
        }
    }
}
