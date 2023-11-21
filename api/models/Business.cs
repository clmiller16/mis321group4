namespace api.models
{
    public class Business
    {
        public int BusinessID {get; set;}
        public string CompanyName {get; set;}
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string ProductType {get; set;}
        public string Email {get; set;}
        public string Password {get; set;}
        public string Logo {get; set;}
        
    }
        public class BusinessLogin
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}