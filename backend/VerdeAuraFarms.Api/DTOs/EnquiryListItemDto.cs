namespace VerdeAuraFarms.Api.DTOs;

public sealed record EnquiryListItemDto(
    int Id, string Name, string MobileNumber, string? Village, string? Service, string Status, DateTime CreatedDateUtc);
