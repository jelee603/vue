<template>
    <div class="about">
        <h1>This is test page</h1>
        <grid-layout
                :layout.sync="layout"
                :col-num="12"
                :row-height="30"
                :is-draggable="true"
                :is-resizable="true"
                :is-mirrored="false"
                :vertical-compact="true"
                :margin="[10, 10]"
                :use-css-transforms="true"
                class="wrap">
            <grid-item v-for="item in layout"
                       :key="item.i"
                       :x="item.x"
                       :y="item.y"
                       :w="item.w"
                       :h="item.h"
                       :i="item.i"
                       @resized="resizedEvent"
                       class="item-layout">
                <component v-if="item.isComponent"
                           :is="item.c"
                           :x="item.x"
                           :y="item.y"
                           :id="item.i"
                           :width="item.i === id ? newWPx : null"
                           :height="item.i === id ? newHPx : null"
                           :background="item.background"
                           ref="test">
                    <div slot="headers"><b>{{item.i}}</b></div>
                </component>
                <div v-else v-html="item.c"></div>
            </grid-item>
        </grid-layout>
        <div class="wrapper">
            <div class="workspace" ref="workspace">
                <FreeTransform
                        v-for="element in elements"
                        :key="element.id"
                        :x="element.x"
                        :y="element.y"
                        :scale-x="element.scaleX"
                        :scale-y="element.scaleY"
                        :width="element.width"
                        :height="element.height"
                        :angle="element.angle"
                        :offset-x="offsetX"
                        :offset-y="offsetY"
                        :disable-scale="element.disableScale === true"
                        @update="update(element.id, $event);">
                    <div class="element" :style="getElementStyles(element)">
                        {{ element.text }}
                    </div>
                </FreeTransform>
            </div>
        </div>
    </div>
</template>
<script scoped>
    import VueGridLayout from 'vue-grid-layout'
    import FreeTransform from "./freeTransform"
    import Widget from "./widget"

    const testLayout = [
        {"x": 0,"y": 0,"w": 2,"h": 2,"i": "0", "c": 'Widget', isComponent: true},
        {"x": 2,"y": 0,"w": 2,"h": 4,"i": "1", "c": `<h1>Hello World</h1>`, isComponent: false},
        {"x": 4,"y": 0,"w": 2,"h": 5,"i": "2"},
        {"x": 6,"y": 0,"w": 2,"h": 3,"i": "3"},
        {"x": 8,"y": 0,"w": 2,"h": 3,"i": "4"},
        {"x": 10,"y": 0,"w": 2,"h": 3,"i": "5"},
        {"x": 0,"y": 5,"w": 2,"h": 5,"i": "6"},
        {"x": 2,"y": 5,"w": 2,"h": 5,"i": "7", "c": 'Widget', isComponent: true, "background": "#fba95c"},
        {"x": 4,"y": 5,"w": 2,"h": 5,"i": "8"},
        {"x": 6,"y": 3,"w": 2,"h": 4,"i": "9"},
        {"x": 8,"y": 4,"w": 2,"h": 4,"i": "10"},
        {"x": 10,"y": 4,"w": 2,"h": 4,"i": "11", "c": 'Widget', isComponent: true, "background": "#e98eca"},
        {"x": 0,"y": 10,"w": 2,"h": 5,"i": "12"},
        {"x": 2,"y": 10,"w": 2,"h": 5,"i": "13"},
        {"x": 4,"y": 8,"w": 2,"h": 4,"i": "14"},
        {"x": 6,"y": 8,"w": 2,"h": 4,"i": "15"},
        {"x": 8,"y": 10,"w": 2,"h": 5,"i": "16"},
        {"x": 10,"y": 4,"w": 2,"h": 2,"i": "17"},
        {"x": 0,"y": 9, "w": 2,"h": 3,"i": "18"},
        {"x": 2,"y": 6,"w": 2,"h": 2,"i": "19"}
    ];

    export default {
        name: "Test",
        components: {
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
            FreeTransform,
            Widget,
        },
        data() {
            return {
                numberValidateForm: {
                    age: ''
                },
                options: [{
                    value: 'Option1',
                    label: 'Option1'
                }, {
                    value: 'Option2',
                    label: 'Option2'
                }, {
                    value: 'Option3',
                    label: 'Option3'
                }, {
                    value: 'Option4',
                    label: 'Option4'
                }, {
                    value: 'Option5',
                    label: 'Option5'
                }],
                value: '',
                radio: 'option A',
                list: [{name:'option A', value: 3}, {name:'option B', value: 6}],
                layout: testLayout,
                elements: [
                    {
                        id: "el-1",
                        x: 100,
                        y: 50,
                        scaleX: 1,
                        scaleY: 1,
                        width: 200,
                        height: 200,
                        angle: 0,
                        classPrefix: "tr",
                        styles: {
                            background: "linear-gradient(135deg, #0FF0B3 0%,#036ED9 100%)"
                        }
                    },
                ],
                offsetX: 0,
                offsetY: 0,
                selectedElement: null,
                newHPx: 0,
                newWPx: 0,
                id: null,
            }
        },
        created() {
            // this.$refs.test.resizedEvent = resizedEvent()
        },
        mounted() {
            this.offsetX = this.$refs.workspace.offsetLeft;
            this.offsetY = this.$refs.workspace.offsetTop;
        },
        methods: {
            update(id, payload) {
                // console.log('payload >>', payload)
                this.elements = this.elements.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            ...payload
                        };
                    }
                    return item;
                });
            },
            getElementStyles(element) {
                const styles = element.styles ? element.styles : {};
                return {
                    width: `${element.width}px`,
                    height: `${element.height}px`,
                    ...styles
                };
            },
            resizedEvent: function(i, newH, newW, newHPx, newWPx){
                // console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
                this.newHPx = newHPx;
                this.newWPx = newWPx;
                this.id = i;

            },
        }
    }
</script>
<style>
    .wrapper {
        flex: 1;
    }

    .workspace {
        width: 800px;
        height: 800px;
        margin: 25px auto;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.1);
        background: #ccc;
    }

    .item-layout {
        background: #343434 !important;
        border: 1px solid #ccc !important;
    }

</style>
