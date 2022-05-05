<template>
  <div >
    <nav-bar></nav-bar>
    <div class="flex items-center">
    <div
    class=" w-full h-96 bg-no-repeat bg-center bg-cover bg-local p-24  grid justify-center justify-items-center"
    style="background-image : url('https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')">
          <p class=" text-white text-6xl font-bold">HOTEL NAME</p>
          <p class=" text-white text-3xl font-bold mt-5">slogan </p>
          <button class="mt-24 w-44 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
 RESERVATION >
</button>
        </div>  
    </div>
    <!-- detail -->
    <div>
        <Map/>
    </div>
  </div>
</template>

<script>
import Map from '../components/Map';
export default {
  name: 'Landingpage',
  components:{
    Map
  }
}
</script>
<style>
    .background {
        height: 500px;
    }
</style>

