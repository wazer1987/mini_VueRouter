import Vue from 'vue'
import Vuex from '../vuex'
Vue.use(Vuex)
const state = {
  cont: 1
}
const mutations = {
  plus (state) {
    state.cont++
  }
}
const actions = {
  asyncPlus ({ commit, state }) {
    commit('plus')
  }
}
const getters = {
  sum (state) {
    return `共扔出${state.cont}`
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
