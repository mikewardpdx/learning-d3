const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

const svg = d3.select('#canvas').append('svg')
  .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

const g = svg.append('g')
  .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

d3.json('data/buildings.json').then(data => {
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.height)])
    .range([HEIGHT, 0]);

  const x = d3.scaleBand()
    .domain(data.map(x => x.name))
    .range([0, WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.2);

  g.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${HEIGHT})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
      .attr('x', '10')
      .attr('y', '-5')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-40)')

  g.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(y));

  const rects = g.selectAll('rect')
    .data(data);

  rects.enter().append('rect')
    .attr('y', d => y(d.height))
    .attr('x', (d) => x(d.name))
    .attr('width', x.bandwidth)
    .attr('height', d => HEIGHT - y(d.height))
    .attr('fill', 'tomato');
});

