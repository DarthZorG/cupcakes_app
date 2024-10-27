using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cupcake_api.Attributes
{
    [AttributeUsage(AttributeTargets.Property) ]
    public class SwaggerIgnoreAttribute : Attribute
    {
    }
}
