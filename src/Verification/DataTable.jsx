import "./datatable.css";

function DataTable({ title, columns, rows }) {
  if (!rows || rows.length === 0) return null;

  return (
    <div className="table-wrapper">
      <h3 className="table-title">{title}</h3>

      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.label}>{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key}>
                  {row[col.key] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
