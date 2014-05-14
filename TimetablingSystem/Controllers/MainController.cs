﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace TimetablingSystem.Controllers
{
    [Authorize]
    public class MainController : Controller
    {

        public ActionResult Home()
        {

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
