<template>
  <div class="bg">
    <el-container>
      <el-header style="background-color:	#4169E1; height: 10vh">
        <top-guide />
      </el-header>
      <el-main class="main">
        <el-steps :active="this.stepNow" align-center>
          <el-step title="上传心电图" icon="el-icon-upload"></el-step>
          <el-step title="AI辅助诊断" icon="el-icon-upload"></el-step>
          <el-step title="人工诊断" icon="el-icon-picture"></el-step>
          <el-step title="诊断结论" icon="el-icon-picture"></el-step>
        </el-steps>
        <div class="step1" v-show="stepNow === 0 || stepNow === 1">
          <div class="upload">
            <el-upload
              v-loading="stepNow===1"
              element-loading-text="AI辅助诊断中"
              align-center
              drag
              :file-list="fileList"
              :action=uploadImgUrl
              :http-request="upLoadImage"
              :before-upload="beforeImageUpload"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过20Mb</div>
            </el-upload>

          </div>
          <el-button class="btn" type="primary" plain round @click="addStep">下一步</el-button>
<!--          <el-button type="primary" plain round @click="addStep" v-show="stepNow === 0">下一步</el-button>-->
        </div>
        <div class="step3" v-show="this.stepNow === 2">
          <el-container>
            <el-aside>
              <div class="image-preview">
                <el-image
                  style="width: 200px; height: 200px"
                  :src="url"
                  :preview-src-list="srcList">
                </el-image>
              </div>
            </el-aside>
            <el-main>
              <p style="margin: 2vh 0;">AI辅助诊断结果为：{{ aiResult }}</p>
              <el-input
                type="textarea"
                :autosize="{ minRows: 15, maxRows: 15}"
                placeholder="请输入诊断结果"
                v-model="doctorResult">
              </el-input>
            </el-main>
          </el-container>
          <el-button class="btn" type="primary" plain round @click="addStep">提交</el-button>
          <el-button class="btn" type="primary" plain round @click="decStep">上一步</el-button>
        </div>
        <div class="step4" v-show="this.stepNow === 3">
          <el-row style="margin-top:60px">
            <el-col span="12">
              <el-image
                style="width: 400px; height: 300px; margin-left: 100px"
                :src="url"
                :preview-src-list="srcList">
              </el-image>
            </el-col>
            <el-col span="12">
              <p style="margin: 5vh 0;">AI辅助诊断结果为：{{ aiResult }}</p>
              <p style="margin: 5vh 0;"><span>医生诊断结论：{{ conclusion }}</span></p>
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
export default {
  name: "steps",
  components: {TopGuide},
  data() {
    return {
      stepNow: 3,
      uploadImgUrl: 'http://127.0.0.1:8000/api/rs/image/upload',
      url: '',
      srcList: [],
      doctorResult: '',
      fileList:[],
      picture:'',
      rid:'',
      aiResult:'',
      conclusion:'',
    };
  },
  methods: {
    done(){
      this.stepNow = 0;
      this.rid = '';
      this.aiResult = '';
      this.url = '';
      this.srcList = [];
      this.doctorResult = '',
      this.fileList = [],
      this.picture = '',
      this.conclusion = ''
    },
    getFuLLResult(){
      this.$axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/diagnosis/fullResult',
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
        if(this.picture == '')
          this.$message.warning('请上传图片');
        else{
          this.stepNow++;
          this.getAIResult();
        }
          
      }
      else if(this.stepNow == 2){
        this.submitDoctorResult();
      }
      else if(this.stepNow == 3){
        this.getFuLLResult()
      }
    },
    decStep() {
      this.stepNow --;
      console.log(this.stepNow)
      if (this.stepNow === 1) {
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
              this.srcList.push(url)
              this.url=this.srcList[0]
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
    getAIResult(){
      const formData = new FormData();
      formData.append('imgURL', this.picture);
      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/diagnosis/aiResult",
        data: formData,
      }).then(res => {
        console.log(res.data)
        if(res.data.errno == 0){
          this.rid = res.data.data.rid
          this.aiResult = res.data.data.result
          this.stepNow++;
        }
      })
    },
    submitDoctorResult(){
      const formData = new FormData();
      formData.append('rid', this.rid);
      formData.append('rConclusion', this.doctorResult);
      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/diagnosis/manual",
        data: formData,
      }).then(res => {
        console.log(res.data)
        if(res.data.errno == 0){
          this.$message.success("上传成功！");
          this.stepNow++;
          this.addStep();
        }
      })
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}
.step1 {
  width: 100%;
  height: 100%;
}
.upload {
  width: fit-content;
  margin: 15vh auto 0 auto;
}
.btn {
  float: right;
  margin: 5vh 2vw 0 0;
}
.image-preview {
  margin: 5vh;
}
</style>
