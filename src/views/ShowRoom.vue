<template>
  <nav-bar></nav-bar>
  <div>
    <!-- display room list -->
    <div v-for="item in roomTypes" :key="item.type_id">
      <div class="container px-5 py-2">
          {{ item }}
      </div>
    </div>
  </div>

</template>
<script>

import axios from 'axios';

export default {
  name: "showRoom",
  data() {
    return {
      backend_url: process.env.VUE_APP_BACKEND_URL,
      roomTypes: null
    }
  },
  methods: {
    async fetchFilterRoomType() {
      let filter = this.$store.state.filter
      console.log(filter)

      if (filter) {
        const res = await axios.post(`${this.backend_url}/v1/type/filter`, filter).catch(function (error) {
          console.log(error)
        })

        if (res != undefined && res.status == 200) {
          console.log(res)
          this.roomTypes = res.data;
        }
      }
    }
  },
  created() {
    this.fetchFilterRoomType()
  }
}
</script>
