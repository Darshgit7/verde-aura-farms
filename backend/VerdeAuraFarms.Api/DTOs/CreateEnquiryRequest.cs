using System.ComponentModel.DataAnnotations;

namespace VerdeAuraFarms.Api.DTOs;

public sealed class CreateEnquiryRequest
{
    [Required, StringLength(100, MinimumLength = 2)]
    public string Name { get; init; } = string.Empty;

    [Required, RegularExpression(@"^\+?[0-9][0-9\s\-()]{9,19}$", ErrorMessage = "Enter a valid mobile number.")]
    public string MobileNumber { get; init; } = string.Empty;

    [EmailAddress, StringLength(200)]
    public string? Email { get; init; }

    [StringLength(100)]
    public string? Village { get; init; }

    [StringLength(50)]
    public string? LandArea { get; init; }

    [Required, StringLength(100)]
    public string Service { get; init; } = string.Empty;

    public DateTime? PreferredDate { get; init; }

    [StringLength(2000)]
    public string? Message { get; init; }

    // Filled by Cloudflare Turnstile on the frontend when enforcement is enabled.
    [StringLength(2048)]
    public string? CaptchaToken { get; init; }
}
