using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;

namespace TimetablingSystem.DBInterface
{
    [Authorize]
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

            return deptList;

        }



        public IEnumerable<module> GetActiveDepartmentModules()
        {

            var moduleList =
                from mods in _db.modules
                where mods.active == true
                select mods;


            return moduleList;

        }

        public IEnumerable<module> GetAllDepartmentModules()
        {
            var moduleList =
                from mods in _db.modules
                where mods.department == GetAuthorisedDepartment()
                select mods;

            return moduleList;

        }


    }
}
