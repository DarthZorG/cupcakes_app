using cupcake_api.Attributes;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace cupcake_api.Models
{
    public class Product
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [SwaggerReadOnly]
        public long Id { get; internal set; }

        [MaxLength(100)]
        public string Name { get; set; }

        public double Price { get; set; }

        [MaxLength(100)]
        public string Flavor { get; set; }  

        public String Description { get; set; } 

        public bool Enabled {  get; set; }  

        public bool GlutenFree { get; set; }    

        public bool LactoseFree { get; set; }  

        public bool SugarFree { get; set; } 

        public int DisplayOrder { get; set; }

        [SwaggerReadOnly]
        public DateTime UpdatedAt { get; set; }

        [SwaggerReadOnly]

        public DateTime CreatedAt { get; set; }
    }
}
