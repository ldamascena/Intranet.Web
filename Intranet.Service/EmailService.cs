using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Service
{
    public class EmailService
    {

        public void SendEmail(string para, string assunto)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                mail.From = new MailAddress("ldamascena2307@gmail.com");
                mail.To.Add(para);
                mail.Subject = assunto;
                //mail.Body = "This is for testing SMTP mail from GMAIL";


                
                SmtpServer.Port = 587;
                //SmtpServer.Port = 465;
                SmtpServer.Credentials = new System.Net.NetworkCredential("ldamascena2307@gmail.com", "ldamascena");
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public void SendEmail2(string para, string assunto)
        //{
        //    try
        //    {
        //        using (StreamReader reader = File.OpenText()) // Path to your 
        //        {                                                         // HTML file
        //            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
        //            MailMessage myMail = new MailMessage();

        //            myMail.From = new MailAddress("ldamascena2307@gmail.com");
        //            myMail.To.Add(para);
        //            myMail.Subject = "HTML Message";
        //            myMail.IsBodyHtml = true;
        //            myMail. = MailFormat.Html;
        //            myMail.Body = reader.ReadToEnd();  // Load the content from your file...

        //            SmtpServer.Port = 587;
        //            //SmtpServer.Port = 465;
        //            SmtpServer.Credentials = new System.Net.NetworkCredential("ldamascena2307@gmail.com", "ldamascena");
        //            SmtpServer.EnableSsl = true;

        //            SmtpServer.Send(myMail);
        //        }
                
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
    }
}
