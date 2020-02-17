using System.Linq;
using Xunit;
using System.Collections.Generic;
using TicketManager.Controllers;
using TicketManager.Data;
using TicketManager.Models;

namespace TicketManager.Tests
{
    public class ProjectModelTests
    {
        [Fact]
        public void InitProgressIsSetTo0()
        {
            Project project = new Project();
            Assert.Equal(0, project.Progression);
        }

        [Fact]
        public void Progress_Returns50()
        {
            Project project = new Project();
            Ticket t1 = new Ticket() { Status = Status.Done };
            Ticket t2 = new Ticket();

            project.Tickets.Add(t1);
            project.Tickets.Add(t2);

            Assert.Equal(50, project.Progression);
        }

        [Fact]
        public void GetMembers_Returns2Assignments()
        {
            Project project = new Project();
            AppUser u1 = new AppUser();
            AppUser u2 = new AppUser();

            Assignment a1 = new Assignment()
            {
                User = u1,
                Project = project
            };
            Assignment a2 = new Assignment()
            {
                User = u2,
                Project = project
            };
            project.Assignments.Add(a1);
            project.Assignments.Add(a2);
            var res = project.GetMembers().Count();
            Assert.Equal(2, res);
        }

        [Fact]
        public void AddMembers_Add3Assignments()
        {
            Project project = new Project();
            AppUser u1 = new AppUser();
            AppUser u2 = new AppUser();
            AppUser u3 = new AppUser();

            project.AddMembers(new List<AppUser> { u1, u2, u3 });
            var res = project.GetMembers().Count();
            Assert.Equal(3, res);
        }

        [Fact]
        public void RemoveMembers_Delete1Assignment()
        {
            Project project = new Project();
            AppUser u1 = new AppUser();
            AppUser u2 = new AppUser();
            AppUser u3 = new AppUser();

            project.AddMembers(new List<AppUser> { u1, u2, u3 });
            project.RemoveMembers(new List<AppUser> { u2 });
            var res = project.GetMembers().Count();
            Assert.Equal(2, res);
        }

        [Fact]
        public void SetMembers_Add3Assignments()
        {
            Project project = new Project();
            AppUser u1 = new AppUser();
            AppUser u2 = new AppUser();
            AppUser u3 = new AppUser();

            project.SetMembers(new List<AppUser> { u1, u2, u3 });
            var res = project.GetMembers().Count();
            Assert.Equal(3, res);
        }

        [Fact]
        public void SetMembers_Delete2Assignment()
        {
            Project project = new Project();
            AppUser u1 = new AppUser();
            AppUser u2 = new AppUser();
            AppUser u3 = new AppUser();

            project.SetMembers(new List<AppUser> { u1, u2, u3 });
            project.SetMembers(new List<AppUser> { u2 });
            var res = project.GetMembers().Count();
            Assert.Equal(1, res);
        }

        [Fact]
        public void CloseProject_IsClosed()
        {
            Project project = new Project() { Status = Status.InProgress };
            project.Close();
            Assert.Equal(Status.Done, project.Status);
        }
    }
}
