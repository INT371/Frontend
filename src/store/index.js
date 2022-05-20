import { createStore } from 'vuex'
import axios from 'axios'

const backend_url = 'http://localhost:8083/api'

export default createStore({
    state:{
    rooms : [],
    room : null,
    types : [],
    type : null
    },
    mutations:{
        setRoom(state,i){
            state.rooms = i.rooms
        },
        setSingleRoom(state,i){
            state.room = i.room
        },
        setTypeRoom(state,i){
            state.types = i.types
        },
        setSingleTypeRoom(state,i){
            state.type = i.type
        }
    },
    actions:{
        async fetchAllRoom({commit}){
            const res = await axios.get(`${backend_url}/v1/room`)
            const rooms = res.data
            console.log(rooms)
            commit('setRoom',{rooms})
        },
        async fetchSingleRoom({commit},i){
            const res = await axios.get(`${backend_url}/v1/room/id/${i.rid}`)
            const room = res.data
            console.log(room);
            commit('setSingleRoom',{room})
        },
        async fetchTypeRoom({commit}){
            const res = await axios.get(`${backend_url}/v1/type`)
            const types = res.data
            console.log(types);
            commit('setTypeRoom',{types})
        },
        async fetchSingleTypeRoom({commit},i){
            const res = await axios.get(`${backend_url}/v1/type/id/${i.tid}`)
            const type = res.data
            console.log(type);
            commit('setSingleTypeRoom',{type})
        },
        async reservation(i){
            const res = await axios.post(`${backend_url}/v1/reservation/reserve`,i.formData)
            if (res.status != 200) {
                alert("An Unexpected Error Occured. Response Status: " + res.status)
            } else {
                alert("Successfully Reserve.")
            }
        }
    },
    modules: {

    }
})