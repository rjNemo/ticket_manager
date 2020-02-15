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
        private readonly AppDbContext _context;

        public TicketsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
        {
            return await getAllTicketsAsync();
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await getTicketByIdAsync(id);

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

            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
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
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicket", new { id = ticket.Id }, ticket);
        }

        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ticket>> DeleteTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return ticket;
        }

        [HttpGet("{id}/assignees")]
        public async Task<ActionResult<List<AppUser>>> GetTicketAssignees(int id)
        {
            Ticket ticket = await getTicketByIdAsync(id);
            return ticket.GetAssignees();
        }

        [HttpPut("{id}/closed")]
        public async Task<ActionResult> CloseTicket(int id)
        {
            Ticket ticket = await getTicketByIdAsync(id);
            ticket.Close();
            return NoContent();
        }

        private bool TicketExists(int id)
        {
            return _context.Tickets.Any(e => e.Id == id);
        }

        private IQueryable<Ticket> ticketQuery() // problem with link
        {
            return _context.Tickets
                .Include(p => p.Project)
                    .ThenInclude(a => a.Assignments)
                        .ThenInclude(p => p.User)
                // .Include(p => p.Edits)
                // .Include(p => p.Notes)
                // .Include(p => p.Files)
                .Include(p => p.Creator)
                ;
        }

        private async Task<ActionResult<IEnumerable<Ticket>>> getAllTicketsAsync()
        {
            return await ticketQuery().ToListAsync();
        }

        private async Task<Ticket> getTicketByIdAsync(int id)
        {
            return await ticketQuery().FirstOrDefaultAsync(a => a.Id == id);
        }
    }
}
