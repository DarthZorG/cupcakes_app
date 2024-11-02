using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Json.Nodes;
using System.Reflection.Metadata.Ecma335;
using System.Reflection.Metadata;
using System.Drawing;
using System.Reflection.PortableExecutable;
using cupcake_api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Hosting;

namespace cupcake_api.Database
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }

        public DbSet<UploadFile> UploadedFiles { get; set; }

        public override int SaveChanges()
        {
            var entries = ChangeTracker
                .Entries()
                .Where(
                    e =>
                        e.Entity is BaseModel
                        && (e.State == EntityState.Added || e.State == EntityState.Modified)
                );

            foreach (var entityEntry in entries)
            {
                ((BaseModel)entityEntry.Entity).UpdatedAt = DateTime.UtcNow;

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseModel)entityEntry.Entity).CreatedAt = DateTime.UtcNow;
                }
            }

            return base.SaveChanges();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.HasCharSet("utf8mb4_general_ci", DelegationModes.ApplyToAll);
            var baseTimeStamp = new DateTime(2023, 03, 04);

            modelBuilder.UseGuidCollation(string.Empty);
            modelBuilder.UseCollation("utf8mb4_general_ci");

            // modelBuilder.Entity<IdentityUser>().ToTable("MyUsers").Property(p => p.Id).HasColumnName("UserId");
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(m => m.Id).HasMaxLength(100);
                entity.Property(m => m.Email).HasMaxLength(127);
                entity.Property(m => m.NormalizedEmail).HasMaxLength(127);
                entity.Property(m => m.NormalizedUserName).HasMaxLength(127);
                entity.Property(m => m.UserName).HasMaxLength(127);
                entity.ToTable("Users");
            });

            // modelBuilder.Entity<User>().ToTable("Users").Property(p => p.Id);


            modelBuilder.Entity<IdentityUserRole<string>>(entity =>
            {
                entity.Property(m => m.UserId).HasMaxLength(100);
                entity.Property(m => m.RoleId).HasMaxLength(100);
                entity.ToTable("UserRoles");
            });
            modelBuilder.Entity<IdentityUserLogin<string>>(entity =>
            {
                entity.Property(m => m.LoginProvider).HasMaxLength(127);
                entity.Property(m => m.ProviderKey).HasMaxLength(127);
                entity.ToTable("UserLogins");
            });
            modelBuilder.Entity<IdentityUserClaim<string>>(entity =>
            {
                entity.Property(m => m.UserId).HasMaxLength(100);
                entity.ToTable("UserClaims");
            });
            modelBuilder.Entity<IdentityRole>(entity =>
            {
                entity.Property(m => m.Id).HasMaxLength(100);
                entity.Property(m => m.Name).HasMaxLength(127);
                entity.Property(m => m.NormalizedName).HasMaxLength(127);
                entity.ToTable("Roles");
            });
            modelBuilder.Entity<IdentityUserToken<string>>(entity =>
            {
                entity.Property(m => m.UserId).HasMaxLength(100);
                entity.Property(m => m.LoginProvider).HasMaxLength(127);
                entity.Property(m => m.Name).HasMaxLength(127);
                entity.ToTable("UserTokens");
            });
            modelBuilder.Entity<IdentityRoleClaim<string>>(entity =>
            {
                entity.ToTable("RoleClaims");
            });

            modelBuilder.Entity<User>().HasMany(e => e.Favorites).WithMany(e => e.FavoritedBy);
        }

        public DbSet<cupcake_api.Models.Address> Address { get; set; } = default!;
        public DbSet<cupcake_api.Models.DeliveryMethod> DeliveryMethod { get; set; } = default!;
        public DbSet<cupcake_api.Models.Order> Order { get; set; } = default!;
        public DbSet<cupcake_api.Models.PaymentMethod> PaymentMethod { get; set; } = default!;
        public DbSet<cupcake_api.Models.Product> Product { get; set; } = default!;
    }
}
