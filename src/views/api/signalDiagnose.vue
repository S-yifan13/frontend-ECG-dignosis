<template>
    <div>
    <TopGuide></TopGuide>
    <c-box class="imgDia">
        <c-text fontSize="28px" mt="20px" fontWeight="bold" color="rgb(64,158,255)" display="inline">心电信号诊断</c-text>
        <el-button type="primary" style="float:right;" @click="getAIResult" :disabled="!csv">
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
              :action=upLoadFileUrl
              :http-request="upLoadFile"
              >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传csv文件，文件格式要求：文件中有两列，第一列为样本点序号，第二列为样本点值</div>
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
            upLoadFileUrl: '/api/rs/file/upload',
            fileList: [],
            csv: '',
            result: '',
            rType: 1,
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
            formData.append('csvURL', this.csv);
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
    margin-top: 40px;
    padding-left: 15%;
    padding-right: 15%;
    overflow: auto;
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

