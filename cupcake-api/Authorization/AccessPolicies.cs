namespace cupcake_api.Authorization
{
    public static class AccessPolicies
    {
        public static void RegisterPolicies(
            Microsoft.AspNetCore.Authorization.AuthorizationOptions options
        )
        {
            // Machine policies
            options.AddPolicy(
                "View Products",
                policy => policy.RequireClaim(ClaimTypes.Permission, ClaimPermissions.Products.view)
            );

            options.AddPolicy(
                "Create Products",
                policy =>
                    policy.RequireClaim(ClaimTypes.Permission, ClaimPermissions.Products.create)
            );

            options.AddPolicy(
                "Delete Products",
                policy =>
                    policy.RequireClaim(ClaimTypes.Permission, ClaimPermissions.Products.delete)
            );

            options.AddPolicy(
                "Update Products",
                policy =>
                    policy.RequireClaim(ClaimTypes.Permission, ClaimPermissions.Products.delete)
            );

            options.AddPolicy(
                "View User",
                policy => policy.RequireClaim(ClaimTypes.Permission, ClaimPermissions.Users.view)
            );

            options.AddPolicy(
                "Create User",
                policy => policy.RequireClaim(ClaimTypes.Permission, ClaimPermissions.Users.create)
            );

            options.AddPolicy(
                "Delete User",
                policy => policy.RequireClaim(ClaimTypes.Permission, ClaimPermissions.Users.delete)
            );

            options.AddPolicy(
                "Update User",
                policy => policy.RequireClaim(ClaimTypes.Permission, ClaimPermissions.Users.update)
            );

            


            options.AddPolicy(
                "Manage Settings",
                policy =>
                    policy.RequireClaim(
                        ClaimTypes.Permission,
                        ClaimPermissions.System.Settings.manage
                    )
            );
        }
    }
}
