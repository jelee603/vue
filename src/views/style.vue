<template>
  <div class="main">
    <div class="main-top">
      <div class="main-top-first">
        main first
      </div>
      <div class="main-top-second">
        main second
      </div>
    </div>
    <div class="main-center">
      main-center
    </div>
    <div class="main-bottom">
      <div class="main-bottom-left">
        bottom left
      </div>
      <div class="main-bottom-right">
        bottom right
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Style'
}
</script>
<style>
    .main {
        width: 100%;
        height: inherit;
        display: grid;
        grid-template-rows: repeat(40, 1fr);
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 5px;
        background: #ccccee;
        padding: 10px;
    }

    .main-top {
        grid-row: 1/10;
        background: beige;
        display: grid;
        grid-template-rows: repeat(10, 1fr);
        grid-gap: 5px;
    }

    .main-top-first {
        grid-row: 1/5;
        background: darkseagreen;
    }

    .main-top-second {
        grid-row: 5/11;
        background: darkseagreen;
    }

    .main-center {
        grid-row: 10/25;
        background: skyblue;
    }

    .main-bottom {
        grid-row: 25/41;
        display: grid;
        grid-template-rows: repeat(10, 1fr);
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 5px;
    }

    .main-bottom-left {
        grid-row: 1/11;
        grid-column: 1/1;
        background: lightpink;
    }

    .main-bottom-right {
        grid-row: 1/11;
        grid-column: 2/2;
        background: lightpink;
    }
</style>
