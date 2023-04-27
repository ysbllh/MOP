// Define the dimensions of the SVG element and the rectangle
const svgWidth = 800;
const svgHeight = 200;
const rectHeight = 30;

// Create an SVG element
const svg = d3.select("#rectchart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Define the dimensions and position of the rectangle
const rectX = 0;
const rectY = (svgHeight - rectHeight) / 2;
const rectWidth = svgWidth - 100;

// Define the sizes of the three parts of the rectangle
const part1Width = rectWidth * 0.9;
const part2Width = rectWidth * 0.05;
const part3Width = rectWidth * 0.05;

// Draw the rectangle and the three parts

svg.append("rect")
  .attr("x", rectX)
  .attr("y", rectY)
  .attr("width", part1Width)
  .attr("height", rectHeight)
  .attr("fill", "#7570b3");

svg.append("text")
  .attr("x", rectX + part1Width/2)
  .attr("y", rectY + rectHeight/2 +5) 
  .text("90y")
  .attr("text-anchor", "middle") 
  .attr("fill", "black"); 

svg.append("rect")
  .attr("x", rectX + part1Width)
  .attr("y", rectY)
  .attr("width", part2Width)
  .attr("height", rectHeight)
  .attr("fill", "#d95f02");


const arrowWidth = 10;
const arrowHeight = 15;

svg.append("path")
  .attr("d", `M ${part1Width} ${rectY} L ${part1Width + arrowWidth/2} ${rectY - arrowHeight} L ${part1Width - arrowWidth/2} ${rectY - arrowHeight} Z`)
  .attr("fill", "darkblue");

svg.append("text")
  .attr("x", part1Width)
  .attr("y", rectY - 20)
  .text("Cut-off")
  .attr("text-anchor", "middle")
  .attr("fill", "black");

svg.append("text")
  .attr("x", rectX + part1Width + part2Width/2)
  .attr("y", rectY + rectHeight/2+5) 
  .text("4y")
  .attr("text-anchor", "middle") 
  .attr("fill", "black"); 


svg.append("path")
  .attr("d", `M ${part1Width + part2Width} ${rectY + rectHeight} L ${part1Width + part2Width + arrowWidth/2} ${rectY + rectHeight + arrowHeight} L ${part1Width + part2Width - arrowWidth/2} ${rectY + rectHeight + arrowHeight} Z`)
  .attr("fill", "darkblue");


  svg.append("text")
  .attr("x", part1Width+ part2Width)
  .attr("y", rectY + rectHeight + 30)
  .html(`1st MOP<br> reached`)
  .attr("text-anchor", "left")
  .attr("fill", "black");

svg.append("rect")
  .attr("x", rectX + part1Width + part2Width)
  .attr("y", rectY)
  .attr("width", part3Width)
  .attr("height", rectHeight)
  .attr("fill", "#1b9e77");


svg.append("text")
  .attr("x", rectX + part1Width + part2Width + part3Width/2)
  .attr("y", rectY + rectHeight/2 + 5) 
  .text("5y")
  .attr("text-anchor", "middle") 
  .attr("fill", "black"); 


  svg.append("text")
.attr("x", svgWidth/2)
.attr("y", 50)
.attr("text-anchor", "middle")
.attr("font-weight", "bold")
.text("Lifespan of a HDB Flat is 99 years")