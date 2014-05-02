using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace TimetablingSystem.DBInterface
{
    public class BuilRoomFacController : ApiController
    {

        private TimetablingSystemContext _db = new TimetablingSystemContext();

        
        public IEnumerable<building> GetAllBuildings()
        {

            IEnumerable<building> allBuildings = _db.buildings;

            return allBuildings;

        }

        public List<BuildingsWithRooms> GetBuildingsWithRoom()
        {

            IEnumerable<building> buildings = GetAllBuildings();

            List<BuildingsWithRooms> bwrList = new List<BuildingsWithRooms>();

            foreach (building b in buildings)
            {
        
                IEnumerable<room> rooms = GetRoomsForBuilding(b);

                BuildingsWithRooms bwr = new BuildingsWithRooms(b, rooms);

                bwrList.Add(bwr);

            }

            return bwrList;

        }
        
        public IEnumerable<room> GetRoomsForBuilding(building b)
        {
            IEnumerable<room> rooms = _db.rooms.Where(r => r.buildingCode == b.code);

            return rooms;

        }

        public IEnumerable<facility> GetAllFacilities()
        {

            IEnumerable<facility> facilities = _db.facilities;
            
            return facilities;

        }
        
        protected override void Dispose(bool disposing)
        {

            if (_db != null) _db.Dispose();

            base.Dispose(disposing);

        }

    }
}
