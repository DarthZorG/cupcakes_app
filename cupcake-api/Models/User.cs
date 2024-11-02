using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;
using cupcake_api.Attributes;

namespace cupcake_api.Models
{
    public class User : IdentityUser
    {
        [MaxLength(100)]
        public string FirstName { get; set; }

        [MaxLength(100)]
        public string LastName { get; set; }

      

        public long? AvatarId { get; set; }

        [ForeignKey("AvatarId")]
        [JsonIgnore]
        public UploadFile AvatarFile { get; set; }

        [NotMapped]
        [SwaggerReadOnly]
        public PublicFile Avatar
        {
            get { return AvatarFile; }
        }

        public bool Enabled { get; set; } = true;


        public string? PhoneNumber { get; set; }

        public List<Product> Favorites { get; set; }
    }
}
