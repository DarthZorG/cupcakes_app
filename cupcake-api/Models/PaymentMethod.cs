﻿using cupcake_api.Attributes;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace cupcake_api.Models
{
    public class PaymentMethod : BaseModel
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [SwaggerReadOnly]
        public long Id { get; internal set; }

        [MaxLength(100)]
        public string Name { get; set; }

        public bool Enabled { get; set; }

        public bool RequireCardInfo { get; set; }
    }
}
