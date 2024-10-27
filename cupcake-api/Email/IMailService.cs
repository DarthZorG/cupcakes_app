using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace cupcake_api.Email
{
    public interface IMailService
    {
        Task SendEmailAsync(

            string toEmail,
            string subject,
            string bodyHtml,
            List<IFormFile> attachments = null,
            string fromEmailName = null,
            string fromEmailaddress = null
        );
        Task SendTemplateEmailAsync(string toEmail,
             string subject,
             string templateFile,
             Dictionary<string, string> replacements,
             List<IFormFile> attachments = null,
             string fromEmailName = null,
             string fromEmailaddress = null);
    }

}