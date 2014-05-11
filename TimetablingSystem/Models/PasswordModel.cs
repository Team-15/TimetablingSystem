using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TimetablingSystem.Models
{
    public class PasswordModel
    {

        [Required]
        [Display(Name = "Current Password")]
        public string currentPassword { get; set; }

        [Required]
        [Display(Name = "New Password")]
        public string newPassword { get; set; }

        [Required]
        [Display(Name = "Confirm Password")]
        [Compare("newPassword")]
        public string confirmPassword { get; set; }

    }
}