using VerdeAuraFarms.Api.Models;
namespace VerdeAuraFarms.Api.Services;
public interface IExcelExportService { Task AddEnquiryAsync(Enquiry enquiry, CancellationToken cancellationToken); }
