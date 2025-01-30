using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class OAuthController(
    SignInManager<IdentityUser> signInManager,
    UserManager<IdentityUser> userManager,
    IUserStore<IdentityUser> userStore)
    : ControllerBase
{
    private readonly IUserEmailStore<IdentityUser> _emailStore = (IUserEmailStore<IdentityUser>)userStore;

    [HttpPost("[action]")]
    [Consumes("application/x-www-form-urlencoded")]
    public async Task<IActionResult> GoogleCallback([FromForm] GoogleAuthRequest request)
    {
        var payload = await GoogleJsonWebSignature.ValidateAsync(request.Credential);

        var user = await userManager.FindByEmailAsync(payload.Email);

        if (user == null)
        {
            user = new IdentityUser();
            await userStore.SetUserNameAsync(user, payload.Email, CancellationToken.None);
            await _emailStore.SetEmailAsync(user, payload.Email, CancellationToken.None);
            user.EmailConfirmed = payload.EmailVerified;

            var password = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
            var result = await userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                return Redirect("/some-error-page");
            }
        }
        else if (!user.EmailConfirmed && payload.EmailVerified)
        {
            user.EmailConfirmed = true;
            await userManager.UpdateAsync(user);
        }

        await signInManager.SignInAsync(user, true);

        return Redirect("/");
    }
}
public class GoogleAuthRequest
{
    public string Credential { get; set; } = string.Empty;
}
