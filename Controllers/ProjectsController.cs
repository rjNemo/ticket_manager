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
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            return await GetAllProjectsAsync();
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
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
        [HttpPut("{id}")]
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

        [HttpGet("{id}/members")]
        public async Task<ActionResult<List<User>>> GetProjectMembers(int id)
        {
            Project project = await GetProjectByIdAsync(id);
            return project.GetMembers();
        }

        [HttpPut("{id}/setMembers")] // test put & post
        public async Task<ActionResult<Project>> SetProjectMembers(int id, List<User> projectMembers)
        {
            Project project = await GetProjectByIdAsync(id);

            project.SetMembers(projectMembers);
            await _context.SaveChangesAsync();

            return project;
        }

        [HttpPut("{id}/addMembers")]
        public async Task<ActionResult<Project>> AddMembersToProject(int id, List<User> usersToAdd)
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


            return project;
        }

        [HttpPost("{id}/removeMembers")]
        public async Task<ActionResult<Project>> RemoveMembersToProject(int id, List<User> usersToRemove)
        {
            Project project = await GetProjectByIdAsync(id);

            project.RemoveMembers(usersToRemove);
            await _context.SaveChangesAsync();

            return project;
        }

        private bool ProjectExists(int id)
        {
            return _context.Projects.Any(e => e.Id == id);
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

        private IQueryable<TicketManager.Models.Project> makeProjectsQueryAsync()
        {
            return _context.Projects
                .Include(p => p.Assignments)
                    .ThenInclude(a => a.User)
                .Include(p => p.Tickets)
                .Include(p => p.Manager)
                .Include(p => p.Files)
                .AsNoTracking();
        }

    }
}
