import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase.jsx";

async function submitDataToFirestore(dataModel, collectionName) {
  if (!dataModel.cnic) {
    throw new Error("CNIC is required");
  }

  // CNIC as document ID
  await setDoc(
    doc(db, collectionName, dataModel.cnic),
    dataModel,
    { merge: true }
  );
}

export default submitDataToFirestore;
