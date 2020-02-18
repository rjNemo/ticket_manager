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
        private readonly IAppUserRepository _users;

        public UsersController(IAppUserRepository users)
        {
            _users = users;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IEnumerable<AppUser>> GetUsers()
        {
            return await _users.List();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(Guid id)
        {
            var user = await _users.GetUser(id);
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
            try
            {
                await _users.Update(user);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_users.Exists(id))
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
            await _users.Add(user);
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AppUser>> DeleteUser(Guid id)
        {
            var user = await _users.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }
            await _users.Delete(user);
            return user;
        }

        [HttpGet("{id}/projects")]
        public async Task<ActionResult<IEnumerable<Project>>> GetAppUserProjects(Guid id)
        {
            AppUser user = await _users.GetUser(id);
            if (user == null)
            {
                return BadRequest();
            }
            return user.GetProjects();
        }

        [HttpGet("{id}/tickets/")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetAppUserTickets(Guid id)
        {
            AppUser user = await _users.GetUser(id);
            if (user == null)
            {
                return BadRequest();
            }
            return user.GetTickets();
        }
    }
}
