/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
let Vue
class Router {
  constructor ({ routes }) {
    const obj = {}
    routes.forEach(item => {
      obj[item.path] = item.component
    })
    console.log(routes, '----')
    this.routes = routes
    // 这里建立映射关系 把我们的路由表遍历成了 {'/':Home,'/about':About}
    this.routeMap = obj
    // 定义了当前路由 也就是点击的那个 变成响应式
    Vue.util.defineReactive(this, 'route', { current: '/' })
    // 初次加载的时候会监听laod事件 默认跳到/首页
    window.addEventListener('load', () => {
      location.hash ? '' : location.hash = '/' // 默认就跳转到 首页
    })
    // 当我们点击跳转的时候浏览器的地址栏会发生改变 用hashchange就可以监听到 然后我们取值在把路径赋值给我们的当前路由即可
    window.addEventListener('hashchange', () => {
      this.route.current = location.hash.slice(1)
    })
  }
}
// 默认我们的Vue.use会调用函数install
// 所以我们需要在我们传进去的Router里写个install方法
// 这里的形参就是我们的Vue实例

Router.install = (_Vue) => {
  Vue = _Vue
  // 为了在我们每个Vue的组件中拿到router实例 所以使用mixin方法 而不是使用原型上的那种添加方法
  Vue.mixin({
    // 在每个组件的生命周期 之前调用 每个组件都会调用所以会一直执行类似递归
    // beforeCreate () {
    //   // 判断你是不是最开始的根组件 也就是我们new Vue的时候传进去的配置
    //   if (this.$options && this.$options.router) {
    //     // 如果是我就赋值
    //     this._router = this.$options.router
    //     console.log(this._router, 'oooo')
    //   } else {
    //     // 如果不是我就继续向上找 这里你也可能没有父亲 可能是新new Vue 所以多了一层判断
    //     this._router = this.$parent && this.$parent.router
    //   }
    //   // 以上就是让所有的组件都有了router的实例 也可拿到我们传进router构造函数的值
    //   // 为每个组件添加$router 和 $route 属性 这里的this就是当前的Vue实例也就是组件
    //   Object.defineProperty(this, '$router', {
    //     value: {}
    //   })
    //   Object.defineProperty(this, '$route', {
    //     value: {}
    //   })
    // }
    beforeCreate () {
      // 判断根组件是谁
      if (this.$options && this.$options.router) {
        this._router = this.$options.router
      } else {
        // 让所有的子组件 都有这个_router属性 指向当前 router
        this._router = this.$parent && this.$parent._router
      }
      // 每个组件 $route $router
      Object.defineProperty(this, '$route', {
        value: {}
      })
      Object.defineProperty(this, '$router', {
        value: {}
      })
    }
  })
  // 生成一个router-link组件 其实就是一个a标签 这里使用了jsx语法 能拿到你标签上传过来的to的值
  Vue.component('router-link', {
    props: {
      to: String
    },
    render () {
      return <a href={`#${this.to}`}>{this.$slots.default}</a>
    }
  })
  // 生成视口组件
  Vue.component('router-view', {
    render (h) {
      console.dir(this._router, '-----')
      return h(this._router.routeMap[this._router.route.current])
    }
  })
}
export default Router
