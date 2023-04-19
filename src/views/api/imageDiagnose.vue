<template>
    <div>
    <TopGuide></TopGuide>
    <c-box class="imgDia">
        <c-text fontSize="28px" mt="20px" fontWeight="bold" color="rgb(64,158,255)" display="inline">心电图诊断</c-text>
        <el-button type="primary" style="float:right;" @click="getAIResult" :disabled="!picture">
            AI诊断
        </el-button>
        <c-box mt="20px">
            <c-text fontSize="18px"  fontWeight="bold" v-if="result!=''" display="inline">
                诊断结果： 
            </c-text>
            <c-text fontSize="18px" display="inline">
                {{ result }} 
            </c-text>
        </c-box>
        <c-box class="uploader">
            <el-upload
              element-loading-text="AI诊断中"
              drag
              :file-list="fileList"
              :action=uploadImgUrl
              :http-request="upLoadImage"
              list-type="picture"
              multiple>
              <i class="el-icon-upload"></i>
              <div slot="file" slot-scope="{file}">
                  <el-image :src="file.url" :preview-src-list="[file.url]" fit="scale-down">
                  </el-image>
              </div>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传png文件</div>
            </el-upload>
    </c-box>
    </c-box>
    </div>
</template>

<script>
import { CText, CInput, CBox } from '@chakra-ui/vue'
import TopGuide from '@/components/topGuide.vue';
export default {
    components: {
        CText, CInput, CBox, TopGuide,
    },
    data() {
        return {
            uploadImgUrl: '/api/rs/image/upload',
            fileList: [],
            picture: '',
            result: '',
            rType: 0,
        }
    },
    methods: {
        imgDiagnose(){
            console.log(1)
        },
        handleSuccess(response, file, fileList) {
            // 处理上传成功的逻辑
            // response 是上传成功后服务器返回的数据，可以根据需求进行处理
            console.log("上传成功", response);
        },
        upLoadImage(file) {
            this.result = ''
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
        getAIResult(){
            const formData = new FormData();
            formData.append('imgURL', this.picture);
            formData.append('rType', this.rType);
            
            this.$axios({
                method: 'post',
                url: "/diagnosis/aiResult",
                data: formData,
            }).then(res => {
                console.log(res.data)
                if(res.data.errno == 0){
                    this.result = res.data.data.result
                }
            })
        },
    }
}

</script>

<style scoped>
.imgDia {
    padding-left: 15%;
    padding-right: 15%;
    overflow: auto;
    margin-top: 40px;
}


.uploader{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}


</style>

<style>
.imgDia .el-upload-dragger{
    width: 70vw !important;
}
.imgDia li.el-upload-list__item{
  height: 95% !important;
  width: 100% !important;
  padding: 10px 10px 10px 10px !important;
}
</style>

