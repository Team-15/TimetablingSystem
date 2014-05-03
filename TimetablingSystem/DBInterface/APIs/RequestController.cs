using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TimetablingSystem.DBInterface;

namespace TimetablingSystem.DBInterface
{
    public class RequestController : ApiController
    {

        TimetablingSystemContext _db = new TimetablingSystemContext();

        public List<RequestsWtihLinkedData> GetRequests()
        {
            NonSensitiveDepartment nsd = (new DeptModController()).GetAuthorisedDepartment();

            IEnumerable<request> requests =
                from req in _db.requests.Include("roomsAlloc").Include("roomsPref").Include("facilities").Include("module")
                where (req.status == null || req.status == 0) &&
                        req.module.department.code == nsd.code
                select req;
            
            List<RequestsWtihLinkedData> rwldList = new List<RequestsWtihLinkedData>();

            foreach (request req in requests)
            {
                RequestsWtihLinkedData rwld = new RequestsWtihLinkedData(req);

                rwldList.Add(rwld);
            }

            return rwldList;

        }

        protected override void Dispose(bool disposing)
        {

            if (_db != null) _db.Dispose();

            base.Dispose(disposing);

        }

    }
}
