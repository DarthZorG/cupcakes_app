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
using static cupcake_api.Authorization.ClaimPermissions;
using Microsoft.AspNetCore.Authorization;

namespace cupcake_api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]

    public class FavoritesController : AuthorizedController
    {

        public FavoritesController(DataContext context) : base(context) { }

      

        // GET: api/Products/5
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetFavorites()
        {
            var user = await _context.Users
                .Include(e => e.Favorites)
                .ThenInclude(k => k.Image)
                .Where(r => r.Id == CurrentUser.Id)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return user.Favorites;
        }

       
        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> AddFavorite(AddFavoriteRequest favorite)
        {
            var user = await _context.Users
               .Include(e => e.Favorites)
               .Where(r => r.Id == CurrentUser.Id)
               .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            if (user.Favorites.Where(e => e.Id == favorite.productId).FirstOrDefault() != null)
            {
                return NoContent();
            }

            var product = await _context.Product.FindAsync(favorite.productId);
            if (product == null)
            {
                return NotFound();
            }
            user.Favorites.Add(product);
            await _context.SaveChangesAsync();

            return Created();
        }

        // DELETE: api/Products/5
        [HttpDelete("product/{productId}")]
        public async Task<IActionResult> RemoveUserFavorite(long productId)
        {
            var user = await _context.Users
                .Include(e => e.Favorites)
                .Where(r => r.Id == CurrentUser.Id)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            var toRemove = user.Favorites.Where(e => e.Id == productId).FirstOrDefault();
            if (toRemove == null) { 
                return NotFound();
            }
            user.Favorites.Remove(toRemove);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
