<template>
    <div class="border rounded shadow-md mx-auto my-4 p-4 w-3/4">

        <div class="text-xl font-bold ml-2 mb-3">
            Reservation
        </div>

        <nav class=" mb-4" aria-label="paginate" v-if="isFinished">
            <ul class="pagination">
                <li class="page-item" @click="previousPage" :class="{disabled : (i <= 1)}">
                    <a class="page-link" href="#">Previous</a>
                </li>
                <li class="page-item" v-for="i in max_page" :key="i" @click="selectPage(i)" :aria-current="i == page ? 'page': null" :class="{active: (i == page)}">
                    <a class="page-link" href="#">{{ i }}</a>
                </li>
                <li class="page-item" @click="nextPage" :class="{disabled : (i >= max_page)}">
                    <a class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>

        <ul class="list-group mb-4" v-if="reservations.length > 0">
            <li class="list-group-item" v-for="item in subReservation" :key="item.id">
                <span>#{{item.id}}</span> {{item.reserved_name}} reserved room "{{item.room.room_name}}" of type "{{item.room.room_type.type_id}}"
            </li>
        </ul>
        
    </div>
</template>

<script>
import axios from 'axios'


export default {
    name: 'ViewReservation',
    components: {
        
    },
    data() {
        return {
            backend_url: process.env.VUE_APP_BACKEND_URL,

            reservations: [],
            subReservation: [],

            page: 1,
            size: 5,
            max_page: 1,

            isFinished: false
        }
    },
    methods: {
        async fetchReservation() {
            const res = await axios.get(`${this.backend_url}/v1/reservation`)

            if (res != undefined && res.status == 200) {
                this.reservations = res.data
                this.setMaxPage()
                this.changePage(1)
                this.isFinished = true
            }
        },
        setMaxPage() {
            let max_page = Math.floor( this.reservations.length / this.size )
            if(this.reservations.length % this.size != 0) {
                max_page ++
            }
            this.max_page = max_page
            console.log(`max page: ${this.max_page}`)
        },
        changePage(page = 1) {
            this.page = page
            let start = (page - 1) * this.size
            let end = start + this.size
            let list = this.reservations.slice(start, end)

            this.subReservation = list
            console.log("Sub List")
            console.log(this.subReservation)
        },
        nextPage() {
            if(this.page == this.max_page) return
            this.page += 1
            this.changePage(this.page)
        },
        previousPage() {
            if(this.page <= 1) return
            this.page -= 1
            this.changePage(this.page)
        },
        selectPage(i) {
            if( this.page == i || i < 1 || i > this.max_page ) return
            this.changePage(i)
        }
    },
    created() {
        this.fetchReservation()
    }

}

</script>