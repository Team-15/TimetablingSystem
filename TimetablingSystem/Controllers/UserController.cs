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
                    
                    dept.salt = GenerateSalt();
                    dept.hashedPassword = HashPassword("password", dept.salt);
                    
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
                    Text = dept.Code+ " - " + dept.Name,
                    Value = dept.Code
                });
            }

            return userList;

        }

        private bool UserValidator(string username, string password) 
        {

            bool valid = false;

            department user = null;

            using (TimetablingSystemContext _db = new TimetablingSystemContext())
            {
                user = _db.departments.FirstOrDefault(d => d.code == username);
                
            }

            string hashedUserInput = HashPassword(password, user.salt);

            if (user != null)
            {
                if (user.hashedPassword == hashedUserInput) valid = true;
                else ModelState.AddModelError("password", "The Password is Incorrect");
            }
            
            return valid;

        }

        private static string GenerateSalt() {

            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            byte[] saltBytes = new byte[4];
            rng.GetNonZeroBytes(saltBytes);

            return Convert.ToBase64String(saltBytes);

        }

        private static string HashPassword(string password, string salt) {

            string saltedPassword = salt + password;
            Byte[] passwordBytes = Encoding.UTF8.GetBytes(saltedPassword);

            HashAlgorithm encoder = new SHA256CryptoServiceProvider();
            Byte[] hashedPassword = encoder.ComputeHash(passwordBytes);
            
            return BitConverter.ToString(hashedPassword);

        }


    }
}
