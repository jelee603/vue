import * as d3 from 'd3'

export default class pieChart {
    constructor (domId) {
        const pieChart = d3.pie()
        this.yourPie = pieChart([1, 1, 2])
        this.domId = `#${domId}`
    }

    init () {
        const newArc = d3.arc()

        newArc.outerRadius(50)
        d3.select(this.domId)
            .append('svg')
            .attr('transform', 'translate(250, 250)')
            .selectAll('path')

            .data(this.yourPie)
            .enter()
            .append('path')
            .attr('d', newArc)
            .style('fill', 'skyblue')
            .style('opacity', 5)
            .style('stroke', 'black')
            .style('stroke-width', '2px')
    }
}
