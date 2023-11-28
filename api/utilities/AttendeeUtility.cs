using api.models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using api.database;


namespace api
{
    public class AttendeeUtility
    {
        public static List<Attendee>  GetAttendeeData(){
            List<Attendee> attendees = new List<Attendee>();
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();
            string stm = "SELECT * from attendee;";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read()){
                attendees.Add(new Attendee
                {
                    AttendeeID = rdr.GetInt32(0),
                    FirstName = rdr.GetString(1),
                    LastName = rdr.GetString(2),
                    Email = rdr.GetString(3),
                    Password = rdr.GetString(4),
                    CreditCard = rdr.GetString(5)
                });
            }
            
            con.Close();

            return attendees;
        }

        public static void InsertAttendeeData(Attendee attendee){
            Database db = new Database();

            using var con = new MySqlConnection(db.cs);
            con.Open();

            // check line below
            string stm = "INSERT INTO attendee (FirstName, LastName, Email, Password, CreditCard) VALUES (@FirstName, @LastName, @Email, @Password, @CreditCard);";
            using var cmd = new MySqlCommand(stm, con);
            
            // cmd.Parameters.AddWithValue("@AttendeeID", attendee.AttendeeID);
            cmd.Parameters.AddWithValue("@FirstName", attendee.FirstName);
            cmd.Parameters.AddWithValue("@LastName", attendee.LastName);
            cmd.Parameters.AddWithValue("@Email", attendee.Email);
            cmd.Parameters.AddWithValue("@Password", attendee.Password);
            cmd.Parameters.AddWithValue("@CreditCard", "not saving");

            cmd.Prepare();
            cmd.ExecuteNonQuery();

            con.Close();
        }
    }
}