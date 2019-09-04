export default class CanvasBarChart {
    constructor (options) {
        this.options = options
        this.canvas = this.options.canvas
        this.ctx = this.canvas.getContext('2d')
        this.colors = options.colors
    }

    draw () {
        const data = this.options.data
        const numberOfBars = Object.keys(data).length
        let cateIndex = 0

        for (const category in data) {
            const barPadding = this.options.padding
            const values = data[category]
            const maxValue = Math.max.apply(null, data[category]) // 카테고리가 생성되면 카테고리별 MAX 값이 존재한다.
            const categoryHeight = this.canvas.height / numberOfBars // 카테고리의 최소 높이
            const canvasActualHeight = categoryHeight * (cateIndex + 1) - (categoryHeight * cateIndex) // 차트영역의 캔버스 너비
            const canvasActualWidth = this.canvas.width - barPadding * 2
            const barWidth = (canvasActualWidth / numberOfBars) // 막대의 너비
            let gridValue = 0
            let barIndex = 0

            // console.log("categoryHeight", numberOfBars)
            // 그리드 실선을그린다.
            while (gridValue <= maxValue) {
                // const gridY = canvasActualHeight * (1 - gridValue / maxValue) + barPadding
                const gridX = barPadding * 2
                const gridY = canvasActualHeight * (1 - gridValue / maxValue) + barPadding + (categoryHeight * cateIndex)

                console.log('gridY', gridY)
                this.drawLine(
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
                this.ctx.fillText(gridValue, 0, gridY - 2)
                // this.ctx.textAlign = "right"

                gridValue += this.options.gridScale
            }

            // for (let category in this.options.data) {

            for (const val of values) {
                const barHeight = Math.round(canvasActualHeight * (val / maxValue))
                const barX = (barPadding * 2) + (barIndex * barWidth)
                const barY = canvasActualHeight - barHeight + barPadding + (categoryHeight * cateIndex)
                // console.log("barX", barX)
                this.drawBar(
                    this.ctx,
                    barX,
                    barY,
                    barWidth - barPadding,
                    barHeight,
                    this.colors[barIndex % this.colors.length]
                )
                barIndex++
            }
            cateIndex++
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
        legend.append(ul)

        cateIndex = 0
        for (const category in this.options.data) {
            const li = document.createElement('li')

            li.style.listStyle = 'none'
            li.style.borderLeft = '20px solid ' + this.colors[cateIndex % this.colors.length]
            li.style.padding = '5px'
            li.textContent = category
            ul.append(li)
            cateIndex++
        }
    }

    drawLine (ctx, startX, startY, endX, endY, color) {
        ctx.save()
        ctx.strokeStyle = color
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
        ctx.restore()
    }

    drawBar (ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
        ctx.save()
        ctx.fillStyle = color
        ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height)
        ctx.restore()
    }
}
