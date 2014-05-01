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
    public class Default1Controller : ApiController
    {
        private TimetablingSystemContext db = new TimetablingSystemContext();

        // GET api/Default1
        public IEnumerable<module> Getmodules()
        {
            var modules = db.modules.Include(m => m.department);
            return modules.AsEnumerable();
        }

        // GET api/Default1/5
        public module Getmodule(string id)
        {
            module module = db.modules.Find(id);
            if (module == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return module;
        }

        // PUT api/Default1/5
        public HttpResponseMessage Putmodule(string id, module module)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != module.code)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(module).State = EntityState.Modified;

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

        // POST api/Default1
        public HttpResponseMessage Postmodule(module module)
        {
            if (ModelState.IsValid)
            {
                db.modules.Add(module);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, module);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = module.code }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Default1/5
        public HttpResponseMessage Deletemodule(string id)
        {
            module module = db.modules.Find(id);
            if (module == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.modules.Remove(module);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, module);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}