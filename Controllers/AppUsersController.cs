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
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await getAllAppUsersAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(Guid id)
        {
            var user = await getAppUserByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, AppUser user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<AppUser>> PostUser(AppUser user)
        {
            _context.AppUsers.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AppUser>> DeleteUser(int id)
        {
            var user = await _context.AppUsers.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.AppUsers.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpGet("{id}/projects")]
        public async Task<ActionResult<IEnumerable<Project>>> GetAppUserProjects(Guid id)
        {
            AppUser user = await getAppUserByIdAsync(id);
            if (user == null)
            {
                return BadRequest();
            }
            return user.GetProjects();
        }

        [HttpGet("{id}/tickets/")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetAppUserTickets(Guid id)
        {
            AppUser user = await getAppUserByIdAsync(id);
            if (user == null)
            {
                return BadRequest();
            }
            return user.GetTickets();
        }

        private bool UserExists(Guid id)
        {
            return _context.AppUsers.Any(e => e.Id == id);
        }

        private IQueryable<AppUser> appUserQuery()
        {
            return _context.AppUsers
                .Include(p => p.Assignments)
                    .ThenInclude(a => a.Project)
                        .ThenInclude(p => p.Tickets)
                .Include(p => p.Edits);
        }

        private async Task<ActionResult<IEnumerable<AppUser>>> getAllAppUsersAsync()
        {
            return await appUserQuery().ToListAsync();
        }

        private async Task<AppUser> getAppUserByIdAsync(Guid id)
        {
            return await appUserQuery().FirstOrDefaultAsync(a => a.Id == id);
        }
    }
}
