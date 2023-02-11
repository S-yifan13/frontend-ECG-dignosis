<template>
  <c-box>
    <c-button>
      Chakra Consumed! ⚡️
    </c-button>
    <el-button>
        element
    </el-button>
  </c-box>
</template>

<script lang="js">
import { CBox, CButton } from '@chakra-ui/vue'

export default {
  name: 'homePage',
  components: {
    CBox,
    CButton
  },
  data(){
    return{

    }
  }
}
</script>
