export default class CanvasBarChart {
    constructor (options) {
        this.options = options
        this.canvas = this.options.canvas
        this.ctx = this.canvas.getContext('2d')
        this.colors = options.colors
    }

    draw () {
        const data = this.options.data
        const cateLength = Object.keys(data).length
        let cateIndex = 0

        for (const category in data) {
            if (Object.prototype.hasOwnProperty.call(data, category)) {
                const barPadding = this.options.padding
                const values = data[category]
                const maxValue = Math.max.apply(null, data[category]) + 10 // 카테고리가 생성되면 카테고리별 MAX 값이 존재한다.
                const categoryHeight = Math.round((this.canvas.height - barPadding) / cateLength) // 카테고리 영역의 최소 높이 (하단 영역을 빼준다)
                const canvasActualHeight = categoryHeight * (cateIndex + 1) - (categoryHeight * cateIndex) // 차트영역의 캔버스 너비
                const canvasActualWidth = this.canvas.width - barPadding * 2
                const numberOfBars = values.length
                const lastLineHeight = canvasActualHeight + (categoryHeight * cateIndex) + barPadding
                let gridValue = 0
                let barIndex = 0

                // draw grid
                while (gridValue <= maxValue) {
                    const gridX = barPadding * 2
                    const gridY = canvasActualHeight * (1 - gridValue / maxValue) + barPadding + (categoryHeight * cateIndex)

                    // console.log('gridY', gridY)
                    CanvasBarChart.drawLine(
                        this.ctx,
                        gridX, // 0,
                        gridY,
                        this.canvas.width,
                        gridY,
                        this.options.gridColor
                    )

                    this.ctx.save()
                    this.ctx.fillStyle = this.colors.gridColor
                    this.ctx.font = 'bold 10px Arial'
                    this.ctx.fillText(gridValue.toString(), 0, gridY - 2)
                    gridValue += this.options.gridScale
                }

                console.log(canvasActualHeight + (categoryHeight * cateIndex))

                // draw bar
                for (const val of values) {
                    const barWidth = (canvasActualWidth / numberOfBars) // 막대의 너비
                    const barHeight = Math.round(canvasActualHeight * (val / maxValue))
                    const barX = (barPadding * 2) + (barIndex * barWidth)
                    const barY = canvasActualHeight - barHeight + barPadding + (categoryHeight * cateIndex)

                    CanvasBarChart.drawBar(
                        this.ctx,
                        barX,
                        barY,
                        barWidth - barPadding,
                        barHeight,
                        this.colors[cateIndex]
                    )

                    barIndex++
                }

                // draw last line
                CanvasBarChart.drawLine(
                    this.ctx,
                    0, // 0,
                    lastLineHeight,
                    this.canvas.width,
                    lastLineHeight,
                    '#black',
                    2
                )
            }

            // draw title
            this.ctx.save()
            this.ctx.textBaseline = 'top'
            this.ctx.textAlign = 'center'
            this.ctx.fillStyle = '#000000'
            this.ctx.font = 'bold 14px Arial'
            this.ctx.fillText(this.options.seriesName, this.canvas.width / 2, this.canvas.height)
            this.ctx.restore()

            // draw legend
            const legend = document.querySelector("legend[for='myCanvas']")
            const ul = document.createElement('ul')
            const li = document.createElement('li')

            legend.append(ul)

            li.style.listStyle = 'none'
            li.style.borderLeft = '20px solid ' + this.colors[cateIndex % this.colors.length]
            li.style.padding = '5px'
            li.textContent = category
            ul.append(li)
            cateIndex++
        }

        this.canvas.addEventListener('click', e => {
            const cRect = this.getBoundingClientRect()
            const canvasX = Math.round(e.clientX - cRect.left)
            const canvasY = Math.round(e.clientY - cRect.top)
            console.log('canvas >>', canvasX, canvasY)
        })

        this.canvas.addEventListener('mousemove', () => {

        })
    }

    static drawLine (ctx, startX, startY, endX, endY, color, lineWidth = 1) {
        ctx.save()
        ctx.strokeStyle = color
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.lineWidth = lineWidth
        ctx.stroke()
        ctx.restore()
    }

    static drawBar (ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
        ctx.save()
        ctx.fillStyle = color
        ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height)
        ctx.restore()
    }
}
