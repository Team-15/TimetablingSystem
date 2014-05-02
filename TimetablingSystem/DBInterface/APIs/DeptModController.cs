using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
//using System.Web;
using System.Web.Http;

namespace TimetablingSystem.DBInterface
{
    //[Authorize]
    public class DeptModController : ApiController
    {

        private TimetablingSystemContext _db = new TimetablingSystemContext();
        
        public NonSensitiveDepartment GetAuthorisedDepartment()
        {

            var dept = _db.departments
                .Where (d => d.code == User.Identity.Name)
                .Select(d => new NonSensitiveDepartment(d.code, d.name));

            return dept as NonSensitiveDepartment;

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



        public IEnumerable<module> GetActivetModules()
        {

            var moduleList =
                from mods in _db.modules
                where mods.active == true && mods.department.code == GetAuthorisedDepartment().Code
                select mods;


            return moduleList;

        }

        public IEnumerable<module> GetDepartmentModules()
        {
            var moduleList =
                from mods in _db.modules
                where mods.department.code == GetAuthorisedDepartment().Code
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

        protected override void Dispose(bool disposing)
        {

            if (_db != null) _db.Dispose();

            base.Dispose(disposing);

        }

    }
}
