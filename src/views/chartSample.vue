<template>
  <div>
    <div
      id="myD3"
      class="bar-chart"
    />
    <!-- <div class="canvas-chart">
      <legend
        for="myCanvas"
      ></legend>
      <canvas
        id="myCanvas"
      ></canvas>
    </div> -->
  </div>
</template>

<script>
import SvgBarChart from '../components/d3/SvgBarChart'
// import CanvasBarChart from '../components/CanvasBarChart'

const mockData = [
  [190, 10, 16, 20, 60, 30, 40, 20, 60, 15, 50, 22, 8, 10, 10, 20, 30, 22, 10, 30, 50],
  [29, 20, 26, 10, 10, 3, 4, 12, 16, 15, 20, 12, 8, 10, 10, 20, 10, 10, 20, 30, 30],
  [19, 10, 16, 30, 30, 30, 40, 32, 36, 25, 23, 22, 28, 20, 15, 18, 11, 12, 22, 32, 35]
]
const mockCategory = [
  { index: 1, name: 'Cate1', color: '#25b0ed' },
  { index: 2, name: 'Cate2', color: '#1cb57e' },
  { index: 3, name: 'Cate3', color: '#ffa733' }]

export default {
  mounted () {
    /**
         * draw svg chart
         * d3를 사용한 차트생성
         */
    const svgChart = new SvgBarChart({
      id: 'myD3',
      dataset: mockData,
      category: mockCategory
    })
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
