using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cupcacke_api.Responses
{
    public class ErrorResponse
    {
        public string Message { get; set; }
        public int StatusCode { get; set; }
        public DateTime TimeStamp { get; set; }


        public ErrorResponse(String message, int statusCode = 0)
        {
            this.Message = message;
            this.StatusCode = statusCode;
            this.TimeStamp = DateTime.Now;
        }
        
    }
}
