using cupcake_api.Attributes;

namespace cupcake_api.Models
{
    public class PublicUser
    {
        public string Id { get; set; }
        public string? UserName { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [SwaggerReadOnly]
        public PublicFile Avatar { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public long? AvatarId { get; set; }

        public List<Product> Favorites { get; set; }

        public static implicit operator PublicUser(User u) =>
            new PublicUser
            {
                Id = u.Id,
                UserName = u.UserName,
                LastName = u.LastName,
                FirstName = u.FirstName,
                Avatar = u.Avatar,
                Email = u.Email,
                PhoneNumber = u.PhoneNumber,
                AvatarId = u.AvatarId,
                Favorites = u.Favorites,
            };
    }
}
