<template>
  <div class="main">
    <div class="child"></div>
    <div class="child2"></div>
  </div>
</template>
<style>
  .main{
    display: flex;
    background: #42b983;
    height: 100%;
  }

  .child {
    background: #0074D9;
    flex: auto;
    height: 100%;
  }
  .child2 {
    background: purple;
    flex-basis: 150px;
    flex-shrink: 0;
    height: 100%;
  }
</style>
