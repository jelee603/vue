<template>
  <div>
    <div class="bar-chart" id="myD3"></div>
    <div class="canvas-chart">
      <legend
        for="myCanvas"
      ></legend>
      <canvas
        id="myCanvas"
      ></canvas>
    </div>
  </div>
</template>

<script>
import SvgBarChart from '../plugins/SvgBarChart'
import CanvasBarChart from '../plugins/CanvasBarChart'

export default {
    mounted () {
        /**
         * draw svg chart
         * d3를 사용한 차트생성
         */
        const svgChart = new SvgBarChart('myD3')
        svgChart.draw()

        /**
         * draw canvas chart
         * 캔버스로 차트생성
         */
        // const myCanvas = document.getElementById('myCanvas')
        // myCanvas.width = 800
        // myCanvas.height = 500
        //
        // const myVinyls = {
        //     purple: [10, 20, 30, 40, 50, 60, 70, 80],
        //     cyan: [20, 11, 9, 12, 33, 34, 22, 12],
        //     green: [12, 25, 35, 22, 10, 12, 45, 60]
        // }
        //
        // const myBarChart = new CanvasBarChart({
        //     canvas: myCanvas,
        //     padding: 10,
        //     gridScale: 6,
        //     gridColor: '#eeeeee',
        //     data: myVinyls,
        //     colors: ['#a55ca5', '#67b6c7', '#bccd7a', '#eb9743'],
        //     seriesName: 'My Canvas Chart'
        // })

        // myBarChart.draw()
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
    /*.hover-line {*/
    /*    stroke: #6F257F;*/
    /*    stroke-width: 5px;*/
    /*    stroke-dasharray: 3, 3;*/
    /*}*/
    .tooltip {
        position: absolute;
        text-align: left;
        padding-left: 10px;
        width: 80px;
        background: #000000;
        color: #ffffff;
    }
</style>
