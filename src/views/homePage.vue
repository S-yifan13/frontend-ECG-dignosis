<template>
  <c-box >
      <el-header>
        <top-guide class="header"></top-guide>
      </el-header>
      <c-box class="homepage">
        <el-row>
          <el-col :span="8">
            <img src="../assets/images/ecg.gif" alt="GIF Image" style="margin-top: 160px; margin-left: 50px; height: 300px;">
          </el-col>
          <el-col :span="16">
            <c-text fontSize="80px" fontWeight="bold" textAlign="center" mt="100px" color="rgb(30,93,173)">HeartZone</c-text>
            <c-text fontSize="80px" fontWeight="bold" textAlign="center" mt="60px" color="rgb(30,93,173)">心电图AI诊断系统</c-text>
          </el-col >
        </el-row>
        <el-row>
          <el-col :span="3" :offset="9">
            <c-button variant-color="blue" size="lg" width="100px" @click="$router.push('/login')" >
            登 录
            </c-button>
          </el-col>
          <el-col :span="3">
            <c-button variant-color="blue" size="lg" width="100px" @click="$router.push('/register')">
            注 册
            </c-button>
          </el-col>
        </el-row>
      </c-box>
      <c-box padding="0 50px 0 50px" class="block3">
        <c-text fontSize="30px" fontWeight="bold" textAlign="center" mt="50px">About us</c-text>
        <c-text fontSize="16px" textAlign="center" mt="20px" mb="50px">
          随着机器学习的发展，AI诊断在医疗领域应用越来越广泛，心电信号的智能处理检测的速度和准确率逐步提高。机器学习能够对数据背后难以发现的信息进行充分发掘，由此可见，机器学习算法应用在心脏疾病的分析上有着显著的优势。基于人工智能的ECG诊断系统可以辅助医生诊断，给出参考建议，在很大程度上为医务工作者减轻压力，提高工作效率。
        </c-text>
      </c-box>
      <c-box class="block1">
        <c-box height="250px" width="520px" ml="800px" bg="rgba(30,93,173,0.7)" padding="20px">
          <c-text fontSize="30px" fontWeight="bold" color="white">高诊断准确率</c-text>
          <div style="height: 3px; width:50px; background-color:white; margin-top: 20px;" ></div>
          <c-text fontSize="16px" mt="20px" mb="50px" color="white">
            我们基于1D的CNN实现了心电信号的五分类算法，分类更合理，判断更细更准，准确率达98.32%。
          </c-text>
        </c-box>
      </c-box>
      <c-box class="block2">
        <c-box height="250px" width="520px" ml="150px" bg="rgba(30,93,173,0.7)" padding="20px">
          <c-text fontSize="30px" fontWeight="bold" color="white">高抗干扰能力</c-text>
          <div style="height: 3px; width:50px; background-color:white; margin-top: 20px;" ></div>
          <c-text fontSize="16px" mt="20px" mb="50px" color="white">
            我们使用MIT-BIH公开心律失常ECG数据库，将数据经过基线漂移校正、标准化、R波定位、心跳分割和重新采样，可有效处理干扰信号，降低干扰对判图准确度的影响。
          </c-text>
        </c-box>
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
  height: 800px;
  background: linear-gradient(to bottom right, #000,#272727);
}
.block1 {
  height: 520px;
  padding-top: 100px;
  background-size: 100%;
  background: url("../assets/images/sign-in-6(1).jpg") no-repeat;
}
.block2 {
  padding-top: 150px;
  height: 600px;
  background-size: 100%;
  background: url("../assets/images/sign-in-5(1).png") no-repeat;
}

</style>
