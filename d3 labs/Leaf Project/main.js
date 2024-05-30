function generateRandomData() {
  const continents = ["Asia", "Europe", "Africa", "Americas", "Oceania"];
  const countries = ["Country1", "Country2", "Country3", "Country4", "Country5"];
  const startYear = 1800;
  const endYear = 2020;
  const data = [];

  for (let year = startYear; year <= endYear; year++) {
      const yearData = {
          year: year,
          countries: countries.map(country => ({
              continent: continents[Math.floor(Math.random() * continents.length)],
              country: country,
              income: Math.random() * 150000,
              life_exp: Math.random() * 90,
              population: Math.random() * 1400000000
          }))
      };
      data.push(yearData);
  }
  return data;
}

const data = generateRandomData();

const margin = { top: 50, right: 100, bottom: 100, left: 100 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select("#chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xScale = d3.scaleLog()
  .domain([142, 150000])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([0, 90])
  .range([height, 0]);

const areaScale = d3.scaleLinear()
  .domain([2000, 1400000000])
  .range([25 * Math.PI, 1500 * Math.PI]);

const colorScale = d3.scaleOrdinal(d3.schemePastel1);

const xAxis = d3.axisBottom(xScale)
  .tickValues([400, 4000, 40000])
  .tickFormat(d => `$${d}`);

const yAxis = d3.axisLeft(yScale);

svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis)
  .append("text")
  .attr("class", "axis-label")
  .attr("x", width / 2)
  .attr("y", 50)
  .attr("text-anchor", "middle")
  .text("Income");

svg.append("g")
  .call(yAxis)
  .append("text")
  .attr("class", "axis-label")
  .attr("x", -height / 2)
  .attr("y", -60)
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Life Expectancy");

const continents = ["Asia", "Europe", "Africa", "Americas", "Oceania"];

const legend = svg.append("g")
  .attr("transform", `translate(${width - 10}, ${height - 125})`);

continents.forEach((continent, i) => {
  const legendRow = legend.append("g")
      .attr("transform", `translate(0, ${i * 20})`);

  legendRow.append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", colorScale(continent));

  legendRow.append("text")
      .attr("x", -10)
      .attr("y", 10)
      .attr("text-anchor", "end")
      .attr("class", "legend")
      .text(continent);
});

const yearLabel = svg.append("text")
  .attr("class", "year-label")
  .attr("x", width - 40)
  .attr("y", height - 30)
  .attr("text-anchor", "middle");

const formattedData = data.map(year => {
  return year.countries.filter(country => {
      return country.income && country.life_exp;
  }).map(country => {
      country.income = +country.income;
      country.life_exp = +country.life_exp;
      country.population = +country.population;
      return country;
  });
});

let yearIndex = 0;
update(formattedData[yearIndex]);

d3.interval(() => {
  yearIndex = (yearIndex + 1) % formattedData.length;
  update(formattedData[yearIndex]);
}, 1000);

function update(data) {
  const circles = svg.selectAll("circle").data(data, d => d.country);

  circles.exit().remove();

  circles.enter().append("circle")
      .attr("fill", d => colorScale(d.continent))
      .attr("cy", d => yScale(d.life_exp))
      .attr("cx", d => xScale(d.income))
      .attr("r", d => Math.sqrt(areaScale(d.population) / Math.PI))
      .merge(circles)
      .transition().duration(1000)
      .attr("fill", d => colorScale(d.continent))
      .attr("cy", d => yScale(d.life_exp))
      .attr("cx", d => xScale(d.income))
      .attr("r", d => Math.sqrt(areaScale(d.population) / Math.PI));

  yearLabel.text(data[0].year);
}
