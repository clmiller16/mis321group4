using api.models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using api.database;

namespace api.utilities
{
    public class AttendsUtility
    {
        public static List<Attends>  GetAttendsData(){
            List<Attends> plural = new List<Attends>();
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();
            string stm = "SELECT * from attends;";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read()){
                plural.Add(new Attends
                {
                    BoothLocation = rdr.GetString(0),
                    EventID = rdr.GetInt32(1),
                    BusinessID= rdr.GetInt32(2)
                });
            }
            
            con.Close();

            return plural;
        }

        public static void InsertAttendsData(Attends plural){
            Database db = new Database();

            using var con = new MySqlConnection(db.cs);
            con.Open();

            // check line below
            string stm = "INSERT INTO attends (BoothLocation, EventID, BusinessID) VALUES (@BoothLocation, @EventID, @BusinessID);";
            using var cmd = new MySqlCommand(stm, con);
            
            cmd.Parameters.AddWithValue("@BoothLocation", plural.BoothLocation);
            cmd.Parameters.AddWithValue("@EventID", plural.EventID);
            cmd.Parameters.AddWithValue("@BusinessID", plural.BusinessID);


            cmd.Prepare();
            cmd.ExecuteNonQuery();

            con.Close();
        }
        public static void EditAttendance(Attends attends) {
            Database db = new Database();

            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = @"UPDATE attends SET BoothLocation = @BoothLocation WHERE EventID = @EventID AND BusinessID = @BusinessID";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@BoothLocation", attends.BoothLocation);
            cmd.Parameters.AddWithValue("@EventID", attends.EventID);
            cmd.Parameters.AddWithValue("@BusinessID", attends.BusinessID);

            cmd.Prepare();
            cmd.ExecuteNonQuery();

            con.Close();
        }

        public static void DeleteAttends(Attends attends)
        {
            Database db = new Database();

            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = @"DELETE FROM attends WHERE EventID = @EventID AND BusinessID = @BusinessID";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@EventID", attends.EventID);
            cmd.Parameters.AddWithValue("@BusinessID", attends.BusinessID);

            cmd.Prepare();
            cmd.ExecuteNonQuery();

            con.Close();
        }
    }
}