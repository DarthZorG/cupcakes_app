using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using cupcake_api.Database;
using cupcake_api.Models;

namespace cupcake_api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AddressesController : AuthorizedController
    {
        public AddressesController(DataContext context)
            : base(context) { }

        // GET: api/Addresses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddress()
        {
            return await _context.Address
                .Where(e => e.UserId == CurrentUser.Id && e.DeletedAt == null)
                .ToListAsync();
        }

        // GET: api/Addresses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Address>> GetAddress(long id)
        {
            var address = await _context.Address.FindAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            return address;
        }

        // PUT: api/Addresses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddress(long id, Address address)
        {
            if (id != address.Id)
            {
                return BadRequest();
            }

            var oriAddress = await _context.Address.FindAsync(address.Id);
            if (oriAddress == null)
            {
                return NotFound();
            }
            if (oriAddress.UserId != CurrentUser.Id)
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
        public async Task<ActionResult<Address>> PostAddress(Address address)
        {
            address.UserId = CurrentUser.Id;

            _context.Address.Add(address);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAddress", new { id = address.Id }, address);
        }

        // DELETE: api/Addresses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress(long id)
        {
            var user = CurrentUser;

            var oriAddress = await _context.Address.FindAsync(id);
            if (oriAddress == null)
            {
                return NotFound();
            }
            if (oriAddress.UserId != user.Id)
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
