using Api.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;

namespace Api.Services;

public class IdentityEmailSender<TUser>(IEmailSender emailSender, IOptions<SmtpSettings> settings) : IEmailSender<TUser>
    where TUser : class
{
    private readonly SmtpSettings _settings = settings.Value;

    public async Task SendConfirmationLinkAsync(TUser user, string email, string confirmationLink)
    {
        var query = new Uri(confirmationLink).Query;
        var confirmationUrl = $"{_settings.BaseUrl}/confirmEmail{query}";

        await emailSender.SendEmailAsync(
            email,
            "Confirm your email",
            $"Please confirm your account by <a href='{confirmationUrl}'>clicking here</a>.");
    }

    public async Task SendPasswordResetLinkAsync(TUser user, string email, string resetLink)
    {
        var query = new Uri(resetLink).Query;
        var resetUrl = $"{_settings.BaseUrl}/reset-password{query}";

        await emailSender.SendEmailAsync(
            email,
            "Reset your password",
            $"Please reset your password by <a href='{resetUrl}'>clicking here</a>.");
    }

    public async Task SendPasswordResetCodeAsync(TUser user, string email, string code)
    {
        var resetUrl = $"{_settings.BaseUrl}/reset-password?email={Uri.EscapeDataString(email)}&code={Uri.EscapeDataString(code)}";

        await emailSender.SendEmailAsync(
            email,
            "Reset your password",
            $"Please reset your password by <a href='{resetUrl}'>clicking here</a>.");
    }
}
