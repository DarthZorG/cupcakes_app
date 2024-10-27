using cupcacke_api.Attributes;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace cupcacke_api.Models
{
    public class Order
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [SwaggerReadOnly]
        public long Id { get; internal set; }

        [MaxLength(100)]
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        public List<Product> products { get; set; }

        public long? DeliveryMethodId { get; set; }

        [ForeignKey(nameof(DeliveryMethodId))]
        public DeliveryMethod DeliveryMethod { get; set; }

        public string Status { get; set; }

        public double TotalPrice { get; set; }

        public long? PaymentMethodId { get; set; }

        [ForeignKey(nameof(PaymentMethodId))]
        public PaymentMethod PaymentMethod { get; set; }

        public long? AddressId { get; set; }

        [ForeignKey(nameof(AddressId))]
        public Address Address { get; set; }

        public String? TransactionData { get; set; }

        [SwaggerReadOnly]
        public DateTime UpdatedAt { get; set; }

        [SwaggerReadOnly]
        public DateTime CreatedAt { get; set; }
    }
}
