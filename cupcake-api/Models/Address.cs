using cupcake_api.Attributes;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace cupcake_api.Models
{
    public class Address
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [SwaggerReadOnly]
        public long Id { get; internal set; }

        public string? Address1 { get; set; }

        public string? AddressExtended { get; set; }

        public String? Neighborhood { get; set; }

        public String? City { get; set; }
        public String? State { get; set; }

        [MaxLength(20)]
        public String? ZipCode { get; set; }

        [SwaggerReadOnly]
        public DateTime UpdatedAt { get; set; }

        [SwaggerReadOnly]
        public DateTime CreatedAt { get; set; }
    }
}
