using System;
using Xunit;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketManager.Controllers;
using TicketManager.Data;
using TicketManager.Models;
using TicketManager.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace TicketManager.Tests
{
    public class ProjectsControllerTests
    {
        [Fact]
        public void Get_ReturnsListWith2Projects()
        {
            ControllersTests.Wrapper(Test_GetProjects, SeedDb.Projects);
        }

        private static async Task Test_GetProjects(DbContextOptions<AppDbContext> options)
        {
            using (var context = new AppDbContext(options))
            {
                var controller = new ProjectsController(context);

                var result = await controller.GetProjects();

                Assert.IsAssignableFrom<IEnumerable<ProjectDTO>>(result);
                Assert.Equal(2, result.Count);
            }
        }

        [Fact]
        public void Get1_Returns1Project()
        {
            ControllersTests.Wrapper(Test_GetProject, SeedDb.Projects);
        }

        private static async Task Test_GetProject(DbContextOptions<AppDbContext> options)
        {
            using (var context = new AppDbContext(options))
            {
                var controller = new ProjectsController(context);

                // Should Return 1 Project
                var result = await controller.GetProject(1);
                Assert.IsAssignableFrom<ProjectDTO>(result);

                // Should Return NotFound
                result = await controller.GetProject(3);
                Assert.IsType<NotFoundResult>(result);
            }
        }

        [Fact]
        public void Put1_Updates1Project()
        {
            ControllersTests.Wrapper(Test_PutProject, SeedDb.Projects);
        }

        private static async Task Test_PutProject(DbContextOptions<AppDbContext> options)
        {
            using (var context = new AppDbContext(options))
            {
                var controller = new ProjectsController(context);

                var result = await controller.PutProject(1,
                    new Project()
                    {
                        Id = 1,
                        Title = "Top Secret Project",
                        Description = "Shht Don't Ask don't tell",
                        PlannedEnding = new DateTime(2020, 7, 21)
                    }
                );

                // Should Update
                Assert.Equal("Top Secret Project", context.Projects.Find(1).Title);
                Assert.Equal(new DateTime(2020, 7, 21), context.Projects.Find(1).CreatedAt);
                Assert.IsType<NoContentResult>(result);


                result = await controller.PutProject(2,
                    new Project()
                    {
                        Id = 1,
                        Title = "Top Secret Project",
                        Description = "Shht Don't Ask don't tell",
                        PlannedEnding = new DateTime(2020, 7, 21)
                    }
                );

                // Should Return BadRequest
                Assert.NotEqual("Top Secret Project", context.Projects.Find(2).Title);
                Assert.NotEqual(new DateTime(2020, 7, 21), context.Projects.Find(2).CreatedAt);
                Assert.IsType<BadRequestResult>(result);

                // Delete updated project
                context.Projects.RemoveRange(context.Projects.Find(1));
                await context.SaveChangesAsync();

                result = await controller.PutProject(1,
                    new Project()
                    {
                        Id = 1,
                        Title = "Top Secret Project",
                        Description = "Shht Don't Ask don't tell",
                        PlannedEnding = new DateTime(2020, 7, 21)
                    }
                );

                // Should Throw
                Assert.IsType<DbUpdateConcurrencyException>(result);
                Assert.Equal("Top Secret Project", context.Projects.Find(1).Title);
                Assert.Equal(new DateTime(2020, 7, 21), context.Projects.Find(1).CreatedAt);
            }
        }

    }
}
