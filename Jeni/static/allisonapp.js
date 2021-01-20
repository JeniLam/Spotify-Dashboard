url = "/api/v1.0/data"

data = url
const tableData = data;
const tbody = d3.select("tbody");
function buildTable(data) {
  tbody.html("");
  data.forEach((dataRow) => {
    const row = tbody.append("tr");
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
        cell.text(val);
    }
   );
  });
}