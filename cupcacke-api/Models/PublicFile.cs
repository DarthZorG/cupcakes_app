using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace cupcacke_api.Models
{
    public class PublicFile
    {
        public string FileName { get; set; }
        public string URI { get; set; }

        public static implicit operator PublicFile?(UploadFile? u) =>
            (u == null) ? null : new PublicFile { FileName = u.FileName, URI = u.RealName };
    }
}
