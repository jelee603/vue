import * as d3 from 'd3'

export default class BarChart {
  constructor (domId) {
    this.domId = `#${domId}`
  }

  init () {
    const domId = this.domId

    d3.select(domId)
      .append('svg')
      .selectAll('rect')
      .data([15, 50, 22, 8, 100, 10, 20, 30, 22, 100, 30, 50, 20, 34])
      .enter()
      .append('rect')
      .attr('fill', 'skyblue')
      .attr('stroke', 'black')
      .attr('width', 10)
      .attr('height', d => d)
      .attr('x', (d, i) => i * 10)
      .attr('y', d => 100 - d)
  }
}
