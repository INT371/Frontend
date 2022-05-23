<template>
    <div class=" w-screen h-screen  bg-opacity-75 bg-gray-700 pt-10">
        <div class="flex justify-center items-center ">
            <div class="bg-white  border-t-8 border-blue-600 rounded-lg">
                <div class="flex">
                    <div class="p-4">
                        <p class="font-bold text-2xl text-blue-900">Edit Room Type</p>
                        <!-- form Edit type -->
                        <div class="flex  pt-2">
                            <div>
                                <label
                                    class=" uppercase md:text-sm text-xs text-black text-light font-semibold pr-6">Room
                                    Type</label>
                                <span class=" px-3 ">{{ type ? type.type_name : '...' }}</span>
                            </div>
                            <div class="pl-4">
                                <label
                                    class="uppercase md:text-sm text-xs text-black text-light font-semibold pr-4">Room
                                    Description</label>
                                <input v-model="type.description"
                                    class="border border-gray-500 rounded-md focus:outline-none p-1">
                                <p v-if="invalidDescription"
                                    class="flex justify-center text-red-500 text-sm font-semibold uppercase">—
                                    &nbsp;&nbsp;Enter description room&nbsp;&nbsp; —</p>
                            </div>
                            <div class="pl-4 ">
                                <label class="uppercase md:text-sm text-xs text-black text-light font-semibold pr-4">Max
                                    Capacity</label>
                                <input v-model="type.max_capacity"
                                    class="border border-gray-500 rounded-md focus:outline-none p-1">
                                <p v-if="invalidCapacity"
                                    class="flex justify-center text-red-500 text-sm font-semibold uppercase">—
                                    &nbsp;&nbsp;Enter Max Capacity&nbsp;&nbsp; —</p>
                            </div>
                        </div>
                        <div class="flex pt-4">
                            <div>
                                <label
                                    class="uppercase md:text-sm text-xs text-black text-light font-semibold pr-4">Room
                                    Price</label>
                                <input v-model="type.price"
                                    class="border border-gray-500 rounded-md focus:outline-none p-1">
                                <p v-if="invalidPrice"
                                    class="flex justify-center text-red-500 text-sm font-semibold uppercase">—
                                    &nbsp;&nbsp;Enter Room Price&nbsp;&nbsp; —</p>
                            </div>
                            <div class="pl-4 ">
                                <label
                                    class=" justify-center uppercase md:text-sm text-xs text-black text-light font-semibold pr-4">Room
                                    Policy</label>
                                <textarea v-model="type.policy"
                                    class="border border-gray-500 rounded-md focus:outline-none p-1"></textarea>

                                <p v-if="invalidPolicy"
                                    class="flex justify-center text-red-500 text-sm font-semibold uppercase">—
                                    &nbsp;&nbsp;Enter Room Policy&nbsp;&nbsp; —</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 mt-5 mx-7">
                            <label class="uppercase md:text-sm text-xs text-black text-light font-semibold mb-1">Upload
                                Photo</label>
                            <div v-if="!image" class="flex items-center justify-center w-full">
                                <label
                                    class="flex flex-col border-4 border-dashed w-full h-28 hover:bg-gray-100 hover:border-blue-300 group duration-300">
                                    <div class="flex flex-col items-center justify-center pt-6">
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
                                <img class="rounded h-24 w-40 mx-auto my-8" :src="getImageUrl(image)" />
                                <button @click="removeimg"
                                    class="bg-blue-600 hover:bg-red-500 text-white font-bold py-2 focus:outline-none px-4 rounded-full duration-300 mb-4">Remove
                                    Photo</button>
                            </div>

                        </div>

                    </div>

                </div>
                <div class="p-4 flex space-x-4">
                    <router-link :to="{ name: 'ManagePanel' }">
                        <button
                            class="w-64 px-4 py-3 text-center bg-gray-500 text-white hover:bg-gray-600 hover:text-black font-bold rounded-lg text-sm">Cancel</button>
                    </router-link>
                    <button @click="submitForm()"
                        class="w-1/2 px-4 py-3 text-center text-pink-100 bg-pink-600 rounded-lg hover:bg-pink-700 hover:text-white font-bold text-sm">Add
                        Room</button>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

import axios from 'axios'


export default {
    name: 'AddRoom',
    props: ['type_id'],

    data() {
        return {

            type: {},

            invalidDescription: false,
            invalidCapacity: false,
            invalidPolicy: false,
            invalidPrice: false,

            invalidImage: false,
            image: null,
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

            this.invalidCapacity = this.type.max_capacity === null || this.type.max_capacity <= 0 ? true : false;
            this.invalidDescription = this.type.description === null || this.type.description.trim() === "" ? true : false;
            this.invalidPolicy = this.type.policy === null || this.type.policy.trim() === "" ? true : false;
            this.invalidPrice = this.type.price === null || this.type.price <= 0 ? true : false;
            this.invalidImage = this.type.image === null ? true : false


            if ((!this.invalidCapacity && !this.invalidDescription && !this.invalidPolicy && !this.invalidPrice && !this.invalidImage)) {
                this.makeDataForm();
            }
        },
       async makeDataForm() {

            let room = {
                description: this.type.description,
                price: this.type.price,
                policy: this.type.policy,
                type_name: this.type.type_name,
                max_capacity: this.type.max_capacity
            }
          const jsonProduct = JSON.stringify(room);
          const blob = new Blob([jsonProduct], {
           type: "application/json",
          });

          let formData = new FormData();
          formData.append("images",this.uploadFile)
          formData.append("type", blob)
           await this.saveDataRoom(formData)
           
        },
        async saveDataRoom(data) {
            try {
                const res = await axios.patch(`http://localhost:8083/api/v1/type`,{params:{typeId : this.type.type_id}},data)
                if (res.status != 200) {
                    alert("An Unexpected Error Occured. Response Status: " + res.status)
                } else {
                    alert("Successfully Add Room.")
                }
            } catch (error) {
                console.log(error);
            }
        },

        async fetchSingleTypeRoom(tid) {
            const res = await axios.get(`http://localhost:8083/api/v1/type/id/${tid}`)
            this.type = res.data
            console.log(this.type);

        },

    },
    async created() {
        await this.fetchSingleTypeRoom(this.$props.type_id)
    },

    // setup(props) {
    //     const store = useStore();
    //     store.dispatch('fetchTypeRoom')
    //     store.dispatch('fetchSingleTypeRoom', { tid: props.typeId })
    //     return {
    //         types: computed(() => store.state.types),
    //         type: computed(() => store.state.type)
    //     }
    // }
}
</script>