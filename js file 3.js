    // append the svg object to the body of the page
  const svg3 = d3.select("#scatterplot_price_sqft_against_year")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  

  //Read the data
  d3.csv("https://raw.githubusercontent.com/ferrarikoenigsegg/HASS-FinalAssignment/main/master_cleaned_v2.csv").then( function(data) {

    // Get the selected town from the dropdown menu
  const selectedTown = d3.select("#town-select3").property("value");

    // Filter the data based on the selected town
    const filteredData = (selectedTown === "all") ? data : data.filter(d => d.town === selectedTown);

    // Format the date
    const parseDate = d3.timeParse("%Y%m");
    filteredData.forEach(function(d) {
      d.date = parseDate(d.year + d.month);
    });

    // Define the color scale for towns
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.town))
      .range(d3.schemeCategory10);

    // Add X axis
    const x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg3.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(d3.timeMonth.every(6)));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return d.resale_price/d.floor_area_sqm; })])
      .range([ height, 0]);
    svg3.append("g")
      .call(d3.axisLeft(y));

      // Add y-axis label
      svg3.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Resale Price per sqm");

      // Add x-axis label
      svg3.append("text")
        .attr("y", height + margin.bottom / 2)
        .attr("x", width / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Date of Transaction");


      
        // Add dots
      svg3.append('g')
        .selectAll("dot")
        .data(filteredData)
        .join("circle")
          .attr("cx", function (d) { return x(d.date); } )
          .attr("cy", function (d) { return y(d.resale_price/d.floor_area_sqm); } )
          .attr("r", 1.5)
          .attr("opacity", 0.5)
          .style("fill", function (d) { return color(d.town); });

      
      // Create legend
  const legend3 = svg3.append("g")
      .attr("transform", `translate(${width - 20}, 0)`);

  // Add legend entries
  const legendEntry3 = legend3.selectAll("g")
      .data(color.domain())
      .enter().append("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

  // Add legend rectangles
  legendEntry3.append("rect")
      .attr("x", 0)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", color);

  // Add legend text
  legendEntry3.append("text")
      .attr("x", 15)
      .attr("y", 5)
      .attr("dy", "0.32em")
      .text(d => d);

  // Shift legend to the right
  legend3.attr("transform", `translate(${width + 10}, 0)`);

  function updateGraph3() {
  // Get the selected town from the dropdown menu
  const selectedTown = d3.select("#town-select3").property("value");

  // Filter the data based on the selected town
  const filteredData = (selectedTown === "all") ? data : data.filter(d => d.town === selectedTown);

  // Format the date
  const parseDate = d3.timeParse("%Y%m");
  filteredData.forEach(function(d) {
    d.date = parseDate(d.year + d.month);
  });

  // Update Y axis domain based on filtered data
  const y = d3.scaleLinear()
    .domain([0, d3.max(filteredData, function(d) { return d.resale_price/d.floor_area_sqm; })])
    .range([ height, 0]);

  // Update the dots
  const dots3 = svg3.selectAll("circle")
    .data(filteredData);

  dots3.exit().remove(); // Remove dots that are no longer needed

  dots3.enter()
    .append("circle")
      .attr("r", 1.5)
      .attr("opacity", 0.5)
    .merge(dots3) // Merge new and existing dots
      .attr("cx", function (d) { return x(d.date); } )
      .attr("cy", function (d) { return y(d.resale_price/d.floor_area_sqm); } )
      .style("fill", function (d) { return color(d.town); });
}

d3.select("#town-select3").on("change", updateGraph3);

    });
