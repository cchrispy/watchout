var url = 'https://data.cityofnewyork.us/api/views/26ze-s5bx/rows.json';
var data = [];
var newData = [];

var graph = d3.select('#graph').append('svg')
  .attr('height', 700).attr('width', 700);

var xScale = d3.scale.linear().range([80, 700 - 60]).domain([2000, 2010]);
var yScale = d3.scale.linear().range([700 - 60, 60]).domain([12000, 16000]);
var xAxis = d3.svg.axis().scale(xScale);
var yAxis = d3.svg.axis().scale(yScale).orient('left');

graph.append('svg:g').attr('transform', 'translate(0,' + (700 - 60) + ')').call(xAxis);
graph.append('svg:g').attr('transform', 'translate(' + (80) + ', 0)').call(yAxis);

graph.append('text')
  .attr('text-anchor', 'middle')
  .attr('transform', 'translate(20,350)rotate(-90)')
  .text('Inmates');

graph.append('text')
  .attr('text-anchor', 'middle')
  .attr('transform', 'translate(350,700)')
  .text('Year');

graph.append('text')
  .attr('text-anchor', 'middle')
  .attr('transform', 'translate(370, 90)')
  .text('Average Daily Inmate Population Per Year');

var testing = function(something, json) {
  //create array for line
  json.data.forEach(function(item) {
    data.push({
      year: +item[8],
      population: +item[9]
    });
    newData.push({
      year: +item[8],
      population: +item[9] - 200
    });
  });

  var line = d3.svg.line()
    .x(function(d) {
      return xScale(d.year);
    })
    .y(function(d) {
      return yScale(d.population);
    })
    .interpolate('basis');
  
  graph.append('svg:path').attr('d', line(data))
    .attr('stroke', 'red')
    .attr('stroke-width', 2)
    .attr('fill', 'none');     

  graph.append('svg:path').attr('d', line(newData))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');     
};

d3.json('https://data.cityofnewyork.us/api/views/26ze-s5bx/rows.json', function(json) {
  //data = json.data;
})
    .mimeType('application/json')
    .response(function(xhr) { return JSON.parse(xhr.responseText); })
    .get(testing);

