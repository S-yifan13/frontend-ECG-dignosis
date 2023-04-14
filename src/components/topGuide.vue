<template>
  <div id="topGuide">
    <el-row>
    <el-col :span="16" v-if="$store.state.user.type == 'doctor'"><img :src="require('../assets/images/logo3.png')" class="topGuideImage"></el-col>
    <el-col :span="18" v-else><img :src="require('../assets/images/logo3.png')" class="topGuideImage"></el-col>
    <el-col :span="2">
      <div class="guide">
        <el-button type="text" style="font-size: 16px;" @click="()=>{$router.push('/')}">
          首页
        </el-button>
      </div>
    </el-col>
    <el-col :span="2" v-if="$store.state.user.type == 'doctor'">
      <div class="guide">
        <el-button type="text" style="font-size: 16px;" @click="()=>{$router.push('/diagnose')}">
          诊断
        </el-button>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="guide">
        <el-button type="text"  @click="()=>{$router.push('/popularization')}" style="font-size: 16px;">
          科普
        </el-button>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="guide" v-if="$store.state.user.id == ''">
        <el-button type="text" style="display:right;font-size: 16px;" @click="()=>{$router.push('/login')}">登录</el-button>
        <div  style="display: inline-block;color: #FFFFFF; margin-left: 10px; margin-right: 10px;">|</div>
        <el-button type="text" style="display:right;font-size: 16px;" @click="()=>{$router.push('/register')}">注册</el-button>
      </div>
      <div class="guide" v-else>
        <el-popover placement="bottom" trigger="hover">
          <template #reference>
            <CAvatar :name="$store.state.user.name" size="sm" bg="#128acf" color="#FFFFFF"></CAvatar>
          </template>
          <template #default>
            <div><el-button type="primary" size="small" style="width: 100%; margin-bottom: 20px;" v-if="$store.state.user.type == 'patient'" @click="()=>{$router.push('/patient')}">个人主页</el-button></div>
            <div><el-button type="danger" size="small" style="width: 100%; " @click="logout()">退出登录</el-button></div>
          </template>
        </el-popover>
      </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import { CText, CAvatar } from '@chakra-ui/vue'
export default {
  name: "topGuide",
  components: {
    CText,
    CAvatar
  },
  data() {
    return {
      
    }
  },
  methods: {
    logout() {
      this.$store.state.user.id = ''
      this.$store.state.user.name = ''
      this.$store.state.user.type = ''
      this.$message.success("已退出登录")
      setTimeout(() => {
        this.$router.push('/login')
      }, 1000)
    }
  }
}
</script>

<style scoped>
.topGuideImage{
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 50px;
}
#topGuide{
  height: 70px;
}
.guide{
  margin-top: 20px;
}

</style>
