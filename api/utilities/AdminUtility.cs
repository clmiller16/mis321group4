using api.models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using api.database;

namespace api.utilities
{
    public class AdminUtility
    {
        public static List<Admin>  GetAdminData(){
            List<Admin> admins = new List<Admin>();
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();
            string stm = "SELECT * from admin;";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read()){
                admins.Add(new Admin
                {
                    AdminID = rdr.GetInt32(0),
                    Email = rdr.GetString(1),
                    Password = rdr.GetString(2)
                });
            }
            
            con.Close();

            return admins;
        }

        public static void InsertAdminData(Admin admin){
            Database db = new Database();

            using var con = new MySqlConnection(db.cs);
            con.Open();

            // check line below
            string stm = "INSERT INTO admin (AdminID, Email, Password) VALUES (@AdminID, @Email, @Password);";
            using var cmd = new MySqlCommand(stm, con);
            
            cmd.Parameters.AddWithValue("@AdminID", admin.AdminID);
            cmd.Parameters.AddWithValue("@Email", admin.Email);
            cmd.Parameters.AddWithValue("@Password", admin.Password);

            cmd.ExecuteNonQuery();

            con.Close();
        }
    }
}