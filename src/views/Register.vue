<template>
    <nav-bar></nav-bar>
    <div v-if="Form == 1" class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center tracking-widest">REGISTER</h1>
                    <span class="block text-gray-700 text-sm" >Use only A-Z a-z 0-9</span>
                    <input 
                        v-model="username"
                        @input="checkCaseUsername"
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded"
                        name="fullname"
                        placeholder="Username" />
                        <span class="block text-red-500 text-sm" v-if="invalidUsername">Please Enter Valid Username</span>
                                <span
                                    class="block text-red-500 text-sm"
                                    v-if="!usernameLength"
                                >Must be at least 8 characters</span>
                                <span class="block text-green-500 text-sm" v-else>Must be at least 8 characters ✔️</span>
                                <span
                                    class="block text-red-500"
                                    v-if="invalidDuplicateUsername"
                                >This username has already registered</span>
                                
                    <input 
                        v-model="password"
                        @input="checkPassword"
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mt-4 "
                        name="password"
                        placeholder="Password" />
                        <small class="form-text text-muted">Password should contain 8 characters</small>
                        <span class="block text-red-500 text-sm" v-if="invalidPassword">Please Enter Your Password</span>
                        <span class="block text-red-500 text-sm" v-if="minlength">Must be at least 8 characters</span>
                    <span
                                    class="block text-red-500 text-sm"
                                    v-if="!caseUpper"
                                >Must be at least 1 uppercase</span>
                                <span class="block text-green-500 text-sm" v-else>Must be at least 1 uppercase ✔️</span>

                                <span
                                    class="block text-red-500 text-sm"
                                    v-if="!caseLower"
                                >Must be at least 1 lowercase</span>
                                <span class="block text-green-500 text-sm" v-else>Must be at least 1 lowercase ✔️</span>
                                

                    <input 
                        v-model="confirmPassword"
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4 mt-4"
                        name="confirm_password"
                        placeholder="Confirm Password" />
                    <span
                                    class="text-red-600"
                                    v-if="samePassword"
                                >Password does not match</span>
                    
                    <button
                        v-if="this.Form == 1" 
                        @click="ValidateForm1"
                        type="submit"
                        class="w-full text-center py-3 rounded bg-blue-900 text-white hover:bg-blue-600 focus:outline-none my-1 tracking-widest"
                    >NEXT</button>

                    <div class="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="https://hititgreat.com/privacy/?gclid=Cj0KCQiA7oyNBhDiARIsADtGRZZk__Fr_vKQvx-BiH0jlkrwDzLv91WbSQPZCw628R39_F961a4HOVoaAtJJEALw_wcB">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account? 
                    <a class="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>

        <div v-if="Form==2" class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center tracking-widest">REGISTER</h1>
                    <input 
                        v-model="fname"
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded"
                        name="fullname"
                        placeholder="Full Name" />
                    <span class="text-red-500" v-if="invalidFname">Please Enter Your Full Name</span>

                    <input 
                        v-model="lname"
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mt-4"
                        name="lastname"
                        placeholder="Last Name" />
                    <span class="text-red-500" v-if="invalidLname">Please Enter Your Last Name</span>

                    <input 
                        v-model="email"
                        @input="EmailPattern"
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mt-4"
                        name="email"
                        placeholder="Email" />
                    <span class="text-red-500" v-if="invalidEmail">Please Enter Valid Email Address</span>

                    <input 
                        v-model="dob"
                        type="Date"
                        class="block border border-grey-light w-full p-3 rounded mt-4"
                        name="dob"
                        placeholder="Date of Birth" />
                    <span class="text-red-500" v-if="invalidDob">Please Enter Valid Date of Birth</span><br/>

                    <label class="text-muted">Address</label>
                    <textarea
                        v-model="address"
                        rows="4"
                        maxlength="300"
                        x-model="maximum"
                        x-ref="maximum"
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded"
                        name="email"
                        placeholder="Address"
                        > </textarea>
                    <span class="text-red-500" v-if="invalidAddress">Please Enter Your Address</span>
                    <div class="mb-4">
                    <input 
                        v-model="tel"
                        @input="TelPattern"
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mt-4"
                        name="dob"
                        placeholder="Telephone Number" />
                    <span class="text-red-500" v-if="invalidTel">Please Enter Valid Telephone Number</span>
                    </div>

                    <button
                        v-if="Form==2"
                        @click="ValidateForm2"
                        type="submit"
                        class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
                    >Create Account</button>
                    <button
                        @click="backForm"
                        type="submit"
                        class="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none my-1"
                    >Back</button>
                    <div class="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="https://hititgreat.com/privacy/?gclid=Cj0KCQiA7oyNBhDiARIsADtGRZZk__Fr_vKQvx-BiH0jlkrwDzLv91WbSQPZCw628R39_F961a4HOVoaAtJJEALw_wcB">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account? 
                    <router-link to="/Login">
                    <a class="no-underline border-b border-blue text-blue">
                        Log in
                    </a>.</router-link>
                </div>
            </div>
        </div>
    <footer-com></footer-com>
</template>
<script>
import axios from "axios";
// import jwt_decode from 'jwt-decode'

