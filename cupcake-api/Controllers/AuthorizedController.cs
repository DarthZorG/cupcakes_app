using cupcake_api.Database;
using cupcake_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace cupcake_api.Controllers
{
    [Authorize]
    public class AuthorizedController : ControllerBase
    {
        protected readonly DataContext _context;

        public AuthorizedController(DataContext context)
        {
            _context = context;
        }

        public static User? GetLoggedUser(DataContext _context, ClaimsPrincipal principal)
        {
            var claimIdentity = principal.Identity as ClaimsIdentity;
            if (claimIdentity == null)
            {
                return null;
            }
            var claim = claimIdentity.Claims
                .Where(e => e.Type == ClaimTypes.NameIdentifier)
                .FirstOrDefault();
            if (claim == null)
            {
                return null;
            }
            return _context.Users.Where(r => r.Id == claim.Value).FirstOrDefault();
        }

        protected User CurrentUser
        {
            get
            {
                var user = GetLoggedUser(_context, User);
                if (user == null)
                {
                    throw new AccessViolationException();
                }
                return user;
            }
        }
    }
}
