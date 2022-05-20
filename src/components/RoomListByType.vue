<template>
<div>
        <ul class="flex flex-col p-4">
            <div v-for="room in rooms" :key="room.roomId" >
            <div v-if="room.room_type.type_name == type ">
            <li class="border-gray-400 pb-5 ">
                <div class="flex flex-1 items-center transition duration-500 ease-in-out transform hover:-translate-y rounded-2xl border-2 p-6 hover:shadow-2xl border-gray-400">
                    <div class="pl-1 mr-32">
                        <div class="font-medium">
                           Room ID: {{room.roomId}}
                        </div>
                         <div>
                           Room Name: {{room.room_name}}
                        </div>
                      
                    </div>
                    <button
                        class="w-1/4 text-wrap text-center flex text-white text-bold flex-col rounded-md bg-blue-700 justify-center items-center mr-10 p-2">
                        Edit Room
                    </button>
                </div>
            </li>
            </div>
            </div>
        </ul>
</div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'


export default {
    name: 'RoomListByType',
    props:{
        type:{
        require: false,
        default: ''
        }
    },
    data() {
        return {
            showDialog: false,
        }
    },
    setup() {
        const store = useStore();
        store.dispatch('fetchAllRoom')
        
        return {
            rooms: computed(() => store.state.rooms),
        }
    }

}

</script>