using cupcake_api.Controllers;


namespace cupcake_api.Models
{
    public class PublicFileEx : PublicFile
    {
        public static PublicFileEx FromPublicFile(PublicFile publicFile, HttpRequest request)
        {
            var f = new PublicFileEx();
            f.FileName = publicFile.FileName;
            f.URI = UploadsController.GetBaseUri(request) + GetUploadPath() + publicFile.URI;
            return f;
        }

        public static string GetUploadPath()
        {
            return "upload/";
        }
    }
}
