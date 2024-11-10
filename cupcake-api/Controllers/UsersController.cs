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
using cupcake_api.Authorization;
using Microsoft.AspNetCore.Identity;
using static System.Runtime.InteropServices.JavaScript.JSType;
using cupcake_api.Requests;

namespace cupcake_api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;

        public UsersController(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
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
            var user = AuthorizedController.GetLoggedUser(_context, User);

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
            if (User.HasClaim(ClaimTypes.Permission, ClaimPermissions.System.Settings.manage))
            {
                return NoContent();
            }
            return Forbid();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        [Authorize("View User")]
        public async Task<ActionResult<PublicUser>> GetUser(string id)
        {
            var user = await _context.Users.Where(e => e.Id == id).FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return (PublicUser)user;
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
            _context.SaveChanges();

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<PublicUser>> CreateUser(CreateUserRequest data)
        {
            var current = await _userManager.GetUserAsync(User);
            if (current == null)
            {
                return Unauthorized();
            }
            var user = new User
            {
                UserName = data.Email,
                Email = data.Email,
                FirstName = data.FirstName,
                LastName = data.LastName,
                PhoneNumber = data.PhoneNumber
            };
            var result = await _userManager.CreateAsync(user, data.Password);
            if (!result.Succeeded)
            {
                if (result.Errors.First() != null)
                {
                    return BadRequest(result.Errors.First().Description);
                }
                return BadRequest("This email address is already in use");
            }

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
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
