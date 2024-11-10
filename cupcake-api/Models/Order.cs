using cupcake_api.Attributes;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace cupcake_api.Models
{
    public class Order : BaseModel
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [SwaggerReadOnly]
        public long Id { get; internal set; }

        [MaxLength(100)]
        public string UserId { get; set; }

        [SwaggerReadOnly]
        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }

        public List<OrderItem> Items { get; set; }

        public long DeliveryMethodId { get; set; }

        [SwaggerReadOnly]
        [ForeignKey(nameof(DeliveryMethodId))]
        public DeliveryMethod? DeliveryMethod { get; set; }

        public string Status { get; set; } = "Created";

        [SwaggerReadOnly]
        public double TotalPrice { get; set; }

        public long PaymentMethodId { get; set; }

        [SwaggerReadOnly]
        [ForeignKey(nameof(PaymentMethodId))]
        public PaymentMethod? PaymentMethod { get; set; }

        public String? TransactionData { get; set; }

        public long? AddressId { get; set; }

        [SwaggerReadOnly]
        [ForeignKey(nameof(AddressId))]
        public Address? Address { get; set; }

        #region Card Details

        public string? CardHolderName { get; set; }

        [MaxLength(20)]
        public string? CardNumber { get; set; }
      
        [MaxLength(10)]
        public String? CardValidTill { get; set; }

        [MaxLength(5)]
        public String? CardCVV { get; set; }

        #endregion
    }
}
