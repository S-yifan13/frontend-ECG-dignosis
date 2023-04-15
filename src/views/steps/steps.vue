<template>
  <div class="bg">
    <el-container>
      <el-header>
        <top-guide />
      </el-header>
      <el-main class="main">
        <el-steps :active="this.stepNow" align-center>
          <el-step title="患者信息" icon="el-icon-user-solid"></el-step>
          <el-step title="上传心电图" icon="el-icon-upload"></el-step>
          <el-step title="AI辅助诊断" icon="el-icon-picture"></el-step>
          <el-step title="人工诊断" icon="el-icon-edit"></el-step>
          <el-step title="诊断结论" icon="el-icon-s-order"></el-step>
        </el-steps>
        <div class="step1" v-show="stepNow === 0">
          <c-box ml="100px" mt="20px" mr="100px">
            <el-select
              v-model="value"
              filterable
              remote
              reserve-keyword
              placeholder="搜索"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for=" (item,index) in options"
                :key="index"
                :value="item.value"
                :label="item.label"
                @click.native="selectPatient(item.content)">
              </el-option>
            </el-select>
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
          </c-box>
          <el-button class="btn" type="primary" plain round @click="addStep">下一步</el-button>
        </div>
        <div class="step1" v-show="stepNow === 1 || stepNow === 2">
          <c-box mt="50px">
            <el-row>
            <el-col :span="12">
            <c-box ml="40">
              <el-form>
                <el-form-item label="类型">
                  <el-select v-model="ecgInfo.rType" placeholder="请选择">
                      <el-option label="心电图" value="0"></el-option>
                      <el-option label="心电信号" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            <el-upload
              v-if="ecgInfo.rType == 0"
              style="margin-top: 40px"
              v-loading="stepNow===2"
              element-loading-text="AI辅助诊断中"
              align-center
              drag
              :file-list="fileList"
              :action=uploadImgUrl
              :http-request="upLoadImage"
              :before-upload="beforeImageUpload"
              list-type="picture"
              multiple>
              <i class="el-icon-upload"></i>
              <div slot="file" slot-scope="{file}">
                  <el-image :src="file.url" :preview-src-list="[file.url]" fit="scale-down">
                  </el-image>
              </div>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
            </el-upload>
            <el-upload
              v-else
              style="margin-top: 40px"
              v-loading="stepNow===2"
              element-loading-text="AI辅助诊断中"
              align-center
              drag
              :file-list="fileList2"
              :action=uploadFileUrl
              :http-request="upLoadFile"
              :before-upload="beforeUpload"
              :on-success="handleSuccess">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传csv文件</div>
            </el-upload>
          </c-box>
            </el-col>
            <el-col :span="12">
          <c-box>
            <el-form ref="form" :model="ecgInfo" label-width="80px">
              <el-form-item label="心室率">
                <el-input-number v-model="ecgInfo.rBpm" style="width: 180px" size="mini"></el-input-number>&thinsp;bpm
              </el-form-item>
              <el-form-item label="PR间期">
                <el-input-number v-model="ecgInfo.rPR" style="width: 180px" size="mini"></el-input-number>&thinsp;ms
              </el-form-item>
              <el-form-item label="QRS宽度">
                <el-input-number v-model="ecgInfo.rQRS" style="width: 180px" size="mini"></el-input-number>&thinsp;ms
              </el-form-item>
              <el-form-item label="QT/QTc">
                <el-input-number v-model="ecgInfo.rQT" style="width: 90px" size="mini"></el-input-number>&thinsp;/&thinsp;
                <el-input-number v-model="ecgInfo.rQTc" style="width: 90px" size="mini"></el-input-number>&thinsp;ms
              </el-form-item>
              <el-form-item label="P-R-T轴">
                <el-input-number v-model="ecgInfo.rP"  size="mini" controls-position="right"></el-input-number>&thinsp;
                <el-input-number v-model="ecgInfo.rR" size="mini" controls-position="right"></el-input-number>&thinsp;
                <el-input-number v-model="ecgInfo.rT" size="mini" controls-position="right"></el-input-number>
              </el-form-item>
            </el-form>
            <el-button class="btn" type="primary" plain round @click="addStep">下一步</el-button>
            <el-button class="btn" type="primary" plain round @click="stepNow--">上一步</el-button>

          </c-box>
            </el-col>
            </el-row>
          </c-box>
                    
        </div>
        <div class="step3" v-show="this.stepNow === 3">
          <el-row>
            <el-col :span="8">
              <div class="image-preview">
                <el-image
                  v-if="ecgInfo.rType == '0'"
                  style="width: 300px; height: 200px"
                  :src="url"
                  :preview-src-list="srcList">
                </el-image>
                <el-image
                  v-else
                  style="width: 400px; height: 200px"
                  :src="url"
                  :preview-src-list="srcList">
                </el-image>
              </div>
            </el-col>
            <el-col :span="16">
              <p style="margin: 2vh 0;">AI辅助诊断结果：{{ aiResult }}</p>
              <c-box mt="5" >
              <c-text>医生诊断结果</c-text>
              <el-input
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 8}"
                placeholder="请输入诊断结果"
                v-model="doctorResult">
              </el-input>
              </c-box>
              <c-box mt="5">
                <c-text>治疗建议</c-text>
              <el-input
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 8}"
                placeholder="请输入治疗建议"
                v-model="advice">
              </el-input>
              </c-box>
            </el-col>
          </el-row>
          <el-button class="btn" type="primary" plain round @click="addStep">提交</el-button>
          <el-button class="btn" type="primary" plain round @click="decStep">上一步</el-button>
        </div>
        <div class="step4" v-show="this.stepNow === 4">
          <el-row style="margin-top:60px">
            <el-col :span=12>
              <el-image
                  v-if="ecgInfo.rType == '0'"
                  style="width: 400px; height: 300px; margin-left: 100px;"
                  :src="url"
                  :preview-src-list="srcList">
                </el-image>
                <el-image
                  v-else
                  style="width: 600px; height: 200px; margin-left: 50px;"
                  :src="url"
                  :preview-src-list="srcList">
                </el-image>
            </el-col>
            <el-col :span=12>
              <p style="margin: 3vh 0;">AI辅助诊断结果：{{ aiResult }}</p>
              <p style="margin: 3vh 0;"><span>医生诊断结论：{{ conclusion }}</span></p>
              <p style="margin: 3vh 0;"><span>治疗建议：{{ advice }}</span></p>
            </el-col>
          </el-row>
          <el-button class="btn" type="primary" plain round @click="done">完成</el-button>
          <el-button class="btn" type="primary" plain round @click="decStep">上一步</el-button>
        </div>
      </el-main>

    </el-container>
  </div>
