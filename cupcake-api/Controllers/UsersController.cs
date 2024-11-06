using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using cupcake_api.Database;
using cupcake_api.Models;
using Microsoft.AspNetCore.Authorization;

namespace cupcake_api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        [Authorize("View User")]
        public async Task<ActionResult<IEnumerable<PublicUser>>> GetUsers()
        {
            return (await _context.Users.ToListAsync()).Select(e => (PublicUser)e).ToList();
        }

        [HttpGet("me")]
        public async Task<ActionResult<PublicUser>> GetCurrentUser()
        {
            //            User appUser = _context.Users.Single(r => r.UserName == User.Identity!.Name);

            var user = await _context.Users
                .Where(r => r.UserName == User.Identity!.Name)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return (PublicUser)user;
        }

        [HttpGet("isAdmin")]
        [Authorize]
        public async Task<IActionResult> GetIsUserAdmin()
        {
            return NoContent();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        [Authorize("View User")]
        public async Task<ActionResult<PublicUser>> GetUser(string id)
        {
            var user = await _context.Users
                .Where(e => e.Id == id)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return (PublicUser) user;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, PublicUser user)
        {
            var dbUser = await _context.Users.Where(e => e.Id == id).FirstOrDefaultAsync();

            if (dbUser == null)
            {
                return NotFound();
            }
            dbUser.Email = user.Email;
            dbUser.FirstName = user.FirstName;
            dbUser.LastName = user.LastName;
            dbUser.PhoneNumber = user.PhoneNumber;
            dbUser.AvatarId = user.AvatarId;

            user.Id = id;
    
                _context.Entry(user).State = EntityState.Modified;
    
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            
            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<PublicUser>> CreateUser(PublicUser product)
        {
            /*   _context.Product.Add(product);
               await _context.SaveChangesAsync();

               return CreatedAtAction("GetProduct", new { id = product.Id }, product); */
            return Ok(null);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        [Authorize("Delete User")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            /*   var product = await _context.Product.FindAsync(id);
               if (product == null)
               {
                   return NotFound();
               }
   
               _context.Product.Remove(product);
               await _context.SaveChangesAsync(); */

            return NoContent();
        }

        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
