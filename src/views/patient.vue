<template>
<el-container>
  <el-header>
    <top-guide class="header"></top-guide>
  </el-header>
  <el-container>
    <el-aside width="200px">
        <el-menu
            :default-active="activeMenuItem"
            class="el-menu-vertical-demo"
            background-color="#141D41"
            text-color="#fff"
            active-text-color="#409EFF">
            <el-menu-item index="1" style="margin-top: 30px; height: 60px; font-size: 15px;"
                @click="activeMenuItem = '1'">
                <i class="el-icon-menu"></i>
                历史诊断记录
            </el-menu-item>
            <el-menu-item index="2" style="height: 60px; font-size: 15px;" 
                @click="activeMenuItem = '2'">
                <i class="el-icon-user-solid"></i>
                个人信息
            </el-menu-item>
        </el-menu>
    </el-aside>
    <el-container >
        <c-box v-if="activeMenuItem == '1'" style="padding:60px 100px" >
            <el-timeline>
                <el-timeline-item 
                    placement="top"
                    v-for="(item, index) in list"
                    :key="index"
                    :timestamp="item.rTime">
                    <c-box boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" rounded='md'
                        borderRadius='5px' border='1px' borderColor='gray.200' 
                        padding="40px" width="1000px" >
                        <el-row>
                            <el-col :span="10">
                                <el-image
                                style="width: 430px; height: 350px;"
                                :src="item.rEcg"
                                class="bounce" ></el-image>
                            </el-col>
                            <el-col :span="10" :offset="2">
                                <el-row style="margin-top: 5px;">
                                    <el-col :span="7" :offset="2">  
                                        姓名：{{ patient.pRealName }}
                                    </el-col>
                                    <el-col :span="7">
                                        性别：{{ patient.pGender=='M' ?'男':'女' }}
                                    </el-col>
                                    <el-col :span="7">
                                        年龄：{{ patient.pAge }}
                                    </el-col>
                                </el-row>
                                <table class="table">
                                <thead>
                                    <tr>
                                    <th>参数</th>
                                    <th>结果</th>
                                    <th>单位</th>
                                    <th>参考区间</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>心室率</th>
                                        <td v-if="item.rBpm>100" style="color:red">{{item.rBpm}} <i class="el-icon-top"></i></td>
                                        <td v-else-if="item.rBpm<60" style="color:green">{{item.rBpm}} <i class="el-icon-bottom"></i></td>
                                        <td v-else>{{item.rBpm}}</td>
                                        <td>bpm</td>
                                        <td>60 ~ 100</td>
                                    </tr>
                                    <tr>
                                        <th>PR间期</th>
                                        <td v-if="item.rPR>200" style="color:red">{{item.rPR}} <i class="el-icon-top"></i></td>
                                        <td v-else-if="item.rPR<120" style="color:green">{{item.rPR}} <i class="el-icon-bottom"></i></td>
                                        <td v-else>{{item.rPR}}</td>
                                        <td>ms</td>
                                        <td>120 ~ 200</td>
                                    </tr>
                                    <tr>
                                        <th>QRS宽度</th>
                                        <td v-if="item.rQRS>100" style="color:red">{{item.rQRS}} <i class="el-icon-top"></i></td>
                                        <td v-else-if="item.rQRS<60" style="color:green">{{item.rQRS}} <i class="el-icon-bottom"></i></td>
                                        <td v-else>{{item.rQRS}}</td>
                                        <td>ms</td>
                                        <td>60 ~ 100</td>
                                    </tr>
                                    <tr>
                                        <th>QT/QTc</th>
                                        <td v-if="item.rQTc>440" style="color:red">{{ item.rQT }} / {{ item.rQTc }} <i class="el-icon-top"></i></td>
                                        <td v-else>{{ item.rQT }} / {{ item.rQTc }}</td>
                                        <td>ms</td>
                                        <td>260 ~ 440 / ~ 440</td>
                                    </tr>
                                    <tr>
                                        <th>P-R-T轴</th>
                                        <td>{{item.rP}}-{{item.rR}}-{{item.rT}}</td>
                                        <td>度</td>
                                        <td>-30 ~ +90</td>
                                    </tr>
                                </tbody>
                                </table>
                                <c-text ml="30px" mt="10px">AI辅助诊断结果：{{item.rAiResult}}</c-text>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 10px;">
                            <el-form label-position="left" label-width="120px">
                                <el-form-item label="医生姓名：" style="margin-bottom: 0;">
                                    {{ item.dName }}
                                </el-form-item>
                                <el-form-item label="医生诊断结果：" style="margin-bottom: 0;">
                                    {{ item.rConclusion }}
                                </el-form-item>
                                <el-form-item label="诊断建议："  style="margin-bottom: 0;">
                                    {{ item.rAdvice }}
                                </el-form-item>
                            </el-form>
                        </el-row>
                    </c-box>
                </el-timeline-item>
            </el-timeline>
        </c-box>
        <c-box v-else>
            <el-tabs v-model="activeTab" @tab-click="handleClick" mar 
                style="margin:50px 100px; width:1000px">
                <el-tab-pane label="个人信息" name="first" >
                    <c-form-control mt="15px">
                        <c-form-label for="email">姓名</c-form-label>
                        <el-input v-model="patient.pRealName"/>
                    </c-form-control>
                    <c-form-control mt="15px">
                        <c-form-label for="email">性别</c-form-label>
                        <c-radio-group v-model="patient.pGender" is-inline>
                        <c-radio value="F">女</c-radio>
                        <c-radio value="M">男</c-radio>
                        </c-radio-group>
                    </c-form-control>
                    <c-form-control mt="15px">
                        <c-form-label for="email">年龄</c-form-label>
                        <el-input v-model="patient.pAge"/>
                    </c-form-control>
                    <c-form-control mt="15px">
                        <c-form-label for="email">联系方式</c-form-label>
                        <el-input v-model="patient.pMobile"/>
                    </c-form-control>
                    <c-form-control mt="15px">
                        <c-form-label for="email">病史</c-form-label>
                        <el-input v-model="patient.pHistory"/>
                    </c-form-control>
                    <c-button variant-color="blue" size="md" mt="20px" @click="changeInfo()">更新</c-button>
                </el-tab-pane>
                <el-tab-pane label="账户设置" name="second">
                    <c-heading as="h4" size="sm" mt="35px" mb="10px">修改用户名</c-heading>
                    <el-row>
                        <el-col :span="20">
                            <el-input  v-model="user.uName"></el-input>
                        </el-col>
                        <el-col :span="2" :offset="1">
                            <c-button variant-color="blue" size="sm" mt="5px">确认修改</c-button>
                        </el-col>
                    </el-row>
                    <c-heading as="h4" size="sm" mt="35px" mb="10px">修改密码</c-heading>
                    <el-form label-position="left" label-width="80px" >
                    <el-form-item label="当前密码">
                        <el-input placeholder="请输入当前密码" show-password v-model="password1"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input placeholder="新密码与当前密码不能相同" show-password v-model="password2"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input placeholder="确认密码和新密码保持一致" show-password v-model="password3"></el-input>
                    </el-form-item>
                    </el-form>
                    <c-button variant-color="blue" size="sm" mt="5px">确认修改</c-button>
                    <c-heading as="h4" size="sm" mt="40px" mb="10px">退出登录</c-heading>
                    <c-button variant-color="red" size="md" mt="5px">退出登录</c-button>
                </el-tab-pane>
            </el-tabs>
        </c-box>
    </el-container>
  </el-container>        
