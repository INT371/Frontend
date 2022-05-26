import { createStore } from 'vuex'
import axios from 'axios'

const backend_url = process.env.VUE_APP_BACKEND_URL

export default createStore({
    state:{
        rooms : [],
        room : null,
        types : [],
        type : null,

        userId:0,
        roomId:0,
        reserveName:"",
        filter: null,

        reserveDetail: {}
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
        },
        setFilter(state, filter){
            state.filter = filter
        },
        setReserveDetail(state,i){
            state.reserveDetail = i.data
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

            console.log("check in date :"+this.state.checkin)
            console.log("check out date :"+this.state.checkout)
            commit('setTypeRoom',{types})
        },
        async fetchSingleTypeRoom({commit},i){
            const res = await axios.get(`${backend_url}/v1/type/id/${i.tid}`)
            const type = res.data
            console.log(type);
            commit('setSingleTypeRoom',{type})
        },
        async filterRoom({commit}, filter){
            commit('setFilter', filter)
        },
        
        async saveReserveDetail({commit},i){
            const data = i.reserveDetail
            console.log(data);
            commit('setReserveDetail',data)
        }
       
    },
    modules: {

    }
})