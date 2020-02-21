using System;
using Xunit;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;
using TicketManager.Controllers;
using TicketManager.Data;
using TicketManager.Models;


namespace TicketManager.Tests
{
    public class ProjectsControllerTests
    {
        [Fact]
        public async Task Get_ReturnsAListofProjects()
        {
            // Arrange
            var mockRepo = new Mock<IProjectRepository>();
            mockRepo.Setup(r => r.List())
                .ReturnsAsync(GetTestProjects());
            var controller = new ProjectsController(mockRepo.Object);

            // Act
            var result = await controller.GetProjects();

            // Assert
            var viewResult = Assert.IsAssignableFrom<IEnumerable<Project>>(result);
        }

        private List<Project> GetTestProjects()
        {
            var projects = new List<Project>();
            projects.Add(new Project()
            {
                PlannedEnding = new DateTime(2016, 7, 2),
                Id = 1,
                Title = "Test One",
            });
            projects.Add(new Project()
            {
                PlannedEnding = new DateTime(2016, 7, 1),
                Id = 2,
                Title = "Test Two"
            });
            return projects;
        }


        // [Fact]
        // public void Get_ReturnsProjectList()
        // {
        //     // Arange
        //     // var controller = new ProjectsController();

        //     // Act
        //     // var result = controller.GetProjects();

        //     // Assert
        //     // Assert.IsType<IEnumerable<Project>>(result);
        // }
    }
}
