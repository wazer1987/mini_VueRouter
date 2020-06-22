<template>
  <div>
      我是HOME
      <span>Vuex:</span>
      <!--这里由于状态已经挂载到Vue的实例上了所以可以通过this.$store 拿到你传进去的配置项里的state-->
      <span>{{$store.state.cont}}</span>
      <!--getter也是一样的道理-->
      <div>{{$store.getters.sum}}</div>
      <button @click="add">扔炸弹</button>
      <button @click="addActions">隔一秒仍</button>
  </div>
</template>

<script>
export default {
  methods: {
    // 然后这里提交了mutations
    add () {
      this.$store.commit('plus')
    },
    addActions () {
      // 这里发射了actions 然后actions里去提交了mutations
      setTimeout(() => {
        this.$store.dispatch('asyncPlus')
      }, 1000)
    }
  }
}
</script>

<style>

</style>
