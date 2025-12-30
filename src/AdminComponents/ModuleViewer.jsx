import CRCForm from "../Departments/CRC/CRC";
import MarriageForm from "../Departments/Marriage/MarriageForm";

function ModuleViewer({ module, data }) {
  if (!data) return <p className="no-data">No data available</p>;

  switch (module) {
    case "crc":
      return <CRCView data={data} />;
    case "marriage":
      return <MarriageView data={data} />;
    default:
      return <p>No view available</p>;
  }
}
export default ModuleViewer;