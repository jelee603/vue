import * as d3 from 'd3'

export default class SvgBarChart {
    constructor (svg) {
        this.svg = svg
    }

    draw () {
        const width = '100%'
        const height = 300
        const svg = d3.select('svg') // svg container 를 찾는다.
            .attr('width', width)
            .attr('height', height)

        const dataSet1 = [19, 10, 16, 20, 60, 30, 40, 20, 60, 15, 50, 22, 8, 10, 10, 20, 30, 22, 10, 30, 50]
        const dataSet2 = [29, 20, 26, 10, 10, 3, 4, 12, 16, 15, 20, 12, 8, 10, 10, 20, 10, 10, 20, 30, 30]
        const dataSet3 = [19, 10, 16, 30, 30, 30, 40, 32, 36, 25, 23, 22, 28, 20, 15, 18, 11, 12, 22, 32, 35]
        const timeSet = [2014, 2015, 2016, 2017, 2018, 2019]
        const barPadding = 5
        const canvasActualWidth = document.querySelector('svg').clientWidth // 캔버스 전체 사이즈의 clientWith 를 사용한다.
        const numberOfBars = dataSet1.length
        const barWidth = (canvasActualWidth / numberOfBars) // 막대의 너비는 데이터 갯수에 따라 달라진다.
        const xAxisHeight = 20 // x축 높이를 지정한다.
        const categories = [
            { index: 1, name: 'Cate1', color: '#25b0ed' },
            { index: 2, name: 'Cate2', color: '#1cb57e' },
            { index: 3, name: 'Cate3', color: '#ffa733' }]
        this.colors = name => categories.filter(v => v.name === name).map(v => v.color)[0]

        const x = d3.scaleBand() // x축은 band 로 잡아주고, domain 에 데이터를 입력한다.
            .domain(timeSet)
            .range([0, canvasActualWidth]) // 눈금의 폭을 지정한다.
            .padding([0.6])

        const bar = svg.selectAll('rect') // 아이템을 그려줄 사각형을 찾는다.
        const name1 = categories[0].name
        const name2 = categories[1].name
        const name3 = categories[2].name

        bar.data(dataSet1) // 데이터를 입력한다.
            .enter()
            .append('rect') // 데이터 갯수만큼 사각형을 생성한다.
            .attr('x', 60)
            .attr('y', d => 100 - xAxisHeight - d)
            .attr('height', d => d)
            .attr('width', barWidth - barPadding)
            .attr('transform', (d, i) => {
                const xCoordinate = barWidth * i

                return `translate(${xCoordinate})`
            })
            .attr('fill', d => this.colors(name1))
            .attr('name', name1)
            .on('mouseover', SvgBarChart.mouseOver)
            .on('mouseout', SvgBarChart.mouseOut)

        bar.data(dataSet2)
            .enter()
            .append('rect')
            .attr('x', 60)
            .attr('y', d => 200 - xAxisHeight - d)
            .attr('height', d => d)
            .attr('width', barWidth - barPadding)
            .attr('transform', (d, i) => {
                const xCoordinate = barWidth * i

                return `translate(${xCoordinate})`
            })
            .attr('fill', d => this.colors(name2))
            .attr('name', name2)
            .on('mouseover', SvgBarChart.mouseOver)
            .on('mouseout', SvgBarChart.mouseOut)

        bar.data(dataSet3)
            .enter()
            .append('rect')
            .attr('x', 60)
            .attr('y', d => height - xAxisHeight - d)
            .attr('height', d => d)
            .attr('width', barWidth - barPadding)
            .attr('transform', (d, i) => {
                const xCoordinate = barWidth * i

                return `translate(${xCoordinate})`
            })
            .attr('fill', d => this.colors(name3))
            .attr('name', name3)
            .on('mouseover', SvgBarChart.mouseOver)
            .on('mouseout', SvgBarChart.mouseOut)

        svg.append('g')
            .attr('transform', `translate(0, ${height - xAxisHeight})`)
            .call(d3.axisBottom(x)) // 하단에 x축을 추가한다.

        // const focus = svg.append('g')
        //     .attr('class', 'focus')
        //     .attr('display', 'block')
        //
        // focus.append('line') // 마우스를 따라다니는 라인을 그린다.... 우선은 그냥 고정값 라인만 그린다.
        //     .attr('class', 'mouse-line')
        //     .style('stroke', 'black')
        //     .style('stroke-width', '1px')
        //     .style('opacity', '0')
        //     .attr('x1', 5) // x, y 의 라인을 그린다.
        //     .attr('y1', 0)
        //     .attr('x2', 5)
        //     .attr('y2', height)

        // const legend = svg.selectAll('g')
        const gab = v => v * 60
        const legend = svg.append('g')
            .attr('class', 'legend')

        const lg = legend.selectAll('g') // 아이템을 그려줄 svg 를 찾는다.
            .data(categories) // 데이터를 입력한다.
            .enter()
            .append('g')

        lg.append('rect') // rect 를 추가한다.
            .attr('x', 0)
            .attr('y', d => gab(d.index) - 20)
            .attr('width', 10)
            .attr('height', 30)
            .style('fill', d => this.colors(d.name))

        lg.append('text')
            .text(d => d.name)
            .attr('x', 10)
            .attr('y', d => gab(d.index))
    }

    static mouseOver () {
        d3.select(this)
            .attr('fill', 'red')
        d3.select('.mouse-line')
            .style('opacity', 1)
    }

    static mouseOut () {
        // console.log(arguments)
        // console.log(this)
        // console.log(d3.select(this).attr('name'))
        const name = d3.select(this).attr('name')
        d3.select(this)
            .attr('fill', this.colors(name))
        d3.select('.mouse-line')
            .style('opacity', 0)
        // console.log(this.id)
    }
}
