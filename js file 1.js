   // append the svg object to the body of the page
    const svg1 = d3.select("#months")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Parse the Data
    d3.csv("https://raw.githubusercontent.com/ferrarikoenigsegg/HASS-FinalAssignment/main/month.csv").then( function(data) {
    
      // List of subgroups = header of the csv files = soil condition here
      const subgroups = data.columns.slice(1,8)
    
      // List of groups = species here = value of the first column called group -> I show them on the X axis
      const groups = data.map(d => (d.group))
    
      // Add X axis
      const x = d3.scaleBand()
          .domain(groups)
          .range([0, width])
          .padding([0.2])
      svg1.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));
    
      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, 3200])
        .range([ height, 0 ]);
      svg1.append("g")
        .call(d3.axisLeft(y));
    
      // color palette = one color per subgroup
        const color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(d3.schemeSet2);
        
        
      //stack the data? --> stack per subgroup
      const stackedData = d3.stack()
        .keys(subgroups)
        (data)


    const tooltip = d3.select("#months")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("text-align", "left")
    .style("max-width", "50%")
    .style("height", "40px")
    .style("padding", "2px")
    .style("font", "14px Lucida")
    .style("bottom", "110%")
    .style("left", "0%")
    .style("white-space", "nowrap")
    .style("pointer-events", "none")
    .style("background-color", "aliceblue")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")


  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(event, d) {
    const subgroupName = d3.select(this.parentNode).datum().key;
    const subgroupValue = d.data[subgroupName];
    tooltip
        .html("Year: " + subgroupName + "<br>" + "Count: " + subgroupValue)
        .style("opacity", 1)
        .style("left", (event.clientX - svg1.node().getBoundingClientRect().x) + "px")
        .style("top", (event.clientY - svg1.node().getBoundingClientRect().y) + "px")
  

  }
  const mouseleave = function(event, d) {
    tooltip
      .style("opacity", 0)
  }

      // Show the bars
      svg1.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .join("g")
          .attr("fill", d => color(d.key))
          .attr("class", d => "myRect " + d.key )
          .selectAll("rect")
          // enter a second time = loop subgroup per subgroup to add all rectangles
          .data(d => d)
          .join("rect")
            .attr("x", d => x(d.data.group))
            .attr("y", d => y(  d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width",x.bandwidth())
            .attr("stroke", "grey")
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave)
       


            //Create the legend 
const legendData = [
  { label: "2023", color: "#e5c494" },
  { label: "2022", color: "#ffd92f" },
  { label: "2021", color: "#a6d854" },
  { label: "2020", color: "#e78ac3" },
  { label: "2019", color: "#8da0cb" },
  { label: "2018", color: "#fc8d62" },
  { label: "2017", color: "#66c2a5" },
];

const legend = svg1.append("g")
.attr("class", "legend")
.attr("transform", `translate(${width},${margin.top})`);

legend.selectAll("rect")
.data(legendData)
.join("rect")
.attr("x", 0)
.attr("y", (d, i) => i * 20)
.attr("width", 10)
.attr("height", 10)
.style("fill", d => d.color);

legend.selectAll("text")
.data(legendData)
.join("text")
.attr("x", 15)
.attr("y", (d, i) => i * 20 + 10)
.text(d => d.label);
          })