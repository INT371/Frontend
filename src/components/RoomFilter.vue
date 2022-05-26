<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" id="roomFilterModalButton" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#roomFilterModal" hidden>
            Launch static backdrop modal
        </button>

        <!-- Modal -->
        <div class="modal fade" id="roomFilterModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="roomFilterModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header bg-blue-400">
                <p class="modal-title text-2xl font-semibold " id="roomFilterModalLabel">Room Search</p>
                <button type="button" @click="closeFilter" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="h-10 w-32 flex items-center p-4" id="numOfPeople">
                    <div id="peopleIcon" class="pr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="gray"
                            class="bi bi-people-fill" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path fill-rule="evenodd"
                                d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                        </svg>
                    </div>
                    <div id="peopleNumInput" class="flex h-10 rounded-lg mt-1">
                        <button @click="decrement"
                            class="focus:outline-none  bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-16 rounded-l cursor-pointer outline-none transition ease-in-out">
                            <span class="m-auto text-2xl font-semibold">-</span>
                        </button>

                        <input type="number" min="1" :max="maxJavaInteger"
                            class="inputNumber px-10 focus:outline-none text-center bg-gray-300 font-semibold text-md  text-gray-700  "
                            v-model="numOfGuest" />
                        <button @click="increment"
                            class="focus:outline-none  bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-16 rounded-r cursor-pointer  transition ease-in-out">
                            <span class="m-auto text-2xl font-semibold">+</span>
                        </button>
                    </div>

                </div>

                <div class="flex p-4 relative" id="datePicker">
                    <date-picker @click="toggleDatePicker" class="mr-4" v-model="filterDate[0]" disabled placeholder="Check-In Date" utc :enableTimePicker="false" />
                    <date-picker id="hiddenDatePicker" class="mr-4 invisible absolute inset-x-0 bottom-7" v-model="filterDate" :min-date="getMinDate" :startTime="startTime" range :enableTimePicker="false"  ref="datepicker"/>
                    <date-picker @click="toggleDatePicker"  class="mr-4" v-model="filterDate[1]" disabled placeholder="Check-Out Date" utc :enableTimePicker="false" />
                </div>
                <div class="px-4">
                    <p class="text-red-500 justify-center" v-if="invalidDateCheck.error">{{ invalidDateCheck.message }}</p>
                    <!-- <p class="text-red-500 justify-center" v-if="invalidCheckInDate">Please Select Check-in Date ✘</p>
                    <p class="text-red-500 justify-center" v-if="invalidCheckOutDate">Please Select Check-out Date ✘</p> -->
                </div>
            </div>
            <div class="modal-footer">
                <button id="roomFilterCloseButton" type="button" @click="closeFilter" data-bs-dismiss="modal"
                        class="btn focus:outline-none w-1/3 px-4 py-3 text-center bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm">Cancel</button>
                    <button type="button" @click="filterRoom"
                        class="btn focus:outline-none w-1/3 px-4 py-3 text-center text-pink-100 bg-pink-600 rounded-lg hover:bg-pink-700 hover:text-white font-bold text-sm">Add
                        Room</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    name: 'RoomFIlter',
    // props: [],
    components: { 
        DatePicker 
        },
    data() {
        return {
            filterDate: [],
            startTime: {hours: 12, minutes: 0},
            invalidDateCheck: { error: false, message: null },
            numOfGuest: 1,
            maxJavaInteger: 2147483647,
        };
    },
    methods: {
        toggleDatePicker(){
            this.$refs.datepicker.openMenu()
        },
        check() {
            console.log(this.filterDate)
        },
        openModal() {
            const openModalButton = document.getElementById('roomFilterModalButton')
            if (openModalButton) {
                openModalButton.click()
            }
        },
        filterValidation(date) {
            this.invalidDateCheck = { error: false, message: null }
            date.forEach(d => {
                d.setHours(12)
                d.setMinutes(0)
                d.setSeconds(0)
            });

            if (date.length <= 0){
                this.invalidDateCheck = {error: true, message: 'Please select Reserved date ✘'}
                return false
            }
            if (!date[0] || !date[1]){
                this.invalidDateCheck = {error: true, message: 'Please select both start date and end date ✘'}
                return false
            }
            if (this.numOfGuest <= 0 || this.numOfGuest >= this.maxJavaInteger) {
                this.invalidDateCheck = {error: true, message: 'The person must be positive integer (>0) ✘'}
                return false
            }
            if (date[0] == date[1] || Math.ceil(Math.abs(date[0] - date[1]) / (1000 * 60 * 60 * 24)) < 1) {
                this.invalidDateCheck = {error: true, message: 'The reserved period must be 1 day or more ✘'}
                return false
            }
            if (date[1] - date[0] <= 0) {
                this.invalidDateCheck = {error: true, message: 'The end date must not before start date ✘'}
                return false
            }

            return true
        },
        filterRoom() {
            let isPassed = this.filterValidation(this.filterDate)
            if(!isPassed) return

            let filter = { 
                check_in_date: this.filterDate[0],
                check_out_date: this.filterDate[1],
                num_of_person: this.numOfGuest,
                min_price: null,
                max_price: null
            }

            this.$store.dispatch('filterRoom', filter)

            this.closeModal()
            this.$router.push('Showroom')
        },
        closeFilter() {
            this.filterDate = []
            this.invalidDateCheck = { error: false, message: null }
            this.numOfGuest = 1
        },
        closeModal() {
            const elem = document.getElementById('roomFilterCloseButton')
            if(elem) {
                elem.click()
            }
        },
        decrement() {
            this.numOfGuest <= 1 ? this.numOfGuest = 1 : this.numOfGuest--
        },
        increment() {
            this.numOfGuest >= this.maxJavaInteger ? this.numOfGuest = this.maxJavaInteger : this.numOfGuest++
        },

    },
    computed: {
        getMinDate(){
            let currentDate = new Date()
            let tomorrow = new Date()
            tomorrow.setDate(currentDate.getDate() + 1)
            return tomorrow
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