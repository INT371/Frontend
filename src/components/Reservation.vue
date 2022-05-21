<template>
    <div v-show="show"
        class=" fixed w-screen h-screen  z-50 top-72 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-75 bg-gray-700 pt-10">
        <div class=" flex justify-center items-center ">
            <div class="bg-white  border-t-8 border-blue-600 rounded-lg">
                <div class="flex justify-center p-4">
                    <p class="font-bold text-2xl text-blue-900">Reservation</p>
                </div>
                <div class="h-10 w-32 flex items-center p-4">
                    <div class="pr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="gray"
                            class="bi bi-people-fill" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path fill-rule="evenodd"
                                d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                        </svg>
                    </div>
                    <div class="flex h-10 rounded-lg mt-1">
                        <button @click="decrement"
                            class=" focus:outline-none  bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                            <span class="m-auto text-2xl font-thin">-</span>
                        </button>

                        <input type="number" min="1" :disabled="true"
                            class="inputNumber px-10 focus:outline-none text-center bg-gray-300 font-semibold text-md  text-gray-700  "
                            v-model="count" />
                        <button @click="increment"
                            class="focus:outline-none  bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                            <span class="m-auto text-2xl font-thin">+</span>
                        </button>
                    </div>

                </div>
                {{ date }}
                <div class="flex p-4">
                    <Datepicker class="mr-4" v-model="checkInDate" placeholder="Check-In Date" utc
                        :enableTimePicker="false">
                    </Datepicker>
                    <Datepicker v-model="checkOutDate" placeholder="Check-Out Date" utc :enableTimePicker="false">
                    </Datepicker>
                </div>
                <div class="px-4">
                    <p class="text-red-500 justify-center" v-if="invalidCheckInDate">Please Select Check-in Date ✘</p>
                    <p class="text-red-500 justify-center" v-if="invalidCheckOutDate">Please Select Check-out Date ✘</p>
                </div>
                <div class="p-4 flex space-x-4">
                    <button @click="cancelForm().then(cancel)"
                        class="focus:outline-none w-1/2 px-4 py-3 text-center bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm">Cancel</button>
                    <button @click="reserve().then(success ? confirm : null)"
                        class="focus:outline-none w-1/2 px-4 py-3 text-center text-pink-100 bg-pink-600 rounded-lg hover:bg-pink-700 hover:text-white font-bold text-sm">Add
                        Room</button>
                </div>
            </div>
        </div>
    </div>



</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    name: 'Reservation',
    props: ['show', 'cancel', 'confirm'],
    components: { Datepicker },
    data() {
        return {
            checkInDate: null,
            checkOutDate: null,

            invalidCheckInDate: false,
            invalidCheckOutDate: false,
            count: 1,
        };
    },
    methods: {
        async reserve() {
            this.invalidCheckInDate = this.checkInDate == null ? true : false
            this.invalidCheckOutDate = this.checkOutDate == null ? true : false

            if (!this.invalidCheckInDate && !this.invalidCheckOutDate) {

              
                   const check_in_date = this.checkInDate
                   const check_out_date = this.checkOutDate
                

                this.$store.dispatch('saveDateTime', { check_in_date,check_out_date })

                this.$router.push('Showroom')
            }


        },
        async cancelForm() {
            this.checkInDate = null,
                this.checkOutDate = null,
                this.invalidCheckInDate = false
            this.invalidCheckOutDate = false
            this.count = 1
        },
        decrement() {
            this.count !== 1 ? this.count -= 1 : alert("can not")
        },
        increment() {
            this.count += 1
            console.log(this.count);
        },

    }
}
</script>
<style>
.inputNumber::-webkit-inner-spin-button,
.inputNumber::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>