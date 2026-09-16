using Microsoft.EntityFrameworkCore;
using VerdeAuraFarms.Api.Models;

namespace VerdeAuraFarms.Api.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Enquiry> Enquiries => Set<Enquiry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var entity = modelBuilder.Entity<Enquiry>();
        entity.ToTable("Enquiries");
        entity.HasKey(x => x.Id);
        entity.Property(x => x.Name).HasMaxLength(100).IsRequired();
        entity.Property(x => x.MobileNumber).HasMaxLength(20).IsRequired();
        entity.Property(x => x.Email).HasMaxLength(200);
        entity.Property(x => x.Village).HasMaxLength(100);
        entity.Property(x => x.LandArea).HasMaxLength(50);
        entity.Property(x => x.Service).HasMaxLength(100).IsRequired();
        entity.Property(x => x.Message).HasMaxLength(2000);
        entity.Property(x => x.Status).HasMaxLength(30).IsRequired();
        // Let each EF Core provider choose the native DateTime column type.
        entity.HasIndex(x => new { x.MobileNumber, x.CreatedDateUtc });
        entity.HasIndex(x => x.Status);
    }
}
