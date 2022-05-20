<template>
  <nav-bar></nav-bar>
  <div>
    <!-- display room list -->
    <div v-for="item in types" :key="item.type_id">
      <div class="container px-5 py-2">
        <RoomTypeCard :description="item.description"
          :price="item.price" :policy="item.policy" 
          :max_capacity="item.max_capacity"
          :type_name="item.type_name"
          :image="item.image" 
          :type_id="item.type_id"
          />
          
      </div>
    </div>
  </div>

</template>
<script>

import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

import RoomTypeCard from '../components/RoomTypeCard';

export default {
  name: "showRoom",
  components: {
    RoomTypeCard
  },
     setup() {
        const store = useStore();
        
        store.dispatch('fetchTypeRoom')

        return {
            types: computed(() => store.state.types)
        }
  }
}
</script>
