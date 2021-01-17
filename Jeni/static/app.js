url = "/api/v1.0/data"
// console.log(url)

// create chart data
d3.json(url).then((data) => {
    console.log(data)

    var yearMap = data.map(d => d.year);
    // console.log (yearMap)
    var artistMap = data.map(d => d.artist);
    console.log(artistMap)

    var genreMap = data.map(d => d.top_genre);
    console.log(genreMap)

    artistCount = {}

    for (var i = 0; i < artistMap.length; i++) {
        if (!artistCount[artistMap[i]])
        artistCount[artistMap[i]] = 0;
        ++artistCount[artistMap[i]];
    }

    console.log("artistMap data: ", artistCount)
    console.log(Object.keys(artistCount))
    console.log(Object.values(artistCount))
    var artistMap = data.map(d => d.artist);
    console.log(artistMap)

    genreCount = {}

    for (var i = 0; i < genreMap.length; i++) {
        if (!genreCount[genreMap[i]])
        genreCount[genreMap[i]] = 0;
        ++genreCount[genreMap[i]];
    }

    console.log("genreCount data: ", genreCount)
    // console.log(Object.keys(genreCount))
    // console.log(Object.values(genreCount))



    // get unique years for x axis in bar chart
    // https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
    var yearCounts = {};

    for (var i = 0; i < yearMap.length; i++) {
        if (!yearCounts[yearMap[i]])
            yearCounts[yearMap[i]] = 0;
        ++yearCounts[yearMap[i]];
    }

    console.log("yearMap data: ", yearCounts)
    console.log(Object.keys(yearCounts))
    console.log(Object.values(yearCounts))

    // var bpmGenre = data.filter( topArtist => {
    //     return topArtist.count > 10;
    // });

    // console.log(topArtists)



    // First Bar Chart
    var trace1 = {
        x: Object.keys(yearCounts),
        y: Object.values(yearCounts),
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
        plot_bgcolor: "black",
        paper_bgcolor: "#FFF3",
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

    // Bubble Chart
    var trace2 = {
        x: Object.keys(genreCount),
        y: Object.values(genreCount),
        type: "scatter",
        mode: "markers",
        marker: {
            color: ["#ffff66","#ff6600", "#ff0000", "#33cc33", "#339966", "#9933ff", "#0000ff", "#ff66cc", "#cccc00"],
            size: Object.values(genreCount),
        }
    };

    var bubbleData = [trace2]

    var bubbbleLayout = {
        plot_bgcolor: "black",
        paper_bgcolor: "#FFF3",
        xaxis: { 
            title: "Genre",
         },
        yaxis: { 
            title: "Number of Tracks on Playlist",
            range: [0, 1000]
         },
        showlegend: false,
        font: {
            color: "white"
        }
    };

    Plotly.newPlot("bubble", bubbleData, bubbbleLayout);


});

