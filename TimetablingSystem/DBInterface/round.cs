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
    
    public partial class round
    {
        public round()
        {
            this.requests = new HashSet<request>();
        }
    
        public int id { get; set; }
        public byte roundNo { get; set; }
        public System.DateTime startTime { get; set; }
        public System.DateTime endTime { get; set; }
        public bool adhoc { get; set; }
        public bool live { get; set; }
        public int semesterID { get; set; }
    
        public virtual ICollection<request> requests { get; set; }
        public virtual semester semester { get; set; }
    }
}
