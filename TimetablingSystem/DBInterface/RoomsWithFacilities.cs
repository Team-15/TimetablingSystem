using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace TimetablingSystem.DBInterface
{
    [Serializable]
    [DataContract]
    public class RoomsWithFacilities
    {
        [DataMember]
        public string code { get; set; }

        [DataMember]
        public string buildingCode { get; set; }

        [DataMember]
        public byte roomType { get; set; }

        [DataMember]
        public short capacity { get; set; }

        [DataMember]
        public IEnumerable<facility> facilities { get; set; }

        public RoomsWithFacilities(room r) 
        {
            code = r.code;
            buildingCode = r.buildingCode;
            roomType = r.roomType;
            capacity = r.capacity;

            facilities = r.facilities;
            
        }

    }
}