</el-container>
</template>
   
<script>
  import { CBox, CButton, CHeading, CText} from '@chakra-ui/vue'
  import {
    CFormControl,
    CFormLabel,
    CFormErrorMessage,
    CFormHelperText,
  } from '@chakra-ui/vue';
  import { CRadio, CRadioGroup } from "@chakra-ui/vue";
  import topGuide from '@/components/topGuide.vue';
  export default {
    name: 'patient',
    components: {
        CBox,
        CButton,
        CHeading,
        CText,
        topGuide,
        CFormControl,
        CFormLabel,
        CFormErrorMessage,
        CFormHelperText, 
        CRadio, 
        CRadioGroup
    },
    data() {
      return {
        activeMenuItem:'1',
        activeTab: 'first',
        patient:{
            pRealName:'qq',
            pGender:'F',
            pAge:'40',
            pcid:'510274198901010010',
            pMobile:'18223154778'
        },
        user:{
            uName:'qq',
            uEmail:'123456@123.com'
        },
        password1:'',
        password2:'',
        password3:'',
        list:[]
      }
    },
    created(){
        this.getInfo();
        this.getList();
    },
    methods:{
        getInfo(){
            this.$axios({
                method: 'get',
                url: '/user/getInfo',
                params: {
                    pid: this.$store.state.user.id
                }
            }).then(res => {
                console.log(res.data)
                if(res.data.errno == 0){
                    this.patient = res.data.data
                }
            })
        },
        changeInfo(){
            const formData = new FormData();
            formData.append("pid", this.$store.state.user.id);
            formData.append("pGender", this.patient.pGender);
            formData.append("pAge", this.patient.pAge);
            formData.append("pMobile", this.patient.pMobile);
            formData.append("pRealName", this.patient.pRealName);
            formData.append("pHistory", this.patient.pHistory);
            this.$axios({
                method: 'post',
                url: '/user/changePInfo',
                data: formData,
            }).then(res => {
                console.log(res.data)
                if(res.data.errno == 0){
                    this.$message.success("修改成功")
                }
                else
                    this.$message.warning(res.data.msg)
            })
        },
        getList(){
            this.$axios({
                method: 'get',
                url: '/user/getDiagnosisList',
                params: {
                    pid: this.$store.state.user.id
                }
            }).then(res => {
                console.log(res.data)
                if(res.data.errno == 0){
                    this.list = res.data.data
                }
            })
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
.el-menu-vertical-demo{
    height: 100%;
    position: fixed;
    width: 200px;
    top: 70 ;
    left: 0;
}
.table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 10px;
}

.table th, .table td {
    text-align: center;
    padding: 10px;
    border: 1px solid #ddd;
    vertical-align: middle;
}

.table th {
    background-color: #f5f5f5;
}
.el-tab-pane__label {
font-size: 18px;
}

</style>