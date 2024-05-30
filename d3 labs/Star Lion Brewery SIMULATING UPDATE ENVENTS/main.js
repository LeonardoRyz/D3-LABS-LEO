const width = 600;
const height = 400;
const margin = { top: 50, right: 10, bottom: 100, left: 100 };

const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

const svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const g = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const x = d3.scaleBand().range([0, chartWidth]).padding(0.1);
const y = d3.scaleLinear().range([chartHeight, 0]);

const xAxisGroup = g.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${chartHeight})`);

const yAxisGroup = g.append("g")
  .attr("class", "y axis");

const yLabel = g.append("text")
  .attr("y", -60)
  .attr("x", -chartHeight / 2)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .text("Height (m)");

g.append("text")
  .attr("x", chartWidth / 2)
  .attr("y", chartHeight + margin.bottom - 10) 
  .attr("text-anchor", "middle")
  .text("The world's tallest buildings");

const colorPalette = ["black", "yellow", "orange", "red"];

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

const image = svg.append("image")
  .attr("href", "leon.png")
  .attr("width", 100)
  .attr("height", 100)
  .attr("x", (width - 100) / 2) 
  .attr("y", margin.top / 2); 

let flag = true;

function update(data) {
  const value = flag ? "height" : "height"; 

  x.domain(data.map(d => d.name));
  y.domain([0, d3.max(data, d => d[value])]);

  const xAxisCall = d3.axisBottom(x);
  const yAxisCall = d3.axisLeft(y).ticks(5).tickFormat(d => `${d}m`);

  xAxisGroup.call(xAxisCall)
    .selectAll("text")
    .attr("transform", "rotate(-40)")
    .attr("x", -5)
    .attr("y", 10)
    .attr("text-anchor", "end");

  yAxisGroup.call(yAxisCall);

  const rects = g.selectAll("rect").data(data);

  rects.exit().remove();

  rects
    .attr("x", d => x(d.name))
    .attr("y", d => y(d[value]))
    .attr("width", x.bandwidth)
    .attr("height", d => chartHeight - y(d[value]))
    .attr("fill", (d, i) => colorPalette[i % colorPalette.length]);

  rects.enter()
    .append("rect")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d[value]))
    .attr("width", x.bandwidth)
    .attr("height", d => chartHeight - y(d[value]))
    .attr("fill", (d, i) => colorPalette[i % colorPalette.length]);

  const label = flag ? "Height (m)" : "Height (m)"; 
  yLabel.text(label);
}

d3.interval(() => {
  update(data);
  flag = !flag;
}, 1000);

update(data);
