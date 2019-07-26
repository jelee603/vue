<template>
    <div :style="computedStyles.element">
        <!--<div class="header">-->
            <!--<button @click="onMinimum">최소화</button>-->
            <!--<button @click="onMaximum">최대화</button>-->
        <!--</div>-->
        <slot name="headers"></slot>
        <div :id="generateID"></div>

    </div>
</template>

<script>
    import BarChart from "../plugins/BarChart"
    // import PieChart from "../plugins/PieChart"

    export default {
        name: "Widget",
        props: {
            x: {
                type: Number,
                required: true
            },
            y: {
                type: Number,
                required: true
            },
            width: {
                type: Number,
                default: 50
            },
            height: {
                type: Number,
                default: 100
            },
            background: {
                type: String,
                default: '#63b87c'
            },
            id: {
                type: String,
                default: null,
            }
        },
        data: function() {
            return {
                cols: 1,
                containerWidth: 100,
                rowHeight: 30,
                margin: [10, 10],
            }
        },
        computed: {
            computedStyles() {
                return {
                    element: {
                        // x: pos.top,
                        // y: pos.left,
                        width: `${this.width}px`,
                        height: `${this.height}px`,
                        background: this.background
                    }
                }
            },
            generateID() {
                return `myChart-${this.id}`
            },

        },
        mounted() {
            const id = this.generateID;
            const chart = new BarChart(`${id}`);
            // const chart = new PieChart(`${id}`);

            chart.init();
        },
        methods: {
            onMinimum(event) {
                event.stopPropagation();
                this.$emit("update", {
                    x: 94,
                    y: -122,
                    scaleX: 0.97,
                    scaleY: 0.14,
                })
            },

            onMaximum(event) {
                event.stopPropagation();
                this.$emit("update", {
                    x: 100,
                    y: 50,
                    scaleX: 1,
                    scaleY: 1,
                    width: 200,
                    height: 200,
                    angle: 0,
                })
            },
        }
    }
</script>

<style>
    .header {
        height: 30px;
        background: lightgray;
        text-align: left;
    }
</style>