using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;
using cupcake_api.Models;
using cupcake_api.Database;
using cupcake_api.Responses;
using cupcake_api.Requests;


namespace cupcake_api.Controllers
{
    [Route("identity/authorize")]
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]
    [Produces("application/json")]
    public class LoginController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly DataContext _context;

        public LoginController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            DataContext context
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
            _context = context;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        //  [ProducesResponseType(typeof(VTMSharedModels.Data.Location), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<AuthTokenResponse>> Login([FromForm] AuthTokenRequest loginInfo)
        {
            if (loginInfo.grant_type == "password")
            {
                User appUser = _signInManager.UserManager.Users.SingleOrDefault(
                    r => r.UserName == loginInfo.username
                );
                if (appUser == null || !appUser.Enabled)
                {
                    return Unauthorized(new ErrorResponse("Error", "Wrong username or password."));
                }

                var result = await _signInManager.PasswordSignInAsync(
                    loginInfo.username,
                    loginInfo.password,
                    isPersistent: false,
                    lockoutOnFailure: false
                );

                if (result.Succeeded)
                {
                    Response.Cookies.Delete(".AspNetCore.Identity.Application");
                    return await BuildToken(loginInfo);
                }
                else
                {
                    //  ModelState.AddModelError(string.Empty, "Wrong username or password.");
                    return Unauthorized(new ErrorResponse("Error", "Wrong username or password."));
                }
            }
 
            return BadRequest(new ErrorResponse("Error", "Unsupported grant type" + loginInfo.grant_type));
        }

        private async Task<AuthTokenResponse> BuildToken(AuthTokenRequest userInfo)
        {
            List<Claim> claims = new List<Claim>();
            User appUser = _signInManager.UserManager.Users.SingleOrDefault(
                r => r.UserName == userInfo.username
            );
            var claimsPrincipal = await _signInManager.CreateUserPrincipalAsync(appUser);

            claims.Add(new Claim(JwtRegisteredClaimNames.NameId, appUser.Id));
            claims.Add(new Claim(JwtRegisteredClaimNames.UniqueName, userInfo.username));

            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            foreach (Claim userClaim in claimsPrincipal.Claims)
            {
                // if (userClaim.Type === )
                claims.Add(userClaim);
            }

            //   new Claim("meuValor", "oque voce quiser"),



            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            // tempo de expiração do token: 1 hora
            var expiration = DateTime.UtcNow.AddHours(1);
            JwtSecurityToken token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: expiration,
                signingCredentials: creds
            );
            return new AuthTokenResponse()
            {
                access_token = new JwtSecurityTokenHandler().WriteToken(token),
                expires_in = 3600,
                token_type = "bearer",
            };
        }

 
    }
}
