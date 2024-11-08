using cupcake_api.Attributes;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace cupcake_api.Models
{
    public class OrderItem
    {
        public long? OrderId { get; set; }

        [ForeignKey(nameof(OrderId))]
        [JsonIgnore]
        public Order? Order { get; set; }

        public long? ProductId { get; set; }

        [ForeignKey(nameof(ProductId))]
        [SwaggerReadOnly]
        public Product? Product { get; set; }

        public int Quantity { get; set; }
    }
}
