d3.csv("ages.csv").then((data) => {
    data.forEach((d) => {
        d.age = +d.age;
    });
    console.log(data);
}).catch((error) => {
    console.error("Error loading CSV data:", error);
});

d3.tsv("ages.tsv").then((data) => {
    data.forEach((d) => {
        d.age = +d.age;
    });
    console.log(data);
}).catch((error) => {
    console.error("Error loading TSV data:", error);
});

d3.json("ages.json").then((data) => {
    data.forEach((d) => {
        d.age = +d.age;
    });
    console.log(data);

    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 400)
        .attr("height", 400);

    var circles = svg.selectAll("circle")
        .data(data);

    circles.enter()
        .append("circle")
        .attr("cx", (d, i) => (i * 80) + 50) 
        .attr("cy", 200) 
        .attr("r", (d) => d.age) 
        .attr("fill", "blue");
}).catch((error) => {
    console.error("Error loading JSON data:", error);
});
