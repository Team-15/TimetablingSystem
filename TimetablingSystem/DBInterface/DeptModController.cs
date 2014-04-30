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
    //[Authorize]
    public class DeptModController : ApiController
    {

        private TimetablingSystemContext _db = new TimetablingSystemContext();

        [AllowAnonymous]
        public department GetDepartment(string code)
        { 

            department dept = _db.departments.FirstOrDefault(d => d.code == code);

            return dept;

        }
        
        public department GetAuthorisedDepartment()
        {

            department dept = _db.departments.FirstOrDefault(d => d.code == User.Identity.Name);

            return dept;

        }

        public IEnumerable<department> GetAllDepartments()
        {

            IEnumerable<department> deptList = _db.departments.OrderBy(d => d.name);

            return deptList.AsEnumerable();

        }



        public IEnumerable<module> GetActivetModules()
        {

            var moduleList =
                from mods in _db.modules
                where mods.active == true && mods.department == GetAuthorisedDepartment()
                select mods;


            return moduleList;

        }

        public IEnumerable<module> GetDepartmentModules()
        {
            var moduleList =
                from mods in _db.modules
                where mods.department == GetAuthorisedDepartment()
                select mods;

            return moduleList;

        }

        public IEnumerable<module> GetAllModules()
        {

            var moduleList = 
                from mods in _db.modules
                where mods.active == true
                select mods;


            return moduleList;

        }

    }
}
