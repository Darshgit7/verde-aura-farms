namespace VerdeAuraFarms.Api.DTOs;

public sealed record EnquiryDetailsDto(
    int Id, string Name, string MobileNumber, string? Email, string? Village, string? LandArea,
    string Service, DateTime? PreferredDate, string? Message, string Status, DateTime CreatedDateUtc, DateTime UpdatedDateUtc);
