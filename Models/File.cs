using System;
using System.Collections.Generic;

namespace TicketManager.Models
{
    public class File
    {


        public int Id { get; set; }

        public string FileName { get; set; }

        private string _location;
        public string Location
        {
            get { return _location; }
            private set
            {
                string filesUrl = "";
                _location = $"{filesUrl}/{FileName}";
            }
        }
        public string Description { get; set; }
        public int Size { get; set; } // deduce auto from FileName
        public string Format { get; set; } // deduce auto from FileName

        public AppUser AddedBy { get; set; }
        public int UserId { get; set; }
        // public ITask AddedTo { get; set; }
        // public int ITaskId { get; set; }
    }
}