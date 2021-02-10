var url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const height = 500;
const width = 1000;
const padding = 50;

function  setData(element){
  var quarter;
  var date = new Date(element[0]);
  var year = date.getFullYear();
  var gdp = element[1];
  var month = date.getMonth();
  if(month<3){
    quarter="Q1";
  }else if(month<6){
    quarter="Q2";
  }else if(month<9){
    quarter = "Q3";
  }else{
    quarter="Q4";
  }
  return (year+"\n"+quarter+"\n"+"$"+gdp+"Billion");
}

var fetched_data = [];
$(document).ready(() => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      fetched_data = data;

      var div = d3.select(".chart")
                      .append("div")
                      .attr("id","tooltip")
                      .attr("class","infobox")
                      .style("opacity","0")

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
        .style("font","13px Ubuntu")
        .attr("transform", "translate(0," + (height-padding) + ")")
        .call(xAxis);

      svg
        .append("g")
        .attr("id", "y-axis")
        .style("font","13px Ubuntu")
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
          return height - padding - yScale([d[1]])
        })) 
        .attr("width", bar_width*12)
        .attr("class","bar")
        .attr("data-date",d=>d[0])
        .attr("data-gdp",d=>d[1])
        .on("mouseover", (event,element) => {
          div.transition()
            .duration(50)
            .style("opacity",0.9)
            .style("top",(height+60+"px"))
            .style("left",event.pageX+"px")
            .attr("data-date",element[1])
            .text(
              ()=>setData(element)
              );
            
         })
         .on("mouseout",()=>{
           div.transition()
              .duration(100)
              .style("opacity",0)
         });
    });
});
