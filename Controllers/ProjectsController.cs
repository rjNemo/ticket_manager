using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketManager.Data;
using TicketManager.Models;


namespace TicketManager.Controllers
{
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
        /// Returns all existing projects. 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET: api/Projects
        ///
        /// </remarks>
        /// <response code="200">Returns all existing projects</response> 
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            return await GetAllProjectsAsync();
        }

        /// <summary>
        /// Returns a specific project. 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET: api/Projects/2
        ///
        /// </remarks>
        /// <response code="200">Returns a specific project</response> 
        /// <response code="404">If the required project is null</response> 
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            Project project = await GetProjectByIdAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            return project;
        }



        // PUT: api/Projects/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        /// <summary>
        /// Updates a specific project. 
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT: api/Projects/3
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
        /// <response code="200">Returns the modified project</response> 
        /// <response code="204">Request was succesful but no content is changed</response> 
        /// <response code="404">If the required project is null</response> 
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

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

        // POST: api/Projects
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new { id = project.Id }, project);
        }

        [HttpPost("{id}/addmembers")]
        public async Task<ActionResult<Project>> PostAssignment(int id, List<AppUser> usersToAdd)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
            { return NotFound(); }

            project.AddMembers(usersToAdd);

            // foreach (var assignment in assignments)
            // { _context.Assignments.Add(assignment); }

            await _context.SaveChangesAsync();
            // try
            // {
            //     await _context.SaveChangesAsync();
            // }
            // catch (DbUpdateException)
            // {
            //     if (AssignmentExists(assignment.ProjectId))
            //     {
            //         return Conflict();
            //     }
            //     else
            //     {
            //         throw;
            //     }
            // }

            // return CreatedAtAction("GetAssignment", new { id = assignment.ProjectId }, assignment);
            return project;
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Project>> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return project;
        }
        // GET: api/Projects/5/Members
        [HttpGet("{id}/members")]
        public async Task<ActionResult<List<AppUser>>> GetProjectMembers(int id)
        {
            Project project = await GetProjectByIdAsync(id);
            if (project == null)
            { return NotFound(); }
            return project.GetMembers();
        }

        [HttpPut("{id}/members")]
        public async Task<ActionResult<Project>> SetProjectMembers(int id, List<AppUser> projectMembers)
        {
            Project project = await GetProjectByIdAsync(id);
            project.SetMembers(projectMembers);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException /* ex */)
            {
                //Log the error (uncomment ex variable name and write a log.)
                ModelState.AddModelError("", "Unable to save changes. " +
                    "Try again, and if the problem persists, " +
                    "see your system administrator.");
            }
            return NoContent();
        }

        [HttpPut("{id}/addMembers")]
        public async Task<ActionResult<Project>> AddMembersToProject(int id, List<AppUser> usersToAdd)
        {
            if (usersToAdd == null)
            {
                return BadRequest();
            }
            Project project = await GetProjectByIdAsync(id);
            project.AddMembers(usersToAdd);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException /* ex */)
            {
                //Log the error (uncomment ex variable name and write a log.)
                ModelState.AddModelError("", "Unable to save changes. " +
                    "Try again, and if the problem persists, " +
                    "see your system administrator.");
            }
            return NoContent();
        }

        [HttpPut("{id}/removeMembers")]
        public async Task<ActionResult<Project>> RemoveMembersFromProject(int id, List<AppUser> usersToRemove)
        {
            Project project = await GetProjectByIdAsync(id);
            project.RemoveMembers(usersToRemove);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException /* ex */)
            {
                //Log the error (uncomment ex variable name and write a log.)
                ModelState.AddModelError("", "Unable to save changes. " +
                    "Try again, and if the problem persists, " +
                    "see your system administrator.");
            }
            return NoContent();
        }

        private bool ProjectExists(int id)
        {
            return _context.Projects.Any(e => e.Id == id);
        }
        private bool AssignmentExists(int id)
        {
            return _context.Assignments.Any(e => e.ProjectId == id);
        }

        private async Task<ActionResult<IEnumerable<Project>>> GetAllProjectsAsync()
        {
            return await makeProjectsQueryAsync()
                .ToListAsync();
        }
        private async Task<Project> GetProjectByIdAsync(int id)
        {
            return await makeProjectsQueryAsync()
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        private IQueryable<Project> makeProjectsQueryAsync()
        {
            return _context.Projects
                .Include(p => p.Assignments)
                    .ThenInclude(a => a.User)
                .Include(p => p.Tickets)
                .Include(p => p.Manager)
                .Include(p => p.Files);
        }
    }
}
