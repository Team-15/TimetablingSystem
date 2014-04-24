using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TimetablingSystem.DBInterface
{
    public class DBTestController : Controller
    {
        //
        // GET: /DBTest/

        TimetablingSystemContext _db = new TimetablingSystemContext();

        public ActionResult Index()
        {

            var moduleQuery =
                    from mRes in _db.modules
                    //where mRes.deptCode == "CO"
                    orderby mRes.code ascending
                    select mRes;

            return Json(moduleQuery.Select(
                x => new { 
                    code = x.code,
                    title = x.title,
                    deptCode = x.deptCode,
                    active = x.active
                }), JsonRequestBehavior.AllowGet);

        }

        protected override void Dispose(bool disposing)
        {
            
            if (_db != null) _db.Dispose();

            base.Dispose(disposing);

        }


    }
}
