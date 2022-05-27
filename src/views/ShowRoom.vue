<template>
  <nav-bar></nav-bar>
  <div id="showRoomMain">
    <!-- Filter Box -->
    <div class="border mx-auto bg-indigo-50 shadow-md w-1/2 h-40 items-center row mb-4">

      <!-- Left Side-->
        <div id="filterBoxLeft" class="col-9">
          <div class="h-10 w-32 flex items-center pl-4" id="numOfPeople">
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
    
          <div class="flex pl-4 pt-4 relative" id="datePicker">
            <date-picker @click="toggleDatePicker" class="mr-4" v-model="filterDate[0]" disabled placeholder="Check-In Date" utc :enableTimePicker="false" />
            <date-picker id="hiddenDatePicker" class="mr-4 invisible absolute inset-x-0 bottom-7" v-model="filterDate" :min-date="getMinDate" :startTime="startTime" range :enableTimePicker="false"  ref="datepicker"/>
            <date-picker @click="toggleDatePicker"  class="mr-4" v-model="filterDate[1]" disabled placeholder="Check-Out Date" utc :enableTimePicker="false" />
          </div>
    
          <div class="px-4">
            <p class="text-red-500 justify-center" v-if="invalidDateCheck.error">{{ invalidDateCheck.message }}</p>
          </div>
        </div>
      <!-- End Left Side -->

      <!-- Right Side -->
        <div id="filterBoxRight" class="col grid grid-rows-2 gap-2 mr-4">
          <button id="roomFilterCloseButton" type="button" @click="closeFilter"
              class=" px-3 py-2 text-center bg-pink-200 text-pink-400 hover:bg-pink-200 hover:text-pink-700 font-bold rounded-lg text-sm">Restore</button>
          <button type="button" @click="filterRoom"
              class=" px-3 py-2 text-center text-green-100 bg-green-600 rounded-lg hover:bg-green-700 hover:text-white font-bold text-sm">Search</button>
        </div>
      <!-- End Right Side -->

    </div>
    <!-- END Filter Box -->

    <!-- display room list -->
    <div v-if="roomTypes && roomTypes.length > 0" class="space-y-4">
      <div v-for="item in roomTypes" :key="item.type_id" class="mx-auto w-4/6 border shadow-md px-3 py-2 space-x-3 row">
        <div class="col-5">
          <!-- Carousel -->
          <div :id="'carouselExampleIndicators'+item.type_id" class="carousel slide"  data-bs-ride="true">
            <div class="carousel-indicators" :id="`carouselIndicator${item.type_id}`">
              <button type="button" v-for="(image, i) in item.images" :key="i" :data-bs-target="'#carouselExampleIndicators'+item.type_id" :data-bs-slide-to="i" :aria-label="`Slide ${i}`"></button>
              <!-- <button type="button" :data-bs-target="'#carouselExampleIndicators'+item.type_id" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" :data-bs-target="'#carouselExampleIndicators'+item.type_id" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" :data-bs-target="'#carouselExampleIndicators'+item.type_id" data-bs-slide-to="2" aria-label="Slide 3"></button> -->
            </div>
            <div class="carousel-inner" :id="`carouselInner${item.type_id}`">
              <div class="carousel-item" v-for="(image, i) in item.images" :key="i">
                <img :src="getImageUrl(image.image)" style="height: 250px;" class="d-block w-100" alt="">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" :data-bs-target="'#carouselExampleIndicators'+item.type_id" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" :data-bs-target="'#carouselExampleIndicators'+item.type_id" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <!-- End Carousel -->
        </div>
        <div class="col pt-3 grid grid-cols-1">
          <div>
            <div class="mb-1">
              <p class="text-2xl font-bold text-blue-800">{{ item.type_name }}</p>
            </div>
            <div class="mb-2">
              <p class="text-xl font-semibold text-gray-600">THB {{ item.price }}</p>
            </div>
            <div class="mb-1">
              <p class="text-base font-normal text-gray-600">{{ item.description }}</p>
            </div>
            <div>
              <p class="text-base">{{ item.max_capacity }} {{ item.max_capacity == 1 ? 'person' : 'people' }}</p>
            </div>
          </div>
          <div class="flex justify-end ">
            <button class="h-10 border shadow-md p-2 bg-green-500 hover:bg-green-600 transition ease-in-out font-semibold" @click="reserveRoom(item)">Reserve this room</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="mx-auto w-4/6 border shadow-md px-auto py-5 space-x-3 row">
        <p class="text-center text-3xl font-semibold text-red-800">No Room Available</p>
      </div>
    </div>
    <!-- END display room list -->
  </div>
