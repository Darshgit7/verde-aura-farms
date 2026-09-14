using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VerdeAuraFarms.Api.DTOs;
using VerdeAuraFarms.Api.Services;
namespace VerdeAuraFarms.Api.Controllers;
[ApiController]
[Route("api/enquiries")]
public sealed class EnquiriesController(IEnquiryService service) : ControllerBase
{
 [HttpPost]
 [ProducesResponseType(typeof(CreateEnquiryResponse),201)] [ProducesResponseType(400)] [ProducesResponseType(409)] [ProducesResponseType(429)]
 public async Task<IActionResult> Create([FromBody]CreateEnquiryRequest request,CancellationToken cancellationToken){var result=await service.CreateAsync(request,cancellationToken);return Created("/api/enquiries",result);}
 [Authorize(Roles="Admin")] [HttpGet]
 public async Task<IActionResult> GetAll([FromQuery]int page=1,[FromQuery]int pageSize=20,[FromQuery]string? search=null,[FromQuery]string? status=null,CancellationToken cancellationToken=default)=>Ok(await service.GetAllAsync(page,pageSize,search,status,cancellationToken));
 [Authorize(Roles="Admin")] [HttpGet("{id:int}")]
 public async Task<IActionResult> GetById(int id,CancellationToken cancellationToken){var result=await service.GetByIdAsync(id,cancellationToken);return result is null?NotFound():Ok(result);}
 [Authorize(Roles="Admin")] [HttpPatch("{id:int}/status")]
 public async Task<IActionResult> UpdateStatus(int id,[FromBody]UpdateEnquiryStatusRequest request,CancellationToken cancellationToken)=>Ok(await service.UpdateStatusAsync(id,request.Status,cancellationToken));
}
