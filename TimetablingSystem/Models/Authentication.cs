using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using TimetablingSystem.DBInterface;

namespace TimetablingSystem.Models
{
    public class Authentication
    {

        public bool ValidateUser (string username, string password)
        {

            bool valid = false;

            department user = null;

            using (TimetablingSystemContext _db = new TimetablingSystemContext())
            {
                user = _db.departments.FirstOrDefault(d => d.code == username);

            }

            string hashedUserInput = HashPassword(password, user.salt);

            if (user != null) if (user.hashedPassword == hashedUserInput) valid = true;
                
            return valid;

        }

        public string GenerateSalt()
        {

            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            byte[] saltBytes = new byte[4];
            rng.GetNonZeroBytes(saltBytes);

            return Convert.ToBase64String(saltBytes);

        }

        public string HashPassword(string password, string salt)
        {

            string saltedPassword = salt + password;
            Byte[] passwordBytes = Encoding.UTF8.GetBytes(saltedPassword);

            HashAlgorithm encoder = new SHA256CryptoServiceProvider();
            Byte[] hashedPassword = encoder.ComputeHash(passwordBytes);

            return BitConverter.ToString(hashedPassword);

        }

    }
}