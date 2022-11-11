<template>
    <div class="login-box">
        <n-form ref="formRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
            <h2>管理系统</h2>
            <n-form-item path="username" label="账号">
                <n-input v-model:value="ruleForm.username" @keydown.enter.prevent />
            </n-form-item>
            <n-form-item path="password" label="密码">
                <n-input v-model:value="ruleForm.password" type="password" @keydown.enter.prevent :maxlength="8" />
            </n-form-item>
            <n-row :gutter="[0, 24]">
                <n-col :span="24">
                    <div style="display: flex; justify-content: space-between">
                        <n-button :disabled="ruleForm.username === '' || ruleForm.password === ''" round type="info"
                            @click="submitForm" class="loginBtn">
                            登录
                        </n-button>

                        <n-button round dash @click="resetForm" class="loginBtn">
                            重置输入
                        </n-button>
                    </div>
                </n-col>
            </n-row>
        </n-form>

        <!-- <pre>{{ JSON.stringify(model, null, 2) }}</pre> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { login } from "../request/api";
import { LoginData } from '../type/login'
import {useRouter} from "vue-router";
export default defineComponent({
    setup() {

        const router = useRouter()
        const formRef = ref<FormInst>()

        const resetForm = () => {
            data.ruleForm.username = ""
            data.ruleForm.password = ""
        }

        const data = reactive(new LoginData());

        const rules: FormRules = {
            username: [
                {
                    required: true,  //是否必须字段
                    message: "请输入用户名",   // 触发的提示信息
                    trigger: "blur"   // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
                },
                {
                    min: 3,   // 最小字符书
                    max: 10,   // 最大字符数
                    message: "用户名长度需要在3-10个字符之间",  // 触发的提示信息
                    trigger: "blur"
                }
            ],
            password: [
                {
                    required: true,  //是否必须字段
                    message: "请输入密码",   // 触发的提示信息
                    trigger: "blur"   // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
                },
                {
                    min: 4,   // 最小字符书
                    max: 20,   // 最大字符数
                    message: "密码长度需要在4-8个字符之间",  // 触发的提示信息
                    trigger: "blur"
                }
            ]
        }

        const submitForm = (e: MouseEvent) => {
            e.preventDefault()
            formRef.value?.validate((errors) => {
                if (!errors) {
                    console.log(data.ruleForm)
                    login(data.ruleForm).then((res) => {
                        // 将token进行保存
                        localStorage.setItem("token", res.data.token)
                        // // 跳转页面
                        router.push('/')
                    })
                } else {
                    console.log(errors)
                }
            })
        }

        return {
            ...toRefs(data),
            resetForm,
            rules,
            formRef,
            submitForm
        }
    }
})
</script>

<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpg");
    padding: 1px;

    .demo-ruleForm {
        width: 500px;
        margin: 200px auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 40px;
    }

    h2 {
        margin-bottom: 2px;
        text-align: center;
    }
}

.loginBtn {
    width: 49%;
}
</style>