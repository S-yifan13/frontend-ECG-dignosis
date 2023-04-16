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
                                            姓名：{{ item.pRealName }}
                                        </el-col>
                                        <el-col :span="7">
                                            性别：{{ item.pGender=='M' ?'男':'女' }}
                                        </el-col>
                                        <el-col :span="7">
                                            年龄：{{ item.pAge }}
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
                                    姓名：{{ item.pRealName }}
                                </el-col>
                                <el-col :span="8">
                                    性别：{{ item.pGender=='M' ?'男':'女' }}
                                </el-col>
                                <el-col :span="8">
                                    年龄：{{ item.pAge }}
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
                                    姓名：{{ item.pRealName }}
                                </el-col>
                                <el-col :span="8">
                                    性别：{{ item.pGender=='M' ?'男':'女' }}
                                </el-col>
                                <el-col :span="8">
                                    年龄：{{ item.pAge }}
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
                <el-form label-position="left" label-width="120px" style="padding: 50px;">
                    <el-form-item label="用户名：" style="margin-bottom: 0;">
                        {{ doctor.dName }}                    
                    </el-form-item>
                    <el-form-item label="姓名" style="margin-bottom: 0;">
                        {{ doctor.dRealName }}
                    </el-form-item>
                    <el-form-item label="医院：" style="margin-bottom: 0;">
                        {{ doctor.dHospital }}
                    </el-form-item>
                </el-form>
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
    name: 'history',
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
        doctor:{
            dRealName:'qq',
            dName:'qq',
            dHospital:'qq',
        },
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
                url: '/user/getDoctorInfo',
                params: {
                    did: this.$store.state.user.id
                }
            }).then(res => {
                console.log(res.data)
                if(res.data.errno == 0){
                    this.doctor = res.data.data
                }
            })
        },
        getList(){
            this.$axios({
                method: 'get',
                url: '/user/getDiagnosisListByDoctor',
                params: {
                    did: this.$store.state.user.id
                }
            }).then(res => {
                console.log(res.data)
                if(res.data.errno == 0){
                    this.list = res.data.data
                }
            })
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
                pdf.save(item.pRealName + item.rTime + '.pdf');
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
