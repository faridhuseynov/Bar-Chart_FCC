var url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

var fetched_data = [];
$(document).ready(() => {
  const svg = d3
    .select("#main")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      fetched_data = data;

      console.log(fetched_data);

      $("#title").text(fetched_data.source_name);

      const svg = d3
        .select("#main")
        .append("svg")
        .attr("height", 500)
        .attr("width", 500);

      const min = parseInt(fetched_data.from_date.split("-")[0]);
      const max = parseInt(fetched_data.to_date.split("-")[0]);

      console.log(min, max);

      const xScale = d3
        .scaleLinear()
        .domain([min, max])
        .range([min - 5, max + 5]);

      const xAxis = d3.axisBottom(xScale);

      svg.append("g").attr("id","x-axis").attr("transform","translate(0,"+450+")");
    });
});
