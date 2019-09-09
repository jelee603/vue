import * as d3 from 'd3'

export default class SvgBarChart {
    constructor (svg) {
        this.svg = svg
    }

    draw () {
        const width = '100%'
        const height = 300
        const svg = d3.select('svg')
            .attr('width', width)
            .attr('height', height)

        const dataSet1 = [19, 10, 16, 20, 60, 30, 40, 20, 60, 15, 50, 22, 8, 10, 10, 20, 30, 22, 10, 30, 50]
        const dataSet2 = [29, 20, 26, 10, 10, 3, 4, 12, 16, 15, 20, 12, 8, 10, 10, 20, 10, 10, 20, 30, 30]
        const dataSet3 = [19, 10, 16, 30, 30, 30, 40, 32, 36, 25, 23, 22, 28, 20, 15, 18, 11, 12, 22, 32, 35]
        const timeSet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
        const barPadding = 5
        const canvasActualWidth = document.querySelector('svg').clientWidth // 캔버스 전체 사이즈의 clientWith 를 사용한다.
        const numberOfBars = dataSet1.length
        const barWidth = (canvasActualWidth / numberOfBars) // 막대의 너비는 데이터 갯수에 따라 달라진다.

        const x = d3.scaleBand().rangeRound([0, width]).padding(0.1)

        const focus = svg.append('g')
            .attr('class', 'focus')
            .attr('display', 'none')

        focus.append('line')
            .attr('class', 'y-hover-line hover-line')
            .attr('x1', 0)
            .attr('y2', height)

        const bar = svg.selectAll('rect')

        bar.data(dataSet1)
            .enter()
            .append('rect')
            .attr('y', d => 100 - d)
            .attr('height', d => d)
            .attr('width', barWidth - barPadding)
            .attr('transform', (d, i) => {
                const xCoordinate = barWidth * i

                return `translate(${xCoordinate})`
            })
            .on('mouseover', SvgBarChart.mouseOver)
            .on('mouseout', SvgBarChart.mouseOut)

        // svg.selectAll('rect')
        //     .data(timeSet)
        //     .enter()
        //     .attr('x', d => d)
        // svg.selectAll('rect')
        bar.data(dataSet2)
            .enter()
            .append('rect')
            .attr('y', d => 200 - d)
            .attr('height', d => d)
            .attr('width', barWidth - barPadding)
            .attr('transform', (d, i) => {
                const xCoordinate = barWidth * i

                return `translate(${xCoordinate})`
            })
            .on('mouseover', SvgBarChart.mouseOver)
            .on('mouseout', SvgBarChart.mouseOut)

        bar.data(dataSet3)
            .enter()
            .append('rect')
            .attr('y', d => height - d)
            .attr('height', d => d)
            .attr('width', barWidth - barPadding)
            .attr('transform', (d, i) => {
                const xCoordinate = barWidth * i

                return `translate(${xCoordinate})`
            })
            .on('mouseover', SvgBarChart.mouseOver)
            .on('mouseout', SvgBarChart.mouseOut)

        svg.selectAll('rect').on('click', d => console.log('클릭', d))

        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x))

        // const mouseG = svg.append('g')
        //     .attr('class', 'mouse-over-effects')
        // mouseG.append('path')
        //     .attr('class', 'mouse-line')
        //     .style('stroke', 'black')
        //     .style('stroke-width', '1px')
        //     .style('opacity', '0')
    }

    static mouseOver () {
        d3.select(this)
            .attr('fill', 'red')
        console.log('hi')
    }

    static mouseOut () {
        d3.select(this)
            .attr('fill', 'black')
            // .attr('fill', function() {
            //     return '' + color(this.id)
            // })
    }
}
