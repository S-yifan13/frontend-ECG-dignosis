<template>
  <c-box class="homepage">
      <el-header>
        <top-guide class="header"></top-guide>
      </el-header>
      <c-box>
        <c-text fontSize="100px" fontWeight="bold" textAlign="center" mt="100px" color="rgb(30,93,173)">HeartZone</c-text>
        <c-text fontSize="100px" fontWeight="bold" textAlign="center" mt="60px" color="rgb(30,93,173)">心电图AI诊断系统</c-text>
      </c-box>
  </c-box>
</template>

<script lang="js">
import { CBox, CButton, CText } from '@chakra-ui/vue'
import topGuide from '@/components/topGuide.vue';
export default {
  name: 'homePage',
  components: {
    CBox,
    CButton,
    topGuide,
    CText,
  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}
.homepage {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #000,#272727);
}
</style>