using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using VerdeAuraFarms.Api.Data;
using VerdeAuraFarms.Api.DTOs;
using VerdeAuraFarms.Api.Models;

namespace VerdeAuraFarms.Api.Services;

public sealed class EnquiryService(AppDbContext db, ITurnstileVerifier turnstileVerifier, IConfiguration configuration, IExcelExportService excelExportService) : IEnquiryService
{
    private static DateTime? ConvertIndiaTimeToUtc(DateTime? dateTime)
{
    if (!dateTime.HasValue)
        return null;

    var indiaTimeZone = TimeZoneInfo.FindSystemTimeZoneById(
        OperatingSystem.IsWindows()
            ? "India Standard Time"
            : "Asia/Kolkata");

    var unspecified = DateTime.SpecifyKind(
        dateTime.Value,
        DateTimeKind.Unspecified);

    return TimeZoneInfo.ConvertTimeToUtc(
        unspecified,
        indiaTimeZone);
}
    private static readonly HashSet<string> AllowedServices = new(StringComparer.OrdinalIgnoreCase)
    {
        "Moringa Farming Consultation", "Land Assessment", "Farm Planning", "Plantation Guidance",
        "Irrigation Guidance", "Crop Management Guidance", "Farm Visit", "Harvesting Guidance"
    };

    public async Task<CreateEnquiryResponse> CreateAsync(CreateEnquiryRequest request, CancellationToken cancellationToken)
    {
        var service = request.Service.Trim();
        if (!AllowedServices.Contains(service))
            throw new ValidationException("Please select a valid service.");

        var mobile = Regex.Replace(request.MobileNumber.Trim(), @"[\s\-()]+", "");
        if (!Regex.IsMatch(mobile, @"^\+?[0-9]{10,15}$"))
            throw new ValidationException("Enter a valid mobile number.");

        if (request.PreferredDate?.Date < DateTime.UtcNow.Date)
            throw new ValidationException("Preferred consultation date cannot be in the past.");

        var requireCaptcha = configuration.GetValue("Captcha:RequireTurnstile", false);
        if (requireCaptcha && !await turnstileVerifier.VerifyAsync(request.CaptchaToken, cancellationToken))
            throw new ValidationException("Captcha verification failed. Please try again.");

        var cutoff = DateTime.UtcNow.AddMinutes(-10);
        var duplicate = await db.Enquiries.AnyAsync(x => x.MobileNumber == mobile && x.CreatedDateUtc >= cutoff, cancellationToken);
        if (duplicate)
            throw new ConflictException("A recent request from this mobile number is already being processed.");

        var now = DateTime.UtcNow;
        var enquiry = new Enquiry
        {
            Name = request.Name.Trim(),
            MobileNumber = mobile,
            Email = string.IsNullOrWhiteSpace(request.Email) ? null : request.Email.Trim(),
            Village = string.IsNullOrWhiteSpace(request.Village) ? null : request.Village.Trim(),
            LandArea = string.IsNullOrWhiteSpace(request.LandArea) ? null : request.LandArea.Trim(),
            Service = service,
            PreferredDate = ConvertIndiaTimeToUtc(request.PreferredDate),
            Message = string.IsNullOrWhiteSpace(request.Message) ? null : request.Message.Trim(),
            Status = "New",
            CreatedDateUtc = DateTime.UtcNow,
            UpdatedDateUtc = DateTime.UtcNow
        };

        db.Enquiries.Add(enquiry);
        await db.SaveChangesAsync(cancellationToken);
        await excelExportService.AddEnquiryAsync(enquiry, cancellationToken);

        return new CreateEnquiryResponse(enquiry.Id, enquiry.Status);
    }
    public async Task<PagedResultDto<EnquiryListItemDto>> GetAllAsync(int page, int pageSize, string? search, string? status, CancellationToken cancellationToken)
    {
        page = Math.Max(1, page); pageSize = Math.Clamp(pageSize, 1, 100); var query = db.Enquiries.AsNoTracking().AsQueryable();
        if (!string.IsNullOrWhiteSpace(search)) { var term=search.Trim(); query=query.Where(x=>x.Name.Contains(term)||x.MobileNumber.Contains(term)||(x.Village!=null&&x.Village.Contains(term))); }
        if (!string.IsNullOrWhiteSpace(status)) query=query.Where(x=>x.Status==status.Trim());
        var total=await query.CountAsync(cancellationToken); var items=await query.OrderByDescending(x=>x.CreatedDateUtc).Skip((page-1)*pageSize).Take(pageSize).Select(x=>new EnquiryListItemDto(x.Id,x.Name,x.MobileNumber,x.Village,x.Service,x.Status,x.CreatedDateUtc)).ToListAsync(cancellationToken);
        return new PagedResultDto<EnquiryListItemDto>(items,page,pageSize,total,(int)Math.Ceiling(total/(double)pageSize));
    }
    public async Task<EnquiryDetailsDto?> GetByIdAsync(int id, CancellationToken cancellationToken) => await db.Enquiries.AsNoTracking().Where(x=>x.Id==id).Select(x=>new EnquiryDetailsDto(x.Id,x.Name,x.MobileNumber,x.Email,x.Village,x.LandArea,x.Service,x.PreferredDate,x.Message,x.Status,x.CreatedDateUtc,x.UpdatedDateUtc)).SingleOrDefaultAsync(cancellationToken);
    public async Task<EnquiryDetailsDto> UpdateStatusAsync(int id, string status, CancellationToken cancellationToken)
    {
        var allowed=new[]{"New","Contacted","Appointment Requested","Appointment Confirmed","Farm Visit Completed","Closed","Cancelled"}; var normalized=allowed.FirstOrDefault(x=>string.Equals(x,status.Trim(),StringComparison.OrdinalIgnoreCase)); if(normalized is null) throw new ValidationException("Invalid enquiry status.");
        var enquiry=await db.Enquiries.SingleOrDefaultAsync(x=>x.Id==id,cancellationToken); if(enquiry is null) throw new KeyNotFoundException("Enquiry not found."); enquiry.Status=normalized; enquiry.UpdatedDateUtc=DateTime.UtcNow; await db.SaveChangesAsync(cancellationToken);
        return new EnquiryDetailsDto(enquiry.Id,enquiry.Name,enquiry.MobileNumber,enquiry.Email,enquiry.Village,enquiry.LandArea,enquiry.Service,enquiry.PreferredDate,enquiry.Message,enquiry.Status,enquiry.CreatedDateUtc,enquiry.UpdatedDateUtc);
    }

}

public sealed class ValidationException(string message) : Exception(message);
public sealed class ConflictException(string message) : Exception(message);
