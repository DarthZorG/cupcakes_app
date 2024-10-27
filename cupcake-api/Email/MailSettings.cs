namespace cupcake_api.Email
{
    public class MailSettings
    {
        public string SenderName { get; set; }

        public string SenderAddress { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }

        public string SSLMode { get; set; } 
    }
}
