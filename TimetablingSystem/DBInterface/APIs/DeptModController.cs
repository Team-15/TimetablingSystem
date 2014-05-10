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

        protected override void Dispose(bool disposing)
        {

            if (_db != null) _db.Dispose();

            base.Dispose(disposing);

        }

    }
}
