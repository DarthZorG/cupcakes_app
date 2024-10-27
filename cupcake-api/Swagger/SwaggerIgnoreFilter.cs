using System;
using System.Reflection;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.OpenApi.Models;
using cupcake_api.Attributes;
using System.Windows.Markup;

namespace cupcake_api.Swagger
{
    public class SwaggerIgnoreFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema schema, SchemaFilterContext schemaFilterContext)
        {
            if (schema.Properties.Count == 0)
                return;
            PropertyInfo[] properties = schemaFilterContext.Type.GetProperties();
            foreach (PropertyInfo prop in properties)
            {
                string camelCasePropName = char.ToLowerInvariant(prop.Name[0]) + prop.Name.Substring(1);
                if (schema.Properties.ContainsKey(camelCasePropName))
                {
                    var ignoreAttribute = prop.GetCustomAttribute(typeof(SwaggerIgnoreAttribute), false);
                    if (ignoreAttribute != null)
                    {

                        schema.Properties.Remove(camelCasePropName);
                    }
                    var readOnlyAttribute = prop.GetCustomAttribute(typeof(SwaggerReadOnlyAttribute), false);
                    if (readOnlyAttribute != null)
                    {
                        var schemaProperty = schema.Properties[camelCasePropName];
                        //schemaProperty
                        if (schemaProperty.Reference != null)
                        {
                            schemaProperty.AllOf = new List<OpenApiSchema>()
                            {
                                new OpenApiSchema()
                                {
                                    Reference = schemaProperty.Reference
                                }
                            };
                            schemaProperty.Reference = null;
                        } 
                        schema.Properties[camelCasePropName].ReadOnly = true;
                    }
                }
                
            }
        }
    }
}
