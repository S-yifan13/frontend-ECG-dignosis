<template>
    <div class="register">
      <div class="register-wrap">
        <el-row>
        <el-col :span="12">
          <img :src="require('../../assets/images/login.jpg')" class="registerImage">
        </el-col>
        <el-col :span="12">
          <c-box mt="25px" ml="30px" mr="40px" mb="15px">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="username">
                  <el-input
                      placeholder="用户名"
                      type="username"
                      v-model="ruleForm.username"
                      autocomplete="off"
                      @keyup.enter.native="register('ruleForm')"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                  <el-input
                      placeholder="密码"
                      type="password"
                      v-model="ruleForm.pass"
                      autocomplete="off"
                      @keyup.enter.native="register('ruleForm')"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                  <el-input
                      placeholder="确认密码"
                      type="password"
                      v-model="ruleForm.checkPass"
                      autocomplete="off"
                      @keyup.enter.native="register('ruleForm')"
                  ></el-input>
                </el-form-item>
                <el-form-item class="register-btn">
                  <el-button type="primary" @click="register('ruleForm')">注 册</el-button>
                </el-form-item>
              </el-form>
              <div class="login-text">
                <span @click="handleCommand">已有账号？直接登录</span>
              </div>
          </c-box>
        </el-col>
        </el-row>
        
        </div>
      </div>
  </template>
  
  

<script>
import { CBox } from '@chakra-ui/vue'
export default {
  name: "register",
  components: {
    CBox
  },
  data() {
    var checkUsername = (rule, value, callback) => {
      const reg=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      if (!value) {
        return callback(new Error('用户名不能为空'));
      } else if (!reg.test(value)) {
        callback(new Error('用户名由中英文、数字或下划线组成'))
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      } else {
        var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(value)) {
          callback(new Error('请输入有效的邮箱'));
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        var reg_pwd=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
        if (!reg_pwd.test(value)) {
          callback(new Error('密码至少同时包含字母和数字，且长度为8-18'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        email: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        username: [
          { validator: checkUsername, trigger: 'blur'}
        ],
        email: [
          { validator: checkEmail, trigger: 'blur'}
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    register: function (formName) {
      const self = this;
      const formData = new FormData();
      formData.append("username", self.ruleForm.username);
      formData.append("password1", self.ruleForm.pass);

      this.$refs[formName].validate((valid) => {
        if (valid) {
          self.$axios({
            method: 'post',
            url: '/user/register',
            data: formData,
          })
          .then(res => {
            console.log(res)
            switch (res.data.errno) {
              case 0:
                this.$store.dispatch('saveUserInfo', {user: {
                    'username': this.ruleForm.username,
                    'confirmed': false,
                  }});
                this.$message.success('注册成功！');
                setTimeout(()=> {
                  this.$router.push('/login');
                },1500);
                break;
              case 1000:
                this.$message.warning(res.data.msg);
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
        } else {
          console.log('提交失败!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCommand() {
      this.$router.push("/login");
    },
    handleToHome() {
      this.$router.push('/');
    }
  }
}
</script>


<style scoped>
.registerImage{
  width: 100%;
  height: 310px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.register-btn {
  margin-top: 25px;
  text-align: center;
}
.register-btn button{
  width:100%;
  height:38px;
}
.login-text {
  font-size:14px;
  line-height:10px;
  color:#999;
  cursor: pointer;
  float:right;
}
.register {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/bg.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
  position: fixed;
}
.register-wrap {
  margin-top: 30vh;
  margin-left: 30vw;
  width: 650px;
  height: 310px;
  padding: 0 ;
  background-color: rgba(255, 255, 255);
  border-radius: 20px;
  display: inline-block;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
  </style>
  