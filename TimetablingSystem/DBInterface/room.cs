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
    
    public partial class room
    {
        public room()
        {
            this.requestsAlloc = new HashSet<request>();
            this.facilities = new HashSet<facility>();
            this.requestsPref = new HashSet<request>();
        }
    
        public string code { get; set; }
        public string buildingCode { get; set; }
        public byte roomType { get; set; }
        public short capacity { get; set; }
    
        public virtual building building { internal get; set; }
        public virtual ICollection<request> requestsAlloc { internal get; set; }
        public virtual ICollection<facility> facilities { internal get; set; }
        public virtual ICollection<request> requestsPref { internal get; set; }
    }
}
