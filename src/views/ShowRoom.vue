<template>
   <nav-bar></nav-bar>
    <div >
        <div class="flex justify-end pr-10">
         <button type="button" class="h-14 px-6 py-2 font-semibold rounded-xl bg-blue-600 hover:bg-blue-800 text-white">
          Add room
          </button>
        </div>
  

      <div v-for="room in rooms" :key="room.roomId">
    <div class="container px-5 py-2">
       <RoomCard 
       :roomId="room.roomId"
       :name="room.room_name" 
       :detail="room.room_type.description" 
       :price="room.room_type.price" 
       :policy = "room.room_type.policy"
       :type_name = "room.room_type.type_name"
       :image="room.image" />
    </div>
       </div>
    </div>
    


</template>
<script>


// import axios from 'axios';

import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

import RoomCard from '../components/RoomCard';

export default {
    name : "showRoom",
     components: {
         RoomCard
  },
    data () {
      return {
        dialog: false,
      }
    },

    setup(){
        const store = useStore();
        store.dispatch('fetchAllRoom')

        return {
             rooms : computed(()=> store.state.rooms)
        }
    }   
}
</script>