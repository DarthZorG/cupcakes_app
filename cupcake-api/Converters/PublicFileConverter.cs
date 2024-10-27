using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.Text.Json;
using System.Text.Json.Serialization;
using cupcake_api.Models;
using Microsoft.AspNetCore.Http;


namespace cupcake_api.Converters
{

    public class PublicFileConverter : JsonConverter<PublicFile>
    {

        private readonly IHttpContextAccessor _httpContextAccessor;

        public PublicFileConverter(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public override PublicFile Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            // Use default implementation when deserializing (reading)
            return JsonSerializer.Deserialize<PublicFile>(ref reader, options);
        }

        public override void Write(Utf8JsonWriter writer, PublicFile value, JsonSerializerOptions options)
        {
            writer.WriteStartObject();

            PublicFileEx newFile = PublicFileEx.FromPublicFile(value, _httpContextAccessor.HttpContext.Request);

            using (JsonDocument document = JsonDocument.Parse(JsonSerializer.Serialize(newFile)))
            {
                foreach (var property in document.RootElement.EnumerateObject())
                {
                    property.WriteTo(writer);
                }
            }

            writer.WriteEndObject();
        }
    }
}
