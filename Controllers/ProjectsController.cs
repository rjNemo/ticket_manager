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
        private UnitOfWork _context;

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
        public async Task<IEnumerable<Project>> GetProjects()
        {
            return await _context.Projects.List();
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
            Project project = await _context.Projects.Get(id);
            if (project == null) { return NotFound(); }
            return project;
        }

        // /// <summary>
        // /// Updates a specific project. 
        // /// </summary>
        // /// <remarks>
        // /// Sample request:
        // ///
        // ///     PUT: api/Projects/3
        // ///     {
        // ///         "id": "357727fd-5262-4522-b8a3-38271d43de84",
        // ///         "firstName": "Thomas", 
        // ///         "lastName": "Price", 
        // ///         "presentation": "New Team?!",
        // ///         "email": "tp@mail.com",
        // ///         "phone": "0198237645"   
        // ///     }
        // ///
        // /// </remarks>
        // /// <response code="200">Returns the modified project</response> 
        // /// <response code="204">Request was succesful but no content is changed</response> 
        // /// <response code="404">If the required project is null</response> 
        // [HttpPut("{id}")]
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(StatusCodes.Status204NoContent)]
        // [ProducesResponseType(StatusCodes.Status404NotFound)]
        // public async Task<IActionResult> PutProject(int id, Project project)
        // {
        //     if (id != project.Id) { return BadRequest(); }

        //     try
        //     {
        //         await _projectRepo.Update(project);
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!_projectRepo.Exists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return NoContent();
        // }

        // /// <summary>
        // /// Creates a  project. 
        // /// </summary>
        // /// <remarks>
        // /// Sample request:
        // ///
        // ///     POST: api/Projects/
        // ///     {
        // ///         "firstName": "Thomas", 
        // ///         "lastName": "Price", 
        // ///         "presentation": "New Team?!",
        // ///         "email": "tp@mail.com",
        // ///         "phone": "0198237645"   
        // ///     }
        // ///
        // /// </remarks>
        // /// <response code="201">Returns the created project</response>  
        // [HttpPost]
        // [ProducesResponseType(StatusCodes.Status201Created)]
        // [ProducesResponseType(StatusCodes.Status404NotFound)]
        // public async Task<ActionResult<Project>> PostProject(Project project)
        // {
        //     if (!ModelState.IsValid) { return BadRequest(); }
        //     await _projectRepo.AddAsync(project);

        //     return CreatedAtAction("GetProject", new { id = project.Id }, project);
        // }




        // /// <summary>
        // /// Deletes a  project. 
        // /// </summary>
        // /// <remarks>
        // /// Sample request:
        // ///
        // ///     DELETE: api/Projects/5
        // ///
        // /// </remarks>
        // /// <response code="200">Returns the deleted project</response>  
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(StatusCodes.Status404NotFound)]
        // [HttpDelete("{id}")]
        // public async Task<ActionResult<Project>> DeleteProject(int id)
        // {
        //     var project = await _projectRepo.GetByIdAsync(id);
        //     if (project == null)
        //     {
        //         return NotFound();
        //     }
        //     await _projectRepo.DeleteAsync(id);
        //     return project;
        // }

        // /// <summary>
        // /// Gets a project members. 
        // /// </summary>
        // /// <remarks>
        // /// Sample request:
        // ///
        // ///     GET: api/Projects/5/Members
        // ///
        // /// </remarks>
        // /// <response code="200">Returns the project members</response>  
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(StatusCodes.Status404NotFound)]
        // [HttpGet("{id}/members")]
        // public async Task<ActionResult<List<AppUser>>> GetProjectMembers(int id)
        // {
        //     Project project = await _projectRepo.GetByIdAsync(id);
        //     if (project == null)
        //     { return NotFound(); }
        //     return project.GetMembers();
        // }

        // /// <summary>
        // /// Updates a project members. 
        // /// </summary>
        // /// <remarks>
        // /// Sample request:
        // ///
        // ///     PUT: api/Projects/5/Members
        // ///     {
        // ///         "id": "357727fd-5262-4522-b8a3-38271d43de84",
        // ///         "firstName": "Thomas", 
        // ///         "lastName": "Price", 
        // ///         "presentation": "New Team?!",
        // ///         "email": "tp@mail.com",
        // ///         "phone": "0198237645"   
        // ///     }
        // /// </remarks>
        // /// <response code="204">No content</response>  
        // [ProducesResponseType(StatusCodes.Status204NoContent)]
        // [ProducesResponseType(StatusCodes.Status404NotFound)]
        // [HttpPut("{id}/members")]
        // public async Task<ActionResult<Project>> SetProjectMembers(int id, List<AppUser> projectMembers)
        // {
        //     Project project = await _projectRepo.GetByIdAsync(id);
        //     if (project == null)
        //     {
        //         return NotFound();
        //     }
        //     project.SetMembers(projectMembers);
        //     try
        //     {
        //         await _projectRepo.UpdateAsync(project);
        //     }
        //     catch (DbUpdateException /* ex */)
        //     {
        //         //Log the error (uncomment ex variable name and write a log.)
        //         ModelState.AddModelError("", "Unable to save changes. " +
        //             "Try again, and if the problem persists, " +
        //             "see your system administrator.");
        //     }
        //     return NoContent();
        // }

        // // /// <summary>
        // // /// Assign a user to a project. 
        // // /// </summary>
        // // /// <remarks>
        // // /// Sample request:
        // // ///
        // // ///     POST: api/Projects/addmembers
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
        // // ///     PUT: api/Projects/removemembers
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
