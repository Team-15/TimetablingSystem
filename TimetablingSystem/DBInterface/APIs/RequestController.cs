using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using TimetablingSystem.DBInterface;

namespace TimetablingSystem.DBInterface
{
    //[Authorize]
    
    public class RequestController : ApiController
    {
        //RequestsWtihLinkedData rwld { get; set; }

        private TimetablingSystemContext _db = new TimetablingSystemContext();

        private NonSensitiveDepartment nsd = (new DeptModController()).GetAuthorisedDepartment();

        public List<RequestsWtihLinkedData> GetRequests()
        {

            round liveRound = (new SemRouController()).GetLiveRound();

            IEnumerable<request> requests =
                from req in _db.requests.Include("roomsAlloc").Include("roomsPref").Include("facilities").Include("module")
                where (req.status == null || req.status == 0) 
                        &&
                        req.module.department.code == nsd.code
                        && 
                        req.module.active == true
                        && 
                        req.roundID == liveRound.id
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


        public HttpResponseMessage PostNewRequest(RequestsWtihLinkedData rwld)
        {

            if (ModelState.IsValid)
            {
                var newReq = SetupNewRequestObject(rwld);

                _db.requests.Add(newReq);

                _db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, newReq);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = newReq.id }));
                return response;

            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            

        }

        private request SetupNewRequestObject(RequestsWtihLinkedData rwld)
        {
            request newRequest = new request();

            module selectedModule =
                (from mod in _db.modules
                 where mod.code == rwld.moduleCode
                 select mod).FirstOrDefault();

            newRequest.moduleCode = selectedModule.code;
            newRequest.module = selectedModule;

            round selectedRound = (new SemRouController()).GetLiveRound();

            newRequest.roundID = selectedRound.id;

            newRequest.priority = rwld.priority;
            newRequest.day = rwld.day;
            newRequest.startPeriod = rwld.startPeriod;
            newRequest.endPeriod = rwld.endPeriod;
            newRequest.weeks = rwld.weeks;
            newRequest.numberOfStudents = rwld.numberOfStudents;
            newRequest.parkPreference = rwld.parkPreference;
            newRequest.sessionType = rwld.sessionType;
            newRequest.numberOfRooms = rwld.numberOfRooms;
            newRequest.otherRequirements = rwld.otherRequirements;
            newRequest.status = rwld.status;
            newRequest.traditional = rwld.traditional;

            foreach (var facData in rwld.facilities)
            {

                facility selectedFacility =
                    (from fac in _db.facilities
                     where fac.id == facData.id
                     select fac).FirstOrDefault();

                newRequest.facilities.Add(selectedFacility);

            }

            foreach (var roomData in rwld.roomPref)
            {

                room selectedRoom =
                    (from rm in _db.rooms
                     where rm.code == roomData.code
                     select rm).FirstOrDefault();

                newRequest.roomsPref.Add(selectedRoom);

            }

            foreach (var roomData in rwld.roomAlloc)
            {

                room selectedRoom =
                    (from rm in _db.rooms
                     where rm.code == roomData.code
                     select rm).FirstOrDefault();

                newRequest.roomsAlloc.Add(selectedRoom);

            }

            return newRequest;
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
