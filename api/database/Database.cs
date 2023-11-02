using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mis321.mis321group4.api.database
{
    public class Database
    {
        public string host{get;set;}
        public string database{get;set;}
        public string username{get;set;}
        public string port{get;set;}
        public string password{get;set;}

        public string cs {get; set;}

        public Database(){
            host = "ckshdphy86qnz0bj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            database = "v8nyhpcxiv4yp89x";
            username = "wuuxnhs9tp9xm5xn";
            port = "3306";
            password = "qhefqssrcg0jyw5t";

            cs = $"server={host};user={username};database={database};port={port};password={password}";

        }
    }
}