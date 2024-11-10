using cupcake_api.Attributes;
using cupcake_api.Models;

namespace cupcake_api.Requests
{
    public class CreateUserRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string? PhoneNumber { get; set; }
    }
}
