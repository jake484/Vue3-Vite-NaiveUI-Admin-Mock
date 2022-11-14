<template>
  <div>
    <!-- 添加角色 -->
    <n-form inline :label-width="100" class="good-search">
      <n-form-item label-placement="left">
        <n-button @click="addFormEidt = true" type="info">
          添加角色
        </n-button>
      </n-form-item>
    </n-form>
    <!-- 数据表格 -->
    <n-data-table :bordered="true" :single-line="false" :columns="columns" :data="role_list" :pagination="pagination" />

    <n-modal v-model:show="addFormEidt" preset="dialog" title="编辑权限" positive-text="添加" negative-text="取消" type="info"
      showIcon=false @positive-click="onAddRole">
      <n-form-item label="角色名称" label-placement="left">
        <n-input v-model:value="addedName" placeholder="请输入角色名称" />
      </n-form-item>
    </n-modal>
    <!-- 编辑权限表单 -->
  </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, toRefs, reactive, h } from 'vue'
import { getRoleList } from "@/request/api";
import { RolePages } from "@/type/role";
import type { IRoleWithAuth } from "@/type/role"
import { NTag, NButton } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

// 定义表格列属性
const createColumns = ({ toChageData }: { toChageData: (rowData: IRoleWithAuth) => void }): DataTableColumns<IRoleWithAuth> => {
  return [
    {
      title: 'Id',
      key: 'roleId'
    },
    {
      title: '角色名',
      key: 'roleName'
    },
    {
      title: '权限',
      key: 'authority',
      render(row) {
        const tags = row.authority.map((tagKey) => {
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
                            "--n-width": '160px'
                        },
                        onClick: () => {
                            // chageShow()
                            toChageData(row)
                        }
                    },
                    { default: () => '修改权限' }
                )
            }
        }
  ]
}

export default defineComponent({
  setup() {
    const role_data = reactive(new RolePages())

    const p_getRoleList = () => {
      getRoleList().then(res => {
        role_data.role_list = res.data.data
      })
    }
    onMounted(() => {
      p_getRoleList()  // 获取全部角色数据
    })
    const onAddRole = () => {
      role_data.role_list.push({
        roleId: role_data.role_list.length + 1,
        authority: [],
        roleName: role_data.addedName
      })
    }
    return {
      ...toRefs(role_data),
      columns: createColumns({
        toChageData(rowData) {
          // role_data.editUser.id = rowData.id
          // role_data.editUser.role = rowData.role.map((role: IRole) => { return role.role })
          // role_data.editUser.nickName = rowData.nickName
          // role_data.editUser.userName = rowData.userName
          console.log(rowData)
        }
      }),
      // 展示列
      pagination: { pageSize: 10 },
      onAddRole,
    }
  }
}
)
</script>

<style lang="scss" scoped>
.n-select {
  width: 220px;
}

.n-dialog {
  width: 600px;
}

.good-search {
  width: 49%;
  padding: 10px;
}
</style>