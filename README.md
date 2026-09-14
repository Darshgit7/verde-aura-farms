# Verde Aura Farms — Phase 3

Phase 3 adds local admin authentication, protected enquiry APIs, pagination/search/filtering, status updates, and automatic local Excel export while retaining the Phase 2 secure public enquiry flow and the latest English/Marathi frontend with real farm photos.

## Run locally

### Backend
```powershell
cd backend\VerdeAuraFarms.Api
dotnet restore
dotnet run
```
API: https://localhost:7147
Swagger: https://localhost:7147/swagger

### Frontend
```powershell
cd frontend
npm install
npm run dev
```
Website: http://localhost:5173
Admin: http://localhost:5173/admin

## Local admin
Development credentials are configured in `backend/VerdeAuraFarms.Api/appsettings.Development.json`.
Change them before use. Do not use configuration-file passwords for production.

## Admin API
- POST `/api/auth/login`
- GET `/api/enquiries?page=1&pageSize=20&search=&status=` (Admin JWT required)
- GET `/api/enquiries/{id}` (Admin JWT required)
- PATCH `/api/enquiries/{id}/status` (Admin JWT required)
- POST `/api/enquiries` remains public for the website enquiry form.

## Excel
Successful enquiries are also appended to `backend/VerdeAuraFarms.Api/Data/Enquiries.xlsx` for local development/reporting. SQL Server remains the source of truth. Do not keep the workbook open while submitting test enquiries.

## Production notes
- Replace local configuration authentication with a production-grade identity/authentication solution and secure secret storage.
- Keep JWT signing keys and admin credentials out of source control.
- Configure exact production CORS origins.
- Enable Turnstile with a production secret.
- Use HTTPS/HSTS and a least-privilege database identity.
- Do not expose admin enquiry endpoints publicly without authentication/authorization.


## One-command local development

From the `frontend` folder, run once:

```powershell
npm install
```

Then start both the React frontend and ASP.NET Core API together:

```powershell
npm run dev
```

This starts the frontend at `http://localhost:5173` and the backend at `https://localhost:7147`.

For local development, the Vite proxy uses `secure: false` to accept the ASP.NET Core development certificate. Do not use this setting as a production security configuration.