export default {
    name: "Register",
    data() {
        return {
            backend_url: 'http://localhost:8083/api',
            username: '',
            password: '',
            confirmPassword: '',
            fname: '',
            lname: '',
            email: '',
            tel: null,
            dob: '',
            address: '',
            Form: 1,

            // username condition
            usernameLength: false,
            caseNumber: false,
            caseUpper: false,
            caseLower: false,

            // password condition
            passwordLength: 0,
            minlength: false,
            invalidUsername: false,
            invalidDuplicateUsername: false,
            invalidPassword: false,
            samePassword: false,


            invalidFname: false,
            invalidLname: false,
            invalidEmail: false,
            invalidTel: false,
            invalidDob: false,
            invalidAddress: false
        };
    },
    methods: {
        ValidateForm1() {
            this.invalidUsername = this.username == null || this.username.trim() === '' ? true : false
            this.invalidPassword = this.password == null || this.password.trim() === '' ? true : false
            this.samePassword = this.password.trim() === this.confirmPassword.trim() ? false : true

            if (this.caseUpper && this.caseLower && !this.invalidUsername && !this.invalidPassword && !this.samePassword) {
              //  this.checkUsername(this.username);
              this.nextForm();
            }
        },
        ValidateForm2() {
            
            this.invalidFname = this.fname == null || this.fname.trim() === '' ? true : false
            this.invalidLname = this.lname == null || this.lname.trim() === '' ? true : false
            this.invalidEmail = this.email == null
            this.invalidtel = this.tel == null 
            this.invalidDob = true
            this.invalidAddress = this.address == null || this.address.trim() === '' ? true : false
            this.EmailPattern()
            this.TelPattern()
            if(this.dob != null && this.dob != ''){
                let dateNow = new Date()
                dateNow.setHours(0,0,0,0)
                let dob = new Date(this.dob)
                dob.setHours(0,0,0,0)
                this.invalidDob = dob > dateNow ? true : false
            }
            if (!this.invalidFname && !this.invalidLname && !this.invalidEmail && !this.invalidDob && !this.invalidTel && !this.invalidAddress) {
                 this.makeForm()
                alert('Register')
            }

        },
        async makeForm() {
            let user = {
                username: this.username,
                password: this.password,
                email: this.email,
                first_name: this.fname,
                last_name: this.lname,
                date_of_birth: this.dob,
                address: this.address,
                tel_no: this.tel,
        
            }

            const res = await axios.post(`${this.backend_url}/v1/user`, user).catch(function (error) {
                if (error.response) {
                    alert(error.response.data.message);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            })
            if (res != undefined) {
                this.login()
            }
        },
        checkPassword() {
            this.invalidPassword = false
            let char=''
            this.caseLower = false
            this.caseUpper = false
            this.minlength = false
            this.passwordLength = this.password.length
            if (this.passwordLength > 7) {
                this.minlength = false;
            } else {
                this.minlength = true;
            }

            for (let i = 0; i <= this.passwordLength; i++) {
                char = this.password.charAt(i)
                if (isNaN(char)) {
                    if (char == char.toUpperCase()) {
                        this.caseUpper = true
                    } else if (char == char.toLowerCase()) {
                        this.caseLower = true
                    }
                }
            }
        },
        checkCaseUsername() {
            let pattern = /^[0-9a-zA-Z_.-]+$/
            this.usernameLength = false
            this.invalidUsername = false
            if (this.username) {
                if (this.username.length > 7) {
                    this.usernameLength = true
                } else {
                    this.usernamelength = false
                }
            }
            if (!pattern.test(this.username)) {
                this.invalidUsername = true
            }

        },
        EmailPattern(){
            let pattern = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/
            this.invalidEmail = false
            if(!pattern.test(this.email)){
                this.invalidEmail = true
            }
        },
        TelPattern(){
            let pattern = /^(?=.{9,10}$)([0-9]+)+$/
            this.invalidTel = false
            if(!pattern.test(this.tel)) {
                this.invalidTel = true
            }
        },

        async login() {
        const formData = this.makeLoginForm()
        const res = await axios.post(`${this.backend_url}/login`, formData).catch(function (error) {
            if (error.response) {
                alert(error.response.data.message)
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        })

        if(res != undefined){
            const data = await res.data
            const access_token = data.access_token
            localStorage.setItem("access_token", access_token)
            localStorage.setItem("refresh_token", data.refresh_token)
            // const user = jwt_decode(data.access_token)
            // this.$store.dispatch('fetchUser', { user, access_token })
            this.$router.push({ path: "/" })
        }


    },
    makeLoginForm() {
        let formData = new FormData()
        formData.append("username", this.username)
        formData.append("password", this.password)
        return formData
    },

    nextForm() {
        if (this.Form > 1) {
            alert('Do not have page')
        } else {
            this.Form = this.Form + 1
        }
    },

    backForm() {
        if (this.Form == 1) {
            alert('Do not have page')
        } else
            this.Form = this.Form - 1
    },

    // async checkUsername(username) {
    //     const res = await axios.get(`${this.backend_url}/user/check/${username}`).catch(function (error) {
    //         if (error.response) {
    //             console.log(error.response.data);
    //         } else if (error.request) {
    //             console.log(error.request);
    //         } else {
    //             console.log('Error', error.message);
    //         }
    //     })
    //     let temp = false
    //     if(res != undefined){
    //         temp = res.data
    //     this.invalidDuplicateUsername = temp
    //     if(!this.invalidDuplicateUsername){
    //         this.nextForm()
    //     }
    //     } else {
    //     this.invalidDuplicateUsername = temp
    //     } 
    // }

    },
    

}


</script>
