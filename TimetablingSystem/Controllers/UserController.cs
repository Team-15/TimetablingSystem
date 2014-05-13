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
using TimetablingSystem.Models;

namespace TimetablingSystem.Controllers
{
    
    public class UserController : Controller
    {

        private Authentication auth = new Authentication();

        [HttpGet]
        public ActionResult LogIn()
        {

            ViewData["userList"] = GetUserList();

            return View();
        }

        [HttpPost]
        public ActionResult LogIn(Models.UserModel user)
        {
            
            if (ModelState.IsValid)
            {

                if (UserValidator(user.username, user.password))
                {

                    FormsAuthentication.SetAuthCookie(user.username, false);

                    return RedirectToAction("Home", "Main");

                } 

            }

            ViewData["userList"] = GetUserList();

            return View();
        }

        [AllowAnonymous]
        public ActionResult SignOut()
        {
             FormsAuthentication.SignOut();

             return RedirectToAction("LogOut", "User");
        }

        public ActionResult LogOut()
        {
            return View();
        }



        [Authorize]
        public ActionResult SetupUsers()
        {
   
            using (var _db = new TimetablingSystemContext())
            {

                var deptList = _db.departments;

                foreach (DBInterface.department dept in deptList)
                {

                    dept.salt = auth.GenerateSalt();
                    dept.hashedPassword = auth.HashPassword("w6vnh4n", dept.salt);
                    
                }

                _db.SaveChanges();
                
            }
            
            return Content("All users returned to default password");

        }


        private DeptModController deptMod = new DeptModController();

        private List<SelectListItem> GetUserList() 
        {

            List<SelectListItem> userList = new List<SelectListItem>();

            IList<NonSensitiveDepartment> deptList = deptMod.GetAllDepartments();

            foreach (NonSensitiveDepartment dept in deptList)
            {
                userList.Add(new SelectListItem
                {
                    Text = dept.code+ ":  " + dept.name,
                    Value = dept.code
                });
            }

            return userList;

        }

        private bool UserValidator(string username, string password) 
        {
            
            bool valid = false;

            bool state = auth.ValidateUser(username, password);

            if (state) valid = true;
            else ModelState.AddModelError("password", "The Password is Incorrect");
            
            return valid;

        }


    }
}
