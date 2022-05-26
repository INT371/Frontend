<template>
  <div>
    <nav-bar></nav-bar>
     <room-filter ref="roomFilter"/>
    <div class="flex items-center">
      <div class=" w-full h-96 bg-no-repeat bg-center bg-cover bg-local p-24  grid justify-center justify-items-center"
        style="background-image : url('https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')">
        <p class=" text-white text-6xl font-bold">HOTEL NAME</p>
        <p class=" text-white text-xl font-bold mt-5">ENCHANTED WITH ELEGANCE</p>
        <button @click="openRoomFilterModal" class="focus:outline-none  mt-24 w-44 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Get Started >
        </button>
       
      </div>
    </div>
    <!-- detail -->
    <!--TODO Multiple Slide show 3 rooms-->
    <div class="flex">

    </div>

    <div class="flex justify-between">
      <div class="container"> <Map class="py-10 pl-28" /></div>
      <div class="py-16 pr-32">
        <p class="font-sans text-center text-2xl font-bold">Ban Araya</p>
        <p class="font-sans ">Tha Talat Subdistrict, Sampran District, Nakhon Pathom 73110</p>
      </div>
    </div>

  </div>
  <foo-ter></foo-ter>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import Map from '../components/Map';
import RoomFilter from '../components/RoomFilter.vue';


export default {
  name: 'Landingpage',
  components: {
    Map,
    RoomFilter
  }, data() {
    return {
    }
  }, 
  methods: {
    openRoomFilterModal() {
      if (this.filter)  {
        this.$router.push('Showroom')
        return
      }
      this.$refs.roomFilter.openModal()
    },
  },
  setup() {
        const store = useStore();

        return {
            filter: computed(() => store.state.filter )
        }
  }
}
</script>
<style>
.background {
  height: 500px;
}
</style>

