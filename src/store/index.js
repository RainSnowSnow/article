import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

Vue.use(Vuex)
const store = new Vuex.Store({  
    state: {  
        access:null,
        account:null
    },  
    mutations: {
        setAccess(state,data){
            state.access=data
        },
        setAccount(state,data){
            state.account=data
        }
    } ,
    plugins: [
        createPersistedState({ storage: window.sessionStorage })
      ],
//     plugins: [
//         createPersistedState({
//             storage: {
//               getItem: key => Cookies.get(key),
//               // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
//               setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
//               removeItem: key => Cookies.remove(key)
//             }
//           })
// ] 
}) 
export default store