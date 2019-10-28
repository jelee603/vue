<template>
  <div class="about">
    <h1>This is test page</h1>
    <div class="about-header">
      <button
        class="btn"
        @click="startWorker"
      >
        워커 시작
      </button>
      <button
        class="btn"
        @click="stopWorker"
      >
        워커 중지
      </button>
    </div>
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
      class="dashboard-layout"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        class="item-layout"
        @resized="resizedEvent"
      >
        <component
          :is="item.c"
          v-if="item.isComponent"
          :id="item.i"
          ref="test"
          :x="item.x"
          :y="item.y"
          :width="item.i === id ? newWPx : null"
          :height="item.i === id ? newHPx : null"
          :background="item.background"
        >
          <div slot="headers">
            <b>{{ item.i }}</b>
          </div>
        </component>
        <div
          v-else
          :v-html="item.c"
        />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import Widget from './widget'
import myWorker from '../service/WebWorker.js'

const testLayout = [
    { x: 0, y: 0, w: 2, h: 2, i: '0', c: 'Widget', isComponent: true },
    { x: 2, y: 0, w: 2, h: 4, i: '1', c: '<h1>Hello World</h1>', isComponent: false },
    { x: 4, y: 0, w: 2, h: 5, i: '2' },
    { x: 6, y: 0, w: 2, h: 3, i: '3' },
    { x: 8, y: 0, w: 2, h: 3, i: '4' },
    { x: 10, y: 0, w: 2, h: 3, i: '5' },
    { x: 0, y: 5, w: 2, h: 5, i: '6' },
    { x: 2, y: 5, w: 2, h: 5, i: '7', c: 'Widget', isComponent: true, background: '#fba95c' },
    { x: 4, y: 5, w: 2, h: 5, i: '8' },
    { x: 6, y: 3, w: 2, h: 4, i: '9' },
    { x: 8, y: 4, w: 2, h: 4, i: '10' },
    { x: 10, y: 4, w: 2, h: 4, i: '11', c: 'Widget', isComponent: true, background: '#e98eca' },
    { x: 0, y: 10, w: 2, h: 5, i: '12' },
    { x: 2, y: 10, w: 2, h: 5, i: '13' },
    { x: 4, y: 8, w: 2, h: 4, i: '14' },
    { x: 6, y: 8, w: 2, h: 4, i: '15' },
    { x: 8, y: 10, w: 2, h: 5, i: '16' },
    { x: 10, y: 4, w: 2, h: 2, i: '17' },
    { x: 0, y: 9, w: 2, h: 3, i: '18' },
    { x: 2, y: 6, w: 2, h: 2, i: '19' }
]

export default {
    name: 'Test',
    components: {
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem,
        Widget
    },
    data () {
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
            list: [{ name: 'option A', value: 3 }, { name: 'option B', value: 6 }],
            layout: testLayout,
            selectedElement: null,
            newHPx: 0,
            newWPx: 0,
            id: null
        }
    },
    created () {
        // this.$refs.test.resizedEvent = resizedEvent()
    },
    mounted () {
    },
    methods: {
        resizedEvent: function (i, newH, newW, newHPx, newWPx) {
            // console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
            this.newHPx = newHPx
            this.newWPx = newWPx
            this.id = i
        },
        startWorker () {
            // 브라우저 지원 유무 확인
            let worker = this.worker
            if (window.Worker !== undefined) {
                // 실행하고 있는 워커 있으면 중지한다.
                if (worker !== undefined) {
                    this.stopWorker()
                }

                worker = new myWorker()
                // 워커에 메시지를 보낸다.
                worker.postMessage('워커 실행')

                // 워커로 부터 메시지를 수신한다.
                worker.onmessage = function () {
                    // console.log('호출 페이지 - ', e.data);
                }
            }
            this.worker = worker
        },
        stopWorker () {
            let worker = this.worker

            if (worker) {
                worker.terminate()
                worker = null
            }
            this.worker = worker
        }
    }
}
</script>

<style>
    .item-layout {
        background: #343434 !important;
        border: 1px solid #ccc !important;
    }

    .dashboard-layout {
        background: #222222;
    }

    .about-header {
        text-align: left;
    }

</style>
