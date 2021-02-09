var url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const height = 700;
const width = 700;
const padding = 40;

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
        .attr("height", width)
        .attr("width", height);

      const dataset = fetched_data.data;
      const from = fetched_data.from_date;
      const to = fetched_data.to_date;
      const bar_width = fetched_data.data.length/width;

      // const min_year = parseInt(from.split("-")[0]);
      // const max_year = parseInt(to.split("-")[0]);

      const min_year = new Date(from);
      const max_year = new Date(to);

      const min_gdp = parseInt(d3.min(dataset, (d) => d[1]));
      const max_gdp = parseInt(d3.max(dataset, (d) => d[1]));

      // console.log(min_year, max_year);
      // console.log(min_gdp, max_gdp);

      const xScale = d3
        .scaleTime()
        .domain([min_year, max_year])
        .range([padding, width - padding]);

      const yScale = d3
        .scaleLinear()
        .domain([min_gdp, max_gdp])
        .range([height-padding, padding]);

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
      
      // console.log(max_gdp);
      var years = dataset.map((year)=>{
        return new Date(year);
      })

      var yearScaledData = 
      svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("fill","green")
        .attr("x", (d,i) =>{
          // return ((d[0].split("-")[0])+i*3);
          return padding+i*3;
        })
        .attr("y", (d) =>{
          console.log(d[1]);
          console.log(yScale(d[1]));
          console.log(height-yScale((d[1])));
          return height-yScale((d[1]))          
        })
        .attr("height", ((d) => ([d[1]])))
        .attr("width", 2);

        // console.log(dataset);
    });
});
