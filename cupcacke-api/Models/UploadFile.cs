using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using cupcacke_api.Attributes;


namespace cupcacke_api.Models
{
    public class UploadFile
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [SwaggerReadOnly]
        public long FileId { get; internal set; } 

        public string FileName { get; set; } 

        public string RealName { get; set; }

        [SwaggerReadOnly]
        [MaxLength(100)]
        public string CreatedBy { get; set; }

        [SwaggerReadOnly]

        public DateTime CreatedTS { get; set; } 

    }
}
