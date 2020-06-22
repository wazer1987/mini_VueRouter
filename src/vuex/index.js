let Vue
// 这就是store的构造函数 也就是你的 new Vuex.Store({})的时候 传进去的配置项目 然后挂载到了 Vue的实例上
class Store {
  constructor (option) {
    // 因为这个数据是响应式的 所以 我们需要 new Vue  然后把你的 new Vuex.Store的option里传进去的state拿到
    this.state = new Vue({
      data: option.state
    })
    // 这里的option.mutations 是个对象 里面是一个一个的函数 当我们触发他的时候 需要commit 所以我们需要一个commit函数 去调mutations里的函数
    this.mutations = option.mutations
    // 这里的actions 和我们的mutations一样
    this.actions = option.actions
    // 有可能你的option里传 getters 了 也有可能没传
    option.getters && this.handleGetters(option.getters)
  }

  // 当我们在commit的时候 第一个参数 传进去的就是 我们mutations对象里的函数的名字 第二个参数 就是你要传进去的参数
  commit = (type, arg) => {
    // 触发了mutations里的函数 然后把我们的state的数据也传进去 还要你要修改的参数
    this.mutations[type](this.state, arg)
  }

  // 我们的actions对象里的函数 是 incrementAsync({commit,dispathc}) 这里为什么没有使用箭头函数 是因为 保证this的指向 一致都是store 才能 有我们下面的 commit:this.commit
  dispatch (type, arg) {
    this.actions[type]({ commit: this.commit, state: this.state }, arg)
  }

  handleGetters (getters) {
    this.getters = {}
    // 遍历getters的所有key
    Object.keys(getters).forEach(key => {
      // 为this.getters定义若干的属性,这些属性是只读的
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state)
        }
      })
    })
  }
}
function install (_Vue) {
  Vue = _Vue
  // 这里还是混入了我的方法 在你每个Vue实例里面
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        // 如果 你new Vue({})的时候 给我传过来的 配置项里 有 store 我就把他挂载到原型上
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
export default { Store, install }
