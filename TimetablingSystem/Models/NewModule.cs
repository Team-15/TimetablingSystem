using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TimetablingSystem.Models
{
    public class NewModule
    {

        [Required]
        public string code { get; set; }

        [Required]
        public string title { get; set; }

    }
}