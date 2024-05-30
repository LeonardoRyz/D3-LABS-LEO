const width = 600;
const height = 400;
const margin = { top: 10, right: 10, bottom: 100, left: 100 };

const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

const svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const g = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const data = [
    { name: "Burj Khalifa", height: 828 },
    { name: "Shanghai Tower", height: 632 },
    { name: "Abraj Al Bait Clock Tower", height: 601 },
    { name: "Ping An Finance Centre", height: 599 },
    { name: "Lotte World Tower", height: 555 },
    { name: "One World Trade Center", height: 541 },
    { name: "Guangzhou Chow Tai Fook Financial Centre", height: 530 },
    { name: "Makkah Royal Clock Tower Hotel", height: 509 },
    { name: "Central Park Tower", height: 472 },
    { name: "Tianjin Chow Tai Fook Financial Centre", height: 450 }
  ];
  

const x = d3.scaleBand()
  .domain(data.map(d => d.name))
  .range([0, chartWidth])
  .padding(0.1);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.height)])  
  .range([chartHeight, 0]);  

const xAxis = d3.axisBottom(x);
g.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis)
  .selectAll("text")
  .attr("transform", "rotate(-40)")
  .attr("x", -5)
  .attr("y", 10)
  .attr("text-anchor", "end");

const yAxis = d3.axisLeft(y)
  .ticks(5)
  .tickFormat(d => `${d}m`);
g.append("g")
  .call(yAxis);

g.append("text")
  .attr("x", chartWidth / 2)
  .attr("y", chartHeight + margin.bottom - 10) 
  .attr("text-anchor", "middle")
  .text("The world's tallest buildings");

g.append("text")
  .attr("x", -(chartHeight / 2))
  .attr("y", -margin.left + 10) 
  .attr("transform", "rotate(-90)")
  .text("Height (m)");

const rects = g.selectAll("rect").data(data);

rects.enter()
  .append("rect")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => chartHeight - y(d.height)) 
    .attr("width", x.bandwidth)
    .attr("height", (d) => y(d.height))  
    .attr("fill", "grey");
