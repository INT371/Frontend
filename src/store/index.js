import { createStore } from 'vuex'
import axios from 'axios'

const backend_url = 'http://localhost:8083/api'

export default createStore({
    state:{
    rooms : [],
    room : null
    },
    mutations:{
        setRoom(state,i){
            state.rooms = i.rooms
        },
        setSingleRoom(state,i){
            state.room = i.room
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
        }
    },
    modules: {

    }
})