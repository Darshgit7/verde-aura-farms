using System.Net.Http.Json;

namespace VerdeAuraFarms.Api.Services;

public sealed class TurnstileVerifier(HttpClient httpClient, IConfiguration configuration, ILogger<TurnstileVerifier> logger) : ITurnstileVerifier
{
    private const string VerifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    public async Task<bool> VerifyAsync(string? token, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(token)) return false;
        var secret = configuration["Captcha:TurnstileSecretKey"];
        if (string.IsNullOrWhiteSpace(secret))
        {
            logger.LogError("Turnstile enforcement is enabled but the secret key is missing.");
            return false;
        }

        using var response = await httpClient.PostAsJsonAsync(VerifyUrl, new { secret, response = token }, cancellationToken);
        if (!response.IsSuccessStatusCode) return false;
        var result = await response.Content.ReadFromJsonAsync<TurnstileResponse>(cancellationToken: cancellationToken);
        return result?.Success == true;
    }

    private sealed record TurnstileResponse(bool Success);
}
