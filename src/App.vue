<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
  name: "App",
  created() {
      // 在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem('store')) {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(sessionStorage.getItem('store'))
          )
        )
        // console.log(JSON.parse(sessionStorage.getItem('store')))  // 打印
      }
 
      // 在页面刷新时将vuex里的信息保存到sessionStorage里
      // beforeunload事件在页面刷新时先触发
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('store', JSON.stringify(this.$store.state))
        // console.log(JSON.parse(sessionStorage.getItem('store')))  // 打印
      })
    },
};
</script>
