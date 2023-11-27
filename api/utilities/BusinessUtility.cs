using api.models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using api.database;

namespace api
{
    public class BusinessUtility
    {
            public static List<Business>  GetBusinessData(){
            List<Business> businesses = new List<Business>();
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();
            string stm = "SELECT * from business;";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read()){
                businesses.Add(new Business
                {
                    BusinessID = rdr.GetInt32(0),
                    CompanyName = rdr.GetString(1),
                    FirstName = rdr.GetString(2),
                    LastName = rdr.GetString(3),
                    ProductType = rdr.GetString(4),
                    Email = rdr.GetString(5),
                    Password = rdr.GetString(6),
                    Logo = rdr.GetString(7)
                });
            }
            
            con.Close();

            return businesses;
        }

        public static void InsertBusinessData(Business business){
            Database db = new Database();

            using var con = new MySqlConnection(db.cs);
            con.Open();

            // check line below
            string stm = "INSERT INTO business (BusinessID, CompanyName, FirstName, LastName, ProductType, Email, Password, Logo) VALUES (@BusinessID, @CompanyName, @FirstName, @LastName, @ProductType, @Email, @Password, @Logo);";
            using var cmd = new MySqlCommand(stm, con);
            
            cmd.Parameters.AddWithValue("@BusinessID", business.BusinessID);
            cmd.Parameters.AddWithValue("@CompanyName", business.CompanyName);
            cmd.Parameters.AddWithValue("@FirstName", business.FirstName);
            cmd.Parameters.AddWithValue("@LastName", business.LastName);
            cmd.Parameters.AddWithValue("@ProductType", business.ProductType);
            cmd.Parameters.AddWithValue("@Email", business.Email);
            cmd.Parameters.AddWithValue("@Password", business.Password);
            cmd.Parameters.AddWithValue("@Logo", business.Logo);

            cmd.ExecuteNonQuery();

            con.Close();
        }


        public static void UpdateBusinessData(Business business){
            Database db = new Database();

            using var con = new MySqlConnection(db.cs);
            con.Open();

            // check line below
            string stm = "UPDATE business set " +
            "CompanyName = @CompanyName, " +
            "FirstName = @FirstName, " +
            "LastName = @LastName, " +
            "ProductType = @ProductType, " +
            "Email = @Email, " +
            "Password = @Password, " + 
            "Logo = @Logo  where BusinessID = @BusinessID";
            using var cmd = new MySqlCommand(stm, con);
            
            cmd.Parameters.AddWithValue("@BusinessID", business.BusinessID);
            cmd.Parameters.AddWithValue("@CompanyName", business.CompanyName);
            cmd.Parameters.AddWithValue("@FirstName", business.FirstName);
            cmd.Parameters.AddWithValue("@LastName", business.LastName);
            cmd.Parameters.AddWithValue("@ProductType", business.ProductType);
            cmd.Parameters.AddWithValue("@Email", business.Email);
            cmd.Parameters.AddWithValue("@Password", business.Password);
            cmd.Parameters.AddWithValue("@Logo", business.Logo);

            cmd.ExecuteNonQuery();

            con.Close();
        }
    }
}