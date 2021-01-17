url= "/api/v1.0/data"
console.log(url)

// create barchart
d3.json(url).then((data) => {
    console.log(data)

    var year = []
    var genre = []
    var artist = []
// Mod 14 - Day 2 exercise 8 - pull values out of object
    data.forEach((d) => {
        Object.entries(d).forEach(([key, value]) => {
            if (key === "year") {
                year.push(value)
            }
            else if (key ==="top_genre") {
                genre.push(value)
            }
            else if (key === "artist") {
                artist.push(value)
            }
        })
    });

     
    // var trace1 = {
    //     x = data.year,
    //     y = data.top_genre,
    //     type: "bar"
    // };

    // var bardata = [trace1];

    // var barlayout = {
    //     title: "Top Genre by Year",
    //     xaxis: {title: "Year"},
    //     yaxis: {title: "Count of Genres"}
    // };

    // Plotly.newPlot("bar", bardata, barlayout)
});