using System.Collections.Generic;
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
        private AppDbContext _dbContext;
        public ProjectsController(AppDbContext context)
        {
            _dbContext = context;
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
        public async Task<IEnumerable<Project>> GetProjects()
        {
            UnitOfWork _context = new UnitOfWork(_dbContext);
            return await _context.Projects.List();
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
        /// <response code="200">Returns a project object</response> 
        /// <response code="404">If the required project is null</response> 
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            UnitOfWork _context = new UnitOfWork(_dbContext);
            Project project = await _context.Projects.Get(id);
            if (project == null) { return NotFound(); }
            return project;
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
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            UnitOfWork _context = new UnitOfWork(_dbContext);
            if (id != project.Id) { return BadRequest(); }
            try
            {
                _context.Projects.Update(project);
                await _context.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Projects.Exists(id)) { return NotFound(); }
                else { throw; }
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
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            UnitOfWork _context = new UnitOfWork(_dbContext);
            if (!ModelState.IsValid) { return BadRequest(); }
            _context.Projects.Add(project);
            await _context.Complete();
            return CreatedAtAction("GetProject", new { id = project.Id }, project);
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
            UnitOfWork _context = new UnitOfWork(_dbContext);
            var project = await _context.Projects.Get(id);
            if (project == null)
            {
                return NotFound();
            }
            _context.Projects.Delete(project);
            await _context.Complete();
            return Ok();
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
        public async Task<ActionResult<List<AppUser>>> GetProjectMembers(int id)
        {
            UnitOfWork _context = new UnitOfWork(_dbContext);
            Project project = await _context.Projects.Get(id);
            if (project == null)
            { return NotFound(); }
            return project.GetMembers();
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
        [HttpPut("{id}/members")]
        public async Task<ActionResult<Project>> SetProjectMembers(int id, List<AppUser> projectMembers)
        {
            UnitOfWork _context = new UnitOfWork(_dbContext);
            Project project = await _context.Projects.Get(id);
            if (project == null)
            {
                return NotFound();
            }
            project.SetMembers(projectMembers);
            try
            {
                _context.Projects.Update(project);
                await _context.Complete();
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

        // // /// <summary>
        // // /// Assign a user to a project. 
        // // /// </summary>
        // // /// <remarks>
        // // /// Sample request:
        // // ///
        // // ///     POST: api/v1/Projects/addmembers
        // // ///     [{
        // // ///         "id": "357727fd-5262-4522-b8a3-38271d43de84",
        // // ///         "firstName": "Thomas", 
        // // ///         "lastName": "Price", 
        // // ///         "presentation": "New Team?!",
        // // ///         "email": "tp@mail.com",
        // // ///         "phone": "0198237645"   
        // // ///     }]
        // // ///
        // // /// </remarks>
        // // /// <response code="204">Returns the created project</response>  
        // // [ProducesResponseType(StatusCodes.Status204NoContent)]
        // // [ProducesResponseType(StatusCodes.Status404NotFound)]
        // // [HttpPut("{id}/addMembers")]
        // // public async Task<ActionResult<Project>> AddMembersToProject(int id, List<AppUser> usersToAdd)
        // // {
        // //     if (usersToAdd == null)
        // //     {
        // //         return BadRequest();
        // //     }
        // //     Project project = await GetProjectByIdAsync(id);
        // //     project.AddMembers(usersToAdd);
        // //     try
        // //     {
        // //         await _context.SaveChangesAsync();
        // //     }
        // //     catch (DbUpdateException /* ex */)
        // //     {
        // //         //Log the error (uncomment ex variable name and write a log.)
        // //         ModelState.AddModelError("", "Unable to save changes. " +
        // //             "Try again, and if the problem persists, " +
        // //             "see your system administrator.");
        // //     }
        // //     return NoContent();
        // // }

        // // /// <summary>
        // // /// Remove a user to a project. 
        // // /// </summary>
        // // /// <remarks>
        // // /// Sample request:
        // // ///
        // // ///     PUT: api/v1/Projects/removemembers
        // // ///     [{
        // // ///         "id": "357727fd-5262-4522-b8a3-38271d43de84",
        // // ///         "firstName": "Thomas", 
        // // ///         "lastName": "Price", 
        // // ///         "presentation": "New Team?!",
        // // ///         "email": "tp@mail.com",
        // // ///         "phone": "0198237645"   
        // // ///     }]
        // // ///
        // // /// </remarks>
        // // /// <response code="204">Returns the created project</response>  
        // // [ProducesResponseType(StatusCodes.Status204NoContent)]
        // // [ProducesResponseType(StatusCodes.Status404NotFound)]
        // // [HttpPut("{id}/removeMembers")]
        // // public async Task<ActionResult<Project>> RemoveMembersFromProject(int id, List<AppUser> usersToRemove)
        // // {
        // //     Project project = await GetProjectByIdAsync(id);
        // //     project.RemoveMembers(usersToRemove);
        // //     try
        // //     {
        // //         await _context.SaveChangesAsync();
        // //     }
        // //     catch (DbUpdateException /* ex */)
        // //     {
        // //         //Log the error (uncomment ex variable name and write a log.)
        // //         ModelState.AddModelError("", "Unable to save changes. " +
        // //             "Try again, and if the problem persists, " +
        // //             "see your system administrator.");
        // //     }
        // //     return NoContent();
        // // }
    }
}
