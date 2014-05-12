using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TimetablingSystem.DBInterface;

namespace TimetablingSystem.DBInterface
{
    [Authorize]
    public class RequestController : ApiController
    {
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
                where (req.status == 1 || req.status == 2)
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
                where (req.status == 1 || req.status == 2)
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

        public List<RequestsWtihLinkedData> GetHistory()
        {

            SemRouController srAPI = new SemRouController();

            IEnumerable<round> liveRounds = srAPI.GetLiveRoundSet();
            List<int> liveRoundsID = new List<int>();

            IEnumerable<round> adhocRounds = srAPI.GetAdHocRoundSet();
            List<int> adhocRoundsID = new List<int>();

            foreach (round rnd in liveRounds)
            {
                liveRoundsID.Add(rnd.id);
            }

            foreach (round rnd in adhocRounds)
            {
                adhocRoundsID.Add(rnd.id);
            }

            IEnumerable<request> requests =
                from req in _db.requests.Include("roomsAlloc").Include("roomsPref").Include("facilities").Include("module")
                where (req.status == 1 || req.status == 2)
                        &&
                        req.module.department.code == nsd.code
                        &&
                        !liveRoundsID.Contains(req.roundID)
                        &&
                        !adhocRoundsID.Contains(req.roundID)
                select req;

            List<RequestsWtihLinkedData> rwldList = new List<RequestsWtihLinkedData>();

            foreach (request req in requests)
            {
                RequestsWtihLinkedData rwld = new RequestsWtihLinkedData(req);

                rwldList.Add(rwld);
            }

            return rwldList;

        }



        private request SetupNewRequestObject(RequestsWtihLinkedData rwld, bool current)
        {
            request newRequest = new request();

            module selectedModule =
                (from mod in _db.modules
                 where mod.code == rwld.moduleCode
                 select mod).FirstOrDefault();

            newRequest.moduleCode = selectedModule.code;
            newRequest.module = selectedModule;

            SemRouController srAPI = new SemRouController();

            round selectedRound;
            if (current) { 
                
                selectedRound = srAPI.GetLiveRound();

                newRequest.status = rwld.status;

            }
            else
            {

                selectedRound = srAPI.GetAdHocRound();

                newRequest.status = 1;

            }

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

            if (!current)
            {

                foreach (var roomData in rwld.roomPref)
                {

                    room selectedRoom =
                        (from rm in _db.rooms
                         where rm.code == roomData.code
                         select rm).FirstOrDefault();

                    newRequest.roomsAlloc.Add(selectedRoom);

                }

            }
            

            return newRequest;
        }

        private request UpdateRequestObject(RequestsWtihLinkedData rwld, request currentReq)
        {
            
            module selectedModule =
                (from mod in _db.modules
                 where mod.code == rwld.moduleCode
                 select mod).FirstOrDefault();

            currentReq.moduleCode = selectedModule.code;
            currentReq.module = selectedModule;

            currentReq.priority = rwld.priority;
            currentReq.day = rwld.day;
            currentReq.startPeriod = rwld.startPeriod;
            currentReq.endPeriod = rwld.endPeriod;
            currentReq.weeks = rwld.weeks;
            currentReq.numberOfStudents = rwld.numberOfStudents;
            currentReq.parkPreference = rwld.parkPreference;
            currentReq.sessionType = rwld.sessionType;
            currentReq.numberOfRooms = rwld.numberOfRooms;
            currentReq.otherRequirements = rwld.otherRequirements;
            currentReq.status = rwld.status;
            currentReq.traditional = rwld.traditional;


            foreach (var facData in rwld.facilities)
            {

                facility selectedFacility =
                    (from fac in _db.facilities
                     where fac.id == facData.id
                     select fac).FirstOrDefault();

                currentReq.facilities.Add(selectedFacility);

            }

            foreach (var roomData in rwld.roomPref)
            {

                room selectedRoom =
                    (from rm in _db.rooms
                     where rm.code == roomData.code
                     select rm).FirstOrDefault();

                currentReq.roomsPref.Add(selectedRoom);

            }



            IEnumerable<round> adHocRounds = (new SemRouController()).GetAdHocRoundSet();

            List<int> adHocRoundIDs = new List<int>();

            foreach (round rnd in adHocRounds) adHocRoundIDs.Add(rnd.id);

            if (adHocRoundIDs.IndexOf(currentReq.roundID) != -1)
            {
                currentReq.roomsAlloc.Clear();

                foreach (var roomData in rwld.roomPref)
                {

                    room selectedRoom =
                        (from rm in _db.rooms
                         where rm.code == roomData.code
                         select rm).FirstOrDefault();

                    currentReq.roomsAlloc.Add(selectedRoom);

                }
            }

            return currentReq;

        }
        

        public HttpResponseMessage PostNewRequest(RequestsWtihLinkedData rwld)
        {

            if (ModelState.IsValid)
            {
                
                var newReq = SetupNewRequestObject(rwld, true);

                _db.requests.Add(newReq);

                _db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, newReq);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = newReq.id }));
                return response;

            }
            else return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);

        }

        public HttpResponseMessage PostNewAdHocRequest(RequestsWtihLinkedData rwld)
        {

            if (ModelState.IsValid)
            {

                var newReq = SetupNewRequestObject(rwld, false);

                _db.requests.Add(newReq);

                _db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, newReq);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = newReq.id }));
                return response;

            }
            else return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);

        }


        public HttpResponseMessage PostUpdateRequest(RequestsWtihLinkedData rwld)
        {

            if (ModelState.IsValid)
            {
                request currentReq =
                    (from req in _db.requests.Include("facilities").Include("roomsPref").Include("roomsAlloc")
                     where req.id == rwld.id
                     select req).FirstOrDefault();

                currentReq.facilities.Clear();

                currentReq.roomsPref.Clear();

                _db.SaveChanges();

                var updateReq = UpdateRequestObject(rwld, currentReq);

                _db.Entry(currentReq).CurrentValues.SetValues(updateReq);

                _db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, updateReq);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = updateReq.id }));
                return response;

            }
            else return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);


        }

        [HttpPost]
        public HttpResponseMessage DeleteRequest(RequestsWtihLinkedData rwld)
        {
            if (ModelState.IsValid)
            {

                request deleteReq =
                    (from req in _db.requests
                     where req.id == rwld.id
                     select req).FirstOrDefault();

                _db.requests.Remove(deleteReq);

                _db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, deleteReq);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = deleteReq.id }));
                return response;

            }
            else return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);


        }


        protected override void Dispose(bool disposing)
        {

            if (_db != null) _db.Dispose();

            base.Dispose(disposing);

        }

    }
}
