<template>
    <div>
        用户列表
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { getRoleList, getUserList } from "@/request/api";
export default defineComponent({
    setup() {

        const p_getUserList = () => {
            getUserList().then(res => {
                console.log(res)
                // user_data.user_list = res.data.data
            })
        }
        const p_getRoleList = () => {
            getRoleList().then(res => {
                console.log(res)
                // user_data.role_with_auth_list = res.data.data
            })
        }

        onMounted(() => {
            p_getUserList()  // 获取全部用户数据
            p_getRoleList()  // 获取全部角色数据
        })

        return {}
    }
})
</script>

<style scoped>

</style>