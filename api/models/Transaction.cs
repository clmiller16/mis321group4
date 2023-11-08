namespace api.models
{
    public class Transaction
    {
        public int TransactionID {get; set;}
        public double TotalCost {get; set;}
        public int NumAdultTickets {get; set;}
        public int NumChildTickets {get; set;}
        public int NumSeniorTickets {get; set;}
        public int NumStudentTickets {get; set;}
        public int EventID {get; set;}
        public int AttendeeID {get; set;}
    }
}