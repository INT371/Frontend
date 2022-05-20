<template>
  <nav-bar></nav-bar>
    <ul class=" list-reset flex justify-center items-center space-x-2">     

        <li class="mr-1">
            <button 
                @click="this.case=1"
                class="inline-block py-2 px-4 text-blue rounded-xl  font-semibold border hover:shadow-inner" 
                :class="{'bg-gray-600': this.case == 1, 'bg-white': this.case != 1}"
            >Room Manage</button>
        </li>
        
         <li class="mr-1">
            <button
            @click="this.case=2"
                class="inline-block py-2 px-4 text-blue rounded-xl  font-semibold border hover:shadow-inner"
                :class="{'bg-gray-600': this.case == 2, 'bg-white': this.case != 2}"
            >Document Manage</button>
        </li>


    </ul>

     <component :is="selectedComponent()"></component>

</template>

<script>

import RoomList from '../components/RoomList'

export default {
    name: 'ManagePanel',
    components: {
   RoomList
    },

    data() {
        return {
            case: 0,
            stage: ''
        }
    },
    methods: {

        selectedComponent() {
            if (this.case == 1) { this.stage = 'RoomList' }
            else if (this.case == 2) { this.stage = 'Document' }
            return this.stage
        }

    },

}


</script>
