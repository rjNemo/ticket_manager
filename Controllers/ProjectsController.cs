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
            return await _context.Projects.ToListAsync();
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
            { return NotFound(); }

            return project;
        }

        // GET: api/Projects/5/Members
        [HttpGet("{id}/members")]
        public async Task<ActionResult<IEnumerable<User>>> GetProjectMembers(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
            { return NotFound(); }

            return project.GetMembers();
        }

        // PUT: api/Projects/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            if (id != project.Id)
            { return BadRequest(); }

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
        public async Task<ActionResult<Project>> PostAssignment(int id, List<User> usersToAdd)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
            { return NotFound(); }

            List<Assignment> assignments = project.AddMembers(usersToAdd);

            foreach (var assignment in assignments)
            { _context.Assignments.Add(assignment); }

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

        private bool ProjectExists(int id)
        {
            return _context.Projects.Any(e => e.Id == id);
        }
        private bool AssignmentExists(int id)
        {
            return _context.Assignments.Any(e => e.ProjectId == id);
        }
    }
}
