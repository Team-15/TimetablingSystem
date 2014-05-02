using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace TimetablingSystem.DBInterface
{
    public class SemRouController : ApiController
    {

        private TimetablingSystemContext _db = new TimetablingSystemContext();

        public semester GetCurrentSemester()
        {
            round activeRound = 
                (from rou in _db.rounds
                where rou.live == true && rou.adhoc == false
                select rou).FirstOrDefault();

            semester currentSemeser = new semester();

            if (activeRound != null)
            {
                currentSemeser =
                (from sem  in _db.semesters
                where sem.id == activeRound.semesterID
                select sem).FirstOrDefault();
            }
            

            return currentSemeser;

        }













        protected override void Dispose(bool disposing)
        {

            if (_db != null) _db.Dispose();

            base.Dispose(disposing);

        }

    }
}
