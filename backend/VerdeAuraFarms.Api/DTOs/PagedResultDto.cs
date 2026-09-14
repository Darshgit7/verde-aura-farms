namespace VerdeAuraFarms.Api.DTOs;

public sealed record PagedResultDto<T>(IReadOnlyList<T> Items, int Page, int PageSize, int TotalCount, int TotalPages);
