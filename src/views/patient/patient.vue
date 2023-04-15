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
                <c-text mb="30px" color="gray.500" fontSize="sm">共有{{ list.length }}条历史记录</c-text>
                <el-timeline>
                    <el-timeline-item 
                        placement="top"
                        v-for="(item, index) in list"
                        :key="index"
                        :timestamp="item.rTime">
                        <c-box 
                            v-if="item.rType == '0'"
                            boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" rounded='md'
                            borderRadius='5px' border='1px' borderColor='gray.200' 
                            padding="40px" paddingBottom="70px" width="1000px" >
                            <el-row>
                                <el-col :span="10">
                                    <el-image
                                    style="width: 420px; height: 340px;"
                                    :src="'http://127.0.0.1:8000' + item.rEcg"
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
                            <c-button size="sm" @click="generatePdf(item,index)"  style="float:right;">生成PDF</c-button>
                        </c-box>
                        <c-box 
                            v-else-if="item.rType == '1'"
                            boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" rounded='md'
                            borderRadius='5px' border='1px' borderColor='gray.200' 
                            padding="40px" paddingBottom="70px" width="1000px" >
                            <el-row style="margin-top: 5px; width: 400px; margin-left: 250px;">
                                <el-col :span="8">  
                                    姓名：{{ patient.pRealName }}
                                </el-col>
                                <el-col :span="8">
                                    性别：{{ patient.pGender=='M' ?'男':'女' }}
                                </el-col>
                                <el-col :span="8">
                                    年龄：{{ patient.pAge }}
                                </el-col>
                            </el-row>
                            <el-image
                                style="width: 800px; height: 200px;"
                                :src="'http://127.0.0.1:8000' + item.rEcg"
                                class="bounce" ></el-image>
                            
                            <c-text ml="90px" mt="30px">AI辅助诊断结果：{{item.rAiResult}}</c-text>
                            <el-row style="margin-top: 10px; margin-left: 90px;">
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
                            <c-button size="sm" @click="generatePdf(item,index)" style="float:right;">生成PDF</c-button>
                        </c-box>
                        <div :id="'index-' + index" style="display:none; width: 800px;padding: 50px;">
                            <c-heading as="h2" size="lg" textAlign="center">HeartZone 心电图诊断记录</c-heading>
                            <el-divider border-color="black"></el-divider>
                            <el-row style=" text-align: center;">
                                <el-col :span="8">  
                                    姓名：{{ patient.pRealName }}
                                </el-col>
                                <el-col :span="8">
                                    性别：{{ patient.pGender=='M' ?'男':'女' }}
                                </el-col>
                                <el-col :span="8">
                                    年龄：{{ patient.pAge }}
                                </el-col>
                            </el-row>
                            <el-row style=" text-align: center;margin-top: 10px;">
                                <el-col :span="12">  
                                    医生姓名：{{ item.dName }}
                                </el-col>
                                <el-col :span="8">
                                    诊断时间：{{ item.rTime }}
                                </el-col>
                            </el-row>
                            <el-divider border-color="black"></el-divider>
                            <el-row style="margin-top: 10px; margin-left: 90px;">
                                <el-form label-position="left" label-width="120px">
                                    <el-form-item label="心电图：" style="margin-bottom: 0;">
                                        <img :src="'http://127.0.0.1:8000' + item.rEcg" style="height:300px" crossOrigin="anonymous" />
                                    </el-form-item>
                                    <el-form-item label="AI诊断结果：" style="margin-bottom: 0;">
                                        {{ item.rAiResult }}
                                    </el-form-item>
                                    <el-form-item label="医生诊断结果：" style="margin-bottom: 0;">
                                        {{ item.rConclusion }}
                                    </el-form-item>
                                    <el-form-item label="诊断建议："  style="margin-bottom: 0;">
                                        {{ item.rAdvice }}
                                    </el-form-item>
                                </el-form>
                            </el-row>
                        </div>
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
                                <el-input  v-model="patient.pName"></el-input>
                            </el-col>
                            <el-col :span="2" :offset="1">
                                <c-button variant-color="blue" size="sm" mt="5px" @click="modifyUserName">确认修改</c-button>
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
                        <c-button variant-color="blue" size="sm" mt="5px" @click="modifyPassword">确认修改</c-button>
                        <c-heading as="h4" size="sm" mt="40px" mb="10px">退出登录</c-heading>
                        <c-button variant-color="red" size="md" mt="5px" @click="logout">退出登录</c-button>
                    </el-tab-pane>
                </el-tabs>
            </c-box>
        </el-container>
      </el-container>        
    </el-container>
    </template>
       
<script>
    import jsPDF from 'jspdf';
    import 'jspdf-autotable';
    import html2canvas from 'html2canvas';
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
        CRadioGroup,
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
            pMobile:'18223154778',
            pName:''
        },
        password1:'',
        password2:'',
        password3:'',
        list:[]
        }
    },
    created(){
        this.getList();
        this.getInfo();
        
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
        },
        modifyUserName(){
            let _this = this; 
            const formData = new FormData();
            formData.append("pid", _this.$store.state.user.id);
            formData.append("pName", _this.patient.pName);
            _this.$axios({
                method: 'post',
                url: '/user/modifyUserName',
                data: formData
            }).then(res => {
                console.log(res.data)
                if(res.data.errno == 0){
                    _this.$message.success("修改成功")
                }
                else
                    _this.$message.warning(res.data.msg)
            })
        },
        modifyPassword(){
            let _this = this;
            if(_this.password1 == '')
                _this.$message.warning("请输入当前密码")
            else if(_this.password2 == '')
                _this.$message.warning("请输入新密码")
            else if(_this.password2 == _this.password1)
                _this.$message.warning("新密码与当前密码不能相同")
            else if(_this.password3 == '')
                _this.$message.warning("请输入确认密码")
            else if(_this.password2 != _this.password3)
                _this.$message.warning("确认密码和新密码不一致")
            else{
                const formData = new FormData();
                formData.append("pid", _this.$store.state.user.id);
                formData.append("password1", _this.password1);
                formData.append("password2", _this.password2);
                _this.$axios({
                    method: 'post',
                    url: '/user/modifyPassword',
                    data: formData
                }).then(res => {
                    console.log(res.data)
                    if(res.data.errno == 0){
                        _this.$message.success("修改成功")
                    }
                    else
                        _this.$message.warning(res.data.msg)
                })
            }
            
        },
        logout() {
        this.$store.state.user.id = ''
        this.$store.state.user.name = ''
        this.$store.state.user.type = ''
        this.$message.success("已退出登录")
        setTimeout(() => {
            this.$router.push('/login')
        }, 1000)
        },
        generatePdf(item, index) {
            let _this = this;
            const doc = new jsPDF();
            const element = document.getElementById('index-'+index);
            element.style.display = 'block';
            html2canvas(element,{ useCORS: true }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png')
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 180);
                pdf.save(_this.patient.pRealName + item.rTime + '.pdf');
            });
            element.style.display = 'none';
            // doc.html(template, {
            // callback: function (doc) {
            //     doc.save();
            // }
            // });
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
background: #141D41;
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

.el-tab-pane__label {
font-size: 18px;
}

</style>
