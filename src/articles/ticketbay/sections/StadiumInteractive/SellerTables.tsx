export default function SellerTables() {
  const highlightIds = new Set(["588064", "1930602", "2262690"]);

  const highlightStyle: React.CSSProperties = {
    fontWeight: "bold",
    color: "#d9534f", // highlight color (change as needed)
  };

  const styledId = (id: string) =>
    highlightIds.has(id) ? (
      <span style={highlightStyle}>{id}</span>
    ) : (
      id
    );

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Top 5 Sellers – Regular Season</h2>

      <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
        
        {/* Profit Table */}
        <table style={{ ...tableBaseStyle, width: "45%" }}>
          <caption style={captionStyle}>
            Top 5 Sellers (by Profit)
          </caption>
          <thead>
            <tr>
              <th style={cellStyle}>#</th>
              <th style={cellStyle}>Seller ID</th>
              <th style={cellStyle}>Total Profit</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1", "588064", "50,846,800"],
              ["2", "1930602", "24,130,800"],
              ["3", "2064636", "14,479,500"],
              ["4", "2681179", "12,850,500"],
              ["5", "2262690", "9,991,800"],
            ].map(([rank, id, profit]) => (
              <tr key={rank}>
                <td style={cellStyle}>{rank}</td>
                <td style={cellStyle}>{styledId(id)}</td>
                <td style={cellStyle}>{profit}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Number of Sales Table */}
        <table style={{ ...tableBaseStyle, width: "45%" }}>
          <caption style={captionStyle}>
            Top 5 Sellers (by Number of Sales)
          </caption>
          <thead>
            <tr>
              <th style={cellStyle}>#</th>
              <th style={cellStyle}>Seller ID</th>
              <th style={cellStyle}># of Sales</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1", "1930602", "457"],
              ["2", "588064", "428"],
              ["3", "2208431", "343"],
              ["4", "2849678", "322"],
              ["5", "2262690", "294"],
            ].map(([rank, id, sales]) => (
              <tr key={rank}>
                <td style={cellStyle}>{rank}</td>
                <td style={cellStyle}>{styledId(id)}</td>
                <td style={cellStyle}>{sales}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

const tableBaseStyle: React.CSSProperties = {
  borderCollapse: "collapse",
  minHeight: "260px",
};

const cellStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "6px 10px",
  textAlign: "left",
};

const captionStyle: React.CSSProperties = {
  fontWeight: "bold",
  marginBottom: "8px",
  textAlign: "center",
};
