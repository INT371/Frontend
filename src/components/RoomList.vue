<template> 

    <div class="flex justify-end pr-5">
      <button @click="showDialog = true" type="button"
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
        Add room
      </button>
    </div>

    <div class="container mb-2 flex mx-auto w-full items-center justify-center">

    <AddRoom :show="showDialog" :cancel="cancel" :confirm="confirm"  />

        <ul class="flex flex-col p-4">
            <div v-for="room in rooms" :key="room.roomId">
            <li class="border-gray-400 pb-5 ">
                <div class="flex flex-1 items-center transition duration-500 ease-in-out transform hover:-translate-y rounded-2xl border-2 p-6 hover:shadow-2xl border-gray-400">
                    <div class="pl-1 mr-32">
                        <div class="font-medium">
                           Room ID: {{room.roomId}}
                        </div>
                         <div>
                           Room Name: {{room.room_name}}
                        </div>
                        <div class="whitespace-nowrap">
                            Room Type: {{room.room_type.type_name}}
                        </div>
                        <div class="whitespace-nowrap">
                            Room Description: {{room.room_type.description}}
                        </div>
                        <div class="whitespace-nowrap">
                            Room price: {{room.room_type.price}}
                        </div>
                        <div class="whitespace-nowrap">
                            Room Policy: {{room.room_type.policy}}
                        </div>
                        <div class="whitespace-nowrap">
                            Room Capacity: {{room.room_type.max_capacity}}
                        </div>
                    </div>
                    <button
                        class="w-1/4 text-wrap text-center flex text-white text-bold flex-col rounded-md bg-blue-700 justify-center items-center mr-10 p-2">
                        Edit Room
                    </button>
                </div>
            </li>
            </div>
        </ul>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

import AddRoom from '../components/AddRoom'

export default {
    name: 'RoomList',
    components: {
        AddRoom
    },
    data(){
        return {
         showDialog: false,
        }
    },
    methods :{
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