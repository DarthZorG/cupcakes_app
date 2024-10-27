using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cupcake_api.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class SwaggerReadOnlyAttribute : Attribute
    {
    }
}
