using cupcake_api.Attributes;

namespace cupcake_api.Models
{
    public class BaseModel
    {
        public BaseModel()
        {
            this.CreatedAt = DateTime.UtcNow;
        }

        [SwaggerReadOnly]
        public DateTime? UpdatedAt { get; set; }

        [SwaggerReadOnly]
        public DateTime? CreatedAt { get; set; }
    }
}
