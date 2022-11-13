<template>
    <div>
        <n-form inline :label-width="100" :model="selected_data" class="good-search">
            <n-form-item label="用户昵称" label-placement="left">
                <n-input v-model:value="selected_data.nickName" placeholder="请输入用户昵称" />
            </n-form-item>
            <n-form-item label="用户角色" label-placement="left">
                <n-select v-model:value="selected_data.role" placeholder="搜索歌曲" :options="options" />
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

import { defineComponent, onMounted, toRefs, reactive, h, watch } from 'vue'
import { getRoleList, getUserList } from "@/request/api";
import { UserPages } from "@/type/user";
import type { IUser, UserRowData } from "@/type/user";
import type { IRole } from "@/type/role"
import { NTag, NButton} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

const createColumns = ({ toChageData }: { toChageData: (rowData: UserRowData) => void }): DataTableColumns<UserRowData> => {
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
                const tags = row.role.map((tagKey: string) => {
                    return h(
                        NTag,
                        {
                            style: {
                                marginRight: '6px'
                            },
                            type: 'primary',
                            bordered: false
                        },
                        {
                            default: () => tagKey
                        }
                    )
                })
                return tags
            }
        },
        {
            title: '操作',
            key: 'actions',
            render(row) {
                return h(
                    NButton,
                    {
                        size: 'large',
                        type: 'info',
                        style: {
                            "--n-width": '120px'
                        },
                        onClick: () => toChageData(row)
                    },
                    { default: () => '编辑' }
                )
            }
        }
    ]
}

export default defineComponent({
    setup() {
        const user_data = reactive(new UserPages())
        const getShowData = (datalist: IUser[]) => {
            const len = datalist.length
            const data: UserRowData[] = new Array(len)
            for (var i = 0; i < len; i++) {
                data[i] = {
                    key: i,
                    id: datalist[i].id,
                    userName: datalist[i].userName,
                    nickName: datalist[i].nickName,
                    role: datalist[i].role.map((role: IRole) => { return role.roleName })
                }
            }
            return data
        }
        const p_getUserList = () => {
            getUserList().then(res => {
                const userdata: IUser[] = res.data.data
                user_data.user_list = res.data.data
                user_data.showUser = getShowData(userdata)
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
        // 点击查询用户按钮时触发
        const onSubmit = () => {
            let search_res: IUser[] = []  // 接受查询用户se的结果
            if (user_data.selected_data.nickName || user_data.selected_data.role) {
                if (user_data.selected_data.nickName) {
                    search_res = user_data.user_list.filter((value) => {
                        return value.nickName.indexOf(user_data.selected_data.nickName) !== -1
                    })
                }
                if (user_data.selected_data.role) {
                    console.log(user_data.selected_data.role)
                    search_res = user_data.selected_data.nickName ? search_res : user_data.user_list
                    search_res = search_res.filter((value) => {
                        return value.role.find((item) => item.role === user_data.selected_data.role)
                    })
                }
            }
            else {
                search_res = user_data.user_list
            }
            user_data.showUser = getShowData(search_res)
        }

        watch([() => user_data.selected_data.nickName, () => user_data.selected_data.role], () => {
            if (user_data.selected_data.nickName === "" || user_data.selected_data.role === 0) {
                p_getUserList()
            }
        })
        return {
            ...toRefs(user_data),
            options: [
                {
                    label: '全部',
                    value: 0
                },
                {
                    label: '管理员',
                    value: 1
                },
                {
                    label: '普通用户',
                    value: 2
                }
            ],
            columns: createColumns({
                toChageData(rowData) {
                    console.log("hh")
                }
            }),
            pagination: { pageSize: 10 },
            onSubmit
        }
    }
}
)
</script>

<style lang="scss" scoped>
.n-select {
    width: 220px;
}
</style>