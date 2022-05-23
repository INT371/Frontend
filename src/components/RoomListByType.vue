<template>
    <div>
        <ul class="flex flex-col p-4">
            <div v-for="room in rooms" :key="room.roomId">
                <div v-if="room.room_type.description == type">
                    <li class="border-gray-400 pb-5 ">
                        <div
                            class="flex flex-1 items-center transition duration-500 ease-in-out transform hover:-translate-y rounded-2xl border-2 p-6 hover:shadow-2xl border-gray-400">
                            <div class="pl-1 mr-32 whitespace-nowrap">
                                <div class="font-medium ">
                                    Room ID: {{ room.roomId }}
                                </div>
                                <div>
                                    Room Name: {{ room.room_name }}
                                </div>

                            </div>
                            <div v-if="editing != room.roomId" class="flex">
                                <button @click="enableEditing(room)"
                                    class="whitespace-nowrap text-wrap text-center flex text-white text-bold  rounded-md bg-blue-700 justify-center items-center mr-10 p-2">
                                    Edit Room
                                </button>
                                <button @click="deleteRoom(room.roomId)"
                                    class="whitespace-nowrap text-wrap text-center flex text-white text-bold rounded-md bg-red-600 justify-center items-center mr-10 p-2">
                                    Delete Room
                                </button>

                            </div>
                            <div v-if="editing == room.roomId">
                                <input v-model="editName" require type="text"
                                    class="py-1 px-1 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent duration-200" />
                                <p v-if="editDuplicatedName" class="text-red-500 text-sm font-semibold uppercase">—
                                    &nbsp;&nbsp;Duplicate Room Name&nbsp;&nbsp; —</p>
                                <p v-if="invalidRoomName" class="text-red-500 text-sm font-semibold uppercase">—
                                    &nbsp;&nbsp;Enter Room Name&nbsp;&nbsp; —</p>
                                <div class="py-4 px-6 border-b border-grey-light space-x-2 text-white">
                                    <button
                                        class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-500 hover:bg-blue-600 duration-300"
                                        @click="editRoomName">Save</button>
                                    <button href="#"
                                        class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-500 hover:bg-red-600 duration-300"
                                        @click="disableEditing">Cancel</button>
                                </div>
                            </div>

                        </div>
                    </li>
                </div>
            </div>
        </ul>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import axios from 'axios'
import { useStore } from 'vuex'


export default {
    name: 'RoomListByType',
    props: {
        type: {
            require: false,
            default: ''
        }
    },
    data() {
        return {
            edit: false,
            editing: 0,
            editName: '',
            editDuplicatedName: false,
            invalidRoomName: false
        }
    },
    methods: {
      async deleteRoom(rid){
        let check = confirm("Do you want to delete this Room");
        if (!check) { return }
        const res = await axios.delete(`http://localhost:8083/api/v1/room/${rid}`).catch(function (error) {
                if (error) {
                    alert("An Unexpected Error Occured. Response Status: " + error.response.status)
                }
            })
            if (res != undefined && res.status == 200) {
                alert("Successfully Delete color.")
                this.$store.dispatch('fetchAllRoom')
            }
        },
        enableEditing(room) {
            this.editing = room.roomId
            this.type_id = room.room_type.type_id
            this.editName = room.room_name
            console.log(this.type_id);
        },
        async editRoomName() {
            this.invalidRoomName = this.editName == null || this.editName.trim() == '' ? true : false
            if (this.invalidRoomName) {
                return
            }
            let room = { room_name: this.editName, type_id: this.type_id }
            try {
                const res = await axios.patch(`http://localhost:8083/api/v1/room/${this.type_id}`, room)
                if (res.status != 200) {
                    alert("An Unexpected Error Occured. Response Status: " + res.status)
                } else {
                    alert("Successfully Change Room Name.")
                    this.$store.dispatch('fetchAllRoom')
                    this.disableEditing()

                }
            } catch (error) {
                this.editDuplicatedName = true
            }
        },
        disableEditing() {
            this.editName = '',
                this.editing = 0
            this.invalidRoomName = false
            this.editDuplicatedName = false
            console.log(this.editing);
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