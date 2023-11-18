using api.models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using api.database;

namespace api.utilities
{
    public class TransactionUtility
    {
        public static List<Transaction>  GetTransactionData(){
            List<Transaction> transactions = new List<Transaction>();
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();
            string stm = "SELECT * from transaction;";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read()){
                transactions.Add(new Transaction
                {
                    TransactionID = rdr.GetInt32(0),
                    TotalCost = rdr.GetDouble(1),
                    NumAdultTickets= rdr.GetInt32(2),
                    NumChildTickets = rdr.GetInt32(3),
                    NumSeniorTickets = rdr.GetInt32(4),
                    NumStudentTickets = rdr.GetInt32(5),
                    EventID = rdr.GetInt32(6),
                    AttendeeID = rdr.GetInt32(7)
                });
            }
            
            con.Close();

            return transactions;
        }

        public static void InsertTransactionData(Transaction transactions){
            Database db = new Database();

            using var con = new MySqlConnection(db.cs);
            con.Open();

            // check line below
            string stm = "INSERT INTO transaction (TotalCost, NumAdultTickets, NumChildTickets, NumSeniorTickets, NumStudentTickets, EventID, AttendeeID) VALUES (@TransactionID, @TotalCost, @NumAdultTickets, @NumChildTickets, @NumSeniorTickets, @NumStudentTickets, @EventID, @AttendeeID);";
            using var cmd = new MySqlCommand(stm, con);
            
            // cmd.Parameters.AddWithValue("@TransactionID", transactions.TransactionID);
            cmd.Parameters.AddWithValue("@TotalCost", transactions.TotalCost);
            cmd.Parameters.AddWithValue("@NumAdultTickets", transactions.NumAdultTickets);
            cmd.Parameters.AddWithValue("@NumChildTickets", transactions.NumChildTickets);
            cmd.Parameters.AddWithValue("@NumSeniorTickets", transactions.NumSeniorTickets);
            cmd.Parameters.AddWithValue("@NumStudentTickets", transactions.NumStudentTickets);
            cmd.Parameters.AddWithValue("@EventID", transactions.EventID);
            cmd.Parameters.AddWithValue("@AttendeeID", transactions.AttendeeID);

            cmd.ExecuteNonQuery();

            con.Close();
        }
    }
}