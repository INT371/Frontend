<template>
    <room-filter ref="roomFilter"/>

    <div class="flex flex-wrap place-items-center top-0 shadow-md mb-3 z-50"> <!-- TODO: Remove sticky from navbar or not -->
        <section class="mx-auto ">
            <!-- navbar -->
            <div class="flex justify-center justify-items-center bg-gray-900  text-white w-screen h-20">
                <a class="text-3xl font-bold font-heading hover:text-blue-400 duration-300 py-4">
                    RVcomfort </a>
            </div>

            <div class="flex  justify-around  bg-gray-50 text-gray-700 w-screen">
                <div class="px-5  py-4  items-center">
                    <router-link to="/"><a class="text-xl font-medium font-heading hover:text-gray-300 duration-300">
                            Home
                        </a></router-link>  
                </div>
                  <div class="px-5  py-4  items-center">
                    <!-- <router-link to="/showroom"> -->
                        <a class="text-xl font-medium font-heading hover:text-gray-300 duration-300" @click="openRoomFilterModal">
                            Rooms
                        </a>
                    <!-- </router-link>   -->
                </div>
                 <div class="px-5  py-4  items-center">
                    <router-link to="/about"><a class="text-xl font-medium font-heading hover:text-gray-300 duration-300">
                            About
                        </a></router-link>
                      
                </div>
                   <div class="px-5  py-4  items-center">
                    <router-link to="/register"><a class="text-xl font-medium font-heading hover:text-gray-300 duration-300">
                            Register
                        </a></router-link>
                      
                </div>
                <div class="px-5  py-4  items-center">
                    <router-link to="/login"><a class="text-xl font-medium font-heading hover:text-gray-300 duration-300">
                            Login
                        </a></router-link>
                      
                </div>
                 <div class="px-5  py-4  items-center">
                    <router-link to="/manage"><a class="text-xl font-medium font-heading hover:text-gray-300 duration-300">
                            Manage Panel
                        </a></router-link>
                      
                </div>
            </div>
            
        </section>
    </div>

</template>
<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import RoomFilter from '../components/RoomFilter.vue';

export default {
    components: {
        RoomFilter
    },
    methods: {
        openRoomFilterModal() {
            if (this.filter)  {
                this.$router.push('Showroom')
                return
            }
            this.$refs.roomFilter.openModal()
        },
    },
    setup() {
        const store = useStore();

        return {
            filter: computed(() => store.state.filter )
        }
    }
}
</script>


<style scoped>
.plus-sign {
    margin-top: 2px;
}

.dropdown {
    margin-top: -10px;
}

.dropdown li {
    position: relative;
}

.dropdown li a {
    color: #ffffff;
    text-align: center;
    text-decoration: none;
    display: block;
    padding: 10px;
}

.dropdown li ul {
    position: absolute;
    top: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    display: none;
    background-color: #262626;
}

.dropdown li ul li a {
    text-align: left;
    color: #ffffff;
    font-size: 16px;
    padding: 10px;
    display: block;
    white-space: nowrap;
}

.dropdown li ul li a:hover {
    color: #ff0000;
}

.dropdown li ul li ul {
    left: 100%;
    top: 0;
}

ul li:hover>ul {
    display: block;
}
</style>
