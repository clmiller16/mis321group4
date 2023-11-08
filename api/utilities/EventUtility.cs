using api.models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using api.database;

namespace api.utilities
{
    public class EventUtility
    {
        public static List<Event>  GetEventData(){
            List<Event> events = new List<Event>();
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();
            string stm = "SELECT * from market_event;";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read()){
                events.Add(new Event
                {
                    EventID = rdr.GetInt32(0),
                    Date = rdr.GetString(1),
                    Location = rdr.GetString(2)
                });
            }
            
            con.Close();

            return events;
        }

        public static void InsertEventData(Event events){
            Database db = new Database();

            using var con = new MySqlConnection(db.cs);
            con.Open();

            // check line below
            string stm = "INSERT INTO market_event (EventID, Date, Location) VALUES (@EventID, @Date, @Location);";
            using var cmd = new MySqlCommand(stm, con);
            
            cmd.Parameters.AddWithValue("@EventID", events.EventID);
            cmd.Parameters.AddWithValue("@Date", events.Date);
            cmd.Parameters.AddWithValue("@Location", events.Location);

            cmd.ExecuteNonQuery();

            con.Close();
        }
    }
}