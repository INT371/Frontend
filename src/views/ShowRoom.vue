<template>
  <nav-bar></nav-bar>
  <div>
    <!-- display room list -->
    <div v-for="room in rooms" :key="room.roomId">
      <div class="container px-5 py-2">
        <RoomCard :roomId="room.roomId" :name="room.room_name" :detail="room.room_type.description"
          :price="room.room_type.price" :policy="room.room_type.policy" :type_name="room.room_type.type_name"
          :image="room.image" />
      </div>
    </div>
  </div>

</template>
<script>

import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

import RoomCard from '../components/RoomCard';

export default {
  name: "showRoom",
  components: {
    RoomCard
  },
  setup() {
    const store = useStore();
    store.dispatch('fetchAllRoom')

    return {
      rooms: computed(() => store.state.rooms)
    }
  }
}
</script>
