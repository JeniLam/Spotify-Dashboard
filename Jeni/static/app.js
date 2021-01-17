url= "/api/v1.0/data"
// console.log(url)

// create chart data
d3.json(url).then((data) => {
    console.log(data)

    var yearMap = data.map(d => d.year);
    console.log (yearMap)
    // get unique years for x axis in bar chart
    // https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
    var yearCounts = {};
     
    for (var i =0; i < yearMap.length; i++) {
        if(!yearCounts[yearMap[i]])
        yearCounts[yearMap[i]] = 0;
        ++yearCounts[yearMap[i]];
    }

    console.log(yearCounts)
    console.log(Object.keys(yearCounts))
    console.log(Object.values(yearCounts))

    
    var trace1 = {
        x : Object.keys(yearCounts),
        y : Object.values(yearCounts),
        type: "bar",
        marker: {
            color: 'rgb(142,124,195)'
        },
        name: "Number of Tracks by Year Released"
    };

    var bardata = [trace1];

    var barlayout = {
        title: "Number of Tracks by Year Released",
        // https://stackoverflow.com/questions/48798507/change-the-background-color-of-a-plot
        plot_bgcolor:"black",
        paper_bgcolor:"#FFF3",
        xaxis: {
            tickcolor: "white",
            showticklabels: true
        },
        yaxis: {
            tickcolor: "white"
        },
        font: {
            color: "white"
        }
    };

    Plotly.newPlot("bar", bardata, barlayout)
});