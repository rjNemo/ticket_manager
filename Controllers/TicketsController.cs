using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketManager.Data;
using TicketManager.Resources;
using TicketManager.Models;


namespace TicketManager.Controllers
{
    [Authorize]
    [Produces("application/json")]
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
        public async Task<IEnumerable<TicketDTO>> GetTickets()
        {
            return await _context.Tickets
                .Include(t => t.Project)
                    .ThenInclude(p => p.Assignments)
                        .ThenInclude(a => a.User)
                .Include(t => t.Files)
                .Include(t => t.Activities)
                .Include(t => t.Notes)
                .AsNoTracking()
                .Select(t => new TicketDTO(t))
                .ToListAsync();
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TicketDTO>> GetTicket(int id)
        {
            var ticket = await _context.Tickets
                .Include(t => t.Project)
                    .ThenInclude(p => p.Assignments)
                        .ThenInclude(a => a.User)
                .Include(t => t.Files)
                .Include(t => t.Activities)
                .Include(t => t.Notes)
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == id);

            if (ticket == null)
            {
                return NotFound();
            }
            return new TicketDTO(ticket);
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
        public async Task<ActionResult<Ticket>> PostTicket([FromBody] NewTicketDTO ticketDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ticket = new Ticket()
            {
                Title = ticketDto.Title,
                Description = ticketDto.Description,
                EndingDate = ticketDto.EndingDate,
                CreatorId = ticketDto.CreatorId,
                Category = (Category)ticketDto.Category,
                Impact = (Impact)ticketDto.Impact,
                Difficulty = (Difficulty)ticketDto.Difficulty,
                Project = await _context.Projects.FindAsync(ticketDto.ProjectId)
            };

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            var dto = new TicketDTO(ticket);
            return CreatedAtAction("GetTicket", new { id = ticket.Id }, dto);
        }

        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TicketDTO>> DeleteTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            var dto = new TicketDTO(ticket);
            return Ok(dto);
        }

        [HttpGet("{id}/assignees")]
        public async Task<ActionResult<List<AppUserDTO>>> GetTicketAssignees(int id)
        {
            Ticket ticket = await _context.Tickets
                .Include(t => t.Project)
                    .ThenInclude(p => p.Assignments)
                        .ThenInclude(a => a.User)
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == id);

            return ticket.GetAssignees().Select(u => new AppUserDTO(u)).ToList();
        }

        [HttpPut("{id}/closed")]
        public async Task<IActionResult> CloseTicket(int id)
        {
            Ticket ticket = await _context.Tickets.FindAsync(id);
            ticket.Close();
            // _context.Entry(ticket).State = EntityState.Modified;

            return await PutTicket(ticket.Id, ticket);
        }

        private bool TicketExists(int id)
        {
            return _context.Tickets.Any(e => e.Id == id);
        }
    }
}
