<template>
  <div>
    <div style="position: relative; height:200px;" class="container">
      <ul
        v-infinite-scroll="load"
        class="infinite-list"
        style="position:absolute; height: 100%; width:100%; overflow:auto; margin: 0"
      >
        <li
          v-for="i in count"
          :key="i"
          class="infinite-list-item"
        >
          {{ i }}
        </li>
      </ul>
    </div>
    <div style="position: relative; height:200px;" class="container">
      <el-table
        :data="tableData"
        style="position:absolute; height: 100%; width:100%; overflow:auto"
        v-infinite-scroll="load2"
        class="infinite-list"
      >
        <el-table-column
          prop="date"
          label="Date"
          width="180"
        />
        <el-table-column
          prop="name"
          label="Name"
          width="180"
        />
        <el-table-column
          prop="address"
          label="Address"
        />
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      count: 0,
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }]
    }
  },
  methods: {
    load () {
      this.count += 2
    },
    load2 () {
      this.tableData.push({
        date: '2019-11-12',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      })
    }
  }
}
</script>
<style>
.container {
  margin: 5px;
  border: 1px solid chocolate;
}
</style>
