namespace VerdeAuraFarms.Api.Services;

public interface ITurnstileVerifier
{
    Task<bool> VerifyAsync(string? token, CancellationToken cancellationToken);
}
