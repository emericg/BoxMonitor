var chart;
var data = [];

function chart_data(param) {
  data[0] = param;

  chart = d3.select(".graph_mem").append("svg")
    .attr("class", "chart")
    .attr("width", "100%")
    .attr("height", 72)
    .append("g")
    .attr("transform", "translate(8,24)");

  var x = d3.scale.linear()
    .domain([0, 100])
    .range([0, "93%"]);
  var y = d3.scale.ordinal()
    .domain(data)
    .rangeBands([16, 48]);

  chart.selectAll("line")
    .data(x.ticks(4))
    .enter().append("line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", 72)
    .style("stroke", "#ccc");
  chart.selectAll(".rule")
    .data(x.ticks(4))
    .enter().append("text")
    .attr("class", "rule")
    .attr("x", x)
    .attr("y", 0)
    .attr("dy", -3)
    .attr("text-anchor", "middle")
    .text(String);

  chart.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("y", y)
    .attr("width", x)
    .attr("height", y.rangeBand());
  chart.selectAll("text")
    .data(data)
    .enter().append("text")
    .attr("x", x)
    .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
    .attr("dx", -3) // padding-right
    .attr("dy", ".35em") // vertical-align: middle
    .attr("text-anchor", "end") // text-align: right
    .text(String);

  chart.append("line")
    .attr("y1", 0)
    .attr("y2", 72)
    .style("stroke", "#000");
}

function rechart_data(param) {
  data[0] = param;

  var x = d3.scale.linear()
    .domain([0, 100])
    .range([0, "93%"]);
  var y = d3.scale.ordinal()
    .domain(data)
    .rangeBands([16, 48]);

  chart.selectAll("rect")
    .data(data)
    .transition()
    .attr("y", y)
    .attr("width", x)
    .attr("height", y.rangeBand());
}

function load_data() {
  socket.request('/mem/usage', {
    message: 'mem'
  }, function (response) {
    //console.log(response);
    chart_data(response);
  });
}

function reload_data() {
  socket.request('/mem/usage', {
    message: 'mem'
  }, function (response) {
    //console.log(response);
    rechart_data(response);
  });
}

var socket = io.connect('http://localhost:1337');
load_data();
var interval = setInterval(reload_data, 5000);
