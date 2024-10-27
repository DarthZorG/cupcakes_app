namespace cupcake_api.Responses
{
    public class GenericAPIResponse<T> : ErrorResponse
        where T : class
    {
        public T? Data { get; set; }

        public GenericAPIResponse(
            String? Status,
            String? Message,
            Dictionary<string, List<string>>? Errors = null
        )
            : base(Status, Message, Errors)
        {
            Data = null;
        }

        public GenericAPIResponse(T? data)
            : base("Ok", null, null)
        {
            this.Data = data;
        }
    }
}
