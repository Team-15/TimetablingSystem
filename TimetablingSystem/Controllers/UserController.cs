using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;
using System.Security.Cryptography;
using System.Globalization;
using TimetablingSystem.DBInterface;
using System.Web.Security;

namespace TimetablingSystem.Controllers
{
    
    public class UserController : Controller
    {

        [HttpGet]
        public ActionResult LogIn()
        {
            

            return View();
        }

        [HttpPost]
        public ActionResult LogIn(Models.UserModel user)
        {
            
            if (ModelState.IsValid) if (userValidator(user.username, user.password))
            {

                FormsAuthentication.RedirectFromLoginPage(user.username, false);

                

                return RedirectToAction("Home", "Main");

            }
            
            return View();
        }

        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();

            return RedirectToAction("LogIn", "User");
        }

        private bool userValidator(string username, string password) {

            bool valid = true;
            /*
            using (var _db = new TimetablingSystemContext())
            {

                var user = _db.departments.FirstOrDefault(data => data.code == username);

                if (user != null) if (user.hash == password) valid = true;

            }
            */
            return valid;

        }






    }
}
