var url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const height = 500;
const width = 1000;
const padding = 50;

var fetched_data = [];
$(document).ready(() => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      fetched_data = data;

      // console.log(fetched_data);

      $("#title").text(fetched_data.source_name);

      const svg = d3
        .select(".chart")
        .append("svg")
        .attr("height", height)
        .attr("width", width);

      const dataset = fetched_data.data;
      const from = fetched_data.from_date;
      const to = fetched_data.to_date;
      const bar_width = fetched_data.data.length/width;


      const min_year = new Date(from);
      const max_year = new Date(to);

      const min_gdp = (d3.min(dataset, (d) => d[1]));
      const max_gdp = (d3.max(dataset, (d) => d[1]));

      const xScale = d3
        .scaleTime()
        .domain([min_year, max_year])
        .range([padding, width - padding]);

      const yScale = d3
        .scaleLinear()
        .domain([0, max_gdp])
        .range([height-padding, padding]);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      const yearsScaled = dataset.map(data=>{
        return xScale(new Date(data[0]));
      })
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

      svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("fill","slatedarkgray")
        .attr("x", (d,i) =>{
          return (yearsScaled[i]);
        })
        .attr("y", (d) =>{
          return yScale((d[1]))          
        })
        .attr("height", ((d) =>{
          console.log(height-padding- yScale(d[1]));
          return height - padding - yScale([d[1]])
        })) 
        .attr("width", bar_width);

        // console.log(dataset);
    });
});
