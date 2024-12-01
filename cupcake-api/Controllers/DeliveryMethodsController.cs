﻿using System;
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
    public class DeliveryMethodsController : ControllerBase
    {
        private readonly DataContext _context;

        public DeliveryMethodsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/DeliveryMethods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryMethod>>> GetDeliveryMethod()
        {
            return await _context.DeliveryMethod.ToListAsync();
        }

        // GET: api/DeliveryMethods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryMethod>> GetDeliveryMethod(long id)
        {
            var deliveryMethod = await _context.DeliveryMethod.FindAsync(id);

            if (deliveryMethod == null)
            {
                return NotFound();
            }

            return deliveryMethod;
        }

        // PUT: api/DeliveryMethods/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDeliveryMethod(long id, DeliveryMethod deliveryMethod)
        {
            if (id != deliveryMethod.Id)
            {
                return BadRequest();
            }

            _context.Entry(deliveryMethod).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeliveryMethodExists(id))
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

        // POST: api/DeliveryMethods
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DeliveryMethod>> PostDeliveryMethod(DeliveryMethod deliveryMethod)
        {
            _context.DeliveryMethod.Add(deliveryMethod);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDeliveryMethod", new { id = deliveryMethod.Id }, deliveryMethod);
        }

        // DELETE: api/DeliveryMethods/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeliveryMethod(long id)
        {
            var deliveryMethod = await _context.DeliveryMethod.FindAsync(id);
            if (deliveryMethod == null)
            {
                return NotFound();
            }

            _context.DeliveryMethod.Remove(deliveryMethod);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DeliveryMethodExists(long id)
        {
            return _context.DeliveryMethod.Any(e => e.Id == id);
        }
    }
}
