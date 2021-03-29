const svg = d3.select('#canvas').append('svg')
  .attr('width', 400)
  .attr('height', 400);

const circles = svg.selectAll('circle')
  .data(data);

circles.enter().append('circle')
  .attr('cx', (d, i) => (i * 50) + 50)
  .attr('cy' , 150)
  .attr('r', (d) => d)
  .attr('fill', 'tomato');
