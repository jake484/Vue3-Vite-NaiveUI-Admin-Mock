<template>
    <div>
        <n-form inline :label-width="100" :model="selected_data" class="good-search">
            <n-form-item label="用户昵称" path="user.name" label-placement="left">
                <n-input v-model:value="selected_data.nickName" placeholder="请输入用户昵称" />
            </n-form-item>
            <n-form-item label="用户角色" path="user.age" label-placement="left">
                <n-select v-model:value="selected_data.role" multiple :options="options" />
            </n-form-item>
            <n-form-item label-placement="left">
                <n-button @click="onSubmit">
                    查询
                </n-button>
            </n-form-item>
        </n-form>
        <n-data-table :bordered="true" :single-line="false" :columns="columns" :data="showUser"
            :pagination="pagination" />
    </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, toRefs, reactive, h } from 'vue'
import { getRoleList, getUserList } from "@/request/api";
import { UserPages } from "@/type/user";
import type { IUser, UserRowData } from "@/type/user";
import type {IRole} from "@/type/role"
import { NTag, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

const createColumns = (): DataTableColumns<UserRowData> => {
    return [
        {
            title: 'Id',
            key: 'id'
        },
        {
            title: '昵称',
            key: 'nickName'
        },
        {
            title: '用户名称',
            key: 'userName'
        },
        {
            title: '角色',
            key: 'role',
            render(row) {
                const tags = row.role.map((tagKey:string) => {
                    return h(
                        NTag,
                        {
                            style: {
                                marginRight: '6px'
                            },
                            type: 'info',
                            bordered: false
                        },
                        {
                            default: () => tagKey
                        }
                    )
                })
                return tags
            }
        }
    ]
}

export default defineComponent({
    setup() {
        const user_data = reactive(new UserPages())

        const p_getUserList = () => {
            getUserList().then(res => {

                const udata = res.data.data
                const len = udata.length
                const data: UserRowData[] = new Array(len)
                for (var i = 0; i < len; i++) {
                    data[i] = {
                        key: i,
                        id: udata[i].id,
                        userName: udata[i].userName,
                        nickName: udata[i].nickName,
                        role: udata[i].role.map((role:IRole) => { return role.roleName})
                    }
                }
                user_data.showUser = data
                console.log(data)
                user_data.user_list = udata
            })
        }

        const p_getRoleList = () => {
            getRoleList().then(res => {
                // console.log(res)
                // user_data.role_with_auth_list = res.data.data
            })
        }

        onMounted(() => {
            p_getUserList()  // 获取全部用户数据
            p_getRoleList()  // 获取全部角色数据
        })

        return {
            ...toRefs(user_data),
            options: [
                {
                    label: '管理员',
                    value: 1
                },
                {
                    label: '普通用户',
                    value: 2
                }
            ],
            columns: createColumns(),
            pagination: { pageSize: 10 }
        }
    }
})
</script>

<style lang="scss" scoped>
.n-select {
    width: 220px;
}
</style>