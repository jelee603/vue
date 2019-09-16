import * as d3 from 'd3'

export default class SvgBarChart {
    constructor ({ id, dataset, category }) {
        this.id = id
        this.dataset = dataset
        this.category = category

        // Graph Setting
        this.width = '100%'
        this.height = 220
        this.barPadding = 5
        this.xAxisHeight = 20
        this.paddingLeft = 50
        this.step = 6
        this.numberOfBars = this.dataset[0].length
        this.barWidth = null
        this.barFactory = null
        this.tooltip = d3.select(`#${this.id}`)
            .append('div')
            .attr('class', 'tooltip')
            .style('display', 'none')
        this._showTooltip = this._showTooltip.bind(this)
        this._hideTooltip = this._hideTooltip.bind(this)
    }

    _showTooltip (value, index, nodes) {
        const target = nodes[index]
        const distance = 40
        this.tooltip.style('opacity', 0.6)
            .style('left', `${d3.event.pageX - distance}px`)
            .style('top', `${d3.event.pageY - distance}px`)
            .style('display', 'block')
        this.tooltip.html(`value: ${value}`)

        d3.select(target)
            .attr('fill', 'red')
            .style('cursor', 'pointer')
    }

    _hideTooltip (value, index, nodes) {
        const target = nodes[index]
        const name = target.getAttribute('name')

        d3.select(nodes[index])
            .attr('fill', this._getColors(name))
        this.tooltip.style('display', 'none')
    }

    _drawBarChart (dataSet, name, index) {
        const maxValue = 90
        const posX = 60
        const height = 220 / 3 * (index + 1)

        this.barFactory.data(dataSet) // 데이터를 입력한다.
            .enter()
            .append('rect') // 데이터 갯수만큼 사각형을 생성한다.
            .attr('x', posX)
            .attr('y', d => height - this.xAxisHeight - ((d / height) * this.xAxisHeight))
            .attr('height', d => ((d / maxValue) * this.xAxisHeight))
            .attr('width', this.barWidth - this.barPadding)
            .attr('transform', (_, i) => {
                const xCoordinate = this.barWidth * i
                return `translate(${xCoordinate})`
            })
            .attr('fill', _ => this._getColors(name))
            .attr('name', name)
            .attr('value', d => d)
            .on('mouseover', this._showTooltip)
            .on('mousemove', this._showTooltip)
            .on('mouseout', this._hideTooltip)
    }

    _getColors (name) {
        return this.category.filter(v => v.name === name).map(v => v.color)[0]
    }

    update (dataset) {
        this.dataset = dataset
        this.draw()
    }

    draw () {
        // Set Svg Wrapper Setting
        const svg = d3.select(`#${this.id}`) // div container 를 찾는다.
            .append('svg') // svg 를 만든다.
            .attr('width', this.width)
            .attr('height', this.height)
            .style('border', '1px solid black')
        const canvasActualWidth = document.querySelector('svg').clientWidth // 캔버스 전체 사이즈의 clientWith 를 사용한다.
        this.barWidth = ((canvasActualWidth - this.paddingLeft * 2) / this.numberOfBars) // 막대의 너비는 데이터 갯수에 따라 달라진다.

        // Draw axis X
        const xAxis = d3.scaleTime() // x축은 band 로 잡아주고, domain 에 데이터를 입력한다.
            .domain([new Date('2019-09-11 13:00:00'), new Date('2019-09-11 16:00:00')])
            .range([0, canvasActualWidth - this.paddingLeft * 2]) // 눈금의 폭을 지정한다.

        svg.append('g')
            .attr('transform', `translate(${this.paddingLeft}, ${this.height - this.xAxisHeight})`)
            .call(d3.axisBottom(xAxis).ticks(this.step)) // 하단에 x축을 추가한다.

        // Draw Graph
        this.barFactory = svg.selectAll('rect') // 아이템을 그려줄 사각형을 찾는다.

        for (let i = 0, len = this.category.length; i < len; i++) {
            this._drawBarChart(this.dataset[i], this.category[i].name, i)
        }

        // Draw Label
        const gab = v => v * 60
        const legend = svg.append('g')
            .attr('class', 'legend')

        const lg = legend.selectAll('g') // 아이템을 그려줄 svg 를 찾는다.
            .data(this.category) // 데이터를 입력한다.
            .enter()
            .append('g')

        lg.append('rect') // rect 를 추가한다.
            .attr('x', 0)
            .attr('y', d => gab(d.index) - 20)
            .attr('width', 10)
            .attr('height', 30)
            .style('fill', d => this._getColors(d.name))

        lg.append('text')
            .text(d => d.name)
            .attr('x', 10)
            .attr('y', d => gab(d.index))
    }
}
