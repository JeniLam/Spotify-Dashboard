
// function makeResponsive() {
// Add boiler plate information for SVG area, margins, etc
var svgWidth = 900;
var svgHeight = 800;

// Define the chart's margins as an object
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select scatter id to hold chart, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
// / Append a group area, then set its margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "dB";
var chosenYAxis = "valence";

// function used for updating x-scale var upon click on axis label - taken from Day 3 activity 12
function xScale(scatterData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(scatterData, d => d[chosenXAxis]),
        d3.max(scatterData, d => d[chosenXAxis])
        ])
        .range([0, chartWidth]);

    return xLinearScale;

};

// function used for updating y-scale var upon click on axis label. 
function yScale(scatterData, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(scatterData, d => d[chosenYAxis]),
        d3.max(scatterData, d => d[chosenYAxis])
        ])
        .range([chartHeight, 0]);

    return yLinearScale;

};

// function used for updating xAxis var upon click on axis label
function renderXAxis(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

// function used for updating yAxis var upon click on axis label same as above just change to Y/left.
function renderYAxis(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
};

// function used for updating xcircles group with a transition to
// new circles
function renderXCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]))
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dx
        .attr("dx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
};

// function used for updating Ycircles group with a transition to
// new circles
function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cy", d => newYScale(d[chosenYAxis]))
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dx
        .attr("dy", d => newYScale(d[chosenYAxis]));

    return circlesGroup;
};

// function for updating text in circles here: similar to above transition
// x circles:
function xCircleText(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("dx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
};

// y circles:
function yCircleText(circlesGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("dy", d => newYScale(d[chosenYAxis]));

    return circlesGroup;
};

// function used for updating circles group with new tooltip
// labels are what is printed in tool tip pop up
// commenting out for now and want to get the charts working
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

    var xlabel;
    var ylabel;
    // labels for tool tip based on the axis selected
    // should use a swtich statement instead?
    // xaxis
    if (chosenXAxis === "dB") {
        xlabel = "dB: ";
    }
    else if (chosenXAxis === "year") {
        xlabel = "Year of Release:";
    }
    else {
        xlabel = "Dancability";
    }

    // yaxis
    if (chosenYAxis === "valence") {
        ylabel = "Valence: ";
    }
    else if (chosenYAxis === "bpm") {
        ylabel = "BPM: ";
    }
    else  {
        ylabel = "Track Duration in Seconds: ";
    }

    // Initialize Tooltip - reviewed day 3 activity 8 to debug
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        // .offset([80, -60])
        // need style for tooltip so it's not just text
        // https://www.d3-graph-gallery.com/graph/interactivity_tooltip.html
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .html(function (d) {
            return (`<strong>${d.artist}<br>${d.title}<br>${xlabel} ${d[chosenXAxis]}<br>${ylabel} ${d[chosenYAxis]}</strong>`);
        });
    
    // create tooltip for 

    // Create tooltip in chartGroup
    chartGroup.call(toolTip);

    
    // Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function (data) {
       return toolTip.show(data, this);
    })
        // Create "mouseout" event listener to hide tooltip
        .on("mouseout", function (data) {
           return toolTip.hide(data);
        });

    return circlesGroup;
}

//Read in csv to look at data and how it is arranged

