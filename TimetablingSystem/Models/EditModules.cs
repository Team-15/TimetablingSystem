using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TimetablingSystem.Models
{
    public class EditModules
    {
        [Required]
        public string originalCode { get; set; }

        [Required]
        public string newCode { get; set; }

        [Required]
        public string newTitle { get; set; }

    }
}