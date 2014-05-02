using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace TimetablingSystem.DBInterface
{
    public class TestDeptController : ApiController
    {
        

        private TimetablingSystemContext db = new TimetablingSystemContext();

        

        // GET api/TestDept
        public IEnumerable<department> Getdepartments()
        {
            return db.departments.AsEnumerable();
        }

        // GET api/TestDept/5
        public department Getdepartment(string id)
        {
            department department = db.departments.Find(id);
            if (department == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return department;
        }

        // PUT api/TestDept/5
        public HttpResponseMessage Putdepartment(string id, department department)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != department.code)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(department).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/TestDept
        public HttpResponseMessage Postdepartment(department department)
        {
            if (ModelState.IsValid)
            {
                db.departments.Add(department);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, department);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = department.code }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/TestDept/5
        public HttpResponseMessage Deletedepartment(string id)
        {
            department department = db.departments.Find(id);
            if (department == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.departments.Remove(department);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, department);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}