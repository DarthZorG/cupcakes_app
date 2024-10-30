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
using EllipticCurve;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.AspNetCore.Authorization;

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
        private readonly PrivateKey _privateKey;
        private readonly PublicKey _publicKey;

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
            _privateKey = PrivateKey.fromPem(configuration["JWT:renew"]);
            _publicKey = _privateKey.publicKey();
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        //  [ProducesResponseType(typeof(VTMSharedModels.Data.Location), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<AuthTokenResponse>> Login(
            [FromForm] AuthTokenRequest loginInfo
        )
        {
            if (loginInfo.grant_type == "password")
            {
                User? appUser = _signInManager.UserManager.Users.SingleOrDefault(
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

            return BadRequest(
                new ErrorResponse("Error", "Unsupported grant type" + loginInfo.grant_type)
            );
        }

        [Authorize]
        [HttpPost("refresh")]
        public async Task<ActionResult<AuthTokenResponse>> RefreshToken(
            [FromBody] RefreshTokenRequest token
        )
        {
            User appUser = _context.Users.Single(r => r.UserName == User.Identity!.Name);
            //check user
            var sig = Signature.fromBase64(token.refresh_token);
            if (Ecdsa.verify(appUser.Id, sig, _publicKey))
            {
                return await BuildToken(appUser);
            }
            return Unauthorized();
        }

        private async Task<AuthTokenResponse?> BuildToken(AuthTokenRequest userInfo)
        {
            User? appUser = _signInManager.UserManager.Users.SingleOrDefault(
                r => r.UserName == userInfo.username
            );
            if (appUser == null)
            {
                return null;
            }
            return await BuildToken(appUser);
        }

        private async Task<AuthTokenResponse> BuildToken(User appUser)
        {
            List<Claim> claims = new List<Claim>();

            var claimsPrincipal = await _signInManager.CreateUserPrincipalAsync(appUser);

            claims.Add(new Claim(JwtRegisteredClaimNames.NameId, appUser.Id));
            claims.Add(new Claim(JwtRegisteredClaimNames.UniqueName, appUser.UserName));

            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            foreach (Claim userClaim in claimsPrincipal.Claims)
            {
                claims.Add(userClaim);
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiration = DateTime.UtcNow.AddDays(15);
            JwtSecurityToken token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: expiration,
                signingCredentials: creds
            );
            var sign = Ecdsa.sign(appUser.Id, _privateKey);

            return new AuthTokenResponse()
            {
                access_token = new JwtSecurityTokenHandler().WriteToken(token),
                expires_in = (int) Math.Floor((expiration - DateTime.UtcNow).TotalSeconds),
                token_type = "bearer",
                refresh_token = sign.toBase64()
            };
        }
    }
}
