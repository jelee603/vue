<template>
    <div>
        <div :style="computedStyles.element">
            <div class="header">
                <button @click="onMinimum">최소화</button>
                <button @click="onMaximum">최대화</button>
            </div>
            <div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
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
                default: 0
            },
            height: {
                type: Number,
                default: 0
            },
            initW: {
                type: Number,
                required: true
            },
            initH: {
                type: Number,
                required: true
            },
            background: {
                type: String,
                default: '#63b87c'
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
                let pos = this.calcPosition(this.x, this.y, this.width, this.height);

                return {
                    element: {
                        x: pos.top,
                        y: pos.left,
                        width: `${pos.width + 60}px`,
                        height: `${pos.height + 5}px`,
                        background: this.background
                    }
                }
            }
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
            calcColWidth() {
                const colWidth = (this.containerWidth - (this.margin[0] * (this.cols + 1))) / this.cols;
                // console.log("### COLS=" + this.cols + " COL WIDTH=" + colWidth + " MARGIN " + this.margin[0]);
                return colWidth;
            },
            calcPosition: function (x, y, w, h) {
                const colWidth = this.calcColWidth();
                // add rtl support
                let out;
                if (this.renderRtl) {
                    out = {
                        right: Math.round(colWidth * x + (x + 1) * this.margin[0]),
                        top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1]),
                        // 0 * Infinity === NaN, which causes problems with resize constriants;
                        // Fix this if it occurs.
                        // Note we do it here rather than later because Math.round(Infinity) causes deopt
                        width: w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * this.margin[0]),
                        height: h === Infinity ? h : Math.round(this.rowHeight * h + Math.max(0, h - 1) * this.margin[1])
                    };
                } else {
                    out = {
                        left: Math.round(colWidth * x + (x + 1) * this.margin[0]),
                        top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1]),
                        // 0 * Infinity === NaN, which causes problems with resize constriants;
                        // Fix this if it occurs.
                        // Note we do it here rather than later because Math.round(Infinity) causes deopt
                        width: w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * this.margin[0]),
                        height: h === Infinity ? h : Math.round(this.rowHeight * h + Math.max(0, h - 1) * this.margin[1])
                    };
                }


                return out;
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