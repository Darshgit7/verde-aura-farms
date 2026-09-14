using ClosedXML.Excel;
using VerdeAuraFarms.Api.Models;
namespace VerdeAuraFarms.Api.Services;
public sealed class ExcelExportService(IWebHostEnvironment environment) : IExcelExportService
{
    private readonly SemaphoreSlim _lock = new(1,1);
    public async Task AddEnquiryAsync(Enquiry enquiry, CancellationToken cancellationToken)
    {
        await _lock.WaitAsync(cancellationToken);
        try
        {
            var folder=Path.Combine(environment.ContentRootPath,"Data"); Directory.CreateDirectory(folder);
            var path=Path.Combine(folder,"Enquiries.xlsx");
            using var wb=File.Exists(path)?new XLWorkbook(path):new XLWorkbook();
            var ws=wb.Worksheets.FirstOrDefault(x=>x.Name=="Enquiries") ?? wb.Worksheets.Add("Enquiries");
            if (ws.LastRowUsed() is null) { var headers=new[]{"ID","Name","Mobile Number","Email","Village","Land Area","Service","Preferred Date","Message","Status","Created Date","Updated Date"}; for(int i=0;i<headers.Length;i++) ws.Cell(1,i+1).Value=headers[i]; ws.Row(1).Style.Font.Bold=true; }
            var row=ws.LastRowUsed()?.RowNumber()+1 ?? 2;
            object?[] vals={enquiry.Id,enquiry.Name,enquiry.MobileNumber,enquiry.Email,enquiry.Village,enquiry.LandArea,enquiry.Service,enquiry.PreferredDate,enquiry.Message,enquiry.Status,enquiry.CreatedDateUtc,enquiry.UpdatedDateUtc};
            for(int i=0;i<vals.Length;i++) ws.Cell(row,i+1).Value=vals[i]?.ToString() ?? string.Empty;
            ws.Columns().AdjustToContents();
            await Task.Run(()=>wb.SaveAs(path), cancellationToken);
        } finally { _lock.Release(); }
    }
}
