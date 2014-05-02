using System;
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
        public string Code { get; set; }
        [DataMember]
        public string Name { get; set; }

        public NonSensitiveDepartment(string code, string name)
        {
            Code = code;
            Name = name;
        }

    }
}