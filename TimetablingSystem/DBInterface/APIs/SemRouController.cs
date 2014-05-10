using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace TimetablingSystem.DBInterface
{
    [Authorize]
    public class SemRouController : ApiController
    {

        private TimetablingSystemContext _db = new TimetablingSystemContext();

        public round GetLiveRound()
        {
            round liveRound = _db.rounds.FirstOrDefault(r => r.live == true && r.adhoc == false); 

            return liveRound;
        }

        public round GetAdHocRound()
        {
            round adHocRound = _db.rounds.FirstOrDefault(r => r.live == true && r.adhoc == true); 

            return adHocRound;
        }

        public IEnumerable<round> GetLiveRoundSet()
        {

            semester liveSemester = GetLiveSemester();

            IEnumerable<round> roundSet =
                from rnds in _db.rounds
                where rnds.semesterID == liveSemester.id
                select rnds;

            return roundSet;

        }

        public IEnumerable<round> GetAdHocRoundSet()
        {

            semester adHocSemester = GetAdHocSemester();

            IEnumerable<round> roundSet =
                from rnds in _db.rounds
                where rnds.semesterID == adHocSemester.id
                select rnds;

            return roundSet;

        }

        
        
        public semester GetLiveSemester()
        {
            round liveRound = GetLiveRound();

            semester liveSemester = null;

            if (liveRound != null)
            {
                liveSemester =
                (from sem  in _db.semesters
                 where sem.id == liveRound.semesterID
                select sem).FirstOrDefault();
            }

            return liveSemester;

        }

        public semester GetAdHocSemester()
        {
            round adHocRound = GetAdHocRound();

            semester adHocSemester = null;

            if (adHocRound != null)
            {
                adHocSemester =
                (from sem in _db.semesters
                 where sem.id == adHocRound.semesterID
                 select sem).FirstOrDefault();
            }

            return adHocSemester;

        }


        protected override void Dispose(bool disposing)
        {

            if (_db != null) _db.Dispose();

            base.Dispose(disposing);

        }

    }
}
