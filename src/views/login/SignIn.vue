<template>
  <div class="login">
    <div class="login-wrap">
      <el-row>
        <el-col :span="12">
          <img :src="require('../../assets/images/login.jpg')" class="loginImage">
        </el-col>
        <el-col :span="12">
          <c-box mt="10px" ml="30px" mr="40px" mb="15px">
          <el-form :model="form" ref="form" class="demo-ruleForm">
            <el-form-item>
              <el-radio-group v-model="form.type">
                <el-radio label="patient">普通用户</el-radio>
                <el-radio label="doctor">医生</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="username">
              <el-input placeholder="用户名" variant="flushed" v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item id="password" prop="pass">
              <el-input
                  placeholder="密码"
                  type="password"
                  v-model="form.password"
                  autocomplete="off"
                  @keyup.enter.native="login"
              ></el-input>
            </el-form-item>
            <el-form-item class="login-btn">
              <el-button type="primary" @click="login">登 录</el-button>
            </el-form-item>
          </el-form>
          <div class="register-text">
            <span @click="handleCommand">注册帐号</span>
          </div>
        </c-box>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { CText, CInput, CBox } from '@chakra-ui/vue'
export default {
  name: "login",
  components: {
    CText, CInput, CBox
  },
  data() {
    return {
      is_login: true,
      form: {
        username: '',
        password: '',
        type: 'patient'
      },
    };
  },
  methods: {
    login() {
      const formData = new FormData();
      formData.append("username", this.form.username);
      formData.append("password", this.form.password);
      formData.append("type", this.form.type);
      this.$axios({
        method: 'post',
        url: '/login',
        data: formData,
      }).then(res => {
        if(res.data.code == 0){
          this.$message.success("登录成功");
          this.$store.state.id = res.data.data.id;
          this.$store.state.name = res.data.data.name;
          this.$store.state.type = res.data.data.type;
          setTimeout(() => {
            this.$router.push('/');
          }, 1000);
        }
        else{
          this.$message.error(res.data.msg);
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCommand() {
      this.$router.push("/register");
    },
    handleToHome() {
      this.$router.push('/');
    },
  }
}
</script>

<style scoped>
.loginImage {
  width: 100%;
  height: 300px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/bg.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
  position: fixed;
}

.login-wrap {
	margin-top: 30vh;
  margin-left: 30vw;
  width: 650px;
  height: 300px;
  padding: 0 ;
  background-color: rgba(255, 255, 255);
  border-radius: 20px;
  display: inline-block;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.login-btn {
  margin-top: 25px;
  text-align: center;
}
.login-btn button{
  width:100%;
  height:40px;
}
.register-text {
  font-size:15px;
  color:#999;
  float:right;
}
.el-radio-group {
  margin-bottom: -15px;
  margin-left: 40px;
}
</style>

