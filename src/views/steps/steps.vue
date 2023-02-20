<template>
  <div class="bg">
    <el-container>
      <el-header style="background-color: green">
        <top-guide />
      </el-header>
      <el-main>
        <el-steps :active="this.stepNow" align-center>
          <el-step title="上传心电图" icon="el-icon-upload"></el-step>
          <el-step title="AI辅助诊断" icon="el-icon-upload"></el-step>
          <el-step title="人工诊断" icon="el-icon-picture"></el-step>
          <el-step title="完成" icon="el-icon-picture"></el-step>
        </el-steps>
        <div class="step1" v-show="stepNow === 0 || stepNow === 1">
          <el-upload
            v-loading="stepNow===1"
            element-loading-text="AI辅助诊断中"
            align-center
            class="upload"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-button type="primary" plain round @click="addStep">下一步</el-button>
<!--          <el-button type="primary" plain round @click="addStep" v-show="stepNow === 0">下一步</el-button>-->
        </div>
        <div class="step3" v-show="this.stepNow === 2">
          <el-container>
            <el-aside>
              <div class="demo-image__preview">
                <el-image
                  style="width: 200px; height: 200px"
                  :src="url"
                  :preview-src-list="srcList">
                </el-image>
              </div>
            </el-aside>
            <el-main>
              <span>AI辅助诊断结果为：</span>
              <el-input
                type="textarea"
                :autosize="{ minRows: 20, maxRows: 20}"
                placeholder="请输入内容"
                v-model="doctorResult">
              </el-input>
            </el-main>
          </el-container>
          <el-button type="primary" plain round @click="decStep">上一步</el-button>
          <el-button type="primary" plain round @click="addStep">提交</el-button>
        </div>
        <div class="step4" v-show="this.stepNow === 3">
          <span>AI辅助诊断结果为：</span>
          <p><span>医生诊断结论：</span></p>
          <el-button type="primary" plain round @click="decStep">上一步</el-button>
          <el-button type="primary" plain round>完成</el-button>
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
      stepNow: 0,
      imageUrl: '',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      doctorResult: '',
    };
  },
  methods: {
    addStep() {
      this.stepNow ++;
      console.log(this.stepNow)
    },
    decStep() {
      this.stepNow --;
      console.log(this.stepNow)
      if (this.stepNow === 1) {
        this.decStep()
      }
    }
  }
}
</script>

<style scoped>

</style>
