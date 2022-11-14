<template>
    <div>
        <!-- 查询表单 -->
        <n-form inline :label-width="100" :model="selected_data" class="user-search">
            <n-form-item label="用户昵称" label-placement="left">
                <n-input v-model:value="selected_data.nickName" placeholder="请输入用户昵称" />
            </n-form-item>
            <n-form-item label="用户角色" label-placement="left">
                <n-select v-model:value="selected_data.role" :options="optionsSelector" />
            </n-form-item>
            <n-form-item label-placement="left">
                <n-button @click="onSubmit" type="primary">
                    查询
                </n-button>
            </n-form-item>
            <n-form-item label-placement="left">
                <n-button @click="reset" type="info">
                    重置
                </n-button>
            </n-form-item>
        </n-form>
        <!-- 数据表格 -->
        <n-data-table :bordered="true" :single-line="false" :columns="columns" :data="showUser"
            :pagination="pagination" />
        <!-- //编辑权限表单 -->
        <n-modal v-model:show="editShow" preset="dialog" title="编辑权限" positive-text="确认更改" negative-text="取消修改"
            type="info" showIcon=false @positive-click="ensureEditUser">
            <n-form-item label="用户昵称" label-placement="left">
                <n-input v-model:value="editUser.nickName" placeholder="用户昵称" />
            </n-form-item>
            <n-form-item label="用户角色" label-placement="left">
                <n-select v-model:value="editUser.role" multiple :options="optionsEditor" />
            </n-form-item>
        </n-modal>
    </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, toRefs, reactive, h, watch } from 'vue'
import { getRoleList, getUserList } from "@/request/api";
import { UserPages } from "@/type/user";
import type { IUser, UserRowData } from "@/type/user";
import type { IRole } from "@/type/role"
import { NTag, NButton } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

// 定义表格列属性
const createColumns = ({ toChageData }: { toChageData: (rowData: UserRowData) => void }, { chageShow }: { chageShow: () => void }): DataTableColumns<UserRowData> => {
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
                const tags = row.role.map((tagKey: IRole) => {
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
                            default: () => tagKey.roleName
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
                            "--n-width": '160px'
                        },
                        onClick: () => {
                            chageShow()
                            toChageData(row)
                        }
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
        // 额外添加了一层数据结构，这一层不是必须的
        const getShowData = (datalist: IUser[]) => {
            const len = datalist.length
            const data: UserRowData[] = new Array(len)
            for (var i = 0; i < len; i++) {
                data[i] = {
                    key: i,
                    id: datalist[i].id,
                    userName: datalist[i].userName,
                    nickName: datalist[i].nickName,
                    // role: datalist[i].role.map((role: IRole) => { return role.roleName })
                    role: datalist[i].role
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
        const ensureEditUser = () => {
            console.log(user_data.editUser)
            user_data.editShow = false
            let obj: any = user_data.user_list.find((value) => value.id === user_data.editUser.id)
            obj.nickName = user_data.editUser.nickName
            obj.role.splice(0, obj.role.length)  // 清除角色
            for (let item of user_data.role_with_auth_list) {
                if (user_data.editUser.role.find((value) => value === item.roleId)) {
                    obj.role.push({
                        role: item.roleId,  // 角色id
                        roleName: item.roleName  // 角色名称
                    })
                }
            }
        }
        const p_getRoleList = () => {
            getRoleList().then(res => {
                console.log(res.data.data)
                user_data.role_with_auth_list = res.data.data
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
        const reset = () => {
            user_data.selected_data.nickName = ""
            user_data.selected_data.role = 0
        }
        watch([() => user_data.selected_data.nickName, () => user_data.selected_data.role], () => {
            if (user_data.selected_data.nickName === "" || user_data.selected_data.role === 0) {
                p_getUserList()
            }
        })
        return {
            ...toRefs(user_data),
            //选择框选项
            optionsSelector: [
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
            //选择框选项
            optionsEditor: [
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
                    user_data.editUser.id = rowData.id
                    user_data.editUser.role = rowData.role.map((role: IRole) => { return role.role })
                    user_data.editUser.nickName = rowData.nickName
                    user_data.editUser.userName = rowData.userName
                    console.log(rowData)
                }
            },
                {
                    chageShow() {
                        user_data.editShow = true
                    }
                }),
            // 展示列
            pagination: { pageSize: 10 },
            onSubmit,
            ensureEditUser,
            reset
        }
    }
}
)
</script>

<style lang="scss" scoped>
.n-select {
    width: 220px;
}
.user-search {
    width: 49%;
    padding: 10px;
}
.n-dialog__content {
    .n-select {
        width: 320px;
    }
}
</style>