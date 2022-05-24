<template>
  <nav-bar></nav-bar>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4  mt-6">
      <div class="flex flex-col md:flex-row -mx-4">
        <div class="flex-1 px-4">
          <div>
            <div class="h-64 rounded-lg bg-gray-100 mb-4">

              <!-- image -->
              <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center ">
                <div>
                  <img src="https://i.pinimg.com/236x/aa/0e/8f/aa0e8feab142e1356afd4b97617b76e9.jpg" />
                </div>
              </div>
            </div>
            <!-- TODO make gallery -->
          </div>
        </div>
        <div class="flex-1 px-4">
          <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{{ type.type_name
          }}
          </h2>
          <p class="text-gray-500 text-sm">Room Type <a href="#" class="text-indigo-600 hover:underline">{{
              type.description
          }}</a></p>

          <div class="flex items-center space-x-4 my-4">
            <div>
              <div class="rounded-lg bg-gray-100 flex py-2 px-3">
                <span class="text-indigo-400 mr-1 mt-1">฿</span>
                <span class="font-bold text-indigo-600 text-3xl">{{ type.price }}.00</span>
              </div>
            </div>
            <div class="flex-1">
              <p class="text-green-500 text-xl font-semibold">Save 0%</p>
              <p class="text-gray-400 text-sm">Inclusive of all Taxes.</p>
            </div>
          </div>
          <div class="flex py-4 space-x-4">
            <div class="col-span-1 text-center">
              <p class="font-bold text-indigo-600 text-sm">CAPACITY</p>
              <p class="text-indigo-600 text-sm">{{ type.max_capacity }}</p>
            </div>
            <button @click="reserve" type="button"
              class="focus:outline-none  h-14 px-6 py-2 font-semibold rounded-xl bg-blue-600 hover:bg-blue-800 text-white">
              Reserve
            </button>
          </div>
        </div>

        <!-- TODO create details below -->
      </div>
    </div>
  </div>
</template>

<script>

import { computed } from "@vue/reactivity";
import { useStore } from 'vuex'
import axios from 'axios'

export default {
  name: 'SingleRoom',
  props: ['singleRoom'],

  data() {
    return {

    }
  },
  methods: {
    async reserve() {
      console.log("reservation method");
      let formData = {
        user_id: 3,
        room_id:15,
        check_in_date: this.checkin,
        check_out_date: this.checkout,
        reserved_name: "test",
        num_of_guest: this.num_of_guest
      }

       const res = await axios.post(`http://localhost:8083/api/v1/reservation/reserve`,formData)
            if (res.status != 200) {
               console.log(res.data);
                alert("An Unexpected Error Occured. Response Status: " + res.status)
            } else {
               console.log(res.data);

              const reserveDetail = res.data
              this.$store.dispatch('saveReserveDetail',{reserveDetail})
              alert("Successfully Reserve.")
                
              this.$router.push( { path: "/"} )
            }


    }
  },
  setup(props) {
    const store = useStore();
    store.dispatch('fetchSingleTypeRoom', { tid: props.singleRoom })


    return {
      type: computed(() => store.state.type),
      checkin: computed(()=> store.state.checkin),
      checkout: computed(()=> store.state.checkout),
      num_of_guest: computed(()=> store.state.num_of_guest)
    }
  }

}
</script>
