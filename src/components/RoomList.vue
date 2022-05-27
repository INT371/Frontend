<template>
    
    <div id="room-list" class="mt-5 lg:mx-12 md:mx-6 sm:mx-3">
        <div class="grid md:grid-cols-3 md:gap-3 sm:grid-cols-2 sm:gap-2 lg:grid-cols-4 lg:gap-4">
            <button 
                class="card mx-auto border-4 border-dashed justify-center items-center lg:w-80 md:w-60 sm:w-80"  
                data-bs-toggle="modal" 
                data-bs-target="#addModal"
            >
                <span class="font-bold text-4xl text-gray-500">Add Type</span>
            </button>
            <new-room-type-card v-for="rt in roomTypes" :key="rt.type_id" :room-type="rt" @edit="editRoomType" @manage="manageRoom" @delete="deleteRoomType" :is-manage="true"></new-room-type-card>
        </div>
    </div>

    <!-- Modal -->
    <!-- Add Room Modal -->
    <div id="add-room-type-modal">
        <div class="modal fade" id="addModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <p class="modal-title text-xl font-semibold" id="addModalLabel">Add Room Type</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearAddType"></button>
            </div>
            <div class="modal-body">
                <form class="grid grid-cols-2 gap-5">
                    <div v-if="images.length > 0" class="space-y-5">
                        <button type="button" class="btn btn-danger" @click="clearImage">Clear images</button>
                        <p class="text-base font-semibold text-red-500" v-if="roomTypeValidation.images.error">{{roomTypeValidation.images.message}}</p>
                        <div class="grid grid-cols-2 gap-2">
                            <div v-for="(image, key) in images" :key="image">
                                <div>
                                    <img class="preview" v-bind:ref="'image' +parseInt( key )" /> 
                                    {{ image.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="grid">
                        <p class="text-base font-semibold text-red-500" v-if="roomTypeValidation.images.error">{{roomTypeValidation.images.message}}</p>
                        <button 
                            type="button"
                            class="mx-auto border-4 border-dashed justify-center items-center w-96 h-52"  
                            @click="uploadFiles"
                        >
                            <span class="font-bold text-4xl text-gray-500">Add Images</span>
                        </button>
                    </div>
                    <div>
                        <div class="form-floating mb-3 w-64">
                            <input type="text" class="form-control" id="floatingTypeName" placeholder="Type Name" v-model="addTypeJson.type_name">
                            <label for="floatingInput">Type name...</label>
                            <p class="text-base font-semibold text-red-500" v-if="roomTypeValidation.name.error">{{roomTypeValidation.name.message}}</p>
                        </div>
                        <div class="form-floating mb-3 w-64">
                            <textarea class="form-control" id="floatingDescription" placeholder="Description" v-model="addTypeJson.description"></textarea>
                            <label for="floatingInput">Description</label>
                            <p class="text-base font-semibold text-red-500" v-if="roomTypeValidation.description.error">{{roomTypeValidation.description.message}}</p>
                        </div>
                        <div class="form-floating mb-3 w-64">
                            <input type="number" class="form-control" id="floatingPrice" placeholder="Price" step="0.01" min="0" max="99999999.99" v-model="addTypeJson.price">
                            <label for="floatingInput">Price</label>
                            <p class="text-base font-semibold text-red-500" v-if="roomTypeValidation.price.error">{{roomTypeValidation.price.message}}</p>
                        </div>
                        <div class="form-floating mb-3 w-64">
                            <input type="number" class="form-control" id="floatingMaxCapacity" placeholder="MaxCapacity" step="1" min="1" :max="maxJavaInteger" v-model="addTypeJson.max_capacity">
                            <label for="floatingInput">Max Capacity</label>
                            <p class="text-base font-semibold text-red-500" v-if="roomTypeValidation.max_capacity.error">{{roomTypeValidation.max_capacity.message}}</p>
                        </div>
                        <div class="form-floating mb-3 w-64">
                            <input type="text" class="form-control" id="floatingPolicy" placeholder="Benefits" v-model="addTypeJson.policy">
                            <label for="floatingInput">Benefits</label>
                            <p class="text-base font-semibold text-red-500" v-if="roomTypeValidation.policy.error">{{roomTypeValidation.policy.message}}</p>
                        </div>
                        <div class="mb-3 w-64">
                            <input class="form-control" type="file" id="formFileMultiple" hidden multiple @change="onImageUpload">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" @click="clearAddType">Clear</button>
                <button type="button" id="addRoomCloseButton" class="btn btn-secondary" data-bs-dismiss="modal"  @click="clearAddType">Close</button>
                <button type="button" class="btn btn-primary" @click="addRoomType">Submit</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    <!-- End Add Room Modal -->

    <!-- Edit Room Modal -->
    <!-- Hidden Button -->
    <button class="card mx-auto border-4 border-dashed justify-center items-center lg:w-80 md:w-60 sm:w-80"
            id="editTypeModalButton"  
            data-bs-toggle="modal" 
            data-bs-target="#editModal"
            hidden>
    </button>
    <div id="edit-room-type-modal">
        <div class="modal fade" id="editModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <p class="modal-title text-xl font-semibold" id="editModalLabel">Edit Room Type</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearEditType"></button>
            </div>
            <div class="modal-body">
                <form class="grid grid-cols-2 gap-5">
                    <div v-if="editedImages.length > 0 && editedImageChange" class="space-y-5">
                        <button type="button" class="btn btn-danger" @click="clearEditImage">Clear images</button>
                        <p class="text-base font-semibold text-red-500" v-if="roomTypeValidation.images.error">{{roomTypeValidation.images.message}}</p>
                        <div class="grid grid-cols-2 gap-2">
                            <div v-for="(image, key) in editedImages" :key="image">
                                <div>
                                    <img class="preview" v-bind:ref="'image' +parseInt( key )" /> 
                                    {{ image.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="editedImages.length > 0 && !editedImageChange" class="space-y-5">
                        <button type="button" class="btn btn-danger" @click="clearEditImage">Clear images</button>
                        <p class="text-base font-semibold text-red-500" v-if="roomTypeValidation.images.error">{{roomTypeValidation.images.message}}</p>
                        <div class="grid grid-cols-2 gap-2">
                            <div v-for="(image) in editedImages" :key="image">
                                <div>
                                    <img :src="getImageUrl(image.image)" /> 
                                    {{ image.image }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="grid">
                        <p class="text-base font-semibold text-red-500" v-if="roomTypeValidation.images.error">{{roomTypeValidation.images.message}}</p>
                        <button 
                            type="button"
                            class="mx-auto border-4 border-dashed justify-center items-center w-96 h-52"  
                            @click="uploadEditFiles"
                        >
                            <span class="font-bold text-4xl text-gray-500">Add Images</span>
                        </button>
                    </div>
                    <div>
                        <div class="form-floating mb-3 w-64">
                            <input type="text" class="form-control" id="floatingEditTypeName" placeholder="Type Name" v-model="editedTypeJson.type_name">
                            <label for="floatingInput">Type name</label>
                            <p class="text-base font-semibold text-red-500" v-if="roomTypeValidation.name.error">{{roomTypeValidation.name.message}}</p>
                        </div>
                        <div class="form-floating mb-3 w-64">
                            <textarea class="form-control" id="floatingEditDescription" placeholder="Description" v-model="editedTypeJson.description"></textarea>
                            <label for="floatingInput">Description</label>
                            <p class="text-base font-semibold text-red-500" v-if="roomTypeValidation.description.error">{{roomTypeValidation.description.message}}</p>
                        </div>
                        <div class="form-floating mb-3 w-64">
                            <input type="number" class="form-control" id="floatingEditPrice" placeholder="Price" step="0.01" min="0" v-model="editedTypeJson.price">
                            <label for="floatingInput">Price</label>
                            <p class="text-base font-semibold text-red-500" v-if="roomTypeValidation.price.error">{{roomTypeValidation.price.message}}</p>
                        </div>
                        <div class="form-floating mb-3 w-64">
                            <input type="number" class="form-control" id="floatingEditMaxCapacity" placeholder="MaxCapacity" step="1" min="1" v-model="editedTypeJson.max_capacity">
                            <label for="floatingInput">Max Capacity</label>
                            <p class="text-base font-semibold text-red-500" v-if="roomTypeValidation.max_capacity.error">{{roomTypeValidation.max_capacity.message}}</p>
                        </div>
                        <div class="form-floating mb-3 w-64">
                            <input type="text" class="form-control" id="floatingEditPolicy" placeholder="Benefits" v-model="editedTypeJson.policy">
                            <label for="floatingInput">Benefits</label>
                            <p class="text-base font-semibold text-red-500" v-if="roomTypeValidation.policy.error">{{roomTypeValidation.policy.message}}</p>
                        </div>
                        <div class="mb-3 w-64">
                            <input class="form-control" type="file" id="formEditFileMultiple" hidden multiple @change="onEditImageUpload">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" @click="clearEditType">Clear</button>
                <button type="button" id="editRoomCloseButton" class="btn btn-secondary" data-bs-dismiss="modal"  @click="clearEditType">Close</button>
                <button type="button" class="btn btn-primary" @click="editRoomTypeSubmit">Submit</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    <!-- End Edit Room Modal -->

    <!-- Mangage Room Modal -->
    <!-- Hidden Button -->
    <button class="card mx-auto border-4 border-dashed justify-center items-center lg:w-80 md:w-60 sm:w-80"
            id="manageRoomModalButton"  
            data-bs-toggle="modal" 
            data-bs-target="#manageRoomModal"
            hidden>
    </button>
    <div id="manage-room-modal">
        <div class="modal fade" id="manageRoomModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="manageRoomModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" v-if="currentRoomType">
            <div class="modal-header">
                <p class="modal-title text-xl font-semibold" id="manageRoomModalLabel">Manage Room of {{ currentRoomType.type_name }}</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closedManageRoomModal"></button>
            </div>
            <div class="modal-body">
                <div id="room-manage-body-menu" class="mx-3 mb-3 row space-x-2">
                    <button type="button" class="btn btn-primary col-2" @click="isAddRoomToggle">Add Room</button>
                    <input type="text" class="col-6 border rounded" id="floatingAddRoomName" placeholder="Room name" v-model="addRoomName" v-if="isAddRoom">
                    <button type="button" class="btn btn-success col-2"  v-if="isAddRoom" @click="addRoom">Submit</button>
                </div>
                <div id="room-manage-body-error" class="mx-3 mb-3 row space-x-2" v-if="roomValidation.error">
                    <p class="text-base font-semibold text-red-500">{{roomValidation.message}}</p>
                </div>
                <div id="room-manage-body-list" class="grid lg:grid-cols-3 sm:grid-cols-2 gap-2">
                    <div class="room border shadow-md p-2 mx-auto w-56 h-24 row bg-gray-50" v-for="room in currentRoomType.rooms" :key="room.room_id">
                        <div class="text-xl font-semibold col-8">
                            <span v-if="editedRoomId != room.room_id">{{ room.room_name }}</span>
                            <div v-if="editedRoomId == room.room_id" class="mx-auto space-y-2">
                                <input type="text" class="w-28 border rounded" :placeholder="room.room_name" v-model="editRoomName" >
                                <button type="button" class="btn btn-success"  @click="editRoom(room)">Submit</button>
                            </div>
                        </div>
                        <span class="text-xl font-semibold col-2 grid grid-cols-1">
                            <button type="button" class="text-blue-500 text-base" @click="editRoomToggle(room.room_id)">Edit</button>
                            <button type="button" class="text-red-500 text-base" @click="deleteRoom(room)">Delete</button>
                        </span>
                    </div>
                </div>
                <div id="room-manage-body-new">

                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="manageRoomCloseButton" class="btn btn-secondary" data-bs-dismiss="modal"  @click="clearRoom">Close</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    <!-- End Manage Room Modal -->
    <!-- End Modal -->
</template>

<script>
import axios from 'axios'
import NewRoomTypeCard from './NewRoomTypeCard'

export default {
    name: 'RoomList',
    components: {
        NewRoomTypeCard
    },
    data() {
        return {
            backend_url: process.env.VUE_APP_BACKEND_URL,
            roomTypes: null,

            images: [],
            addTypeJson: {
                type_name: '',
                description: '',
                price: 0,
                policy: '',
                max_capacity: 0
            },

            editedTypeJson: {
                type_id: 0,
                type_name: '',
                description: '',
                price: 0,
                policy: '',
                max_capacity: 0
            },
            editedImages: [],
            editedImageChange: false,

            currentRoomType: null,
            isAddRoom: false,
            addRoomName: '',
            editRoomName: '',
            editedRoomId: null,

            roomTypeValidation: {
                name: { error: false, message: null },
                description: { error: false, message: null },
                price: { error: false, message: null },
                max_capacity: { error: false, message: null },
                policy: { error: false, message: null },
                images: { error: false, message: null },
            },

            roomValidation: { error: false, message: null },

            validFileExtensions: [".jpg", ".jpeg", ".bmp", ".gif", ".png"],
            maxJavaInteger: 2147483647,
        }
    },
    methods: {
        getImageUrl(image){
            return `${this.backend_url}/v1/image/room/${image}`
        },
        uploadFiles() {
            const filesInput = document.getElementById('formFileMultiple')
            if(filesInput) {
                filesInput.click()
            }
        },
        async fetchRoomTypeWithRooms() {
            const res = await axios.get(`${this.backend_url}/v1/type/room`)
            if (res != undefined && res.status == 200) {
                this.roomTypes = res.data
            }
        },
        async addRoomType() {
            let isPassed = this.validateRoomType(this.addTypeJson)
            if (!isPassed) return
            
            let formData = this.makeFormData()
            let self = this

            const res = await axios.post(`${this.backend_url}/v1/type`, formData).catch(function (error) {
                console.log(error)
                alert(`ERROR OCCURRED: ${error.response.data.errorCode} \nMessage: ${error.response.data.message}`)
                if(error.response.data.errorCodeValue == 30002) {
                    self.roomTypeValidation.name = { error: true, message: error.response.data.message }
                }
                if(error.response.data.errorCodeValue == 3) {
                    self.roomTypeValidation.images = { error: true, message: error.response.data.message }
                }
            })

            if(res != undefined && res.status == 200){
                alert('Add Room Successfully')
                this.closedAddRoomModal()
                this.fetchRoomTypeWithRooms()
            }
        },
        validateRoomType(data){
            let isPassed = true

            this.roomTypeValidation = {
                name: { error: false, message: null },
                description: { error: false, message: null },
                price: { error: false, message: null },
                max_capacity: { error: false, message: null },
                policy: { error: false, message: null },
                images: { error: false, message: null },
            }

            if (data.type_name.trim().length <= 0 || data.type_name.length > 100) {
                this.roomTypeValidation.name = {error: true, message: 'Type name must between 0-100 character and not blank.'}
                isPassed = false
            }
            if (data.description.length > 2000) {
                this.roomTypeValidation.description = {error: true, message: 'Description must not higher than 2,000 character.'}
                isPassed = false
            }
            if (data.price == null || data.price <= 0 || data.price >= 100000000) {
                this.roomTypeValidation.price  = {error: true, message: 'Price must have value between 0 and 100,000,000.'}
                isPassed = false
            }
            if (data.max_capacity == null || data.max_capacity <= 0 || data.max_capacity >= this.maxJavaInteger) {
                this.roomTypeValidation.max_capacity = {error: true, message: 'Max Capacity must have value as integer between 0 and '+this.maxJavaInteger+'.'}
                isPassed = false
            }
            if (data.policy.length > 2000) {
                this.roomTypeValidation.policy = {error: true, message: 'Benefit must not higher than 2,000 character.'}
                isPassed = false
            }
            if (this.images.length == 0) {
                this.roomTypeValidation.images = {error: true, message: 'Must have at least one image.'}
                isPassed = false
            }
            if (this.images.length != 0 && !this.validateFiles(this.images)) {
                this.roomTypeValidation.images = {error: true, message: 'The file extension is not allowed.'}
                isPassed = false
            }

            return isPassed
        },
        validateFiles(files) {
            for (let i = 0; i < files.length; i++) {
                let oInput = files[i];
                    let sFileName = oInput.name;
                    if (sFileName.length > 0) {
                        let blnValid = false;
                        for (let j = 0; j < this.validFileExtensions.length; j++) {
                            let sCurExtension = this.validFileExtensions[j];
                            if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                                blnValid = true;
                                break;
                            }
                        }
                        
                        if (!blnValid) {
                            return false;
                        }
                    }
                
            }

            return true;

        },
        resetFilesValidation() {
            this.roomTypeValidation.images = { error: false, message: null }
        },
        resetRoomTypeValidation() {
            this.roomTypeValidation = {
                name: { error: false, message: null },
                description: { error: false, message: null },
                price: { error: false, message: null },
                max_capacity: { error: false, message: null },
                policy: { error: false, message: null },
                images: { error: false, message: null },
            }
        },
        makeFormData(){
            let formData = new FormData()
            const jsonData = JSON.stringify(this.addTypeJson)
            const blob = new Blob([jsonData], {
                type: 'application/json'
            })

            for (const i of Object.keys(this.images)) {
                formData.append('images', this.images[i])
            }
            formData.append("request", blob)
            return formData
        },
        onImageUpload(e) {
            this.resetFilesValidation()
            this.images = []
            let selectedFiles = e.target.files;
            for (let i=0; i < selectedFiles.length; i++){
                this.images.push(selectedFiles[i]);
            }
            for (let i=0; i<this.images.length; i++){
                let reader = new FileReader(); //instantiate a new file reader
                reader.addEventListener('load', function(){
                this.$refs['image' + parseInt( i )][0].src = reader.result;
                }.bind(this), false);  //add event listener

                reader.readAsDataURL(this.images[i]);
            }        
        },
        clearImage() {
            this.images = []
            this.resetFilesValidation() 
        },
        clearAddType() {
            this.addTypeJson = {
                type_name: '',
                description: '',
                price: 0,
                policy: '',
                max_capacity: 0
            }
            this.clearImage()
            this.resetRoomTypeValidation()
        },
        closedAddRoomModal() {
            const closeButton = document.getElementById('addRoomCloseButton')
            if(closeButton) {
                closeButton.click()
            }
        },
        editRoomType(roomType) {
            this.editedTypeJson = {
                type_id: roomType.type_id,
                type_name: roomType.type_name,
                description: roomType.description,
                price: roomType.price,
                policy: roomType.policy,
                max_capacity: roomType.max_capacity
            }
            this.editedImages = roomType.images
            const openEditButton = document.getElementById('editTypeModalButton')
            if(openEditButton) {
                openEditButton.click()
            }
        },
        clearEditType() {
            this.editedTypeJson = {
                type_id: 0,
                type_name: '',
                description: '',
                price: 0,
                policy: '',
                max_capacity: 0
            }
            this.clearEditImage()
            this.resetRoomTypeValidation()
        },
        clearEditImage() {
            this.editedImages = []
            this.editedImageChange = false
            this.resetFilesValidation()
        },
        onEditImageUpload(e) {
            this.editedImages = []
            let selectedFiles = e.target.files;
            if(selectedFiles.length > 0){
                this.editedImageChange = true
            }
            for (let i=0; i < selectedFiles.length; i++){
                this.editedImages.push(selectedFiles[i]);
            }
            for (let i=0; i<this.editedImages.length; i++){
                let reader = new FileReader(); //instantiate a new file reader
                reader.addEventListener('load', function(){
                this.$refs['image' + parseInt( i )][0].src = reader.result;
                }.bind(this), false);  //add event listener
                reader.readAsDataURL(this.editedImages[i]);
            }        
        },
        uploadEditFiles() {
            const filesInput = document.getElementById('formEditFileMultiple')
            if(filesInput) {
                filesInput.click()
            }
        },
        async editRoomTypeSubmit() {
            let isPassed = this.validateEditRoomType(this.editedTypeJson)
            if (!isPassed) return
            let formData = this.makeEditFormData()
            let self = this

            const res = await axios.patch(`${this.backend_url}/v1/type/${this.editedTypeJson.type_id}`, formData).catch(function (error) {
                console.log(error)
                alert(`ERROR OCCURRED: ${error.response.data.errorCode} \nMessage: ${error.response.data.message}`)
                if(error.response.data.errorCodeValue == 30002) {
                    self.roomTypeValidation.name = { error: true, message: error.response.data.message }
                }
                // if(error.response.data.errorCodeValue == 30001) {
                //     // Room type not found //
                // }
                if(error.response.data.errorCodeValue == 3) {
                    self.roomTypeValidation.images = { error: true, message: error.response.data.message }
                }
            })

            if(res != undefined && res.status == 200){
                alert('Edit Room Successfully')
                this.closedEditRoomModal()
                this.fetchRoomTypeWithRooms()
            }
        },
        validateEditRoomType(data){
            let isPassed = true

            this.roomTypeValidation = {
                name: { error: false, message: null },
                description: { error: false, message: null },
                price: { error: false, message: null },
                max_capacity: { error: false, message: null },
                policy: { error: false, message: null },
                images: { error: false, message: null },
            }

            if (data.type_name.trim().length <= 0 || data.type_name.length > 100) {
                this.roomTypeValidation.name = {error: true, message: 'Type name must between 0-100 character and not blank.'}
                isPassed = false
            }
            if (data.description.length > 2000) {
                this.roomTypeValidation.description = {error: true, message: 'Description must not higher than 2,000 character.'}
                isPassed = false
            }
            if (data.price == null || data.price <= 0 || data.price >= 100000000) {
                this.roomTypeValidation.price  = {error: true, message: 'Price must have value between 0 and 100,000,000.'}
                isPassed = false
            }
            if (data.max_capacity == null || data.max_capacity <= 0 || data.max_capacity >= this.maxJavaInteger) {
                this.roomTypeValidation.max_capacity = {error: true, message: 'Max Capacity must have value as integer between 0 and '+this.maxJavaInteger+'.'}
                isPassed = false
            }
            if (data.policy.length > 2000) {
                this.roomTypeValidation.policy = {error: true, message: 'Benefit must not higher than 2,000 character.'}
                isPassed = false
            }
            if (this.editedImageChange && this.editedImages.length == 0) {
                this.roomTypeValidation.images = {error: true, message: 'Must have at least 1 image uploaded.'}
                isPassed = false
            }
            if (this.editedImageChange && this.editedImages.length != 0 && !this.validateFiles(this.editedImages)) {
                this.roomTypeValidation.images = {error: true, message: 'The file extension is not allowed.'}
                isPassed = false
            }

            return isPassed
        },
        makeEditFormData(){
            let formData = new FormData()
            const jsonData = JSON.stringify(this.editedTypeJson)
            const blob = new Blob([jsonData], {
                type: 'application/json'
            })
            if(this.editedImageChange){
                for (const i of Object.keys(this.editedImages)) {
                    formData.append('images', this.editedImages[i])
                }
            }
            
            formData.append("request", blob)
            return formData
        },
        closedEditRoomModal() {
            const closeButton = document.getElementById('editRoomCloseButton')
            if(closeButton) {
                closeButton.click()
            }
        },
        async deleteRoomType(roomType) {
            if( !confirm(`Do you want to delete this room type: ${roomType.type_name}`)){
                return
            }

            const res = await axios.delete(`${this.backend_url}/v1/type/${roomType.type_id}`).catch(function (error) {
                console.log(error)
                alert(`ERROR OCCURRED: ${error.response.data.errorCode} \nMessage: ${error.response.data.message}`)
            })

            if(res != undefined && res.status == 200){
                alert('Delete Room Successfully')
                this.fetchRoomTypeWithRooms()
            }
        },
        manageRoom(roomType) {
            this.currentRoomType = roomType

            const openManageRoomModal = document.getElementById('manageRoomModalButton')
            if(openManageRoomModal) {
                openManageRoomModal.click()
            }
        },
        closedManageRoomModal() {
            const closeButton = document.getElementById('manageRoomCloseButton')
            if(closeButton) {
                closeButton.click()
            }
        },
        clearCurrentRoomType() {
            this.currentRoomType = null
        },
        isAddRoomToggle() {
            this.resetRoomValidation()
            this.editedRoomId = null
            this.addRoomName = ''
            this.isAddRoom = !this.isAddRoom
        },
        validateRoom(room_name){
            let isPassed = true
            if(room_name.trim().length <= 0 || room_name.length > 100) {
                this.roomValidation = { error: true, message: "Room name must consist of 1 to 100 character and not blank."}
                isPassed = false
            }
            return isPassed
        },
        resetRoomValidation(){
            this.roomValidation = { error: true, message: null }
        },
        clearRoom() {
            this.resetRoomValidation()
            this.editedRoomId = null
            this.addRoomName = ''
            this.isAddRoom = false
            this.editRoomName = ''
        },
        async addRoom() {
            let isPassed = this.validateRoom(this.addRoomName)
            if(!isPassed || !confirm(`Do you want to add room ${this.addRoomName}`)) return
            let roomData = {
                room_name: this.addRoomName,
                type_id: this.currentRoomType.type_id
            }
            let self = this

            const res = await axios.post(`${this.backend_url}/v1/room`, roomData).catch(function (error) {
                console.log(error)
                alert(`ERROR OCCURRED: ${error.response.data.errorCode} \nMessage: ${error.response.data.message}`)
                if(error.response.data.message != null) {
                    self.roomValidation = { error: true, message: error.response.data.message }
                }
            })

            if(res != undefined && res.status == 200){
                let data = res.data;
                alert('Add Room Successfully')
                let newRoom = {
                    room_id: data.room_id,
                    room_name: data.room_name
                }
                this.currentRoomType.rooms.push(newRoom)
                this.isAddRoomToggle()
            }
        },
        editRoomToggle(roomId){
            this.resetRoomValidation()
            this.isAddRoom = false
            this.editRoomName = ''
            if (this.editedRoomId != null && this.editedRoomId == roomId) {
                this.editedRoomId = null
                return
            }
            this.editedRoomId = roomId
        },
        async editRoom(room) {
            let isPassed = this.validateRoom(this.editRoomName)
            if(!isPassed || !confirm(`Do you want to edit this room from ${room.room_name} to ${this.editRoomName}`)) return
            let roomData = {
                room_name: this.editRoomName,
                type_id: this.currentRoomType.type_id
            }
            let self = this

            const res = await axios.patch(`${this.backend_url}/v1/room/${room.room_id}`, roomData).catch(function (error) {
                console.log(error)
                alert(`ERROR OCCURRED: ${error.response.data.errorCode} \nMessage: ${error.response.data.message}`)
                if(error.response.data.message != null) {
                    self.roomValidation = { error: true, message: error.response.data.message }
                }
            })

            if(res != undefined && res.status == 200){
                alert('Edit Room Successfully')
                let data = res.data;
                let newRoom = {
                    room_id: data.room_id,
                    room_name: data.room_name
                }
                this.editRoomToggle(room.room_id)
                this.currentRoomType.rooms =  this.currentRoomType.rooms.filter(current_room => current_room.room_id != room.room_id)
                this.currentRoomType.rooms.push(newRoom)
                this.resetRoomValidation()
            }
        },
        async deleteRoom(room) {
            if(!confirm(`Do you want to delete this room: ${room.room_name}`)) return
            let self = this

            const res = await axios.delete(`${this.backend_url}/v1/room/${room.room_id}`).catch(function (error) {
                console.log(error)
                alert(`ERROR OCCURRED: ${error.response.data.errorCode} \nMessage: ${error.response.data.message}`)
                if(error.response.data.message != null) {
                    self.roomValidation = { error: true, message: error.response.data.message }
                }
            })

            if(res != undefined && res.status == 200){
                alert('Delete Room Successfully')
                this.currentRoomType.rooms =  this.currentRoomType.rooms.filter(current_room => current_room.room_id != room.room_id)
            }
        },
    },
    created() {
        this.fetchRoomTypeWithRooms()
    }

}

</script>