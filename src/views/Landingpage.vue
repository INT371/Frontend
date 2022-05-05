<template>
  <div>
    <nav-bar></nav-bar>
    <div class="flex items-center">
      <div class=" w-full h-96 bg-no-repeat bg-center bg-cover bg-local p-24  grid justify-center justify-items-center"
        style="background-image : url('https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')">
        <p class=" text-white text-6xl font-bold">HOTEL NAME</p>
        <p class=" text-white text-3xl font-bold mt-5">slogan </p>
        <button class="mt-24 w-44 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          RESERVATION >
        </button>
      </div>
    </div>
    <!-- detail -->
    <!--TODO Multiple Slide show 3 rooms-->
    <div class="flex">
    <div v-for="room in rooms" :key="room.name">
    <div class="container px-5 py-11">
       <RoomCard :name="room.name" :detail="room.detail" :price="room.price" :image="room.image" />
    </div>
       </div>
      </div>
 
    <div class="flex justify-between">
      <div class="container"> <Map class="py-10 pl-28"/></div>
      <div class="py-16 pr-32">
        <p class="font-sans text-center text-2xl font-bold">Ban Araya</p>
       <p class="font-sans ">Tha Talat Subdistrict, Sampran District, Nakhon Pathom 73110</p>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '../components/Map';
import RoomCard from '../components/RoomCard';

export default {
  name: 'Landingpage',
  components: {
    Map,RoomCard
  },
  data(){
    return {
      rooms : [
    {
        "name": "Room number 1 ",
        "detail": "Deluxe luxury Rooms offering King size bed, specifically designed to make your stay more comfortable.",
        "price": "2500",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmkzbeukkiR1K1ObKhaC-wsraiWKx7HHmK5ezZZQLFcg&s"
    },
    {
        "name": "Room number 2 ",
        "detail": "Deluxe luxury Rooms offering King size bed, specifically designed to make your stay more comfortable.",
        "price": "2500",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmkzbeukkiR1K1ObKhaC-wsraiWKx7HHmK5ezZZQLFcg&s"
    },
    {
        "name": "Room number 3 ",
        "detail": "Deluxe luxury Rooms offering King size bed, specifically designed to make your stay more comfortable.",
        "price": "2500",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmkzbeukkiR1K1ObKhaC-wsraiWKx7HHmK5ezZZQLFcg&s"
    },
    {
        "name": "Room number 4 ",
        "detail": "Deluxe luxury Rooms offering King size bed, specifically designed to make your stay more comfortable.",
        "price": "2500",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmkzbeukkiR1K1ObKhaC-wsraiWKx7HHmK5ezZZQLFcg&s"
    },
    {
        "name": "Room number 5 ",
        "detail": "Deluxe luxury Rooms offering King size bed, specifically designed to make your stay more comfortable.",
        "price": "2500",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmkzbeukkiR1K1ObKhaC-wsraiWKx7HHmK5ezZZQLFcg&s"
    }
]
    }
  }
}
</script>
<style>
.background {
  height: 500px;
}
</style>

