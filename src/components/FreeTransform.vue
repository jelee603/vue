<template>
  <div
    :class="{[`${classPrefix}-transform`]: true, [`${classPrefix}-transform--active`]:selected}"
    :style="styles"
    @click="click"
    @dblclick="dblClick"
    @mousedown="mousedown"
  >
    <div
      :class="`${classPrefix}-transform__content`"
      :style="computedStyles.element"
    >
      <slot />
    </div>
    <div
      v-if="selected"
      :class="`${classPrefix}-transform__controls`"
      :style="computedStyles.controls"
    >
      <div class="header">
        <button @click="onMinimum">
          최소화
        </button>
        <button @click="onMaximum">
          최대화
        </button>
      </div>
      <div
        :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--tl`]"
        @mousedown="handleScale('tl',$event)"
      />
      <div
        :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--tr`]"
        @mousedown="handleScale('tr',$event)"
      />
      <div
        :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--bl`]"
        @mousedown="handleScale('bl',$event)"
      />
      <div
        :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--br`]"
        @mousedown="handleScale('br',$event)"
      />
    </div>
  </div>
</template>

<script>
import { styler, scale, translate } from 'free-transform'

export default {
    name: 'Transform',
    props: {
        classPrefix: {
            type: String,
            default: 'tr'
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        x: {
            type: Number,
            required: true
        },
        y: {
            type: Number,
            required: true
        },
        scaleX: {
            type: Number,
            required: true
        },
        scaleY: {
            type: Number,
            required: true
        },
        scaleLimit: {
            type: Number,
            default: 0.1
        },
        angle: {
            type: Number,
            required: true
        },
        disableScale: {
            type: Boolean,
            default: false
        },
        offsetX: {
            type: Number,
            required: true
        },
        offsetY: {
            type: Number,
            required: true
        },
        selected: {
            type: Boolean,
            default: true
        },
        styles: {
            type: Object,
            default: () => ({})
        },
        selectOn: {
            validator: function (value) {
                return ['dblclick', 'mousedown', 'click'].indexOf(value) !== -1
            },
            default: 'mousedown'
        },
        aspectRatio: {
            type: Boolean,
            default: true
        },
        scaleFromCenter: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        computedStyles () {
            const { element, controls } = styler({
                x: this.x,
                y: this.y,
                scaleX: this.scaleX,
                scaleY: this.scaleY,
                width: this.width,
                height: this.height,
                angle: this.angle,
                disableScale: this.disableScale
            })

            return {
                element: {
                    ...element,
                    width: element.width ? `${element.width}px` : null,
                    height: element.height ? `${element.height}px` : null
                },
                controls: {
                    ...controls,
                    width: `${controls.width}px`,
                    height: `${controls.height}px`
                }
            }
        }
    },
    methods: {
        handleScale (scaleType, event) {
            event.stopPropagation()
            event.preventDefault()

            // console.log('scaleType', scaleType)
            const drag = scale(scaleType, {
                startX: event.pageX,
                startY: event.pageY,
                x: this.x,
                y: this.y,
                scaleX: this.scaleX,
                scaleY: this.scaleY,
                width: this.width,
                height: this.height,
                angle: this.angle,
                scaleLimit: this.scaleLimit,
                scaleFromCenter: this.scaleFromCenter && event.altKey,
                enableScaleFromCenter: this.scaleFromCenter,
                aspectRatio: this.aspectRatio && event.shiftKey,
                enableAspectRatio: this.aspectRatio
            }, (payload) => {
                this.$emit('update', payload)
            })
            this.onDrag(drag)
        },
        handleTranslation (event) {
            event.stopPropagation()
            const drag = translate({
                x: this.x,
                y: this.y,
                startX: event.pageX,
                startY: event.pageY
            }, (payload) => {
                this.$emit('update', payload)
            })

            this.onDrag(drag)
        },
        onDrag (drag) {
            // console.log("test")
            const up = () => {
                document.removeEventListener('mousemove', drag)
                document.removeEventListener('mouseup', up)
            }

            document.addEventListener('mousemove', drag)
            document.addEventListener('mouseup', up)
        },

        mousedown (event) {
            this.$emit('mousedown', event)
            if (this.selectOn === 'mousedown' || this.selected === true) {
                this.$emit('onSelect')
                this.handleTranslation(event)
            }
        },

        click (event) {
            this.$emit('click', event)
            if (this.selectOn === 'click') {
                this.$emit('onSelect')
            }
        },

        dblClick (event) {
            // console.log('dbclick')
            this.$emit('dblclick', event)
            if (this.selectOn === 'dblclick') {
                this.$emit('onSelect')
            }
        },

        onMinimum (event) {
            event.stopPropagation()
            this.$emit('update', {
                x: 94,
                y: -122,
                scaleX: 0.97,
                scaleY: 0.14
            })
        },

        onMaximum (event) {
            event.stopPropagation()
            this.$emit('update', {
                x: 100,
                y: 50,
                scaleX: 1,
                scaleY: 1,
                width: 200,
                height: 200,
                angle: 0
            })
        }

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
