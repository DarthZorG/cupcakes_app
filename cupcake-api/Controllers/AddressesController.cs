using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using cupcake_api.Database;
using cupcake_api.Models;
using cupcake_api.Authorization;
using static cupcake_api.Authorization.ClaimPermissions;

namespace cupcake_api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AddressesController : AuthorizedController
    {
        public AddressesController(DataContext context)
            : base(context) { }

        protected Boolean VerifyUser(ref string? userId)
        {
            if (userId == null)
            {
                userId = CurrentUser.Id;
            }
            if (userId != CurrentUser.Id)
            {
                //check permission
                if (!User.HasClaim(ClaimTypes.Permission, ClaimPermissions.Users.view))
                {
                    return false;
                }
            }
            return true;
        }

        // GET: api/Addresses
        [HttpGet]
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddress(string? userId)
        {
            if (!VerifyUser(ref userId))
            {
                return Forbid();
            }
            return await _context.Address
                .Where(e => e.UserId == userId && e.DeletedAt == null)
                .ToListAsync();
        }

        // GET: api/Addresses/5
        [HttpGet("{id}")]
        [HttpGet("user/{userId}/id")]
        public async Task<ActionResult<Address>> GetAddress(string? userId, long id)
        {

            if (!VerifyUser(ref userId))
            {
                return Forbid();
            }
            var address = await _context.Address.FindAsync(id);

            if (address == null)
            {
                return NotFound();
            }
            if (address.UserId != userId)
            {
                return Forbid();
            }
            return address;
        }

        // PUT: api/Addresses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [HttpPut("user/{userId}/id")]
        public async Task<IActionResult> PutAddress(string? userId, long id, Address address)
        {

            if (!VerifyUser(ref userId))
            {
                return Forbid();
            }

            if (id != address.Id)
            {
                return BadRequest();
            }

            var oriAddress = await _context.Address.FindAsync(address.Id);
            if (oriAddress == null)
            {
                return NotFound();
            }
            if (oriAddress.UserId != userId)
            {
                return Forbid();
            }

            _context.Entry(oriAddress).CurrentValues.SetValues(address);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddressExists(id))
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

        // POST: api/Addresses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [HttpPost("user/{userId}")]
        public async Task<ActionResult<Address>> PostAddress(string? userId, Address address)
        {
            if (!VerifyUser(ref userId))
            {
                return Forbid();
            }

            address.UserId = CurrentUser.Id;

            _context.Address.Add(address);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAddress", new { id = address.Id }, address);
        }

        // DELETE: api/Addresses/5
        [HttpDelete("{id}")]
        [HttpPost("user/{userId}/{id}")]
        public async Task<IActionResult> DeleteAddress(string? userId, long id)
        {

            if (!VerifyUser(ref userId))
            {
                return Forbid();
            }
           
            var oriAddress = await _context.Address.FindAsync(id);
            if (oriAddress == null)
            {
                return NotFound();
            }
            if (oriAddress.UserId != userId)
            {
                return Forbid();
            }

            var address = await _context.Address.FindAsync(id);
            if (address == null)
            {
                return NotFound();
            }

            _context.Address.Remove(address);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                _context.Entry(address).State = EntityState.Modified;
                address.DeletedAt = DateTime.UtcNow;
                _context.SaveChanges();
                //if deletion fails, the address is used in some orders, so we will just disable it
            }
            return NoContent();
        }

        private bool AddressExists(long id)
        {
            return _context.Address.Any(e => e.Id == id);
        }
    }
}
