var url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const height = 700;
const width = 900;
const padding = 60;

var fetched_data = [];
$(document).ready(() => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      fetched_data = data;

      console.log(fetched_data);

      $("#title").text(fetched_data.source_name);

      const svg = d3
        .select(".chart")
        .append("svg")
        .attr("height", width)
        .attr("width", height);

      const dataset = fetched_data.data;
      const from = fetched_data.from_date;
      const to = fetched_data.to_date;
      const length = fetched_data.data.length;

      const min_year = parseInt(from.split("-")[0]);
      const max_year = parseInt(to.split("-")[0]);

      // const min_year_msecs = Date.parse(from);
      // const max_year_msecs = Date.parse(to);

      // console.log(min_year_msecs, max_year_msecs);
      // const min_year = fetched_data.from_date;
      // const max_year = fetched_data.to_date;

      const min_gdp = parseInt(d3.min(dataset, (d) => d[1]));
      const max_gdp = parseInt(d3.max(dataset, (d) => d[1])+1);

      console.log(min_year, max_year);
      console.log(min_gdp, max_gdp);

      const xScale = d3
        .scaleLinear()
        .domain([min_year, max_year])
        .range([padding, width - padding]);

      const yScale = d3
        .scaleLinear()
        .domain([min_gdp, max_gdp])
        .range([height - padding, padding]);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      svg
        .append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(0," + (height-padding) + ")")
        .call(xAxis);

      svg
        .append("g")
        .attr("id", "y-axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

      // var year=0;
      // var month=0;
      // var day=0;
      
      svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d,i) =>{
          // return ((d[0].split("-")[0])+i*3);
          return padding+i*3;
        })
        .attr("y", (d) => (yScale(d[1])))
        .attr("height", ((d) => max_gdp-[d[1]]))
        .attr("width", 2);
        console.log(dataset);
    });
});
