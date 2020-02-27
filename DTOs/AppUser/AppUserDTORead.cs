using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using TicketManager.Models;

namespace TicketManager.DTO
{
    public class AppUserDTORead
    {
        public AppUserDTORead(AppUser user)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Presentation = user.Presentation;
            Email = user.Email;
            Phone = user.Phone;
            CreationDate = user.CreationDate;
            Picture = user.Picture;
        }

        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FullName => $"{FirstName} {LastName}";

        public string Presentation { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        [DataType(DataType.Date)]
        public DateTime CreationDate { get; private set; } = DateTime.Now;

        public string Picture { get; set; }
    }
}