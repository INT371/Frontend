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
                                <p v-if="duplicatedName" class="text-red-500 text-sm font-semibold uppercase">—
                                    &nbsp;&nbsp;Duplicate Room Name&nbsp;&nbsp; —</p>
                            </div>
                        </div>

                        <div class="flex items-center pt-2">
                            <div>
                                <label
                                    class=" uppercase md:text-sm text-xs text-black text-light font-semibold pr-6">Room
                                    Type</label>
                               <span class="py-2 px-3 ">{{ type ? type.type_name : 'Have nothing' }}</span>
                               
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
    props: ['show', 'cancel', 'confirm', 'tid'],
    data() {
        return {
            success: false,
            roomId: 0,
            name: "",

            invalidName: false,
            duplicatedName:false,
           
        }
    },
    methods: { 
        async submitForm() {
            this.invalidName = this.name === null || this.name.trim() === '' ? true : false;
            if ((!this.invalidName)) {
                this.makeDataForm();
            }
        },
        makeDataForm() {
            let room = {
                room_name: this.name,
                type_id: this.type.type_id
            }
            this.saveDataRoom(room)
        
        },
        async saveDataRoom(data) {
            let temp = false
            let done = false
            const res = await axios.post(`http://localhost:8083/api/v1/room`, data).catch(function (error){
                if(error.response.data.errorCodeValue === 20002){
                  temp = true
               }
                else if (res.status != 200 ) {
                  alert("Unexpected occurred");
                } 
            })
               
               if(res != undefined && res.status == 200) {
                this.success = true
                
                alert("Successfully Add Room.") 
                this.reset()
                window.location.reload();        
                }             
                this.duplicatedName = temp
                console.log(done);  
            },

      async cancelForm() {
               this.reset()
        },
     reset(){
                this.name = "",
                this.type = null
            
                this.invalidName = false
                this.duplicatedName = false  
                this.success  = true  
               
        }
    },

 setup(props) {
    const store = useStore();

    store.dispatch('fetchSingleTypeRoom', { tid: props.tid })

    return {
      type: computed(() => store.state.type)
    }
  },

}

</script>