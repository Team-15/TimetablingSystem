using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TimetablingSystem.Controllers
{

    [Authorize]
    public class DisplayController : Controller
    {
        //
        // GET: /View/

        public ActionResult Requests()
        {
            ViewBag.Message = "Your requests page.";

            if (Request.IsAjaxRequest()) return PartialView();

            return View();
        }

        public ActionResult Results()
        {
            ViewBag.Message = "Your requests page.";

            if (Request.IsAjaxRequest()) return PartialView();

            return View();
        }

        public ActionResult MyBookings()
        {
            ViewBag.Message = "Your requests page.";

            if (Request.IsAjaxRequest()) return PartialView();

            return View();
        }

        public ActionResult AllBookings()
        {
            ViewBag.Message = "Your requests page.";

            if (Request.IsAjaxRequest()) return PartialView();

            return View();
        }

        public ActionResult History()
        {
            ViewBag.Message = "Your requests page.";

            if (Request.IsAjaxRequest()) return PartialView();

            return View();
        }

    }
}
