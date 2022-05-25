<template>
    <div class="card mx-auto lg:w-80 md:w-60 sm:w-80 bg-gray-100 rounded-b-none">
        <img :src="getImageUrl(roomType.images[0].image)" class="card-img-top" :alt="roomType.description" style="height: 200px;">
        <div class="card-body">
            <div class="card-title font-semibold text-2xl">{{ maskString(roomType.type_name, 30) }}</div>
            <div class="card-text italic text-xl text-gray-600">{{ roomType.price }}฿</div>
            <div class="card-text italic text-base text-gray-600">{{ maskString(roomType.description, 80) }}</div>
            <div class="card-text italic text-base text-gray-600">{{ roomType.max_capacity }} {{ roomType.max_capacity>1?'people':'person' }}</div>
            <div class="card-text italic text-base text-gray-600">Number of room: {{ roomType.rooms.length }}</div>
            <hr class="my-2">
            <div class="flex flex-col gap-1">
                <button class="btn rounded-none shadow-md border bg-green-400 hover:bg-green-500 text-base font-semibold" @click="$emit('edit', roomType)">Edit type</button>
                <button class="btn rounded-none shadow-md border bg-indigo-400 hover:bg-indigo-500 text-base font-semibold" @click="$emit('manage', roomType)">Manage Room</button>
                <button class="btn rounded-none shadow-md border bg-red-400 hover:bg-red-500 text-base font-semibold" @click="$emit('delete', roomType)">Delete</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NewRoomTypeCard',
    props: ['roomType', 'isManage'],
    data() {
        return {
            backend_url: process.env.VUE_APP_BACKEND_URL,
        }
    },
    methods: {
        getImageUrl(image){
            return `${this.backend_url}/v1/image/room/${image}`
        },
        maskString(string, length) {
            if(string.length < length) return string
            return string.substr(0, length) + '...'
        }
    }
}
</script>
