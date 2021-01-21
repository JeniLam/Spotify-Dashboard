url = "/api/v1.0/data"
// console.log(url)

// create chart data
d3.json(url).then((data) => {
    console.log(data)

    console.log(data.year)

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
    console.log(Object.keys(genreCount))
    console.log(Object.values(genreCount))



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
        width: 625,
        height: 400,
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

    
    // donut chart
    //https:plotly.com/javascript/pie-charts/

    var donutData = [{
        values: [16, 1, 35, 14, 8, 5, 522, 1, 1],
        labels: ["R&B", "Country", "Dance/Edm", "Hip Hop", "Indie", "Latin", "Pop", "Rap", "Rock"],
        hoverinfo: 'label+percent',
        hole: .4,
        type: 'pie',
        textfont: {
            color: "white",
        },
        // https://plotly.com/javascript/reference/#pie-rotation
        rotation: 270,
        insidetextorientation: "radial"
    }];

    var donutLayout = {
        plot_bgcolor: "black",
        paper_bgcolor: "#FFF3",
        annotations: [
            {
                font: {
                    size: 20,
                    color: "white"
                },
                showarrow: false,
                text: "For Mo :)",
                x: .5,
                y: .5
            }],
        height: 400,
        width: 625,
        showlegend: true,
        legend: {
            font: {
                color: "white",
            },
            bgcolor: '#808080',
            bordercolor: '#333333',
            borderwidth: 3
        },
        grid: { rows: 1, columns: 1 }
    };

    Plotly.newPlot('donut', donutData, donutLayout);

});

// bpm vs Valence information

bpmurl = "/api/v1.0/bpmVsValence"

d3.json(bpmurl).then((data) => {
    console.log(data)

    var bpm = data.map(d => d.bpm);
    console.log(bpm)

    var valence = data.map(d => d.valence);
    console.log(valence)

    // scatter plot
    var scatterTrace = {
        x: bpm,
        y: valence,
        type: "scatter",
        mode: "markers",
        marker: {
            size: 10,
            color: "#00e600"
        }
    }

    var scatterData = [scatterTrace];

    var scatterLayout = {
        plot_bgcolor: "black",
        paper_bgcolor: "#FFF3",
        width: 625,
        height: 400,
        font: {
            color: "white"
        },
        xaxis: {
            title: {
                text: 'BPM',
                font: {
                    size: 18,
                    color: 'white'
                }},
            range: [0, 210],
                tickcolor: "white"
            },
            yaxis: {
                title: {
                    text: 'Valence',
                    font: {
                        size: 18,
                        color: 'white'
                    }},
                range: [0, 100],
                tickcolor: "white"
            },
            title: {
                text: "BPM vs Valence",
                font: {
                    color: "White"
                }
            }
        };

        Plotly.newPlot("scatter1", scatterData, scatterLayout);

        // ttest for java - https://www.npmjs.com/package/ttest

    });

    // Popularity vs Valence

    popUrl = "/api/v1.0/popularVsValence"
    d3.json(popUrl).then((data) => {
        console.log(data)
    
        var pop = data.map(d => d.popularity);
        console.log(pop)
    
        var valence = data.map(d => d.valence);
        console.log(valence)
    
        // scatter plot
        var scatter2Trace = {
            x: pop,
            y: valence,
            type: "scatter",
            mode: "markers",
            marker: {
                size: 10,
                color: "#ff80df"
            }
        }
    
        var scatter2Data = [scatter2Trace];
    
        var scatter2Layout = {
            plot_bgcolor: "black",
            paper_bgcolor: "#FFF3",
            width: 625,
            height: 400,
            font: {
                color: "white"
            },
            xaxis: {
                title: {
                    text: 'Popularity',
                    font: {
                        size: 18,
                        color: 'white'
                    }},
                range: [-10, 100],
                    tickcolor: "white"
                },
                yaxis: {
                    title: {
                        text: 'Valence',
                        font: {
                            size: 18,
                            color: 'white'
                        }},
                    range: [0, 100],
                    tickcolor: "white"
                },
                title: {
                    text: "Track Popularity vs Valence",
                    font: {
                        color: "White"
                    }
                }
            };
    
            Plotly.newPlot("scatter2", scatter2Data, scatter2Layout);
    
            // ttest for java - https://www.npmjs.com/package/ttest
    
        });