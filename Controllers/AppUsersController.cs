using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using TicketManager.Data;
using TicketManager.Models;
using TicketManager.Resources;


namespace TicketManager.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/v1/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Returns all Users stored in the database. 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET: api/v1/Users
        ///
        /// </remarks>
        /// <response code="200">Returns a list of users</response> 
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IEnumerable<AppUserDTO>> GetUsers()
        {
            return await _context.AppUsers
                .Include(u => u.Assignments)
                    .ThenInclude(a => a.Project)
                        .ThenInclude(p => p.Tickets)
                .Include(u => u.Activities)
                .AsNoTracking()
                .Select(u => new AppUserDTO(u))
                .ToListAsync();
        }

        /// <summary>
        /// Locate a specific User stored in the database by its Id 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET: api/v1/Users/2
        ///
        /// </remarks>
        /// <response code="200">Returns a User object</response> 
        /// <response code="404">If the required User is null</response> 
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AppUserDTO>> GetUser(string id)
        {
            var user = await _context.AppUsers
                .Include(u => u.Assignments)
                    .ThenInclude(a => a.Project)
                        .ThenInclude(p => p.Tickets)
                .Include(u => u.Activities)
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }
            return new AppUserDTO(user);
        }

        /// <summary>
        /// Updates the specific user with Id. 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT: api/v1/Users/3
        ///     {
        ///         "id": "357727fd-5262-4522-b8a3-38271d43de84",
        ///         "firstName": "Thomas", 
        ///         "lastName": "Price", 
        ///         "presentation": "New Team?!",
        ///         "email": "tp@mail.com",
        ///         "phone": "0198237645"   
        ///     }
        ///
        /// </remarks>
        /// <response code="204">Request was succesful but no content is changed</response> 
        /// <response code="404">If the required User is null</response> 
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutUser(string id, AppUser user)
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

        /// <summary>
        /// Creates a  User. 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST: api/v1/Users/
        ///     {
        ///         "firstName": "Thomas", 
        ///         "lastName": "Price", 
        ///         "presentation": "New Team?!",
        ///         "email": "tp@mail.com",
        ///         "phone": "0198237645"   
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the created User</response>  
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AppUserDTO>> PostUser([FromBody] NewAppUserDTO userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = new AppUser()
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Presentation = userDto.Presentation,
                Email = userDto.Email,
                Phone = userDto.Phone,
                Picture = userDto.Picture,
            };

            _context.AppUsers.Add(user);
            await _context.SaveChangesAsync();

            var dto = new AppUserDTO(user);

            return CreatedAtAction("GetUser", new { id = user.Id }, dto);
        }

        /// <summary>
        /// Deletes the User identified by its Id 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     DELETE: api/v1/Users/5
        ///
        /// </remarks>
        /// <response code="200">Returns the deleted User</response>  
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<AppUserDTO>> DeleteUser(Guid id)
        {
            var user = await _context.AppUsers.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _context.AppUsers.Remove(user);
            await _context.SaveChangesAsync();
            var dto = new AppUserDTO(user);
            return Ok(user);
        }

        [HttpGet("{id}/projects")]
        public async Task<ActionResult<IEnumerable<ProjectDTORequest>>> GetAppUserProjects(string id)
        {
            var user = await _context.AppUsers
                .Include(u => u.Assignments)
                    .ThenInclude(a => a.Project)
                        .ThenInclude(p => p.Tickets)
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return BadRequest();
            }
            return user.GetProjects().Select(p => new ProjectDTORequest(p)).ToList();
        }

        [HttpGet("{id}/tickets/")]
        public async Task<ActionResult<IEnumerable<TicketDTORead>>> GetAppUserTickets(string id)
        {
            var user = await _context.AppUsers
                .Include(u => u.Assignments)
                    .ThenInclude(a => a.Project)
                        .ThenInclude(p => p.Tickets)
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return BadRequest();
            }
            return user.GetTickets().Select(t => new TicketDTORead(t)).ToList();
        }

        private bool UserExists(string id)
        {
            return _context.AppUsers.Any(e => e.Id == id);
        }
    }
}
