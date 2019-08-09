<template>
    <div>
        <router-link to="/">Back</router-link>
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

<script>
    import FreeTransform from "./FreeTransform"

    export default {
        name: "Sample",
        components: {
            FreeTransform,
        },
        data() {
          return {
              offsetX: 0,
              offsetY: 0,
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
        background: #ccc;
    }
</style>