<template>
  <c-box class="homepage">
      <el-header>
        <top-guide></top-guide>
      </el-header>
      <c-box>
        <el-row>
          <el-col :span="8">
            <img src="../assets/images/ecg.gif" alt="GIF Image" style="margin-top: 120px; margin-left: 150px; height: 300px;">
          </el-col>
          <el-col :span="16">
            <c-text fontSize="100px" fontWeight="bold" textAlign="center" mt="50px" color="rgb(30,93,173)">HeartZone</c-text>
            <c-text fontSize="50px" fontWeight="bold" textAlign="center" color="rgb(30,93,173)">心电图AI诊断系统</c-text>
            <c-text fontSize="25px" ml="350px" textAlign="left" mt="3" color="#eeeeee">· 对ECG信号进行AI诊断</c-text>
            <c-text fontSize="25px" ml="350px" textAlign="left" mt="1" color="#bbbbbb">· 对ECG图像进行AI诊断</c-text>
            <c-text fontSize="25px" ml="350px" textAlign="left" mt="1" color="#999999">· 落实于医疗场景</c-text>
          </el-col >
        </el-row>
        <el-row>

        </el-row>
        <!-- <el-row>
          <div style="text-align: center">
            <c-button variant-color="blue" size="lg" width="100px" @click="$router.push('/login')" mr="200px">
            登 录
            </c-button>
            <c-button variant-color="blue" size="lg" width="100px" @click="$router.push('/register')">
            注 册
            </c-button>
          </div>
        </el-row> -->
      </c-box>
      <c-box padding="0 50px 0 50px" class="block3">
        <c-text fontSize="45px" fontWeight="bold" textAlign="center" mt="100px" color="#dddddd">About us</c-text>
        <c-text fontSize="20px" textAlign="center" mt="40px" mb="100px" color="#cccccc" ml="200px" mr="200px">
          随着机器学习的发展，AI诊断在医疗领域应用越来越广泛，心电信号的智能处理检测的速度和准确率逐步提高。机器学习能够对数据背后难以发现的信息进行充分发掘，由此可见，机器学习算法应用在心脏疾病的分析上有着显著的优势。基于人工智能的ECG诊断系统可以辅助医生诊断，给出参考建议，在很大程度上为医务工作者减轻压力，提高工作效率。
        </c-text>
      </c-box>
      <c-box>
        <el-row>
          <el-col :span="12">
            <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.TuJt5pHeVqhzoQkVnewz7wHaE7?pid=ImgDet&rs=1" style="margin-left: 150px; height: 350px;">
          </el-col>
          <el-col :span="12">
            <c-box class="showCard">
              <c-text fontSize="30px" fontWeight="bold" color="white">高诊断准确率</c-text>
              <div class="line"></div>
              <c-text fontSize="18px" mt="20px" mb="10px" color="white" >
                我们基于1D的CNN实现了心电信号的五分类算法，分类更合理，判断更细更准，准确率达98.32%;
              </c-text>
              <c-text fontSize="18px" mt="5px" mb="50px" color="white" >
                基于ResNet34实现了心电信号在多个疾病的上的二分类算法，判断细致，平均准确率达89.32%。
              </c-text>
            </c-box>
          </el-col>
      </el-row>
      <el-row style="margin-top:100px">
        <el-col :span="12">
          <c-box class="showCard" ml="150px">
            <c-text fontSize="30px" fontWeight="bold" color="white">高抗干扰能力</c-text>
            <div class="line" ></div>
            <c-text fontSize="18px" mt="20px" mb="10px" color="white">
              我们使用MIT-BIH公开心律失常ECG数据库和PTB-XL大型公开心电数据库，数据来源可靠度高。
            </c-text>
            <c-text fontSize="18px" mt="5" color="white">
              我们将数据经过基线漂移校正、标准化、R波定位、心跳分割和重新采样等操作，对图像进行去网格线等处理，可有效处理干扰信号，降低干扰对判断准确度的影响。
            </c-text>
          </c-box>
        </el-col>
        <el-col :span="12">
          <img src="https://s3.amazonaws.com/prod.tctmd.com/public/2019-01/line%20image.jpg" style="margin-left: 50px; height: 350px;">
        </el-col>
      </el-row>
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
.line {
  margin-top: 20px;
  height: 3px; 
  width:250px; 
  background-color:#cccccc; 
  margin-top: 20px;
}
.showCard {
  height: 350px;
  width: 520px;
  /* background: rgba(30,93,173,0.7); */
  padding: 30px;
  box-shadow: 0 0 10px rgb(99, 99, 99);

}

.homepage {
  background: linear-gradient(to bottom right, #000000, rgb(4, 22, 52));
  padding-bottom: 150px;
}
.block1 {
  padding-top: 100px;
  background-size: 100%;
  width: 100%;
  background: url("../assets/images/sign-in-6(1).jpg") no-repeat;
}
.block2 {
  padding-top: 150px;
  width: 100%;
  background-size: 100%;
  background: url("../assets/images/sign-in-5(1).png") no-repeat;
}

</style>
