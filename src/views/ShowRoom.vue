<template>
  <nav-bar></nav-bar>
  <div>
    <div class="flex justify-end pr-10">
      <button @click="showDialog = true" type="button"
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
        Add room
      </button>
    </div>

    <AddRoom :show="showDialog" :cancel="cancel" :confirm="confirm"  />

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
import AddRoom from '../components/AddRoom';

export default {
  name: "showRoom",
  components: {
    RoomCard,
    AddRoom
  },
  data() {
    return {
      showDialog: false,
    }
  },
  methods: {

    cancel() {
      console.log('cancel');
      this.showDialog = false;
    },

    confirm() {
      console.log('confirm');
      this.showDialog = false;
    },

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
