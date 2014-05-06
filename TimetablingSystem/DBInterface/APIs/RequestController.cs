using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TimetablingSystem.DBInterface;

namespace TimetablingSystem.DBInterface
{
    //[Authorize]
    public class RequestController : ApiController
    {

        private TimetablingSystemContext _db = new TimetablingSystemContext();

        private NonSensitiveDepartment nsd = (new DeptModController()).GetAuthorisedDepartment();

        public List<RequestsWtihLinkedData> GetRequests()
        {

            IEnumerable<round> liveRounds = (new SemRouController()).GetLiveRoundSet();
            List<int> liveRoundsID = new List<int>();

            foreach (round rnd in liveRounds)
            {
                liveRoundsID.Add(rnd.id);
            }

            IEnumerable<request> requests =
                from req in _db.requests.Include("roomsAlloc").Include("roomsPref").Include("facilities").Include("module")
                where (req.status == null || req.status == 0) 
                        &&
                        req.module.department.code == nsd.code
                        && 
                        req.module.active == true
                        && 
                        liveRoundsID.Contains(req.roundID)
                select req;
            
            List<RequestsWtihLinkedData> rwldList = new List<RequestsWtihLinkedData>();

            foreach (request req in requests)
            {
                RequestsWtihLinkedData rwld = new RequestsWtihLinkedData(req);

                rwldList.Add(rwld);
            }

            return rwldList;

        }

        public List<RequestsWtihLinkedData> GetResults()
        {

            IEnumerable<round> liveRounds = (new SemRouController()).GetLiveRoundSet();
            List<int> liveRoundsID = new List<int>();

            foreach (round rnd in liveRounds)
            {
                liveRoundsID.Add(rnd.id);
            }


            IEnumerable<request> requests =
                from req in _db.requests.Include("roomsAlloc").Include("roomsPref").Include("facilities").Include("module")
                where (req.status == 1 || req.status == 2 || req.status == 3) 
                        &&
                        req.module.department.code == nsd.code
                        && 
                        req.module.active == true
                        && 
                        liveRoundsID.Contains(req.roundID)
                select req;

            List<RequestsWtihLinkedData> rwldList = new List<RequestsWtihLinkedData>();

            foreach (request req in requests)
            {
                RequestsWtihLinkedData rwld = new RequestsWtihLinkedData(req);

                rwldList.Add(rwld);
            }

            return rwldList;

        }

        public List<RequestsWtihLinkedData> GetBookings()
        {

            IEnumerable<round> liveRounds = (new SemRouController()).GetLiveRoundSet();
            List<int> liveRoundsID = new List<int>();

            foreach (round rnd in liveRounds)
            {
                liveRoundsID.Add(rnd.id);
            }

            IEnumerable<request> requests =
                from req in _db.requests.Include("roomsAlloc").Include("roomsPref").Include("facilities").Include("module")
                where (req.status == 2 || req.status == 3)
                        && 
                        req.module.active == true
                        && 
                        liveRoundsID.Contains(req.roundID)
                select req;

            List<RequestsWtihLinkedData> rwldList = new List<RequestsWtihLinkedData>();

            foreach (request req in requests)
            {
                RequestsWtihLinkedData rwld = new RequestsWtihLinkedData(req);

                rwldList.Add(rwld);
            }

            return rwldList;

        }

        public List<RequestsWtihLinkedData> GetAdHocBookings()
        {

            IEnumerable<round> adHocRounds = (new SemRouController()).GetAdHocRoundSet();
            List<int> adHocRoundsID = new List<int>();

            foreach (round rnd in adHocRounds)
            {
                adHocRoundsID.Add(rnd.id);
            }

            IEnumerable<request> requests =
                from req in _db.requests.Include("roomsAlloc").Include("roomsPref").Include("facilities").Include("module")
                where (req.status == 2 || req.status == 3)
                        && 
                        req.module.active == true
                        && 
                        adHocRoundsID.Contains(req.roundID)
                select req;

            List<RequestsWtihLinkedData> rwldList = new List<RequestsWtihLinkedData>();

            foreach (request req in requests)
            {
                RequestsWtihLinkedData rwld = new RequestsWtihLinkedData(req);

                rwldList.Add(rwld);
            }

            return rwldList;

        }



        public void PostNewRequest(RequestsWtihLinkedData rwld)
        {

        }

        public void PostUpdateRequest(RequestsWtihLinkedData rwld)
        {

        }

        public void DeleteRequest(RequestsWtihLinkedData rwld)
        {

        }





        protected override void Dispose(bool disposing)
        {

            if (_db != null) _db.Dispose();

            base.Dispose(disposing);

        }

    }
}
