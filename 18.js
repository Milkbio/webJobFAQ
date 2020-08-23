let liTree = {
    name: 'liTree',
    props: ['data'],
    template: `<ul class="list">
                    <li v-for="(value, k) in data" :key="k">
                        <span class="collapse" :class="{collapsed: value.collapse}"
                            v-if="typeof(value) === 'object'"
                            @click="collapse(value)"></span>
                        <span v-if="k !== 'collapse'">{{k}}</span>
                        <span v-if="k !== 'collapse'">:</span>
                        <span v-if="typeof(value) !== 'object' && k !== 'collapse'">{{value}}</span>
                        <span v-if="typeof(value) === 'object'">{</span>
                        <span v-if="value.collapse">...</span>
                        <template v-if="typeof(value) === 'object' && !value.collapse">
                            <li-Tree :data="value"></li-Tree>
                        </template>
                        <span v-if="typeof(value) === 'object'">}</span>
                    </li>
                </ul>`,
    methods: {
        collapse(value) {
            value.collapse = !value.collapse
            console.log(value)
        }
    }
}
let app = new Vue({
    el: '#app',
    data: {
        jsonX: {},
        text: '{"level":"0","code":"0","message":"操作成功","data":{"id_certificate_type":{"2":"护照","3":"军官证","1":"身份证"},"education_level":{"5":"本科","2":"初中","4":"大专","6":"研究生","1":"小学及以下","3":"高中","7":"博士及以上"},"via_type":{"8":"后台分配","4":"WEB端","2":"IOS端","1":"安卓端","3":"微信端","7":"外部导入","5":"PC端","6":"移动端"},"express_code":{"shentong":"申通快递","quanfeng":"全峰快递","yousu":"优速快递","tnt":"TNT快递","shunfeng":"顺丰快递","huitong":"汇通快递","tiantian":"天天快递","ems":"EMS快递","dhl":"DHL快递","yunda":"韵达快递","yuantong":"圆通快递","jingdong":"京东快递","zhaijisong":"宅急送快递","zhongtong":"中通快递","pingyou":"中国邮政平邮","debang":"德邦物流","ups":"UPS快递","gnxb":"邮政国内小包"},"app_type":{"12":"销售端","7":"企业管理后台","22":"志愿者管理后台","9":"慈善赠药终端","4":"药店通","3":"我的大夫","6":"运营部管理后台","15":"数据研究院","8":"药店管理后台","16":"互联网医院-APP端","17":"CRM平台","2":"随时诊","11":"进货端","5":"配送通","13":"志愿者平台","10":"红心相通","14":"宝来通官网","1":"一药通"},"otc_type":{"1":"处方药","5":"乙双跨","2":"甲类","4":"乙类","3":"甲双跨","8":"受限"},"career_certificate_type":{"1":"军官","2":"残疾人","3":"教师","4":"学生","5":"低保"},"sms_type":{"8":"内容推送","7":"用户激活","6":"药店端修改交易密码","0":"允许再次发送的时间","4":"忘记手势密码","2":"用户注册","3":"修改手机号","5":"手机验证码登录","1":"忘记密码"},"sex":{"1":"男","0":"女"},"application_status":{"3":"资料审核未通过","6":"处方已提交","5":"资料审核已通过","1":"资料已提交","12":"已完成","15":"已拒绝","2":"资料审核中","13":"已取消","9":"处方已重新提交","7":"处方审核中","8":"处方审核未通过","11":"药品已发出","4":"资料已重新提交","10":"处方审核通过"},"receive_type":{"3":"邮寄","2":"代取","1":"到店自取","4":"在线快递"},"delivery_time":{"2":"只节假日送货","1":"只工作日送货","3":"工作日和节假日均可送货"},"pay_mode":{"0":"在线支付","1":"货到付款","2":"到店自取"},"pay_type":{"3":"支付宝","0":"其他","1":"微信支付","2":"银联卡"},"charity_patient_source":{"2":"线上","1":"线下"},"dict_id":{"5":"药师职称","3":"售药单位","1":"药品单位","4":"医生职称","7":"银行类型","0":"管理CODE","6":"援助类型","2":"科室"},"receiptor_type":{"1":"自己","2":"其他","4":"在线快递","3":"邮寄/快递"},"hospital_qualification":{"21":"二级丙等","11":"一级丙等","34":"三级特等","22":"二级乙等","12":"一级乙等","31":"三级丙等","13":"一级甲等","32":"三级乙等","33":"三级甲等","23":"二级甲等"},"fee_mode":{"3":"免收费用","1":"代收货款","4":"到店自取","2":"仅运费到付"},"order_status":{"2":"待发货","6":"交易成功","3":"待收货","4":"已关闭","1":"待付款","9":"设为无效"},"user_status":{"6":"未激活","5":"删除","1":"活动","2":"锁定","3":"注销","4":"冻结"}}}',
        show: false
    },
    components: {
      liTree
    },
    methods: {
        isJSONString(s) {
            return new Promise((resolve, reject) => {
                try {
                    if (typeof JSON.parse(s) == "object") {
                        resolve()
                    } else {
                        reject(new Error('请输入正确的JSON字符串'))
                    }
                } catch(err) {
                    reject(err)
                }
            })

        },
        convert() {
            this.isJSONString(this.text).then(() => {
                let json = JSON.parse(this.text)
                this.insertData(json)
                this.jsonX = json
                this.show = true
            }).catch(err => {
                alert(err)
            })
        },
        insertData(obj) {
            if (typeof obj === 'object') {
                obj['collapse'] = false
            }
            for (let i in obj) {
                if (typeof obj[i] === 'object') {
                    this.insertData(obj[i])
                }
            }
        }
    }
    /*created () {
        insertData(json)
        this.jsonX = json
    }*/
})
