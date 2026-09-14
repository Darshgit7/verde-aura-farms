# Verde Aura Farms — Project Information

## Business
- Name: Verde Aura Farms
- Purpose: Moringa farming consultancy / lead generation
- Audience: Farmers and landowners interested in Moringa farming
- Primary goal: Consultation and farm-visit enquiries
- Languages: English, Marathi

## Customer Journey
Website → Learn about Moringa farming → See real farm → WhatsApp/Call/Form → Consultation → Farm visit → Detailed guidance

## Phase 1
- Public responsive website
- Home
- About
- Moringa Farming basics
- Our Farm / real photo gallery
- Consultancy services
- Consultation enquiry form
- Contact
- WhatsApp and phone CTAs
- Language switcher: English / मराठी

## Localization Rules
- English is the default language.
- All user-facing text must come from the translation dictionary.
- Do not mix languages within a selected language.
- Keep business name "Verde Aura Farms" unchanged.
- Dates, phone numbers and user-entered form data are not translated.
- Future content additions must be added to both translation dictionaries. Hindi can be added later as a separate language pack.
- Store the selected language in localStorage so the choice persists after refresh.
- Use Unicode-safe fonts and rendering for Marathi. Hindi support is planned for a later update.
- Future SEO should provide language-specific titles/descriptions and hreflang links.

## Business Details To Add
- Phone: TODO
- WhatsApp: TODO
- Email: TODO
- Farm address: TODO
- Google Maps: TODO
- Experience: TODO
- Consultation charges: TODO
- Farm visit charges: TODO
- Working hours: TODO

## Services
- Moringa farming consultation
- Land assessment
- Farm planning
- Plantation guidance
- Irrigation guidance
- Crop management guidance
- Farm visit
- Harvesting guidance

## Content Rules
Use factual information only. Do not publish guaranteed income/yield/profit claims or unverified organic/certification claims.

## Real Photos
Authentic farm photographs supplied by the business owner are now included in Phase 1. Recommended:
- Full farm
- Moringa plantation
- Close-up plants/leaves
- Irrigation
- Harvesting
- Nursery/seedlings
- Farm visit/consultation

Optimize images for web and remove unnecessary GPS/EXIF metadata.

## Technology
Phase 1: React + Vite
Planned: ASP.NET Core 8 Web API + EF Core + SQL Server
Future: Email, WhatsApp, CAPTCHA/Turnstile, admin dashboard, appointments

## Security Before Production
- HTTPS
- Strict CORS
- Server-side validation
- EF Core parameterized access
- Rate limiting
- CAPTCHA/Turnstile
- Security headers
- Global exception handling
- No secrets in source control
- Secure environment configuration / Key Vault
- Admin authentication and authorization
- No public enquiry records
- IDOR protection
- Safe structured logging
- Least-privilege database access
- Backups

## Roadmap
### Phase 1 — Public Website
- [x] React/Vite
- [x] Responsive UI
- [x] English/Marathi language switcher
- [x] Consultancy-focused content
- [x] Enquiry UI
- [x] Real farm photo gallery
- [x] Replace demo images with real farm photos
- [ ] Add actual business contact details
- [ ] Finalize business content

### Phase 2 — Secure Backend
- [ ] ASP.NET Core API
- [ ] SQL Server
- [ ] EF Core migrations
- [ ] Enquiry persistence
- [ ] Server-side validation
- [ ] Rate limiting
- [ ] CAPTCHA
- [ ] Email notification
- [ ] Secure CORS/headers
- [ ] Logging/error handling

### Phase 3 — Admin & Production
- [ ] Admin authentication
- [ ] Enquiry dashboard
- [ ] Appointment management
- [ ] Production deployment
- [ ] Domain/HTTPS
- [ ] Monitoring
- [ ] Database backups

## Change Log
2026-09-14 — Phase 1 language scope set to English + Marathi. Hindi is planned for a future update.


## Change Log — 2026-09-14
- Updated the public header/navigation to remain visible while scrolling (sticky/fixed header).
- Header now stays accessible across desktop and mobile views with a dark translucent background and blur for readability over page content.

## Change Log — 2026-09-14 (Farm Gallery Slider)
- Replaced the static farm image grid with an auto-advancing image slider.
- Added previous/next controls, dots, thumbnail navigation on desktop, and responsive mobile behavior.
- Clicking the main image opens a full-screen preview/lightbox.
- Clicking outside the preview, the close button, or pressing Escape closes the preview.
- Left/right arrow keys and preview navigation buttons can move between images.

## Phase 2 Implementation — 2026-09-14
- Added ASP.NET Core 8 Web API under `backend/VerdeAuraFarms.Api`.
- Added SQL Server + EF Core `Enquiries` model and configuration.
- Added secure public `POST /api/enquiries` endpoint; enquiry records are not publicly readable.
- Added server-side validation, allowed-service validation, mobile normalization, future-date validation and duplicate-submission protection.
- Added built-in IP-based rate limiting.
- Added strict configurable CORS allow-list.
- Added HTTPS redirection, HSTS and API security headers.
- Added global exception handling with safe ProblemDetails responses and trace IDs; internal exception details are not returned.
- Added optional Cloudflare Turnstile verification. Production configuration is set to require it; the frontend supports a public Turnstile site key through `VITE_TURNSTILE_SITE_KEY`.
- Connected the Phase 1 consultation form to `POST /api/enquiries` with loading/error/success handling.
- Added Vite development proxy from `/api` to the local ASP.NET Core API.
- Added `database/schema.sql` for local SQL Server setup.
- Production secrets are expected through environment variables / Azure secure configuration, not source control.
- Admin authentication, enquiry dashboard, appointment management and production deployment remain Phase 3.