</template>

<script>
import TopGuide from "@/components/topGuide";
import { CText } from '@chakra-ui/vue'
import { CBox } from '@chakra-ui/vue';
import { CSelect } from '@chakra-ui/vue';
import {
    CFormControl,
    CFormLabel,
    CFormErrorMessage,
    CFormHelperText,
  } from '@chakra-ui/vue';
  import { CRadio, CRadioGroup } from "@chakra-ui/vue";
export default {
  name: "steps",
  components: {
    TopGuide,
    CText,
    CBox,
    CSelect,CFormControl,
    CFormLabel,
    CFormErrorMessage,
    CFormHelperText, CRadio, CRadioGroup
  },
  data() {
    return {
      stepNow: 0,
      uploadImgUrl: '/api/rs/image/upload',
      upLoadFileUrl: '/api/rs/file/upload',
      url: '',
      srcList: [],
      doctorResult: '',
      fileList:[],
      filelist2:[],
      picture:'',
      advice: '',
      rid:'',
      aiResult:'',
      conclusion:'',
      dialogVisible: false,
      dialogImageUrl: '',
      ecgInfo:{
        rBpm: '',
        rPR: '',
        rQRS: '',
        rQT: '',
        rQTc: '',
        rP: '',
        rR: '',
        rT: '',
        rType: '0',
      },
      patient:{
        pRealName:'',
        pGender:'',
        pAge:'',
        pMobile:'',
        pid:'',
        pHistory:'',
      },
      options: [],
      value: '',
      list: [],
      loading: false,
      states: [],
      csv:'',
    };
  },
  created(){
    this.getPatientList();
  },
  
  methods: {
    beforeUpload(file) {
      // 验证文件类型和大小等
      const isCSV = file.type === 'text/csv';
      if (!isCSV) {
        this.$message.error('只能上传 CSV 格式的文件');
      }
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.$message.error('文件大小不能超过 20MB');
      }
      return isCSV && isLt2M;
    },
    handleSuccess(response, file, fileList) {
      // 处理上传成功的逻辑
      // response 是上传成功后服务器返回的数据，可以根据需求进行处理
      console.log("上传成功", response);
    },
    handleRemove(file) {
      this.picture = ''
    },
    done(){
      this.stepNow = 0;
      this.rid = '';
      this.aiResult = '';
      this.url = '';
      this.srcList = [];
      this.doctorResult = '',
      this.fileList = [],
      this.filelist2 = [],
      this.picture = '',
      this.conclusion = '',
      this.advice = '',
      this.csv = ''
    },
    getFuLLResult(){
      this.$axios({
        method: 'get',
        url: '/diagnosis/fullResult',
        params: {
          rid: this.rid
        }
      }).then(res=>{
        console.log(res);
        if(res.data.errno == 0){
          this.aiResult = res.data.data.rAiResult;
          this.conclusion = res.data.data.rConclusion;
        }

      })
    },
    addStep() {
      if(this.stepNow == 0){
        if(this.patient.pRealName == '' || this.patient.pGender == '' || this.patient.pAge == '')
          this.$message.warning('请选择患者');
        else
        this.stepNow++;
      }
      else if(this.stepNow == 1){
        if(this.rType == '0' && this.picture == '')
          this.$message.warning('请上传图片');
        else if(this.rType == '1' && this.csv == '')
          this.$message.warning('请上传CSV文件');
        else{
          this.stepNow++;
          this.getAIResult();
        }
          
      }
      else if(this.stepNow == 3){
        this.submitDoctorResult();
      }
      else if(this.stepNow == 4){
        this.getFuLLResult()
      }
    },
    decStep() {
      this.stepNow --;
      console.log(this.stepNow)
      if (this.stepNow === 2) {
        this.decStep()
      }
    },
    beforeImageUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt5M = file.size / 1024 / 1024 < 10;
      if (!isJPG && !isPNG) {
        this.$message.error('上传文件只能是 JPG/PNG 格式!');
      } else if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return (isJPG || isPNG) && isLt5M;
    },
    upLoadImage(file) {
      const formData = new FormData();
      formData.append('image', file.file);
      this.$axios({
        method: 'post',
        url: this.uploadImgUrl,
        data: formData,
      }).then(res => {
        console.log(res.data)
          switch (res.data.errno) {
            case 0:
              this.$message.success("上传成功！");
              var url = res.data.url;
              if(this.picture == '')
                this.picture = url;
              else
                this.picture = this.picture+ "," + url;
              break;
            default:
              this.$message.error("操作失败！");
              break;
          }
        })

    },
    upLoadFile(file) {
      const formData = new FormData();
      formData.append('file', file.file);
      this.$axios({
        method: 'post',
        url: this.upLoadFileUrl,
        data: formData,
      }).then(res => {
        console.log(res.data)
          if(res.data.errno == 0){
            this.$message.success("上传成功！");
            this.csv = res.data.path;
          }
          else
          this.$message.error("操作失败！");
        })

    },
    getAIResult(){
      const formData = new FormData();
      formData.append('imgURL', this.picture);
      formData.append('csvURL', this.csv);
      for (let key in this.ecgInfo){
        formData.append(key, this.ecgInfo[key])
      }
      formData.append('pid', this.patient.pid)
      this.$axios({
        method: 'post',
        url: "/diagnosis/aiResult",
        data: formData,
      }).then(res => {
        console.log(res.data)
        if(res.data.errno == 0 && this.ecgInfo.rType == 0){
          this.rid = res.data.data.rid
          this.aiResult = res.data.data.result
          this.srcList = res.data.data.rEcg
          this.url= this.srcList[0]
          this.stepNow++;
        }
        else if(res.data.errno == 0 && this.ecgInfo.rType == 1){
          this.rid = res.data.data.rid
          this.aiResult = res.data.data.result
          this.srcList = res.data.data.rEcg
          this.url= this.srcList[0]
          this.stepNow++;
        }
      })
    },
    submitDoctorResult(){
      const formData = new FormData();
      formData.append('rid', this.rid);
      formData.append('rConclusion', this.doctorResult);
      formData.append('rAdvice', this.advice);
      formData.append('did', this.$store.state.user.id);
      this.$axios({
        method: 'post',
        url: "/diagnosis/manual",
        data: formData,
      }).then(res => {
        console.log(res.data)
        if(res.data.errno == 0){
          this.$message.success("上传成功！");
          this.stepNow++;
          this.addStep();
        }
      })
    },
    remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.indexOf(query) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
    },
    getPatientList(){
      this.$axios({
        method: 'get',
        url: "/user/getPatientList",
      }).then(res => {
        console.log(res.data)
        if(res.data.errno == 0){
          this.states = res.data.data
          this.list = this.states.map(item => {
            return { value: `${item.pid}`, label: `姓名:${item.pRealName} `+ ` 年龄:${item.pAge}`, content: item };
          });
        }
      })
    },
    selectPatient(item){
      this.patient = item
      console.log()
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  padding-top: 60px;
}
.el-header{
  padding: 0!important;
  height: 70px!important;
  background: #141D41;
}
.step1 {
  width: 100%;
  height: 100%;
}
.btn {
  float: right;
  margin: 5vh 2vw 0 0;
}
.image-preview {
  margin: 5vh;
}
</style>

<style>
li.el-upload-list__item{
  height: 200px !important;
  width: 350px !important;
  padding: 10px 10px 10px 10px !important;
}
</style>