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
    public class OrdersController : ControllerBase
    {
        private readonly DataContext _context;

        public OrdersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
        {
            return await _context.Order.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(long id)
        {
            var order = await _context.Order.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(long id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            var user = await _context.Users
                .Where(r => r.UserName == User.Identity!.Name)
                .FirstOrDefaultAsync();

            if (order.UserId == null)
            {
                order.UserId = user.Id;
            }

            //perfom data validation
            if (order.PaymentMethodId == null)
            {
                ModelState.AddModelError(
                    nameof(order.PaymentMethodId),
                    "PaymentMethodId is required when creating a new Order"
                );
            }
            if (order.DeliveryMethodId == null)
            {
                ModelState.AddModelError(
                    nameof(order.DeliveryMethodId),
                    "DeliveryMethodId is required when creating a new Order"
                );
            }
            if (order.Items == null || order.Items.Count < 1)
            {
                ModelState.AddModelError(
                    nameof(order.Items),
                    "You need to have at least one product when creating a new Order"
                );
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            PaymentMethod? paymentMethod = _context.PaymentMethod
                .Where(e => e.Id == order.PaymentMethodId)
                .FirstOrDefault();
            DeliveryMethod? deliveryMethod = _context.DeliveryMethod
                .Where(e => e.Id == order.DeliveryMethodId)
                .FirstOrDefault();

            if (paymentMethod == null)
            {
                ModelState.AddModelError(
                    nameof(order.PaymentMethodId),
                    "Invalid PaymentMethodId specified"
                );
            }
            else
            {
                if (paymentMethod.RequireCardInfo)
                {
                    if (order.CardHolderName == null)
                    {
                        ModelState.AddModelError(nameof(order.CardHolderName), "Is required");
                    }

                    if (order.CardNumber == null)
                    {
                        ModelState.AddModelError(nameof(order.CardNumber), "Is required");
                    }

                    if (order.CardValidTill == null)
                    {
                        ModelState.AddModelError(nameof(order.CardValidTill), "Is required");
                    }

                    if (order.CardCVV == null)
                    {
                        ModelState.AddModelError(nameof(order.CardCVV), "Is required");
                    }
                }
            }
            if (deliveryMethod == null)
            {
                ModelState.AddModelError(
                    nameof(order.DeliveryMethodId),
                    "Invalid DeliveryMethodId specified"
                );
            }
            else
            {
                if (deliveryMethod.RequireAddress)
                {
                    if (order.AddressId == null)
                    {
                        ModelState.AddModelError(nameof(order.AddressId), "Is required");
                    }
                }
            }

            _context.Order.Add(order);
            await _context.SaveChangesAsync();
            try
            {
                return CreatedAtAction("GetOrder", new { id = order.Id }, order);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(long id)
        {
            var order = await _context.Order.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Order.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(long id)
        {
            return _context.Order.Any(e => e.Id == id);
        }
    }
}
