using VerdeAuraFarms.Api.DTOs;
namespace VerdeAuraFarms.Api.Services;
public interface IEnquiryService
{
    Task<CreateEnquiryResponse> CreateAsync(CreateEnquiryRequest request, CancellationToken cancellationToken);
    Task<PagedResultDto<EnquiryListItemDto>> GetAllAsync(int page, int pageSize, string? search, string? status, CancellationToken cancellationToken);
    Task<EnquiryDetailsDto?> GetByIdAsync(int id, CancellationToken cancellationToken);
    Task<EnquiryDetailsDto> UpdateStatusAsync(int id, string status, CancellationToken cancellationToken);
}
