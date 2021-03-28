// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = {top: 40, right: 100, bottom: 40, left: 175};

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH / 2) + 100, graph_1_height = 400;
let graph_2_width = (MAX_WIDTH / 2) + 100, graph_2_height = 300;
let graph_3_width = MAX_WIDTH / 2 + 100, graph_3_height = 575;

//append object
let svg = d3.select("#graph1")
    .append("svg")
    .attr("width", graph_1_width)
    .attr("height", graph_1_height + 80)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//the data, already organized
d3.csv("genre_count1.csv").then(function(data) {

    // X axis
    let x = d3.scaleBand()
        .range([0, graph_1_width - margin.right - margin.left])
        .domain(data.map(function(d) { return d.genre; }))
        .padding(0.1);
    // Y axis
    let y = d3.scaleLinear()
        .domain([0, 2500])
        .range([graph_1_height - margin.bottom - margin.top, 0])

    // labels and axis
    svg.append("g")
        //moves bar
        .attr("transform", "translate(0," + (graph_1_height - margin.top - margin.bottom) + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        //moves text
        .attr("transform", "translate(-10,-0)rotate(-45)")
        .style("text-anchor", "end");
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.genre); })
        .attr("y", function(d) { return y(d.num_genre); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return (graph_1_height - margin.top - margin.bottom - y(d.num_genre));})
        .attr("fill", "orange")
})

//GRAPH 2!-----------------------------------------------------------------------------------------------

let svg2 = d3.select("#graph2")
    .append("svg")
    .attr("width", graph_2_width)
    .attr("height", graph_2_height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


let y = d3.scaleLinear()
    .domain([0, 160])
    .range([graph_2_height - margin.bottom - margin.top, 0])

let x = d3.scaleBand()
    .range([0, graph_2_width - margin.right - margin.left])
    .padding(0.1);

let labely = svg2.append("g")
    .call(d3.axisLeft(y));

let labelx = svg2.append("g")
    
function setData(selectedVar) {
    d3.csv("movie_duration1.csv").then(function(data) {
        svg2.selectAll("circle").remove()
        svg2.selectAll("line").remove()
        x.domain(data.map(function(d) { return d.release_year;}))
        if (selectedVar == 'average_runtime') {
            y.domain([0, 160]);
            labely.transition().duration(500).call(d3.axisLeft(y));
        }
        if (selectedVar == 'R_count') {
            y.domain([0, 80]);
            labely.transition().duration(500).call(d3.axisLeft(y));
        }
        // // X axis
        labelx
            .attr("transform", "translate(0," + (graph_2_height - margin.top - margin.bottom) + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
        // Lines
        let cic = svg2.selectAll("cic")
        .data(data)
        cic.enter()
            .append("line")
            .merge(cic)
            .transition()
            .duration(1000)
            .attr("transform", "translate(5.2,0)")
            .attr("x1", function(d) { return x(d.release_year); })
            .attr("x2", function(d) { return x(d.release_year); })
            .attr("y1", function(d) { return y(d[selectedVar]); })
            .attr("y2", y(0))
            .attr("stroke", "darkblue")
        // Circles
        let pop = svg2.selectAll("pop")
        .data(data)
        pop.enter()
            .append("circle")
            .merge(pop)
            .transition()
            .duration(1000)
            .attr("transform", "translate(5.2,0)")
            .attr("cx", function(d) { return x(d.release_year); })
            .attr("cy", function(d) { return y(d[selectedVar]); })
            .attr("r", "4")
            .style("fill", "pink")
            .attr("stroke", "blue")
})}
setData('average_runtime');

//GRAPH 3!-----------------------------------------------------------------------------------------------

let svg3 = d3.select("#graph3")
    .append("svg")
    .attr("width", graph_3_width)
    .attr("height", graph_3_height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Read data
d3.json("sample.json", function(data) {
    // node names
    let allNodes = data.nodes.map(function(d){return d.name})

    // position the x axis
    let x = d3.scalePoint()
        .range([0, graph_3_width - margin.right - margin.left])
        .domain(allNodes)

    // makes circles
    svg3.selectAll("thenodes")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("cx", function(d){ return(x(d.name))})
        .attr("cy", graph_3_height - margin.top - margin.bottom)
        .attr("r", 5)
        .style("fill", "red")

    // label
    svg3.selectAll("mylabels")
        .data(data.nodes)
        .enter()
        .append("text")
        .attr("x", function(d){ return(x(d.name))})
        .attr("y", graph_3_height - margin.top - margin.bottom)
        .text(function(d){ return(d.name)})
        .style("text-anchor", "middle")
})

