import CRCForm from "../Departments/CRC/CRC";
import MarriageForm from "../Departments/Marriage/MarriageForm";

function ModuleForm({ module }) {
  switch (module) {
    case "crc":
      return <CRCForm />;
    case "marriage":
      return <MarriageForm />;
    default:
      return <p>Form not available</p>;
  }
}
export default ModuleForm;