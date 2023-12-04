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

        public static void InsertEventData(Event newEvent){


            Database db = new Database();

            using var con = new MySqlConnection(db.cs);
            con.Open();

            // check line below
            string stm = "INSERT INTO market_event (Date, Location) VALUES (@Date, @Location);";
            using var cmd = new MySqlCommand(stm, con);
            
            cmd.Parameters.AddWithValue("@Date", newEvent.Date);
            cmd.Parameters.AddWithValue("@Location", newEvent.Location);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
            con.Close();   


            // // Check if cmd is not null before proceeding
            // if (cmd != null)
            // {
            //     cmd.Prepare();
            //     cmd.ExecuteNonQuery();
            //     // ...
            // }

        }
    }
}