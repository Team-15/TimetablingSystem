﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace TimetablingSystem.DBInterface
{

    [Serializable]
    [DataContract]
    public class BuildingsWithRooms
    {
        [DataMember]
        public string code { get; set; }
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public byte park { get; set; }

        [DataMember]
        public List<RoomsWithFacilities> rooms { get; set; }

        public BuildingsWithRooms(building b, IEnumerable<room> r)
        {
            code = b.code;
            name = b.name;
            park = b.park;

            rooms = new List<RoomsWithFacilities>();

            foreach (room rm in r)
            {
                RoomsWithFacilities rwf = new RoomsWithFacilities(rm);

                rooms.Add(rwf);
            }

        }

    }
}