url = "/api/v1.0/data"
console.log(url)

var data = d3.json(url).then((data) => {
  console.log(data)


  var tableData = data;
  var tbody = d3.select("tbody");
  console.log(data);

  data.forEach(function (spotifyPlaylist) {
    console.log(spotifyPlaylist);
  });
  //USE D3 TO APPEND ONE TABLE ROW FOR EACH UFO SIGHTING
  data.forEach(function (spotifyPlaylist) {
    console.log(spotifyPlaylist);
    var row = tbody.append("tr");
  });
  //USE OBJECT.ENTRIES TO CONSOLE.LOG EACH UFO SIGHTING
  data.forEach(function (spotifyPlaylist) {
    console.log(spotifyPlaylist);
    var row = tbody.append("tr");
    Object.entries(spotifyPlaylist).forEach(function ([key, value]) {
      console.log(key, value);
    });
  });
  //USE D3 TO APPEND ONE CELL PER SIGHTING AND TO UPDATE EACH CELL TEXT WITH UFO SIGHTING VALUES
  data.forEach(function (spotifyPlaylist) {
    console.log(spotifyPlaylist);
    var row = tbody.append("tr");
    Object.entries(spotifyPlaylist).forEach(function ([key, value]) {
      console.log(key, value);
      var cell = row.append("td");
      cell.text(value)
    });
  });
});
//REFERENCED UNIT 14.3 ACTIVITY #8-9
//SELECT BUTTON
var submit = d3.select("#filter-btn");
//CREATE EVENT HANDLER TO RUN EVENT
submit.on("click", function () {
  //CLEAR CURRENT DATA TABLE
  d3.select("tbody").html("");
  //PREVENT WEB PAGE REFRESH
  d3.event.preventDefault();
  //GET PROPERTY VALUE OF INPUT ELEMENT
  var dateTime = d3.select("#datetime").property("value");
  console.log(dateTime);
  //FILTER
  var filteredData = tableData.filter(record => record.datetime === dateTime);
  console.log(filteredData);
  //DISPLAY FILTERED DATASET 
  filteredData.forEach((report) => {
    var row = tbody.append('tr');
    Object.entries(report).forEach(([key, value]) => {
      console.log(key, value);
      var cell = row.append('td');
      cell.text(value);
    });
  });
});















