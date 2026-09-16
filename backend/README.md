# Verde Aura Farms — Phase 2 Secure Backend

ASP.NET Core 8 Web API + EF Core + SQL Server for the public consultation enquiry flow.

## Implemented
- POST `/api/enquiries`
- Server-side DataAnnotations + business validation
- Allowed-service validation
- Mobile normalization and validation
- Past-date rejection
- Duplicate submission window (same mobile, 10 minutes)
- EF Core + SQL Server
- Retry-on-failure for transient SQL errors
- Built-in IP-based rate limiting
- Strict configurable CORS
- HTTPS redirection
- HSTS/security headers
- Global exception handling with ProblemDetails
- Production-safe error messages (no stack traces/SQL details)
- Optional Cloudflare Turnstile verification, enforced in Production configuration
- Swagger only in Development
- `/health` endpoint

## Local setup
1. Install .NET 8 SDK and SQL Server.
2. Create the database using `../database/schema.sql` for a quick local start, or use EF migrations.
3. Set `ConnectionStrings:DefaultConnection` through user secrets/environment variables for real credentials.
4. Run:

```bash
dotnet restore
dotnet run
```

The API listens on the HTTPS URL shown by ASP.NET Core.

## EF Core migrations
After installing the EF CLI if needed:

```bash
dotnet tool install --global dotnet-ef
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Do not use `Database.EnsureCreated()` in production.

## Production configuration
Set:
- `ConnectionStrings__DefaultConnection` — least-privilege SQL login/managed identity connection
- `Cors__AllowedOrigins__0` — exact production frontend origin
- `Captcha__RequireTurnstile=true`
- `Captcha__TurnstileSecretKey` — secret, never committed

For Azure, prefer Key Vault / managed identity or secure App Service configuration instead of source-controlled secrets.

## Important security notes
- Public clients can create enquiries only; no public GET/PATCH/delete enquiry endpoints exist.
- Admin APIs/authentication are intentionally deferred to Phase 3.
- Public POST is stateless and does not use cookie authentication; CSRF protection becomes required when authenticated browser/session operations are introduced in Phase 3.
- Do not log request bodies, mobile numbers, email addresses, or other unnecessary personal data.
- Place the API behind HTTPS and, in production, preferably behind a reverse proxy/WAF such as Azure Application Gateway/Front Door.

## Database providers
Local development continues to use SQL Server. Production uses PostgreSQL when `ASPNETCORE_ENVIRONMENT=Production`. Set `ConnectionStrings__DefaultConnection` in Render to the PostgreSQL Internal Database URL.
