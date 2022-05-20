<template>

    <AddRoom :show="showDialog" :cancel="cancel" :confirm="confirm" />

    <div class="flex justify-around pr-5 pt-4">
        <div >
            <ul class=" list-reset flex justify-center items-center space-x-4 ">
                <div v-for="item in types" :key="item.type_id" >
                <li class="mr-1 ">
                    <button @click="this.type = item.type_name"
                        class="inline-block py-2 px-4 text-blue rounded-xl  font-semibold border hover:shadow-inner"
                        :class="{ 'bg-gray-600': this.type == item.type_name , 'bg-white': this.type != item.type_name }">{{item.type_name}}</button>
                </li>
                </div>
            </ul>
        </div>
        <div >
        <button @click="showDialog = true" type="button"
            class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add room
        </button>
        </div>
    </div>

    <div class="container mb-2 flex mx-auto w-full items-center justify-center">

         <RoomListByType  :type="this.type"></RoomListByType>

    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

import AddRoom from '../components/AddRoom'
import RoomListByType from '../components/RoomListByType'

export default {
    name: 'RoomList',
    components: {
        AddRoom,
        RoomListByType
    },
    data() {
        return {
            showDialog: false,
            type:''
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
        store.dispatch('fetchTypeRoom')


        return {
            rooms: computed(() => store.state.rooms),
            types: computed(() => store.state.types)
        }
    }

}

</script>