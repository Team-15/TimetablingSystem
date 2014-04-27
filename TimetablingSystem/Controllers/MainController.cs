using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TimetablingSystem.Controllers
{
    public class MainController : Controller
    {
        public ActionResult Home()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return RedirectToAction("Login", "User");
            if (Request.IsAjaxRequest()) return PartialView();

            return View();
        }

        public ActionResult Add()
        {
            ViewBag.Message = "Your app description page.";

            if (Request.IsAjaxRequest()) return PartialView();

            return View();
        }

        

        public ActionResult Settings()
        {
            ViewBag.Message = "Your contact page.";

            if (Request.IsAjaxRequest()) return PartialView();

            return View();
        }

        


    }
}