</template>
<script>
import axios from "axios";
import DatePicker from '@vuepic/vue-datepicker';

export default {
  name: "showRoom",
  components: { 
    DatePicker 
  },
  data() {
    return {
      backend_url: process.env.VUE_APP_BACKEND_URL,
      roomTypes: null,

      filterDate: [],
      startTime: {hours: 12, minutes: 0},
      invalidDateCheck: { error: false, message: null },
      numOfGuest: 1,
      maxJavaInteger: 2147483647,

      watchedChange: false
    };
  },
  methods: {
    getImageUrl(image){
      return `${this.backend_url}/v1/image/room/${image}`
    },
    async fetchFilterRoomType(filter) {

      if (filter) {
        const res = await axios
          .post(`${this.backend_url}/v1/type/filter`, filter)
          .catch(function (error) {
            console.log(error);
          });

        if (res != undefined && res.status == 200) {
          this.roomTypes = res.data;
        }
      }
    },
    fillDate(filter) {
      this.filterDate.push(filter.check_in_date)
      this.filterDate.push(filter.check_out_date)
      this.numOfGuest = filter.num_of_person
    },
    toggleDatePicker(){
      this.$refs.datepicker.openMenu()
    },
    filterValidation(date) {
      this.invalidDateCheck = { error: false, message: null }
      if (!date[0] || !date[1]){
        this.invalidDateCheck = {error: true, message: 'Please select both start date and end date ✘'}
        return false
      }
      date.forEach(d => {
        d.setHours(12)
        d.setMinutes(0)
        d.setSeconds(0)
      });

      if (date.length <= 0){
        this.invalidDateCheck = {error: true, message: 'Please select Reserved date ✘'}
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
    async filterRoom() {
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

      await this.fetchFilterRoomType(filter)

      this.addCarouselProperties();
    },
    closeFilter() {
      let filter = this.$store.state.filter
        if(filter == null){
          this.$router.push('/')
          return
        } 
      this.fillDate(filter);
    },
    decrement() {
      this.numOfGuest <= 1 ? this.numOfGuest = 1 : this.numOfGuest--
    },
    increment() {
      this.numOfGuest >= this.maxJavaInteger ? this.numOfGuest = this.maxJavaInteger : this.numOfGuest++
    },
    addCarouselProperties() {
      let rt = this.roomTypes
      if(!rt || rt.length <= 0) {
        return 
      }
      
      rt.forEach(e => {
        let indicatorElem = document.getElementById(`carouselIndicator${e.type_id}`)
        let innerElem = document.getElementById(`carouselInner${e.type_id}`)

        indicatorElem.firstElementChild.setAttribute("class", "active")
        indicatorElem.firstElementChild.setAttribute("aria-current", "true")

        let innerElemClass = innerElem.firstElementChild.getAttribute("class")
        innerElem.firstElementChild.setAttribute("class", `${innerElemClass} active`)
      });

      this.watchedChange = !this.watchedChange
    },
    reserveRoom(roomType) {
      this.$store.dispatch('reserveRoomType', roomType)
      this.$router.push('/reserve')
    }
  },
  async created() {
    let filter = this.$store.state.filter
    if(filter == null){
      this.$router.push('/')
      return
    } 
    this.fillDate(filter);
    await this.fetchFilterRoomType(filter);
    this.addCarouselProperties();
  },
  computed: {
    getMinDate(){
      let currentDate = new Date()
      let tomorrow = new Date()
      tomorrow.setDate(currentDate.getDate() + 1)
      return tomorrow
    },
  },
  // watch: {
  //   watchedChange: function () {
  //     let rt = this.roomTypes
  //     if(rt && rt.length > 0) {
  //       rt.forEach(e => {
  //       let indicatorElem = document.getElementById(`carouselIndicator${e.type_id}`)
  //       indicatorElem.click()
  //     });
  //     }
  //   }
  // }
};
</script>
