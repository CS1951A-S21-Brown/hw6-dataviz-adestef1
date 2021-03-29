// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = {top: 40, right: 100, bottom: 40, left: 175};

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH / 2) + 100, graph_1_height = 400;
let graph_2_width = (MAX_WIDTH / 2) + 150, graph_2_height = 300;
let graph_3_width = MAX_WIDTH / 2 + 800, graph_3_height = 500;

//append object
let svg = d3.select("#graph1")
    .append("svg")
    .attr("width", graph_1_width)
    .attr("height", graph_1_height + 100)
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

    svg.append("text")
        .text(`Number of Titles Per Genre`)
        .attr("transform", `translate(280, -20)`)
        .style("text-anchor", "middle")
        .style("font-size", 25);

    svg.append("text")
        .text(`Genre`)
        .attr("transform", `translate(280, 450)`)
        .style("text-anchor", "middle")
        .style("font-size", 10);

    svg.append("text")
        .text(`Number of Movies`)
        .attr("transform", `translate(-90, 150)`)
        .style("text-anchor", "middle")
        .style("font-size", 10);
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

let title = svg2.append("text")
    .attr("transform", `translate(300, -20)`)
    .style("text-anchor", "middle")
    .style("font-size", 25);

let ylabel = svg2.append("text")
    .attr("transform", `translate(-70, 120)`)
    .style("text-anchor", "middle")
    .style("font-size", 10);

svg2.append("text")
    .text(`Year`)
    .attr("transform", `translate(280, 260)`)
    .style("text-anchor", "middle")
    .style("font-size", 10);
function setData(selectedVar) {
    d3.csv("movie_duration1.csv").then(function(data) {
        svg2.selectAll("circle").remove()
        svg2.selectAll("line").remove()
        x.domain(data.map(function(d) { return d.release_year;}))
        if (selectedVar == 'average_runtime') {
            title.text(`Average Run-Time of Movies Per Year From 1971 to Present`)
            ylabel.text('Duration in Minutes')
            y.domain([0, 160]);
            labely.transition().duration(500).call(d3.axisLeft(y));
        }
        if (selectedVar == 'R_count') {
            title.text(`Number of R-Rated Movies Per Year From 1971 to Present`)
            ylabel.text('Number of Movies')
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
            .attr("transform", "translate(5.5,0)")
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
            .attr("transform", "translate(5.5,0)")
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
    .attr("height", graph_3_height + 150)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Read data
d3.json("sample1.json").then(function(data) { 

    let allNodes = data.nodes.map(function(d) {return d.name})

    // position the x axis
    let x = d3.scalePoint()
        .range([0, graph_3_width - margin.right - margin.left])
        .domain(allNodes)

    // makes circles
    let nodes = svg3.selectAll("mynodes")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("cx", function(d){ return(x(d.name))})
        .attr("cy", graph_3_height - margin.top - margin.bottom)
        .attr("r", 6)
        .style("fill", "lightblue")

    //label
    labels = svg3.selectAll("mylabels")
        .data(data.nodes)
        .enter()
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .text(function(d){ return(d.name)})
        .style("text-anchor", "end")
        .attr("transform", function(d){ return( "translate(" + (x(d.name)) + "," + (graph_3_height - margin.top - margin.bottom + 15) + ")rotate(-45)")})
        .style("font-size", 13)

    //taken from d3 guide, makes id the name
    var idToNode = {};
    data.nodes.forEach(function (n) {
        idToNode[n.id] = n;
    });
    
    let links = svg3.selectAll('mylinks')
        .data(data.links)
        .enter()
        .append('path')
        .attr('d', function (d) {
            start = x(idToNode[d.Source].name) 
            end = x(idToNode[d.Target].name)     
            return ['M', start, graph_3_height-80, 'A', (start - end)/1.8, ',', (start - end)/1.8, 0, 0, ',',start < end ? 1 : 0, end, ',', graph_3_height-80]
            .join(' ');
    })
    .style("fill", "none")
    .attr("stroke", "lightgrey")

    nodes.on('mouseover', function (d) {
        nodes.style('fill', "lightgrey")
        d3.select(this).style('fill', 'lightblue')
        links
          .style('stroke', function (link_d) { return link_d.Source === d.id || link_d.Target === d.id ? 'lightblue' : 'lightgrey';})
          .style('stroke-width', function (link_d) { return link_d.Source === d.id || link_d.Target === d.id ? 6 : 1;})
      })
      .on('mouseout', function (d) {
        nodes.style('fill', "lightblue")
        links
          .style('stroke', 'lightgrey')
          .style('stroke-width', '1')
        })

    svg3.append("text")
        .text(`2020 Actor Arc Diagram`)
        .attr("transform", `translate(630, 20)`)
        .style("text-anchor", "middle")
        .style("font-size", 25);

    svg3.append("text")
        .text(`Actor`)
        .attr("transform", `translate(630, 550)`)
        .style("text-anchor", "middle")
        .style("font-size", 15);
    svg3.append("text")
        .text(`Each node represents an actor who appeared in more then one 2020 American film and links them to other actors who shared a movie credit`)
        .attr("transform", `translate(630, 590)`)
        .style("text-anchor", "middle")
        .style("font-size", 15);
    })

