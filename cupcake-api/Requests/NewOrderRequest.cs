using cupcake_api.Attributes;
using cupcake_api.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace cupcake_api.Requests
{
    public class NewOrderRequest
    {
        public List<OrderItem> Items { get; set; }

        public long DeliveryMethodId { get; set; }

        public long PaymentMethodId { get; set; }
        public long? AddressId { get; set; }


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
