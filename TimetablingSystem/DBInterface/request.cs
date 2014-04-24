//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TimetablingSystem.DBInterface
{
    using System;
    using System.Collections.Generic;
    
    public partial class request
    {
        public request()
        {
            this.facilities = new HashSet<facility>();
            this.roomsAlloc = new HashSet<room>();
            this.roomsPref = new HashSet<room>();
        }
    
        public int id { get; set; }
        public string moduleCode { get; set; }
        public bool priority { get; set; }
        public byte day { get; set; }
        public byte startPeriod { get; set; }
        public byte endPeriod { get; set; }
        public string weeks { get; set; }
        public short numberOfStudents { get; set; }
        public byte parkPreference { get; set; }
        public bool sessionType { get; set; }
        public byte roomType { get; set; }
        public byte numberOfRooms { get; set; }
        public string otherRequirements { get; set; }
        public int roundID { get; set; }
        public Nullable<byte> status { get; set; }
    
        public virtual module module { get; set; }
        public virtual round round { get; set; }
        public virtual ICollection<facility> facilities { get; set; }
        public virtual ICollection<room> roomsAlloc { get; set; }
        public virtual ICollection<room> roomsPref { get; set; }
    }
}
