using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TimetablingSystem.Models
{
    public class UserModel
    {

        [Required]
        [Display(Name="Username/Department")]
        public string username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name="Password")]
        public string password { get; set; }

    }
}