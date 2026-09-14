using System.ComponentModel.DataAnnotations;

namespace VerdeAuraFarms.Api.DTOs;

public sealed class UpdateEnquiryStatusRequest
{
    [Required, StringLength(50)] public string Status { get; init; } = string.Empty;
}
