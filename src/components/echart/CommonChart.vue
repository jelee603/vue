<template>
    <div ref="myChart" style="width:100%; height:100%;"></div>
</template>
<script>
import * as echarts from 'echarts'
export default {
    name: 'commonChart',
    props: {
        chartType: {
            type: String,
            default: 'line'
        },
        chartColor: {
            type: String,
            default: '#ef843c'
        }
    },
    data () {
        return {
            myChart: null,
            option: {
                title: {
                    text: 'ECharts entry example',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 12
                    },
                    x: 'center'
                },
                tooltip: {},
                legend: {
                    data: ['Sales'],
                    textStyle: {
                        color: '#919193'
                    },
                    bottom: 0
                },
                xAxis: {
                    data: ['shirt', 'cardign', 'chiffon shirt', 'pants', 'heels', 'socks'],
                    axisLabel: {
                        color: '#919193'
                    }
                },
                yAxis: {
                    axisLabel: {
                        color: '#919193'
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#919193'
                        }
                    }
                },
                series: [{
                    name: 'Sales',
                    type: this.chartType,
                    data: [5, 20, 36, 10, 10, 20],
                    itemStyle: {
                        color: this.chartColor
                    }
                }]
            }
        }
    },
    created () {
        window.addEventListener('resize', this.handleResize)
    },
    mounted () {
        this.myChart = echarts.init(this.$refs.myChart)
        this.myChart.setOption(this.option)
    },
    updated () {

    },
    methods: {
        handleResize: function () {
            this.myChart.resize()
        }
    }
}
</script>
