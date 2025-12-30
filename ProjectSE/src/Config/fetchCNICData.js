import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./Firebase";

export const fetchAllCNICData = async (cnic) => {
  const safeGetDoc = async (collectionName, docId = cnic) => {
    const snap = await getDoc(doc(db, collectionName, docId));
    return snap.exists() ? snap.data() : null;
  };

  const safeQuery = async (collectionName, field) => {
    const q = query(
      collection(db, collectionName),
      where(field, "==", cnic)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  };

  return {
    education: await safeGetDoc("Education"),
    employment: await safeGetDoc("Employee"),
    insurance: await safeGetDoc("insurance"),
    address: await safeGetDoc("Address"),
    bankAccounts: await safeGetDoc("BankAccounts"),
    financial: await safeGetDoc("FinancialRecords"),
    criminal: await safeGetDoc("Criminal"),
    drivingLicense: await safeGetDoc("DrivingLicense"),
    vehicle: await safeGetDoc("Vehicle"),
    medical: await safeGetDoc("Medical"),

    // 🔥 FIXED HERE
    marriage: await safeGetDoc("Marriage"),

    // array based
    travel: await safeQuery("Travel", "cnic"),
    juvenile: await safeQuery("JuvenileCardApplications", "parentCNICorNICOP"),
    crc: await safeQuery("ChildRegistrationApplications", "parentCNICorNICOP"),
    frc: await safeQuery("FRCApplications", "applicant13DigitID"),
    succession: await safeQuery("SuccessionApplications", "applicantCNIC"),
    smartPOC: await safeQuery("SmartPOCApplications", "relationCNICorPOC"),
  };
};