d3.csv("/api/v1.0/table_analysis").then(function (scatterData) {
    console.log(scatterData);

    // parse data - getting all strings into numerical form
    scatterData.forEach(function (d) {
        // d.year = +d.year;
        d.bpm = +d.bpm;
        d.energy = +d.energy;
        // d.dancability = +d.dancability;
        d.dB = +d.dB;
        d.live = +d.live;
        d.valence = +d.valence;
        d.duration_in_seconds = +d.duration_in_seconds;        
        d.acousticness = +d.acousticness;
        d.speechiness = +d.speechiness;
        d.popularity = +d.popularity;
    });

    // xLinearScale function above csv import
    var xLinearScale = xScale(scatterData, chosenXAxis);

    // yLinearScale function above csv import
    var yLinearScale = yScale(scatterData, chosenYAxis);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        // .attr("transform")
        .call(leftAxis);

    // append initial circles
    // https://stackoverflow.com/questions/55988709/how-can-i-add-labels-inside-the-points-in-a-scatterplot
    var circlesGroup = chartGroup.selectAll("circle")
        .data(scatterData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 20)
        .attr("fill", "purple")
        .attr("opacity", "0.6");

    // add state labels to the data points
    // null - https://stackoverflow.com/questions/46147231/selecting-null-what-is-the-reason-behind-selectallnull-in-d3
    // use null to guarantee that the "enter" selection ALWAYS corresponds to the elements in the data array containing one element for every element in the data
    var circleText = chartGroup.selectAll(null)
        .data(scatterData)
        .enter()
        .append("text")
        .style("text-anchor", "middle")
        .classed("stateCircle", true);

    console.log(circleText)

    circleText.attr("dx", d => xLinearScale(d[chosenXAxis]))
        .attr("dy", d => yLinearScale(d[chosenYAxis]))
        .text(d => d.index)
        .classed("stateText", true);
    // .attr("font-size", "12px")
    // .attr("text-anchor", "middle")
    // ;

    // Create group for three x-axis labels
    var xLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

    var dBLabel = xLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "dB") // value to grab for event listener
        .classed("active", true)
        .text("dB")
        .style("fill", "goldenrod");

    var yearLabel = xLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "year") // value to grab for event listener
        .classed("inactive", true)
        .text("Track Release Year")
        .style("fill", "goldenrod");

    var dancabilityLabel = xLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "income") // value to grab for event listener
        .classed("inactive", true)
        .text("Dancability")
        .style("fill", "goldenrod");

    // Create group for three y-axis labels
    var yLabelsGroup = chartGroup.append("g")
        .attr("transform", "rotate(-90)")

    var valenceLabel = yLabelsGroup.append("text")
        .attr("y", 40 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("value", "valence") // value to grab for event listener
        .classed("active", true)
        .text("Valence")
        .style("fill", "goldenrod")

    var bpmLabel = yLabelsGroup.append("text")
        .attr("y", 20 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("value", "bpm") // value to grab for event listener
        .classed("inactive", true)
        .text("BPM")
        .style("fill", "goldenrod")

    var durationLabel = yLabelsGroup.append("text")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("value", "duration_in_seconds") // value to grab for event listener
        .classed("inactive", true)
        .text("Track Duration in Seconds")
        .style("fill", "goldenrod")

    // updateToolTip function above csv import
    // commented out below until updateToolTip is finalized
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

    // x axis labels event listener
    xLabelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenXAxis) {

                // replaces chosenXAxis with value
                chosenXAxis = value;

                console.log(chosenXAxis);

                // functions here found above csv import
                // updates x scale for new data
                xLinearScale = xScale(scatterData, chosenXAxis);

                // updates x axis with transition
                xAxis = renderXAxis(xLinearScale, xAxis);

                // updates circles with new x values
                circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis);

                // update circles with new x text
                circleText = xCircleText(circleText, xLinearScale, chosenXAxis);

                // updates tooltips with new info
                circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

                // changes classes to change bold text (set labels not selected as inactive)
                if (chosenXAxis === "dB") {
                    dBLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    yearLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    dancabilityLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenXAxis === "year") {
                    yearLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    dBLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    dancabilityLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else {
                    dancabilityLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    yearLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    dBLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
            }
        });

    // y axis labels event listener
    yLabelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenYAxis) {

                // replaces chosenXAxis with value
                chosenYAxis = value;

                console.log(chosenYAxis)

                // functions here found above csv import
                // updates x scale for new data
                yLinearScale = yScale(scatterData, chosenYAxis);

                // updates x axis with transition
                yAxis = renderYAxis(yLinearScale, yAxis);

                // updates circles with new x values
                circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

                // update circles with new y text
                circleText = yCircleText(circleText, yLinearScale, chosenYAxis);

                // updates tooltips with new info
                circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

                // changes classes to change bold text set labels not selected as inactive
                if (chosenYAxis === "valence") {
                    valenceLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    bpmLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    durationLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenYAxis === "bpm") {
                    bpmLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    valenceLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    durationLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else {
                    durationLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    bpmLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    valenceLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
            }
        });
}).catch(function (error) {
    console.log(error);
});