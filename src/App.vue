<template>
  <div>
      <div class="md-layout">
          <div class="md-layout-item md-size-15">
              <div class="viewport">
                  <md-toolbar :md-elevation="1">
                      <span class="md-title">Menu</span>
                  </md-toolbar>
                  <md-list>
                      <md-list-item>
                          <md-icon>bar_chart</md-icon>
                          <span class="md-list-item-text"><router-link to="/">Dashboard</router-link></span>
                      </md-list-item>
                      <md-list-item>
                        <md-icon>menu</md-icon>
                        <span class="md-list-item-text"><router-link to="/sample">Sample</router-link></span>
                      </md-list-item>
                      <md-list-item>
                          <md-icon>menu</md-icon>
                          <span class="md-list-item-text"><router-link to="/three">Three</router-link></span>
                      </md-list-item>
                      <md-list-item>
                          <md-icon>menu</md-icon>
                          <span class="md-list-item-text"><router-link to="/style">Style</router-link></span>
                      </md-list-item>
                      <md-list-item>
                          <md-icon>menu</md-icon>
                          <span class="md-list-item-text"><router-link to="/topology">Topology</router-link></span>
                      </md-list-item>
                      <md-list-item>
                          <md-icon>bar_chart</md-icon>
                          <span class="md-list-item-text"><router-link to="/chart">Chart</router-link></span>
                      </md-list-item>
                  </md-list>
              </div>
          </div>
          <div class="md-layout-item md-size-85"><router-view></router-view></div>
      </div>

  </div>
</template>

<script>
export default {
    name: 'App',
    components: {

    },
    created() {
        window.addEventListener("keyup", this.handleKeyEvent)
    },
    methods: {
        handleKeyEvent(e) {
            // console.log(e)
        }
    }
}
</script>

<style scoped>
    .viewport {
        max-width: 400px;
        overflow: auto;
    }

    .md-layout {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .md-layout-item {
        height: inherit;
    }
</style>
