<template>
  <div>
    <svg class="bar-chart"></svg>
    <div class="canvas-chart">
      <legend
        for="myCanvas"
      ></legend>
      <canvas
        id="myCanvas"
        class="bar-chart"
      ></canvas>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import CanvasBarChart from '../plugins/CanvasBarChart'

export default {
    mounted () {
        /**
         * draw svg chart
         * d3를 사용한 차트생성
         */
        const width = '100%'
        const height = 200
        const svg = d3.select('svg')
            .attr('width', width)
            .attr('height', height)

        const dataSet = [89, 100, 56, 120, 160, 30, 40, 120, 160, 15, 50, 22, 8, 100, 10, 20, 30, 22, 100, 30, 50]
        const barPadding = 5
        const canvasActualWidth = document.querySelector('svg').clientWidth // 캔버스 전체 사이즈의 clientWith 를 사용한다.
        const numberOfBars = dataSet.length
        const barWidth = (canvasActualWidth / numberOfBars) // 막대의 너비는 데이터 갯수에 따라 달라진다.

        svg.selectAll('rect')
            .data(dataSet)
            .enter()
            .append('rect')
            .attr('y', d => height - d)
            .attr('height', d => d)
            .attr('width', barWidth - barPadding)
            .attr('transform', (d, i) => {
                const xCoordinate = barWidth * i

                return `translate(${xCoordinate})`
            })

        /**
         * draw canvas chart
         * 캔버스로 차트생성
         */
        const myCanvas = document.getElementById('myCanvas')
        myCanvas.width = 800
        myCanvas.height = 500

        const myVinyls = {
            Critical: [10, 20, 30],
            Warning: [20, 11, 9],
            Normal: [12, 25, 35]
        }

        const myBarChart = new CanvasBarChart({
            canvas: myCanvas,
            padding: 10,
            gridScale: 5,
            gridColor: '#eeeeee',
            data: myVinyls,
            colors: ['#a55ca5', '#67b6c7', '#bccd7a', '#eb9743'],
            seriesName: 'My Canvas Chart'
        })

        myBarChart.draw()
    },
    methods: {

    }

}
</script>

<style>
    .bar-chart {
        border: 1px solid #cccccc;
    }
    .canvas-chart {
        display: flex;
    }
</style>
