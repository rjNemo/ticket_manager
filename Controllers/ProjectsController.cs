using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketManager.Data;
using TicketManager.Models;
using TicketManager.DTO;
using System;

namespace TicketManager.Controllers
{
    // [Authorize(Roles = "Admin")]
    // [Authorize]
    [Produces("application/json")]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Returns all projects stored in the database. 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET: api/v1/Projects
        ///
        /// </remarks>
        /// <response code="200">Returns a list of projects</response> 
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<List<ProjectDTO>> GetProjects()
        {
            return await _context.Projects
                .Include(p => p.Assignments)
                .ThenInclude(a => a.User)
                .Include(p => p.Tickets)
                .Include(p => p.Manager)
                .Include(p => p.Files)
                .Include(p => p.Activities)
                .AsNoTracking()
                .Select(p => new ProjectDTO(p))
                .ToListAsync();
        }

        /// <summary>
        /// Locate a specific project stored in the database by its Id 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET: api/v1/Projects/2
        ///
        /// </remarks>
        /// <param name="id">Identifier of the ressource</param> 
        /// <response code="200">Returns a specific project</response> 
        /// <response code="404">If the required project is null</response> 
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProjectDTO>> GetProject(int id)
        {
            var project = await _context.Projects
                .Include(p => p.Assignments)
                        .ThenInclude(a => a.User)
                .Include(p => p.Tickets)
                .Include(p => p.Manager)
                .Include(p => p.Files)
                .Include(p => p.Activities)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
            {
                return NotFound();
            }
            return new ProjectDTO(project);
        }

        /// <summary>
        /// Updates the specific project with Id. 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT: api/v1/Projects/3
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
        /// <response code="404">If the required project is null</response> 
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutProject([FromRoute] int id, [FromBody] Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            // var project = await _context.Projects.FindAsync(projectDto.Id);

            // project.Title = projectDto.Title;
            // project.Description = projectDto.Description;
            // project.EndingDate = projectDto.EndingDate;
            // project.Manager = await _context.AppUsers.FindAsync(projectDto.Manager.Id);



            _context.Entry(project).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
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
        /// Creates a  project. 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST: api/v1/Projects/
        ///     {
        ///         "firstName": "Thomas", 
        ///         "lastName": "Price", 
        ///         "presentation": "New Team?!",
        ///         "email": "tp@mail.com",
        ///         "phone": "0198237645"   
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the created project</response>  
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProjectDTO>> PostProject([FromBody] NewProjectDTO projectDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var project = new Project()
            {
                Title = projectDto.Title,
                Description = projectDto.Description,
                EndingDate = projectDto.EndingDate,
                Manager = await _context.AppUsers.FindAsync(projectDto.ManagerId)
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            var dto = new ProjectDTO(project);
            return CreatedAtAction("GetProject", new { id = project.Id }, dto);
        }

        /// <summary>
        /// Deletes the project identified by its Id 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     DELETE: api/v1/Projects/5
        ///
        /// </remarks>
        /// <response code="200">Returns the deleted project</response>  
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            var dto = new ProjectDTO(project);
            return Ok(dto);
        }

        /// <summary>
        /// Gets a project members. 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET: api/v1/Projects/5/Members
        ///
        /// </remarks>
        /// <response code="200">Returns the project members as a list of users.</response>  
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{id}/members")]
        public async Task<ActionResult<List<AppUserDTORead>>> GetProjectMembers(int id)
        {
            Project project = await _context.Projects
                .Include(p => p.Assignments)
                        .ThenInclude(a => a.User)
                .Include(p => p.Tickets)
                .Include(p => p.Manager)
                .Include(p => p.Files)
                .Include(p => p.Activities)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
            {
                return NotFound();
            }
            return project.GetMembers().Select(m => new AppUserDTORead(m)).ToList();
        }

        /// <summary>
        /// Updates a project members. 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT: api/v1/Projects/5/Members
        ///     {
        ///         "id": "357727fd-5262-4522-b8a3-38271d43de84",
        ///         "firstName": "Thomas", 
        ///         "lastName": "Price", 
        ///         "presentation": "New Team?!",
        ///         "email": "tp@mail.com",
        ///         "phone": "0198237645"   
        ///     }
        /// </remarks>
        /// <response code="204">No content</response>  
        /// <response code="404">Not Found</response>  
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpPatch("{id}/members")]
        public async Task<ActionResult<Project>> SetProjectMembers(
            [FromRoute] int id,
            [FromBody] Guid[] membersId)
        {
            Project project = await _context.Projects
                .Include(p => p.Assignments)
                    .ThenInclude(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
            {
                return NotFound();
            }

            var projectMembers = await _context.AppUsers
                .Where(u => membersId.Contains(u.Id))
                .ToListAsync();

            project.SetMembers(projectMembers);
            _context.Entry(project).State = EntityState.Modified;
            try
            {

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                //Log the error (uncomment ex variable name and write a log.)
                ModelState.AddModelError(ex.ToString(), "Unable to save changes. " +
                    "Try again, and if the problem persists, " +
                    "see your system administrator.");
            }
            return NoContent();
        }

        private bool ProjectExists(int id)
        {
            return _context.Projects.Any(e => e.Id == id);
        }
    }
}
