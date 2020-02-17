using Xunit;
using TicketManager.Models;

namespace TicketManager.Tests
{
    public class TicketModelTests
    {
        [Fact]
        public void GetAssignees_Returns2()
        {
            Project project = new Project();
            Ticket ticket = new Ticket() { Project = project };
            AppUser user = new AppUser();
            AppUser user1 = new AppUser();
            Assignment assignment = new Assignment()
            {
                User = user,
                Project = project
            };
            project.Assignments.Add(assignment);
            user.Assignments.Add(assignment);

            Assignment assignment1 = new Assignment()
            {
                User = user1,
                Project = project
            };
            project.Assignments.Add(assignment);
            user.Assignments.Add(assignment);

            Assert.Equal(2, ticket.GetAssignees().Count);
        }


    }
}
