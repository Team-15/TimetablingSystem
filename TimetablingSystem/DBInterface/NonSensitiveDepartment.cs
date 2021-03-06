﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace TimetablingSystem.DBInterface
{
    [Serializable]
    [DataContract]
    public class NonSensitiveDepartment
    {

        [DataMember]
        public string code { get; set; }
        [DataMember]
        public string name { get; set; }

        public NonSensitiveDepartment(string c, string n)
        {
            code = c;
            name = n;
        }

    }
}