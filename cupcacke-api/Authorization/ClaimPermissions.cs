namespace cupcacke_api.Authorization
{
    public class ClaimPermissions
    {

        private const string CREATE = ".create";
        private const string VIEW = ".view";
        private const string UPDATE = ".update";
        private const string DELETE = ".delete";


        public static class Products
        {
            public const string name = "products";

            public const string create = name + CREATE;
            public const string view = name + VIEW;
            public const string update = name + UPDATE;
            public const string delete = name + DELETE;
        }

        public static class Users
        {
            public const string name = "users";

            public const string create = name + CREATE;
            public const string view = name + VIEW;
            public const string update = name + UPDATE;
            public const string delete = name + DELETE;
        }
              
        public static class System
        {
            public const string name = "System";

            public static class Settings
            {
                public const string name = System.name + "Settings";

                public const string manage = name + UPDATE;
            }
        }
    }
}
