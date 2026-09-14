using VerdeAuraFarms.Api.DTOs;
namespace VerdeAuraFarms.Api.Services;
public interface IJwtService { LoginResponse CreateToken(string username); }
