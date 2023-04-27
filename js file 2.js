  // append the svg object to the body of the page
  const svg2 = d3.select("#scatterplot_price_against_year")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //Read the data
  d3.csv("https://raw.githubusercontent.com/ferrarikoenigsegg/HASS-FinalAssignment/main/master_cleaned_v2.csv").then( function(data) {

    // Get the selected town from the dropdown menu
  const selectedFlat = d3.select("#flat-select2").property("value");
  const selectedTown = d3.select("#town-select2").property("value");

    // Filter the data based on the selected town
    const filteredData = (selectedFlat === "all" && selectedTown === "all")
  ? data
  : data.filter(d => {
      return (selectedFlat === "all" || d.flat_type === selectedFlat) &&
             (selectedTown === "all" || d.town === selectedTown);
    });

    // Format the date
    const parseDate = d3.timeParse("%Y%m");
    filteredData.forEach(function(d) {
      d.date = parseDate(d.year + d.month);
    });

    // Define the color scale for towns
    const color = d3.scaleOrdinal()
      .domain(data.map(d => `${d.flat_type}-${d.town}`))
      .range(d3.schemeCategory10);

    // Add X axis
    const x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg2.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(d3.timeMonth.every(6)));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return d.resale_price; })])
      .range([ height, 0]);
    svg2.append("g")
      .call(d3.axisLeft(y));

      // Add y-axis label
      svg2.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Resale Price");

      // Add x-axis label
      svg2.append("text")
        .attr("y", height + margin.bottom / 2)
        .attr("x", width / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Date of Transaction");

        // Add dots
      svg2.append('g')
        .selectAll("dot")
        .data(filteredData)
        .join("circle")
          .attr("cx", function (d) { return x(d.date); } )
          .attr("cy", function (d) { return y(d.resale_price); } )
          .attr("r", 1.5)
          .attr("opacity", 0.5)
          .style("fill", function (d) { return color(d.flat_type); });

  function updateGraph2() {
  // Get the selected town from the dropdown menu
  const selectedFlat = d3.select("#flat-select2").property("value");
  const selectedTown = d3.select("#town-select2").property("value");
  

  // Filter the data based on the selected town
  const filteredData = (selectedFlat === "all" && selectedTown === "all")
  ? data
  : data.filter(d => {
      return (selectedFlat === "all" || d.flat_type === selectedFlat) &&
             (selectedTown === "all" || d.town === selectedTown);
    });

  // Format the date
  const parseDate = d3.timeParse("%Y%m");
  filteredData.forEach(function(d) {
    d.date = parseDate(d.year + d.month);
  });

  // Update Y axis domain based on filtered data
  const y = d3.scaleLinear()
    .domain([0, d3.max(filteredData, function(d) { return d.resale_price; })])
    .range([ height, 0]);

  // Update the dots
  const dots2 = svg2.selectAll("circle")
    .data(filteredData);

  dots2.exit().remove(); // Remove dots that are no longer needed

  dots2.enter()
    .append("circle")
      .attr("r", 1.5)
      .attr("opacity", 0.5)
    .merge(dots2) // Merge new and existing dots
      .attr("cx", function (d) { return x(d.date); } )
      .attr("cy", function (d) { return y(d.resale_price); } )
      .style("fill", function (d) { return color(d.flat_type); });

// Remove old legend
d3.selectAll(".legend2-color").remove();
d3.selectAll(".legend2-label").remove();
d3.selectAll(".legend2-title").remove();

// Add legend
const legend2 = svg2.append("g")
  .attr("transform", `translate(${width + 20}, 50)`)
  .attr("class", "legend");

legend2.append("text")
  .attr("class", "legend2-title")
  .text("Currently displaying");

legend2.append("rect")
  .attr("class", "legend2-color")
  .attr("width", 18)
  .attr("height", 18)
  .attr("fill", color(`${selectedFlat}-${selectedTown}`));

legend2.append("text")
  .attr("class", "legend2-label")
  .attr("x", 25)
  .attr("y", 14)
  .text(selectedFlat + ' in ' + selectedTown);
  }

d3.select("#flat-select2").on("change", updateGraph2);
d3.select("#town-select2").on("change", updateGraph2);
    });