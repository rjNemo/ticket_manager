using System.ComponentModel.DataAnnotations;

namespace TicketManager.Resources
{
    public class NewAppUserDTO
    {
        public string Id { get; set; }

        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Presentation { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }
        public string Picture { get; set; }
    }
}