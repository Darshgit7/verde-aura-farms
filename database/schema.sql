CREATE DATABASE VerdeAuraFarmsDb;
GO
USE VerdeAuraFarmsDb;
GO

CREATE TABLE Enquiries
(
    Id INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Enquiries PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    MobileNumber NVARCHAR(20) NOT NULL,
    Email NVARCHAR(200) NULL,
    Village NVARCHAR(100) NULL,
    LandArea NVARCHAR(50) NULL,
    Service NVARCHAR(100) NOT NULL,
    PreferredDate DATE NULL,
    Message NVARCHAR(2000) NULL,
    Status NVARCHAR(30) NOT NULL CONSTRAINT DF_Enquiries_Status DEFAULT 'New',
    CreatedDateUtc DATETIME2 NOT NULL CONSTRAINT DF_Enquiries_CreatedDateUtc DEFAULT SYSUTCDATETIME(),
    UpdatedDateUtc DATETIME2 NOT NULL CONSTRAINT DF_Enquiries_UpdatedDateUtc DEFAULT SYSUTCDATETIME()
);
GO
CREATE INDEX IX_Enquiries_MobileNumber_CreatedDateUtc ON Enquiries(MobileNumber, CreatedDateUtc);
CREATE INDEX IX_Enquiries_Status ON Enquiries(Status);
GO
