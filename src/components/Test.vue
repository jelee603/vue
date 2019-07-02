<template>
    <div class="about">
        <h1>This is test page</h1>
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
        <div ref="main"></div>
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
        >
            <grid-item v-for="item in layout"
                       :x="item.x"
                       :y="item.y"
                       :w="item.w"
                       :h="item.h"
                       :i="item.i">
                {{item.i}}
            </grid-item>
        </grid-layout>
    </div>
</template>
<script>
    import VueGridLayout from 'vue-grid-layout'
    import FreeTransform from "./FreeTransform";

    const testLayout = [
        {"x":0,"y":0,"w":2,"h":2,"i":"0"},
        {"x":2,"y":0,"w":2,"h":4,"i":"1"},
        {"x":4,"y":0,"w":2,"h":5,"i":"2"},
        {"x":6,"y":0,"w":2,"h":3,"i":"3"},
        {"x":8,"y":0,"w":2,"h":3,"i":"4"},
        {"x":10,"y":0,"w":2,"h":3,"i":"5"},
        {"x":0,"y":5,"w":2,"h":5,"i":"6"},
        {"x":2,"y":5,"w":2,"h":5,"i":"7"},
        {"x":4,"y":5,"w":2,"h":5,"i":"8"},
        {"x":6,"y":3,"w":2,"h":4,"i":"9"},
        {"x":8,"y":4,"w":2,"h":4,"i":"10"},
        {"x":10,"y":4,"w":2,"h":4,"i":"11"},
        {"x":0,"y":10,"w":2,"h":5,"i":"12"},
        {"x":2,"y":10,"w":2,"h":5,"i":"13"},
        {"x":4,"y":8,"w":2,"h":4,"i":"14"},
        {"x":6,"y":8,"w":2,"h":4,"i":"15"},
        {"x":8,"y":10,"w":2,"h":5,"i":"16"},
        {"x":10,"y":4,"w":2,"h":2,"i":"17"},
        {"x":0,"y":9,"w":2,"h":3,"i":"18"},
        {"x":2,"y":6,"w":2,"h":2,"i":"19"}
    ];

    export default {
        name: "Test",
        components: {
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
            FreeTransform,
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
            }
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
        background: #fff;
    }

    * {
        box-sizing: border-box;
    }

    .tr-transform__content {
        user-select: none;
    }

    .tr-transform__rotator {
        top: -45px;
        left: calc(50% - 7px);
    }

    .tr-transform__rotator,
    .tr-transform__scale-point {
        background: #fff;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        position: absolute;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }

    .tr-transform__rotator:hover,
    .tr-transform__scale-point:hover {
        background: #f1f5f8;
    }

    .tr-transform__rotator:active,
    .tr-transform__scale-point:active {
        background: #dae1e7;
    }

    .tr-transform__scale-point {
    }

    .tr-transform__scale-point--tl {
        top: -7px;
        left: -7px;
    }

    .tr-transform__scale-point--ml {
        top: calc(50% - 7px);
        left: -7px;
    }

    .tr-transform__scale-point--tr {
        left: calc(100% - 7px);
        top: -7px;
    }

    .tr-transform__scale-point--tm {
        left: calc(50% - 7px);
        top: -7px;
    }

    .tr-transform__scale-point--mr {
        left: calc(100% - 7px);
        top: calc(50% - 7px);
    }

    .tr-transform__scale-point--bl {
        left: -7px;
        top: calc(100% - 7px);
    }

    .tr-transform__scale-point--bm {
        left: calc(50% - 7px);
        top: calc(100% - 7px);
    }

    .tr-transform__scale-point--br {
        left: calc(100% - 7px);
        top: calc(100% - 7px);
    }
</style>
