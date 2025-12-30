export const CNIC_COLLECTIONS = [
  { key: "education", name: "Education", type: "doc" },
  { key: "criminal", name: "Criminal", type: "doc" },
  { key: "medical", name: "Medical", type: "doc" },
  { key: "travel", name: "Travel", type: "doc" },
  { key: "insurance", name: "insurance", type: "doc" },
  { key: "address", name: "Address", type: "doc" },
  { key: "bankAccounts", name: "BankAccounts", type: "doc" },
  { key: "vehicle", name: "Vehicle", type: "doc" },
  { key: "drivingLicense", name: "DrivingLicense", type: "doc" },
  { key: "financial", name: "FinancialRecords", type: "doc" },
  { key: "employment", name: "Employee", type: "doc" },
  { key: "Marriage", name: "Marriage", type: "doc" },

  {
    key: "frc",
    name: "FRCApplications",
    type: "query",
    field: "applicant13DigitID"
  },
  {
    key: "juvenile",
    name: "JuvenileCardApplications",
    type: "query",
    field: "parentCNICorNICOP"
  },
  {
    key: "succession",
    name: "SuccessionApplications",
    type: "query",
    field: "applicantCNIC"
  },
  {
    key: "crc",
    name: "ChildRegistrationApplications",
    type: "query",
    field: "parentCNICorNICOP"
  },
  {
    key: "smartPOC",
    name: "SmartPOCApplications",
    type: "query",
    field: "relationCNICorPOC"
  }
];
