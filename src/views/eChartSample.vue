<template>
    <div class="box-container">
        <div class="box">
            <common-chart chart-type="line"></common-chart>
        </div>
        <div class="box">
            <common-chart chart-type="bar" chart-color="#1a3963"></common-chart>
        </div>
    </div>
</template>
<script>
import CommonChart from '../components/echart/CommonChart'

export default {
    components: { CommonChart },
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
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20],
                    itemStyle: {
                        color: '#ef843c'
                    }
                }]
            }
        }
    },
    created () {
    },
    mounted () {
    },
    updated () {
    },
    methods: {
    }
}
</script>
<style>
    .box-container {
        background: #161719;
        width: 100%;
        height: 100%;
        display: flex;
        /*flex-wrap: wrap;*/
    }
    .box {
        background: #212124;
        float: left;
        width: 50%;
        height: 50%;
        margin: 10px;
        /*flex: 1 2 0*/
    }
</style>
