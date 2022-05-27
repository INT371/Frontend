<template>
  <nav-bar/>
    <div>
        <!-- Reservation Box -->
        <div class="border mx-auto bg-indigo-50 shadow-lg w-1/2 items-center my-4 px-4 py-3">
            <div class="text-2xl font-semibold mb-3 ">Reservation Confirmation</div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingEditTypeName" placeholder="Type Name" v-model="reservedName">
                    <label for="floatingInput">Reserved name</label>
                    <p class="text-base font-semibold text-red-500" v-if="reservedNameValidation.error">{{reservedNameValidation.message}}</p>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingEditTypeName" placeholder="Type Name" disabled :value="dateFormat(filter.check_in_date)">
                    <label for="floatingInput">Check in date</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingEditTypeName" placeholder="Type Name" disabled :value="dateFormat(filter.check_out_date)">
                    <label for="floatingInput">Check out date</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingEditTypeName" placeholder="Type Name" disabled :value="`${filter.num_of_person} ${filter.num_of_person <= 1 ? 'person' : 'people'}`">
                    <label for="floatingInput">Guests</label>
                </div>
                <div v-if="roomType" class="mx-auto mb-4 border shadow-md px-3 py-2 space-x-3 row bg-gray-200">
                    <div class="col-5">
                    <!-- Carousel -->
                    <div :id="'reservedCarouselExampleIndicators'+roomType.type_id" class="carousel slide"  data-bs-ride="true">
                        <div class="carousel-indicators" :id="`reservedCarouselIndicator${roomType.type_id}`">
                            <button type="button" v-for="(image, i) in roomType.images" :key="i" :data-bs-target="'#reservedCarouselExampleIndicators'+roomType.type_id" :data-bs-slide-to="i" :aria-label="`Slide ${i}`"></button>
                        </div>
                        <div class="carousel-inner" :id="`reservedCarouselInner${roomType.type_id}`">
                            <div class="carousel-item" v-for="(image, i) in roomType.images" :key="i">
                                <img :src="getImageUrl(image.image)" style="height: 250px;" class="d-block w-100" alt="">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" :data-bs-target="'#reservedCarouselExampleIndicators'+roomType.type_id" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" :data-bs-target="'#reservedCarouselExampleIndicators'+roomType.type_id" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <!-- End Carousel -->
                    </div>
                    <div class="col pt-3 grid grid-cols-1">
                        <div>
                            <div class="mb-1">
                                <p class="text-2xl font-bold text-blue-800">{{ roomType.type_name }}</p>
                            </div>
                            <div class="mb-2">
                                <p class="text-xl font-semibold text-gray-600">THB {{ roomType.price }}</p>
                            </div>
                            <div class="mb-1">
                                <p class="text-base font-normal text-gray-600">{{ roomType.description }}</p>
                            </div>
                            <div>
                                <p class="text-base">{{ roomType.max_capacity }} {{ roomType.max_capacity == 1 ? 'person' : 'people' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col">
                    <button @click="reserveRoom" class="border py-2 rounded bg-green-600 hover:bg-green-700 transition ease-in-out text-white text-xl font-semibold">
                        Confirm Reservation
                    </button>
                </div>
        </div>
    </div>
  
</template>

<script>
import { nextTick } from '@vue/runtime-core';
import axios from 'axios';

export default {
    name: "ReservationPage",
    components: { 
    },
    data() {
        return {
        backend_url: process.env.VUE_APP_BACKEND_URL,
        roomType: null,
        filter: null,

        reservedName: '',
        reservedNameValidation: {error: false, message: null},

        maxJavaInteger: 2147483647,

        userId: 1, // Fixed before do authentication system //TODO: Change this after login done. 
        };
    },
    methods: {
        async reserveRoom(){
            let isPassed = this.reserveValidation()
            if (!isPassed) return

            let data = {
                user_id: this.userId,
                type_id: this.roomType.type_id,
                check_in_date: this.filter.check_in_date,
                check_out_date: this.filter.check_out_date,
                reserved_name: this.reservedName,
                num_of_guest: 2
            }

            const res = await axios.post(`${this.backend_url}/v1/reservation/reserve`, data).catch(function (error) {
                console.log(error)
                alert(`ERROR OCCURRED: ${error.response.data.errorCode} \nMessage: ${error.response.data.message}`)
            })

            if (res != undefined && res.status == 200) {
                alert("Reservation Complete")
                this.$router.push('/')
            }

        },
        reserveValidation(){
            this.reservedNameValidation = {error: false, message: null}
            let isPassed = true
            if (this.reservedName.trim().length <= 0) {
                this.reservedNameValidation = { error: true, message: 'Reserved Name cannot be null'}
                isPassed = false
            }

            return isPassed
        },
        dateFormat(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            return date.toLocaleDateString('en-US', options)
        },
        addCarouselProperties(e) {

            console.log(e)

            if (e == null) return

            let indicatorElem = document.getElementById(`reservedCarouselIndicator${e.type_id}`)
            let innerElem = document.getElementById(`reservedCarouselInner${e.type_id}`)

            console.log(indicatorElem)
            console.log(innerElem)

            indicatorElem.firstElementChild.setAttribute("class", "active")
            indicatorElem.firstElementChild.setAttribute("aria-current", "true")

            let innerElemClass = innerElem.firstElementChild.getAttribute("class")
            innerElem.firstElementChild.setAttribute("class", `${innerElemClass} active`)
        },
        getImageUrl(image){
            return `${this.backend_url}/v1/image/room/${image}`
        },
    },
    computed: {

    },
    async created() {
        let filter = this.$store.state.filter
        let roomType = this.$store.state.selectReservedType
        
        if(filter == null || roomType == null){
            this.$router.push('/')
            return
        }
        this.filter = filter 
        this.roomType = roomType

        console.log(this.filter)
        console.log(this.roomType)

        await nextTick()

        this.addCarouselProperties(roomType);
    },
}
</script>

<style>

</style>