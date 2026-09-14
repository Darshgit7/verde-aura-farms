namespace VerdeAuraFarms.Api.Models;

public sealed class Enquiry
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string MobileNumber { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Village { get; set; }
    public string? LandArea { get; set; }
    public string Service { get; set; } = string.Empty;
    public DateTime? PreferredDate { get; set; }
    public string? Message { get; set; }
    public string Status { get; set; } = "New";
    public DateTime CreatedDateUtc { get; set; }
    public DateTime UpdatedDateUtc { get; set; }
}
