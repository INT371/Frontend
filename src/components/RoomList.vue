<template>
    <div>
        <div class="flex justify-end ">
        <button class="items-center py-2 px-3 mr-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add Room Type
        </button>
        </div>
        <div v-for="item in types" :key="item.type_id">
            <div class="flex m-4 ">
                <div class="container border-2 rounded-lg p-4 mr-2">
                    <div class="flex flex-col">
                        <h1 class="font-bold text-2xl text-blue-900">{{ item.description }}</h1>
                        <h2 class="font-medium text-lg text-blue-900">TYPE :: {{ item.type_name }}</h2>
                        <p class="font-medium text-lg text-blue-900">Price : {{ item.price }}฿</p>
                        <p class="font-medium text-lg text-blue-900">Policy : {{ item.policy }}</p>

                        <div class="flex space-x-2">
                            <div v-for="image in item.images" :key="image.id">
                                <div>
                                    <img :src="image.image" class="w-12 h-12">
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-end ">
                             <button @click="deleteRoomType(item.type_id)" type="button"
                                class="mr-2 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Delete Type
                            </button>
                            <button @click="openDialog(item.type_id)" type="button"
                                class="mr-2 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Add room
                            </button>

                            <router-link :to="{ name: 'editType', params: { type_id: item.type_id } }">
                                <div
                                    class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Edit Type
                                    <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="container border-2 rounded-lg">
                    <div class="overflow-y-auto h-48 m-2 ">
                        <RoomListByType :type="item.description"></RoomListByType>
                    </div>

                </div>

            </div>
        </div>
        <div v-if="type_id !=0">
        <AddRoom :show="showDialog" :cancel="cancel" :tid="type_id" :confirm="confirm" />
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import axios from 'axios'

import AddRoom from '../components/AddRoom'
import RoomListByType from '../components/RoomListByType'


export default {
    name: 'RoomList',
    components: {
        AddRoom,
        RoomListByType,
    },
    data() {
        return {
            showDialog: false,
            type: '',
            type_id:0
        }
    },
    methods: {

    async deleteRoomType(tid){
        let check = confirm("Do you want to delete this Room Type");
        if (!check) { return }
        const res = await axios.delete(`http://localhost:8083/api/v1/type/${tid}`).catch(function (error) {
                if (error) {
                    alert("An Unexpected Error Occured. Response Status: " + error.response.status)
                }
            })
            if (res != undefined && res.status == 200) {
                alert("Successfully Delete Type.")
                this.$store.dispatch('fetchAllRoom')
            }
        },
        openDialog(tid){
            this.showDialog = true
            this.type_id = tid
            console.log(this.type_id);
        },
        cancel() {
            console.log('cancel');
            this.showDialog = false;
            this.type_id = 0;
            this.showEditType = false;
        },

        confirm() {
            console.log('confirm');
            this.showDialog = false;
            this.showEditType = false;
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