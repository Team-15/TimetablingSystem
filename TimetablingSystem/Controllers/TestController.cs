using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TimetablingSystem.Controllers
{
    public class TestController : Controller
    {
        //
        // GET: /Test/

        public ActionResult Test()
        {
            if (Request.IsAjaxRequest()) return PartialView();

            return View();
        }

        public ActionResult Test2()
        {
            if (Request.IsAjaxRequest()) return PartialView();

            return View();
        }

        public ActionResult Test3()
        {
            if (Request.IsAjaxRequest()) return PartialView();

            return View();
        }

    }
}
