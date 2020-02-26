using Xunit;
using TicketManager.Models;

namespace TicketManager.Tests
{
    public class AppUserModelTests
    {
        [Fact]
        public void GetProjects_Returns3Projects()
        {
            AppUser user = new AppUser();
            Project p1 = new Project();
            Project p2 = new Project();
            Project p3 = new Project();

            Assignment a1 = new Assignment()
            {
                User = user,
                Project = p1
            };
            user.Assignments.Add(a1);
            Assignment a2 = new Assignment()
            {
                User = user,
                Project = p2
            };
            user.Assignments.Add(a2);
            Assignment a3 = new Assignment()
            {
                User = user,
                Project = p3
            };
            user.Assignments.Add(a3);

            var res = user.GetProjects().Count;
            Assert.Equal(3, res);
        }

        [Fact]
        public void GetTickets_Returns6Tickets()
        {
            AppUser user = new AppUser();
            Project p1 = new Project();
            Project p2 = new Project();
            Project p3 = new Project();
            Ticket t1 = new Ticket();
            Ticket t2 = new Ticket();
            Ticket t3 = new Ticket();
            Ticket t4 = new Ticket();
            Ticket t5 = new Ticket();
            Ticket t6 = new Ticket();

            Assignment a1 = new Assignment()
            {
                User = user,
                Project = p1
            };
            user.Assignments.Add(a1);
            Assignment a2 = new Assignment()
            {
                User = user,
                Project = p2
            };
            user.Assignments.Add(a2);
            Assignment a3 = new Assignment()
            {
                User = user,
                Project = p3
            };
            user.Assignments.Add(a3);

            p1.Tickets.Add(t1);
            p2.Tickets.Add(t2);
            p2.Tickets.Add(t3);
            p3.Tickets.Add(t4);
            p3.Tickets.Add(t5);
            p3.Tickets.Add(t6);

            var res = user.GetTickets().Count;
            Assert.Equal(6, res);
        }
    }
}
