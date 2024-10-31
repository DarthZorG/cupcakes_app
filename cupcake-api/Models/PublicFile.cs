using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace cupcake_api.Models
{
    public class PublicFile
    {
        public string fileName { get; set; }
        public string uri { get; set; }

        public static implicit operator PublicFile?(UploadFile? u) =>
            (u == null) ? null : new PublicFile { fileName = u.FileName, uri = u.RealName };
    }
}
