using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace TimetablingSystem.DBInterface
{
    [Serializable]
    [DataContract]
    public class RequestsWtihLinkedData
    {
        [DataMember]
        public int id { get; set; }
        [DataMember]
        public string moduleCode { get; set; }
        [DataMember]
        public string deptCode { get; set; }
        [DataMember]
        public bool priority { get; set; }
        [DataMember]
        public byte day { get; set; }
        [DataMember]
        public byte startPeriod { get; set; }
        [DataMember]
        public byte endPeriod { get; set; }
        [DataMember]
        public string weeks { get; set; }
        [DataMember]
        public short numberOfStudents { get; set; }
        [DataMember]
        public byte parkPreference { get; set; }
        [DataMember]
        public byte sessionType { get; set; }
        [DataMember]
        public byte numberOfRooms { get; set; }
        [DataMember]
        public string otherRequirements { get; set; }
        [DataMember]
        public int roundID { get; set; }
        [DataMember]
        public Nullable<byte> status { get; set; }
        [DataMember]
        public bool traditional { get; set; }


        [DataMember]
        public IEnumerable<facility> facilities { get; set; }
        [DataMember]
        public IEnumerable<room> roomAlloc { get; set; }
        [DataMember]
        public IEnumerable<room> roomPref { get; set; }

        public RequestsWtihLinkedData() { 
        
        }

        public RequestsWtihLinkedData(request r)
        {
            id = r.id;
            moduleCode = r.moduleCode;
            deptCode = r.module.deptCode;
            priority = r.priority;
            day = r.day;
            startPeriod = r.startPeriod;
            endPeriod = r.endPeriod;
            weeks = r.weeks;
            numberOfStudents = r.numberOfStudents;
            parkPreference = r.parkPreference;
            sessionType = r.sessionType;
            numberOfRooms = r.numberOfRooms;
            otherRequirements = r.otherRequirements;
            roundID = r.roundID;
            status = r.status;
            traditional = r.traditional;

            facilities = r.facilities;
            roomAlloc = r.roomsAlloc;
            roomPref = r.roomsPref;
            
        }

    }
}