using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TimetablingSystem.Models;

namespace TimetablingSystem.DBInterface
{
    [Authorize]
    public class DeptModController : ApiController
    {

        private TimetablingSystemContext _db = new TimetablingSystemContext();
        

        public NonSensitiveDepartment GetAuthorisedDepartment()
        {

            department dept = _db.departments.SingleOrDefault(d => d.code == HttpContext.Current.User.Identity.Name);

            NonSensitiveDepartment nsDept = new NonSensitiveDepartment(dept.code, dept.name);
            
            return nsDept;

        }

        [AllowAnonymous]
        public IList<NonSensitiveDepartment> GetAllDepartments()
        {

            var deptList = _db.departments
                .OrderBy(d => d.name)
                .ToList()
                .Select(d => new NonSensitiveDepartment(d.code, d.name));

            return deptList.ToList();

        }


        public HttpResponseMessage PostChangePassword(Models.PasswordModel pm)
        {

            Authentication auth = new Authentication();

            string deptCode = GetAuthorisedDepartment().code;

            bool correctPassword = auth.ValidateUser(deptCode, pm.currentPassword);

            if (correctPassword)
            {

                if (ModelState.IsValid)
                {

                    department dept =
                        (from d in _db.departments
                         where d.code == deptCode
                         select d).FirstOrDefault();

                    string deptSalt = dept.salt;

                    string newDeptPassword = auth.HashPassword(pm.newPassword, deptSalt);

                    dept.hashedPassword = newDeptPassword;

                    _db.Entry(dept).CurrentValues.SetValues(dept);

                    _db.SaveChanges();

                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, pm);
                    response.Headers.Location = new Uri(Url.Link("DefaultApi", null));
                    return response;

                }
                else return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);

            }
            else return Request.CreateErrorResponse(HttpStatusCode.OK, "Invalid Password");

        }
        


        public IEnumerable<module> GetActiveModules()
        {
            NonSensitiveDepartment nsDept = GetAuthorisedDepartment();

            var moduleList =
                from mods in _db.modules
                where mods.active == true && mods.deptCode == nsDept.code
                select mods;


            return moduleList;

        }

        public IEnumerable<module> GetDepartmentModules()
        {
            NonSensitiveDepartment nsDept = GetAuthorisedDepartment();

            var moduleList =
                from mods in _db.modules
                where mods.deptCode == nsDept.code
                select mods;


            return moduleList;

        }
        
        public IEnumerable<module>  GetAllModules()
        {

            var moduleList = 
                from mods in _db.modules
                where mods.active == true
                select mods;

            return moduleList;

        }



        public HttpResponseMessage PostAddModules(List<NewModule> amList)
        {

            if (ModelState.IsValid)
            {

                foreach (NewModule nm in amList)
                {

                    module moduleCheck =
                        (from mod in _db.modules
                         where mod.code == nm.code
                         select mod).FirstOrDefault();

                    if (moduleCheck != null)
                    {

                        if (!moduleCheck.active)
                        {
                            _db.modules.Remove(moduleCheck);

                            _db.SaveChanges();
                        }
                        else return Request.CreateErrorResponse(HttpStatusCode.OK, "New modules could not be creatd. \nModule " + moduleCheck.code + " Already Exists");
                        
                    }

                    module addNewModule = new module();

                    addNewModule.code = nm.code;
                    addNewModule.title = nm.title;
                    addNewModule.deptCode = GetAuthorisedDepartment().code;
                    addNewModule.active = true;

                    _db.modules.Add(addNewModule);
                    
                }

                _db.SaveChanges();

                
            }
            else return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, amList);
            response.Headers.Location = new Uri(Url.Link("DefaultApi", null));
            return response;

        }

        public HttpResponseMessage PostEditModule(List<EditModules> emList)
        {

            if (ModelState.IsValid)
            {

                foreach (EditModules em in emList)
                {

                    module editModule =
                        (from mod in _db.modules
                         where mod.code == em.originalCode
                         select mod).FirstOrDefault();

                    editModule.code = em.newCode;
                    editModule.title = em.newTitle;

                    _db.Entry(editModule).CurrentValues.SetValues(editModule);

                    _db.SaveChanges();

                }
           
            }
            else return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);


            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, emList);
            response.Headers.Location = new Uri(Url.Link("DefaultApi", null));
            return response;

        }

        public HttpResponseMessage PostDeleteModules(List<string> dm)
        {

            if (ModelState.IsValid)
            {

                foreach (string mCode in dm)
                {

                    module deleteModule =
                        (from mod in _db.modules
                         where mod.code == mCode
                         select mod).FirstOrDefault();

                    deleteModule.active = false;

                    _db.Entry(deleteModule).CurrentValues.SetValues(deleteModule);

                    _db.SaveChanges();

                }

            }
            else return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dm);
            response.Headers.Location = new Uri(Url.Link("DefaultApi", null));
            return response;

        }



        protected override void Dispose(bool disposing)
        {

            if (_db != null) _db.Dispose();

            base.Dispose(disposing);

        }

    }
}
