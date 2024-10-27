using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cupcake_api.Responses
{
    public class ErrorResponse
    {
        public string? Status { get; set; }
        public string? Message { get; set; }

        public Dictionary<string, List<string>>? Errors { get; set; }

        public ErrorResponse(
            String? Status,
            String? Message,
            Dictionary<string, List<string>>? Errors = null
        )
        {
            this.Status = Status;
            this.Message = Message;
            this.Errors = Errors;
        }
    }
}
