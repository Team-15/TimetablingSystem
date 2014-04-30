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

        public IEnumerable<department> GetAllDepartments()
        {

            var deptList = _db.departments;

            return deptList;

        }

        public department GetAuthorisedDepartment(string code)
        {

            department dept = _db.departments.FirstOrDefault(d => d.code == code);

            return dept;

        }

    }
}
