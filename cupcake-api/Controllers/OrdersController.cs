using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using cupcake_api.Database;
using cupcake_api.Models;
using cupcake_api.Requests;
using Microsoft.AspNetCore.Authorization;
using cupcake_api.Authorization;

namespace cupcake_api.Controllers
{
    [Route("api/v1/[controller]")]
    [Authorize]
    [ApiController]
    public class OrdersController : AuthorizedController
    {
        public OrdersController(DataContext context)
            : base(context) { }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder(
            [FromQuery] string? search,
            [FromQuery] int? offset,
            [FromQuery] int? count,
            [FromQuery] bool adminMode
        )
        {
            

            if (adminMode)
            {
                if (!User.HasClaim(ClaimTypes.Permission, ClaimPermissions.Orders.view))
                {
                    return Forbid();
                }
            }

            if (count == null)
            {
                count = 100;
            }
            var orders = _context.Order
                .Include(e => e.Items)
                .ThenInclude(e => e.Product)
                .ThenInclude(p => p.Image)
                .Include(e => e.PaymentMethod)
                .Include(e => e.DeliveryMethod)
                .AsQueryable();
            if (!adminMode)
            {
                orders = orders.Where(e => e.UserId == CurrentUser.Id);
            }
            if (search != null)
            {
                orders = orders.Where(
                    e =>
                        e.Items.Any(
                            f =>
                                f.Product != null
                                && (
                                    f.Product.Name.Contains(search)
                                    || f.Product.Flavor.Contains(search)
                                )
                        )
                );
            }
            orders = orders.OrderByDescending(e => e.Id);
            if (offset != null)
            {
                orders = orders.Skip((int)offset);
            }
            orders = orders.Take((int)count);

            return await orders.ToListAsync();
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
            var dbOrder = await _context.Order.FindAsync(id);
            if (dbOrder == null)
            {
                return NotFound();
            }

            dbOrder.AddressId = order.AddressId;
            dbOrder.Status = order.Status;
            dbOrder.PaymentMethodId = order.PaymentMethodId;
            dbOrder.DeliveryMethodId = order.DeliveryMethodId;

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
        public async Task<ActionResult<Order>> PostOrder(NewOrderRequest orderRequest)
        {
          

            Order order = new Order();

            if (order.UserId == null)
            {
                order.UserId = CurrentUser.Id;
            }
            /*
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
            } */
            order.PaymentMethodId = orderRequest.PaymentMethodId;
            order.DeliveryMethodId = orderRequest.DeliveryMethodId;
            order.AddressId = orderRequest.AddressId;
            order.CardNumber = orderRequest.CardNumber;
            order.CardHolderName = orderRequest.CardHolderName;
            order.CardCVV = orderRequest.CardCVV;
            order.CardValidTill = orderRequest.CardValidTill;
            order.Items = orderRequest.Items;

            if (orderRequest.Items == null || orderRequest.Items.Count < 1)
            {
                ModelState.AddModelError(
                    nameof(orderRequest.Items),
                    "You need to have at least one product when creating a new Order"
                );
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
                    nameof(orderRequest.PaymentMethodId),
                    "Invalid PaymentMethodId specified"
                );
            }
            else
            {
                if (paymentMethod.RequireCardInfo)
                {
                    if (order.CardHolderName == null)
                    {
                        ModelState.AddModelError(nameof(orderRequest.CardHolderName), "Is required");
                    }

                    if (order.CardNumber == null)
                    {
                        ModelState.AddModelError(nameof(orderRequest.CardNumber), "Is required");
                    }

                    if (order.CardValidTill == null)
                    {
                        ModelState.AddModelError(nameof(orderRequest.CardValidTill), "Is required");
                    }

                    if (order.CardCVV == null)
                    {
                        ModelState.AddModelError(nameof(orderRequest.CardCVV), "Is required");
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
                        ModelState.AddModelError(nameof(orderRequest.AddressId), "Is required");
                    }
                }
            }

            order.TotalPrice = deliveryMethod.Price;
            foreach (var item in order.Items)
            {
                var p = _context.Product.Find(item.ProductId);
                if (p == null)
                {
                    ModelState.AddModelError(nameof(orderRequest.Items), "Invalid product id specified: " + item.ProductId.ToString());
                    break;
                }
                order.TotalPrice += p.Price * (double)item.Quantity;
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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
