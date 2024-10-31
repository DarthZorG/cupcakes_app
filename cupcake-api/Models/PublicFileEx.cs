using cupcake_api.Controllers;

namespace cupcake_api.Models
{
    public class PublicFileEx : PublicFile
    {
        public static PublicFileEx? FromPublicFile(PublicFile? publicFile, HttpRequest request)
        {
            if (publicFile == null)
            {
                return null;
            }
            var f = new PublicFileEx();
            f.fileName = publicFile.fileName;
            f.uri = UploadsController.GetBaseUri(request) + GetUploadPath() + publicFile.uri;
            return f;
        }

        public static string GetUploadPath()
        {
            return "upload/";
        }
    }
}
