export interface MetadataItem {
  Code: string;
  Value: string;
}

export interface Settlement {
  SettlementId: string;
  ScheduleCode: string;
  ScheduleExternalId: string;
  CountryCode: string;
  Contingency: boolean;
  Failed: boolean;
  CertificatePath: string;
  Status: string;
  ReferenceDate: string;
  ReferenceDateUtc: string;
  StartDate: string;
  EndDate: string;
  TimeStamp: string;
  ScheduleType: string;
  Files: string[];
  Errors: string[];
  Metadata: MetadataItem[];
}

// Datos de ejemplo para usar localmente
export const mockSettlements: Record<string, Settlement> = {
  "7de49075-57f1-4fcb-8299-4564faf8a164": {
    SettlementId: "7de49075-57f1-4fcb-8299-4564faf8a164",
    ScheduleCode: "PGPM-2863",
    ScheduleExternalId: "PGPM-2863",
    CountryCode: "BR",
    Contingency: true,
    Failed: false,
    CertificatePath: "https://localhost:7036/api/v1/Settlements/7de49075-57f1-4fcb-8299-4564faf8a164/certificate",
    Status: "InProgressAccreditation",
    ReferenceDate: "2025-01-28T14:36:28+00:00",
    ReferenceDateUtc: "2025-01-28T14:36:28Z",
    StartDate: "2025-01-28T15:16:15+00:00",
    EndDate: "",
    TimeStamp: "2025-04-11T15:07:24+00:00",
    ScheduleType: "Batch",
    Files: [],
    Errors: [],
    Metadata: [
      {
        Code: "string",
        Value: "string"
      }
    ]
  },
  "8ae59065-68f2-5fcb-9388-5664faf8b265": {
    SettlementId: "8ae59065-68f2-5fcb-9388-5664faf8b265",
    ScheduleCode: "PGPM-2864",
    ScheduleExternalId: "PGPM-2864",
    CountryCode: "MX",
    Contingency: false,
    Failed: true,
    CertificatePath: "https://localhost:7036/api/v1/Settlements/8ae59065-68f2-5fcb-9388-5664faf8b265/certificate",
    Status: "Failed",
    ReferenceDate: "2025-02-15T10:30:00+00:00",
    ReferenceDateUtc: "2025-02-15T10:30:00Z",
    StartDate: "2025-02-15T11:00:00+00:00",
    EndDate: "2025-02-15T11:15:20+00:00",
    TimeStamp: "2025-04-12T09:45:18+00:00",
    ScheduleType: "Manual",
    Files: ["report.pdf", "log.txt"],
    Errors: ["Error de conexión", "Tiempo de espera excedido"],
    Metadata: [
      {
        Code: "Priority",
        Value: "High"
      },
      {
        Code: "Department",
        Value: "Finance"
      }
    ]
  }
}; 