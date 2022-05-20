<template>
    <div v-show="show"
        class=" fixed w-screen h-screen  z-50 top-72 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-75 bg-gray-700 pt-10">
        <div class="flex justify-center items-center ">
            <div class="bg-white  border-t-8 border-blue-600 rounded-lg">
                <div class="flex">
                    <div class="p-4">
                        <p class="font-bold text-2xl text-blue-900">Add Room</p>
                        <!-- form add room -->
                        <div class="flex">
                            <div>
                                <label
                                    class="uppercase md:text-sm text-xs text-black text-light font-semibold pr-4">Room
                                    Name</label>
                                <input
                                    class="py-2 px-3 rounded-lg border-2 border-blue-300 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    v-model="name" require type="text" placeholder="Room Name" />
                                <p v-if="invalidName" class="text-red-500 text-sm font-semibold uppercase">—
                                    &nbsp;&nbsp;Enter Room Name&nbsp;&nbsp; —</p>
                            </div>
                        </div>

                        <div class="flex items-center pt-2">
                            <div>
                                <label
                                    class=" uppercase md:text-sm text-xs text-black text-light font-semibold pr-6">Room
                                    Type</label>
                                <select v-model="type" placeholder="Room Type"
                                    class="py-2 px-3  rounded-lg border-2 border-blue-300 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                                    <option disabled value selected>TYPE</option>
                                    <option v-for="item in types" :key="item.type_id" :value="item">{{ item.type_name }}
                                    </option>
                                </select>
                                <p v-if="invalidType" class="text-red-500 text-sm font-semibold uppercase">—
                                    &nbsp;&nbsp;Select Room Type&nbsp;&nbsp; —</p>
                            </div>
                            <div class="pl-4">
                                <label
                                    class="uppercase md:text-sm text-xs text-black text-light font-semibold pr-4">Room
                                    Description</label>
                                <span class="py-2 px-3 ">{{ type ? type.description : 'Have nothing' }}</span>
                            </div>
                        </div>
                        <div class="flex pt-4">
                            <div>
                                <label
                                    class="uppercase md:text-sm text-xs text-black text-light font-semibold pr-4">Room
                                    Price</label>
                                <span class="py-2 px-3 ">{{ type ? type.price : 0 }}</span>
                            </div>
                            <div class="pl-4">
                                <label
                                    class="uppercase md:text-sm text-xs text-black text-light font-semibold pr-4">Room
                                    Policy</label>
                                <span class="py-2 px-3 ">{{ type ? type.policy : "Have nothing" }}</span>
                            </div>
                            <div class="pl-4 ">
                                <label class="uppercase md:text-sm text-xs text-black text-light font-semibold pr-4">Max
                                    Capacity</label>
                                <span class="py-2 px-3 ">{{ type ? type.max_capacity : 0 }}</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 mt-5 mx-7">
                            <label class="uppercase md:text-sm text-xs text-black text-light font-semibold mb-1">Upload
                                Photo</label>
                            <div v-if="!image" class="flex items-center justify-center w-full">
                                <label
                                    class="flex flex-col border-4 border-dashed w-full h-52 hover:bg-gray-100 hover:border-blue-300 group duration-300">
                                    <div class="flex flex-col items-center justify-center pt-12">
                                        <svg class="w-10 h-10 text-blue-400 group-hover:text-blue-600 duration-300"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p
                                            class="lowercase text-sm text-gray-400 group-hover:text-blue-600 pt-1 tracking-wider duration-300">
                                            Select a photo</p>
                                    </div>
                                    <input type="file" class="hidden" id="upload-file" accept="image/*" name="file"
                                        @change="loadFile" />
                                </label>
                            </div>
                            <div v-else
                                class="grid items-center justify-center border-4 border-dashed hover:border-blue-500 hover:bg-gray-100 duration-500">
                                <img class="rounded h-40 w-40 mx-auto my-8" :src="getImageUrl(image)" />
                                <button @click="removeimg"
                                    class="bg-blue-600 hover:bg-red-500 text-white font-bold py-2 focus:outline-none px-4 rounded-full duration-300 mb-4">Remove
                                    Photo</button>
                            </div>

                        </div>

                    </div>

                </div>
                <div class="p-4 flex space-x-4">
                    <button @click="cancelForm().then(cancel)"
                        class="w-1/2 px-4 py-3 text-center bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm">Cancel</button>
                    <button @click="submitForm().then(success ? confirm : null)"
                        class="w-1/2 px-4 py-3 text-center text-pink-100 bg-pink-600 rounded-lg hover:bg-pink-700 hover:text-white font-bold text-sm">Add
                        Room</button>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import { computed } from '@vue/reactivity'
import axios from 'axios'

import { useStore } from 'vuex'

export default {
    name: 'AddRoom',
    props: ['show', 'cancel', 'confirm'],
    data() {
        return {
            success: false,

            roomId: 0,
            name: "",
            type: null,
            image: null,

            invalidName: false,
            invalidType: false,
            invalidImage: false,

            uploadFile: null

        }
    },
    methods: {
        getImageUrl(filename) {
            if (this.isLocal) {
                return this.image
            }
            return `${this.backend_url}/files/${filename}`
        },
        loadFile(e) {
            this.isLocal = true;
            let file = e.target.files[0];
            let data = new FormData();
            data.append("file", file, file.name);
            this.uploadFile = data.get("file")
            this.image = URL.createObjectURL(this.uploadFile);
        },
        removeimg() {
            this.image = null;
        },
        async submitForm() {
            this.invalidName = this.name === null || this.name.trim() === '' ? true : false;
            this.invalidType = this.type === null ? true : false;
            this.invalidImage = this.image === null ? true : false;

            if ((!this.invalidName && !this.invalidType && this.invalidImage)) {
                this.makeDataForm();
            }
        },
        makeDataForm() {
            let room = {
                room_name: this.name,
                type_id: this.type.type_id
            }
            this.saveDataRoom(room)
            this.success = true
        },
        async saveDataRoom(data) {
            try {
                const res = await axios.post(`http://localhost:8083/api/v1/room`, data)
                if (res.status != 200) {
                    alert("An Unexpected Error Occured. Response Status: " + res.status)
                } else {
                    alert("Successfully Add Room.")
                }
            } catch (error) {
                console.log(error);
            }
        },

        async cancelForm() {
            this.name = "",
                this.description = "",
                this.type = null,
                this.image = null,

                this.invalidName = false,
                this.invalidType = false,
                this.invalidImage = false
        }
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