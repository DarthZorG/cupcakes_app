using cupcake_api.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace cupcake_api.Authorization
{
    internal static class SetupRolesAndClaims
    {
        public static async Task CreateRolesAndUsers(IServiceProvider serviceProvider)
        {
            RoleManager<IdentityRole> roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            UserManager<User> userManager = serviceProvider.GetRequiredService<UserManager<User>>();

            await SetupRoles(roleManager);
            await SetupUsers(userManager, roleManager);
        }

        public static async Task SetupRoles(RoleManager<IdentityRole> roleManager)
        {
            IdentityRole? role = await roleManager.FindByNameAsync(UserRoles.Admin);
            if (role == null)
            {
                role = new IdentityRole(UserRoles.Admin);
                await roleManager.CreateAsync(role);
            }
            await setRolesClaims(roleManager, role,
                new Claim(ClaimTypes.Permission, ClaimPermissions.Products.view),
                new Claim(ClaimTypes.Permission, ClaimPermissions.Products.create),
                new Claim(ClaimTypes.Permission, ClaimPermissions.Products.update),
                new Claim(ClaimTypes.Permission, ClaimPermissions.Products.delete),
                new Claim(ClaimTypes.Permission, ClaimPermissions.Users.view),
                new Claim(ClaimTypes.Permission, ClaimPermissions.Users.create),
                new Claim(ClaimTypes.Permission, ClaimPermissions.Users.update),
                new Claim(ClaimTypes.Permission, ClaimPermissions.Users.delete),
                new Claim(ClaimTypes.Permission, ClaimPermissions.Orders.view),
                new Claim(ClaimTypes.Permission, ClaimPermissions.Orders.create),
                new Claim(ClaimTypes.Permission, ClaimPermissions.Orders.update),
                new Claim(ClaimTypes.Permission, ClaimPermissions.Orders.delete),
                new Claim(ClaimTypes.Permission, ClaimPermissions.System.Settings.manage)
            );
            
            role = await roleManager.FindByNameAsync(UserRoles.Customer);
            if (role == null)
            {
                role = new IdentityRole(UserRoles.Customer);
                await roleManager.CreateAsync(role);
            }
            await setRolesClaims(roleManager, role,
                new Claim(ClaimTypes.Permission, ClaimPermissions.Products.view),
                new Claim(ClaimTypes.Permission, ClaimPermissions.Users.view),
                new Claim(ClaimTypes.Permission, ClaimPermissions.Users.update),
                new Claim(ClaimTypes.Permission, ClaimPermissions.Users.delete)
            );

        }

        private static async Task setRolesClaims(RoleManager<IdentityRole> roleManager, IdentityRole role, params Claim[] claims)
        {
            var srcCliams = await roleManager.GetClaimsAsync(role);
            foreach (var claim in claims)
            {
                var found = srcCliams.Where(e => e.ValueType == claim.ValueType && e.Value == claim.Value).FirstOrDefault();
                if (found == null)
                {
                    await roleManager.AddClaimAsync(role, claim);
                }
            }
            foreach (var claim in srcCliams)
            {
                var found = claims.Where(e => e.ValueType == claim.ValueType && e.Value == claim.Value).FirstOrDefault();
                if (found == null)
                {
                    await roleManager.RemoveClaimAsync(role, claim);
                }
            }
        }

        private static async Task<User> createSimpleUser(UserManager<User> userManager, string email, string password)
        {
            User? testUser = await userManager.FindByNameAsync(email);
            if (testUser == null)
            {
                testUser = new User { UserName = email, Email = email };
                await userManager.CreateAsync(testUser, password);

            }
            return testUser;
        }

        private static async Task fixUserName(UserManager<User> userManager, User user, string FirstName, string LastName)
        {
            if (user.FirstName == null || user.LastName == null)
            {
                user.FirstName = FirstName;
                user.LastName = LastName;
                await userManager.UpdateAsync(user);
            }
        }

        public static async Task SetupUsers(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            User? testUser = await userManager.FindByNameAsync("admin@cupcake-app.com");
            if (testUser == null)
            {
                testUser = new User { FirstName = "Admin", LastName = "Cupcake", UserName = "admin@cupcake-app.com", Email = "admin@cupcake-app.com" };
                await userManager.CreateAsync(testUser, "Cup123!");
                await userManager.AddToRoleAsync(testUser, UserRoles.Admin);
            }
            await fixUserName(userManager, testUser, "Cupcake app Admin", "");
        }
    }
}
