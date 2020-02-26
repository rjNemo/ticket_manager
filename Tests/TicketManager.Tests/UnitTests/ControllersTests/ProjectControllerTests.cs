using System;
using Xunit;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using TicketManager.Controllers;
using TicketManager.Data;
using TicketManager.Models;
using TicketManager.DTO;


namespace TicketManager.Tests
{
    public class ProjectsControllerTests
    {
        [Fact]
        public async Task Get_ReturnsListWith2Projects()
        {
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            try
            {
                var options = new DbContextOptionsBuilder<AppDbContext>()
                    .UseSqlite(connection)
                    .Options;

                // creates DB schema
                using (var context = new AppDbContext(options))
                {
                    context.Database.EnsureCreated();
                }

                // Seed DB usng one context instance
                SeedDb(options);

                using (var context = new AppDbContext(options))
                {
                    var controller = new ProjectsController(context);

                    var result = await controller.GetProjects();

                    Assert.IsAssignableFrom<IEnumerable<ProjectDTO>>(result);
                    Assert.Equal(2, result.Count);
                }
            }
            finally
            {
                connection.Close();
            }
        }

        [Fact]
        public async Task Get1_Returns1Project()
        {
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            try
            {
                var options = new DbContextOptionsBuilder<AppDbContext>()
                    .UseSqlite(connection)
                    .Options;

                // creates DB schema
                using (var context = new AppDbContext(options))
                {
                    context.Database.EnsureCreated();
                }

                // Seed DB usng one context instance
                SeedDb(options);

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
            finally
            {
                connection.Close();
            }
        }

        [Fact]
        public async Task Put1_Updates1Project()
        {
            //     ControllersTests.Wrapper(Test_PutProject, SeedDb);
            // }

            // private static async Task Test_PutProject()
            // {
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            try
            {
                var options = new DbContextOptionsBuilder<AppDbContext>()
                    .UseSqlite(connection)
                    .Options;

                // creates DB schema
                using (var context = new AppDbContext(options))
                {
                    context.Database.EnsureCreated();
                }

                // Seed DB usng one context instance
                SeedDb(options);

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
                    Assert.Equal(new DateTime(2020, 7, 21), context.Projects.Find(1).PlannedEnding);
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
                    Assert.IsType<NotFoundResult>(result);
                    Assert.Equal("Top Secret Project", context.Projects.Find(1).Title);
                    Assert.Equal(new DateTime(2020, 7, 21), context.Projects.Find(1).PlannedEnding);
                }
            }

            finally
            {
                connection.Close();
            }
        }

        [Fact]
        public async Task Post_CreatesProject()
        {
            // Create inMemory Test Database
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            try
            {
                var options = new DbContextOptionsBuilder<AppDbContext>()
                    .UseSqlite(connection)
                    .Options;

                // creates DB schema
                using (var context = new AppDbContext(options))
                {
                    context.Database.EnsureCreated();
                }

                // Seed DB usng one context instance
                SeedDb(options);

                // use another context instance to run the test
                using (var context = new AppDbContext(options))
                {
                    var proj = new Project()
                    {
                        Title = "The Third",
                        Description = "Thrice in a row",
                        PlannedEnding = DateTime.Now
                    };

                    var controller = new ProjectsController(context);

                    var result = await controller.PostProject(proj);

                    Assert.IsAssignableFrom<ProjectDTO>(result);
                    Assert.Equal(3, await context.Projects.CountAsync());
                }
            }
            finally
            {
                connection.Close();
            }
        }

        private static void SeedDb(DbContextOptions<AppDbContext> options)
        // Seed DB usng one context instance
        {
            using (var context = new AppDbContext(options))
            {
                context.Projects.AddRange(
                    new Project()
                    {
                        Id = 1,
                        Title = "Secret Project",
                        Description = "Shht Don't Ask don't tell",
                        PlannedEnding = new DateTime(2021, 7, 21)
                    },
                    new Project()
                    {
                        Id = 2,
                        Title = "Public Project",
                        Description = "It's quite obvious, isn't it?!",
                        PlannedEnding = new DateTime(2036, 6, 16)
                    });
                context.SaveChanges();
            }
        }
    }
}
