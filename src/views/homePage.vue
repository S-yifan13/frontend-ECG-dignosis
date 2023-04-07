<template>
  <c-box>
      <el-header>
        <top-guide class="header"></top-guide>
      </el-header>
  </c-box>
</template>

<script lang="js">
import { CBox, CButton } from '@chakra-ui/vue'
import topGuide from '@/components/topGuide.vue';
export default {
  name: 'homePage',
  components: {
    CBox,
    CButton,
    topGuide,
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
</style>