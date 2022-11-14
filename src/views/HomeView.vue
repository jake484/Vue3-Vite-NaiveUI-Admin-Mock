<template>
  <n-layout>
    <!-- 标题栏 -->
    <n-layout-header>
      <n-grid x-gap="12" :cols="8">
        <n-gi span=2>
          <img src="../assets/logo.svg" class="logo">
        </n-gi>
        <n-gi span=5>
          <h2>后台管理系统</h2>
        </n-gi>
        <n-gi span=1>
          <span class="quit-login">
            <!-- 弹出框 -->
            <n-popconfirm positive-text="确定" negative-text="点错了"
              @positive-click="delToken">
              <template #trigger>
                <n-button type="info">退出登录</n-button>
              </template>
              确定退出？
            </n-popconfirm>
          </span>
        </n-gi>
      </n-grid>
    </n-layout-header>

    <n-layout has-sider>

      <!-- 侧栏 -->
      <n-layout-sider>
        <n-menu :options="menuOptions" @update:value="handleUpdateValue"
          style="--n-item-height:60px;--n-item-text-color:#ffffff;--n-font-size:20px" />
      </n-layout-sider>

      <!-- 内容 -->
      <n-layout-content content-style="padding: 5px;">
        <router-view></router-view>
      </n-layout-content>

    </n-layout>

    <!-- 底部 -->
    <n-layout-footer>
      <p style="text-align:center">Copyright©2022. Created by jake484. MIT licence</p>
    </n-layout-footer>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from "vue-router"
import type { MenuOption } from 'naive-ui'

export default defineComponent({
  setup() {
    const router = useRouter()
    const need_list = router.getRoutes().filter(v => v.meta.isShow)
    const menuOptions: MenuOption[] = new Array(need_list.length)
    for (var i = 0; i < need_list.length; i++) {
      menuOptions[i] = {
        label: need_list[i].meta.title,
        key: need_list[i].path?.toString()
      }
    }
    // 路由
    const handleUpdateValue = (key: string, item: MenuOption) => {
      router.push(key)
    }
    // 删除token
    const delToken = () => {
      localStorage.removeItem("token")
      router.push("/login")
    }
    return {
      activeKey: ref<string | null>(null),
      menuOptions,
      need_list,
      handleUpdateValue,
      delToken
    }
  }
})
</script>


<style lang="scss">
.n-layout-header {
  height: 80;
  background-color: #666;

  .logo {
    height: 80px;
  }

  h2,
  .quit-login {
    text-align: center;
    line-height: 80px;
    height: 80px;
    color: #fff;
  }
}

.n-layout-sider {
  .n-menu {
    height: calc(100vh - 80px);
    background-color: rgb(31, 28, 28);
    color: #fff;
  }
}
</style>