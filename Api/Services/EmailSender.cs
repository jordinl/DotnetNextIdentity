using System.Net.Mail;
using Api.Settings;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;

public class EmailSender(IOptions<SmtpSettings> settings) : IEmailSender
{
    private readonly SmtpSettings _settings = settings.Value;

    public async Task SendEmailAsync(string email, string subject, string message)
    {
        using var client = new SmtpClient(_settings.Server, _settings.Port);
        var mailMessage = new MailMessage
        {
            From = new MailAddress(_settings.From),
            Subject = subject,
            Body = message,
            IsBodyHtml = true
        };
        mailMessage.To.Add(email);

        await client.SendMailAsync(mailMessage);
    }
}