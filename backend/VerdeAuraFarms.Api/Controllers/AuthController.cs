using Microsoft.AspNetCore.Mvc;
using VerdeAuraFarms.Api.DTOs;
using VerdeAuraFarms.Api.Services;

namespace VerdeAuraFarms.Api.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(IConfiguration configuration, IJwtService jwtService) : ControllerBase
{
    [HttpPost("login")]
    [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var username = configuration["Admin:Username"];
        var password = configuration["Admin:Password"];

        if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            return Problem("Admin authentication is not configured.", statusCode: StatusCodes.Status500InternalServerError);

        if (!string.Equals(request.Username, username, StringComparison.Ordinal) ||
            !string.Equals(request.Password, password, StringComparison.Ordinal))
            return Unauthorized(new { message = "Invalid username or password." });

        return Ok(jwtService.CreateToken(request.Username));
    }
}
