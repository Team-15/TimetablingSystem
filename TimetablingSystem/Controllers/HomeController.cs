using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TimetablingSystem.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (Request.IsAjaxRequest())
            {
                return PartialView("Index");
            }

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            return PartialView("About");
            //return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            return PartialView("Contact");
            //return View();
        }
    }
}