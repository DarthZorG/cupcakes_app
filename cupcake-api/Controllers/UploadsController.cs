using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using cupcake_api.Database;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using cupcake_api.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace cupcake_api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]
    [Produces("application/json")]
    public class UploadsController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly DataContext _context;

        public UploadsController(IWebHostEnvironment webHostEnvironment, DataContext context)
        {
            _webHostEnvironment = webHostEnvironment;
            _context = context;
        }

        public static string GetBaseUri(HttpRequest request)
        {
            string baseUri = request.Scheme + "://" + request.Host;

            baseUri += request.PathBase;
            if (!baseUri.EndsWith("/"))
            {
                baseUri += "/";
            }
            return baseUri;
        }

        /// <summary>
        /// Retrieve file information
        /// </summary>
        /// <response code="200">Item retrieved successfully</response>
        /// <response code="401">User is not authenticated</response>
        /// <response code="403">User cannot perform the requested action</response>
        /// <response code="404">The reqeusted Layout was not found</response>
        /// <response code="500">An unspecified server error happened</response>
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<PublicFile?>> GetFile(long id)
        {
            //User appUser = _context.Users.Single(r => r.UserName == User.Identity!.Name);
            var item = await _context.UploadedFiles.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }
            var result = (PublicFile?)item;
            return result;
        }

        // POST: api/ManAPIs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// Uplaod a new File
        /// </summary>
        /// <response code="201">File created sucessfully</response>
        /// <response code="400">There is an error in the request data (formatting)</response>
        /// <response code="401">User is not authenticated</response>
        /// <response code="500">An unspecified server error happened</response>
        [HttpPost]
        [Authorize("Delete Products")]
        [ProducesResponseType(typeof(UploadFile), 201)]
        public async Task<ActionResult<UploadFile>> CreateFile(IFormFile file)
        {
            UploadFile results = null;

            var uploadPath = Path.Combine(
                _webHostEnvironment.WebRootPath,
                PublicFileEx.GetUploadPath().Replace('/', Path.DirectorySeparatorChar)
            );
            User appUser = _context.Users.Single(r => r.UserName == User.Identity!.Name);
            if (file.Length <= 0)
                return BadRequest();

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            //Strip out any path specifiers (ex: /../)
            var originalFileName = Path.GetFileName(file.FileName);

            //Create a unique file path
            var uniqueFileName = (Guid.NewGuid()).ToString() + Path.GetExtension(originalFileName);

            var uniqueFilePath = Path.Combine(uploadPath, uniqueFileName);

            //Save the file to disk
            using (var stream = System.IO.File.Create(uniqueFilePath))
            {
                await file.CopyToAsync(stream);
            }
            UploadFile f = new UploadFile();
            f.RealName = uniqueFileName;
            f.FileName = originalFileName;
            f.CreatedTS = new DateTime();
            f.CreatedBy = appUser.Id;
            _context.UploadedFiles.Add(f);
            await _context.SaveChangesAsync();
            results = f;
            var pf = (PublicFile?)f;

            return Created(pf.uri, results);
        }

        /// <summary>
        /// Replace an existing file
        /// </summary>
        /// <response code="204">File updated sucessfully</response>
        /// <response code="400">There is an error in the request data (formatting)</response>
        /// <response code="401">User is not authenticated</response>
        /// <response code="403">User cannot perform the requested action</response>
        /// <response code="404">The reqeusted file was not found</response>
        /// <response code="500">An unspecified server error happened</response>
        [HttpPut("{id}")]
        [Authorize("Update Products")]
        [ProducesResponseType(typeof(void), 204)]
        public async Task<ActionResult> UpdateFile(long id, IFormFile file)
        {

            var uploadPath = Path.Combine(
                _webHostEnvironment.WebRootPath,
                PublicFileEx.GetUploadPath().Replace('/', Path.DirectorySeparatorChar)
            );
            User appUser = _context.Users.Single(r => r.UserName == User.Identity!.Name);
            if (file.Length <= 0)
                return BadRequest();
            var sourceFile = await _context.UploadedFiles.FindAsync(id);
            if (sourceFile == null)
            {
                return NotFound();
            }
            if (sourceFile.CreatedBy != appUser.Id)
            {
                return Forbid();
            }

            //Strip out any path specifiers (ex: /../)
            var originalFileName = Path.GetFileName(file.FileName);

            //Create a unique file path
            var uniqueFileName = (Guid.NewGuid()).ToString() + Path.GetExtension(originalFileName);

            var uniqueFilePath = Path.Combine(uploadPath, uniqueFileName);

            //Save the file to disk
            using (var stream = System.IO.File.Create(uniqueFilePath))
            {
                await file.CopyToAsync(stream);
            }
            var oldFile = Path.Combine(uploadPath, sourceFile.RealName);
            try
            {
                if (System.IO.File.Exists(oldFile))
                {
                    System.IO.File.Delete(oldFile);
                }
            }
            catch { }

            sourceFile.RealName = uniqueFileName;
            sourceFile.FileName = originalFileName;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Remove a file
        /// </summary>
        /// <response code="204">File updated sucessfully</response>
        /// <response code="400">There is an error in the request data (formatting)</response>
        /// <response code="401">User is not authenticated</response>
        /// <response code="403">User cannot perform the requested action</response>
        /// <response code="404">The reqeusted file was not found</response>
        /// <response code="409">The reqeusted file is in use and cannot be deleted</response>
        /// <response code="500">An unspecified server error happened</response>
        [HttpDelete("{id}")]
        [Authorize("Delete Products")]
        [ProducesResponseType(typeof(void), 204)]
        public async Task<ActionResult> DeleteFile(long id)
        {
            UploadFile results = null;

            var uploadPath = Path.Combine(
                _webHostEnvironment.WebRootPath,
                PublicFileEx.GetUploadPath().Replace('/', Path.DirectorySeparatorChar)
            );
            User appUser = _context.Users.Single(r => r.UserName == User.Identity!.Name);

            var sourceFile = await _context.UploadedFiles.FindAsync(id);
            if (sourceFile == null)
            {
                return NotFound();
            }
            if (sourceFile.CreatedBy != appUser.Id)
            {
                return Forbid();
            }

            var oldFile = Path.Combine(uploadPath, sourceFile.RealName);
            try
            {
                _context.UploadedFiles.Remove(sourceFile);
                await _context.SaveChangesAsync();
            }
            catch
            {
                return Conflict();
            }

            try
            {
                if (System.IO.File.Exists(oldFile))
                {
                    System.IO.File.Delete(oldFile);
                }
            }
            catch { }
            return NoContent();
        }
    }
}
