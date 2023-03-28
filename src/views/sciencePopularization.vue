<template>
    <c-box>
    <top-guide></top-guide>
    <c-box style="padding:100px">
        <c-box >
            <el-row >
            <el-col :span="11">
                <div class="image-container">
                    <el-image
                    style="width: 350px; "
                    :src="require('@/assets/images/heart.png')"
                    class="bounce" ></el-image>
                </div>
                
            </el-col>
            <el-col :span="12">
                <c-heading  as="h1" size="xl">心电图（Electrocardiograph）</c-heading>
                <c-text>
                    心电图是心脏在每个运动周期中的生物电变化过程，是心脏往复活动的表现，是一种迅速、简便、安全、有效的无创性检查方法。
                </c-text>
                <c-text>
                    心电图检查对心血管疾病的诊断具有重要的意义：它对心律失常和传导障碍具有重要的诊断价值；对心肌炎、冠状动脉供血不足和心包炎的诊断有较大的帮助。心电图检查可应用于对各种心律失常、心室心房肥大、心肌梗死、心肌缺血等疾病的检查；可以反映心肌受损的程度和发展过程和心房、心室的功能结构情况；还能发现其他检查所不能发现的Brugada综合征、长QT和短QT综合征等，这些也是引发猝死的原因。
                </c-text>
                <c-text>
                    但需要注意的是心电图检查并不是万能的，有些心肌的损伤和功能的缺陷并不总能显示出来。对于心脏方面的预防性检查还需要结合多种检查项目，全面综合分析，才能做出正确的判断。目前心电图已普遍地被临床医生们广泛应用。
                </c-text>
            </el-col>
            </el-row>
        </c-box>
        <c-box  mt="50px">
            <el-row>
                <el-col :span="16" >
                    <c-box >
                        <c-heading  as="h1" size="lg">哪些患者需要做心电图检查?</c-heading>
                        <c-text>
                            凡是患者感到胸闷，心悸、心慌、头昏、眼花、心前区不适或疼痛等症状时都应做心电图检查。具体来说：
                        </c-text>
                        <c-text>
                            1.对于年龄较大、体格较胖、血压长期较高，以及血清胆固醇、血脂增高的人，即使无任何症状，也需进行心电图检查。
                        </c-text>
                        <c-text>
                            2.老年人因激动或饱餐等引起上腹部一过性疼痛时，应考虑心绞痛发作的可能，可描记心电图确定诊断。
                        </c-text>
                        <c-text>
                            3.对常表现为胸部灼烧感、闷胀感、压迫感、窒息感、沉重感、呼吸停顿感、刺痛、钝痛以及胸部无法描述的难受或表现为上肢无力、麻木、有蚁感等疼痛性质不典型的人，也应该及时去做心电图检查。
                        </c-text>
                        <c-text>
                            4.常感觉心悸、心慌、自觉心脏有停搏感的人，以及近期内患过较严重感染的人，应该去医院检查心电图。
                        </c-text>
                        <c-text>
                            5.年龄在40岁以上的人，即使无心脏病症状，也应进行心电图检查，以便日后一旦发病时对照。
                        </c-text>
                    </c-box>
                </el-col>
                <el-col :span="8">
                <el-image
                style="width: 350px; "
                :src="require('@/assets/images/doctor.png')"></el-image>
            </el-col>
            </el-row>
        </c-box>
        <c-box  mt="50px">
            <el-row>
                <el-col :span="8">
                    <el-image
                    style="width: 350px; "
                    :src="require('@/assets/images/doctor1.png')"></el-image>
                </el-col>
                <el-col :span="16" >
                    <c-box >
                        <c-heading  as="h1" size="lg">心电图检查注意事项</c-heading>
                        <c-text>
                            检查前不要饱食、空腹、吃冷饮或抽烟，以免影响心率和血压。
                        </c-text>
                        <c-text>
                            检查前要放松心情，不要剧烈运动或紧张兴奋，保持平静休息至少20分钟。
                        </c-text>
                        <c-text>
                            检查时要穿宽松的衣服，并摘下手表、手机等金属物品，防止干扰信号。
                        </c-text>
                        <c-text>
                            检查时要保持安静和不动，不要说话或咳嗽，避免肌肉震颤和呼吸干扰。
                        </c-text>
                    </c-box>
                </el-col>
            </el-row>
        </c-box>
        <c-box  mt="50px">
            <el-row>
                <el-col :span="16" >
                    <c-box >
                        <c-heading  as="h1" size="lg">常见诊断术语的意义</c-heading>
                        <c-heading size="sm">
                            1.窦性心律
                        </c-heading>
                        <c-text>
                            日常工作中几乎90%以上的心电图诊断报告中都要出现“窦性心律”这个术语，另许多患者感到不解，以为自己得了重病，造成不必要的紧张焦虑。其实，在心脏右心房上有一个特殊的小结节，由特殊细胞构成，叫做窦房结。它可以自动地、有节律地产生电激动，然后按心脏传导组织的顺序传送到心脏的各个部位，从而引起心肌细胞的收缩和舒张。人体正常的心跳就是从这里发出的，这就是心脏的“司令部”。窦房结每发生一次激动，心脏就跳动一次，在医学上称为“窦性心律”。所以，心脏正常的跳动就应该是窦性心律。
                        </c-text>
                        <c-heading size="sm">
                            2.ST-T改变
                        </c-heading>
                        <c-text>
                            心电图诊断报告中另一个高频词汇就是“ST-T改变”。是非特异性心肌复极异常的共同表现，大多数情况是由心肌缺血造成的。其他疾病如心肌病，心肌炎，瓣膜病，心包炎，脑血管意外(尤其是颅内出血)等均可以出现此类ST-T改变。低钾，高钾等电解质紊乱，药物(洋地黄，奎尼丁等)影响以及自主神经调节障碍也可以引起非特异ST-T改变。此外，心室肥大，束支传导阻滞，预激综合症等可引起继发性心ST-T改变。因此，在作出心肌缺血或冠状动脉供血不足的心电图诊断之前必须结合临床资料及表现进行鉴别诊断。
                        </c-text>
                    </c-box>
                </el-col>
                <el-col :span="8">
                <el-image
                style="width: 350px; "
                :src="require('@/assets/images/doctor2.png')"></el-image>
            </el-col>
            </el-row>
        </c-box>
        <c-box  mt="50px" >
            <c-heading  as="h1" size="lg">心电图怎么看？</c-heading>
            <c-text>
                实际心电图纸是由1mm*1mm的小方格组成
            </c-text>
            <c-text>
                横坐标代表时间，每1大格分为5小格每1小格=0.04s， 每1大格=0.2s
            </c-text>
            <c-text>
                横坐标代表时间，每1大格分为5小格每1小格=0.04s， 每1大格=0.2s
            </c-text>
            <el-row>
            <el-col :span="12">
                <el-image
                    style="width: 550px; "
                    :src="require('@/assets/images/ecg.jpg')"></el-image>
            </el-col>
            <el-col :span="12">
                <c-text>
                    P波：代表心房除极过程。P波前半部分是右心房，后半部分是左心房，因此P波异常反应心房的问题
                </c-text>
                <c-text>
                    QRS波：代表心室除极过程。宽大畸形的QRS波反应心室问题
                </c-text>
                <c-text>
                    QRS波：代表心室除极过程。宽大畸形的QRS波反应心室问题
                </c-text>
                <c-text>
                    Q-T间期：代表整个心室的活动过程。主要看校正后的Q-T期间
                </c-text>
                <c-text>
                    心率=60/P-P（或R-R）已知正常心率为60-100次/分因此正常心率间期为3-5大格（15-25小格）
                </c-text>
            </el-col>
            </el-row>
        </c-box>
        <c-box  mt="50px" >
            <c-heading  as="h1" size="lg">常见心电图结果</c-heading>
            
        </c-box>
    </c-box>
</c-box>
</template>

<script lang="js">
import { CBox, CButton, CHeading, CText} from '@chakra-ui/vue'
import topGuide from '@/components/topGuide.vue';
export default {
  name: 'sciencePopularization',
  components: {
    CBox,
    CButton,
    CHeading,
    CText,
    topGuide
  },
  data(){
    return{
    }
  }
}
</script>

<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  width: 300px;
  height: auto;
}

.bounce{
   animation-name : bounce ;
   animation-duration : .7s ;
   animation-iteration-count : infinite ;
}
  
@keyframes bounce{
   from { transform : translateY(0); }
   to { transform : translateY(-10px); }
}
</style>
