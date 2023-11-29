using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetEnv;

namespace api.database
{
    public class Database
    {
        // public string host{get;set;}
        // public string database{get;set;}
        // public string username{get;set;}
        // public string port{get;set;}
        // public string password{get;set;}

        public string cs {get; set;}

        // public Database(){
        //     host = "ckshdphy86qnz0bj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
        //     database = "v8nyhpcxiv4yp89x";
        //     username = "wuuxnhs9tp9xm5xn";
        //     port = "3306";
        //     password = "qhefqssrcg0jyw5t";

        //     cs = $"server={host};user={username};database={database};port={port};password={password}";
        // }

        public Database(){
            DotNetEnv.Env.Load();

            var host = Environment.GetEnvironmentVariable("DB_HOST");
            var port = Environment.GetEnvironmentVariable("DB_PORT");
            var dbName = Environment.GetEnvironmentVariable("DB_NAME");
            var user = Environment.GetEnvironmentVariable("DB_USER");
            var password = Environment.GetEnvironmentVariable("DB_PASSWORD");

            cs = $"server={host};user={user};database={dbName};port={port};password={password}";
        }
    }
}