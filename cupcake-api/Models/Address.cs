using cupcake_api.Attributes;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace cupcake_api.Models
{
    public class Address : BaseModel
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [SwaggerReadOnly]
        public long Id { get; internal set; }

        [JsonPropertyName("address")]
        public string? Address1 { get; set; }

        public string? AddressExtended { get; set; }

        public String? Neighborhood { get; set; }

        public String? City { get; set; }
        public String? State { get; set; }

        [MaxLength(20)]
        public String? ZipCode { get; set; }
        
        [MaxLength(100)]
        public string? UserId { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }

        //let's implement address soft deletion
        [JsonIgnore]
        public DateTime? DeletedAt { get; set; } 

    }
}
