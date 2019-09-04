export default class CanvasBarChart {
    constructor(options) {
        this.options = options
        this.canvas = this.options.canvas
        this.ctx = this.canvas.getContext("2d")
        this.colors = options.colors
    }

    draw() {
        let maxValue = 0
        for (let category in this.options.data) {

            maxValue = Math.max(maxValue, this.options.data[category]);
        }

        const barPadding = this.options.padding

        // 실제 캔버스의 너비
        const canvasActualHeight = this.canvas.height - barPadding * 2
        const canvasActualWidth = this.canvas.width - barPadding * 2

        // 그리드 실선을그린다. 
        let gridValue = 0
        while (gridValue <= maxValue) {
            const gridY = canvasActualHeight * (1 - gridValue/maxValue) + barPadding
            // console.log("gridY", gridY);
            this.drawLine(
                this.ctx,
                barPadding * 2, //0,
                gridY,
                this.canvas.width,
                gridY,
                this.options.gridColor
            )

            this.ctx.save()
            this.ctx.fillStyle = this.colors.gridColor
            this.ctx.font = "bold 10px Arial"
            this.ctx.fillText(gridValue, 0, gridY - 2)
            // this.ctx.textAlign = "right"

            gridValue += this.options.gridScale
        }

        // 막대 차트를 그린다.
        const numberOfBars = Object.keys(this.options.data).length
        const barWidth = (canvasActualWidth / numberOfBars)
        let barIndex = 0

        for (let category in this.options.data) {
            const val = this.options.data[category]
            const barHeight = Math.round(canvasActualHeight * (val/maxValue))

            // console.log("barHeight", barHeight)
            this.drawBar(
                this.ctx,
                (barPadding * 2) + (barIndex * barWidth),
                this.canvas.height - barHeight - barPadding,
                barWidth - barPadding,
                barHeight,
                this.colors[barIndex % this.colors.length]
            )

            barIndex++;
        }

        // draw title
        this.ctx.save()
        this.ctx.textBaseline = "top"
        this.ctx.textAlign = "center"
        this.ctx.fillStyle = "#000000"
        this.ctx.font = "bold 14px Arial"
        this.ctx.fillText(this.options.seriesName, this.canvas.width / 2, this.canvas.height)
        this.ctx.restore()

        // draw legend
        const legend = document.querySelector("legend[for='myCanvas']")
        const ul = document.createElement("ul")
        legend.append(ul)

        barIndex = 0
        for (let category in this.options.data) {
            const li = document.createElement("li")

            li.style.listStyle = "none"
            li.style.borderLeft = "20px solid " + this.colors[barIndex % this.colors.length]
            li.style.padding = "5px"
            li.textContent = category
            ul.append(li)
            barIndex++
        }

    }

    drawLine(ctx, startX, startY, endX, endY, color) {
        ctx.save();
        ctx.strokeStyle = color
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
        ctx.restore()
    }

    drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
        ctx.save();
        ctx.fillStyle = color
        ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height)
        ctx.restore()
    }
}