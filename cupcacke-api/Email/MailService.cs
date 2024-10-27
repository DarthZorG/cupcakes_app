using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace cupcacke_api.Email
{
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;

        public MailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }

        public async Task SendEmailAsync(
            string toEmail,
            string subject,
            string bodyHtml,
            List<IFormFile> attachments = null,
            string fromEmailName = null,
            string fromEmailaddress = null
        )
        {
            var email = new MimeMessage();
            var fromMessage = new MailboxAddress(
                _mailSettings.SenderName ?? "unknown",
                _mailSettings.SenderAddress ?? "unknown@unknown.com"
            );
            if (fromEmailName != null)
            {
                fromMessage.Name = fromEmailName;
            }
            if (fromEmailaddress != null)
            {
                fromMessage.Address = fromEmailaddress;
            }
            email.From.Add(fromMessage);
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;
            var builder = new BodyBuilder();
            if (attachments != null)
            {
                byte[] fileBytes;
                foreach (var file in attachments)
                {
                    if (file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            file.CopyTo(ms);
                            fileBytes = ms.ToArray();
                        }
                        builder.Attachments.Add(
                            file.FileName,
                            fileBytes,
                            ContentType.Parse(file.ContentType)
                        );
                    }
                }
            }
            builder.HtmlBody = bodyHtml;
            email.Body = builder.ToMessageBody();
            await sendMail(email);
        }

        protected async Task sendMail(MimeMessage email)
        {
            using var smtp = new SmtpClient();
            smtp.ServerCertificateValidationCallback = (s, c, h, e) => true;
            MailKit.Security.SecureSocketOptions secureSocketOptions = SecureSocketOptions.Auto;
            switch ((_mailSettings.SSLMode ?? "").ToUpper())
            {
                case "STARTTSL":
                    secureSocketOptions = SecureSocketOptions.StartTls;
                    break;
                case "SSL":
                    secureSocketOptions = SecureSocketOptions.SslOnConnect;
                    break;
                case "STARTTSL_OPTION":
                    secureSocketOptions = SecureSocketOptions.StartTlsWhenAvailable;
                    break;
                case "NONE":
                    secureSocketOptions = SecureSocketOptions.None;
                    break;
            }
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, secureSocketOptions);
            if (_mailSettings.UserName != null && _mailSettings.Password != null)
            {
                smtp.Authenticate(_mailSettings.UserName, _mailSettings.Password);
            }
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

        public async Task SendTemplateEmailAsync(
            string toEmail,
            string subject,
            string templateFile,
            Dictionary<string, string> replacements,
            List<IFormFile> attachments = null,
            string fromEmailName = null,
            string fromEmailaddress = null
        )
        {
            StreamReader str = new StreamReader(templateFile);
            string MailText = str.ReadToEnd();
            str.Close();
            foreach (var toReplace in replacements.Keys)
            {
                MailText = MailText.Replace("{{" + toReplace + "}}", replacements[toReplace]);
            }
            var email = new MimeMessage();
           
            var fromMessage = new MailboxAddress(
                _mailSettings.SenderName ?? "unknown",
                _mailSettings.SenderAddress ?? "unknown@unknown.com"
            );
            if (fromEmailName != null)
            {
                fromMessage.Name = fromEmailName;
            }
            if (fromEmailaddress != null)
            {
                fromMessage.Address = fromEmailaddress;
            }
            email.From.Add(fromMessage);
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = MailText;
            email.Body = builder.ToMessageBody();
            await sendMail(email);
        }
    }
}
