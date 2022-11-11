<template>
  <n-layout>
    <n-layout-header>
      <n-grid x-gap="12" :cols="8">
        <n-gi span=2>
          <img src="../assets/logo.svg" class="logo">
        </n-gi>
        <n-gi span=5>
          <h2>后台管理系统</h2>
        </n-gi>
        <n-gi span=1>
          <span class="quit-login">退出登录</span>
        </n-gi>
      </n-grid>
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider>
        <n-menu :options="menuOptions" @update:value="handleUpdateValue"
          style="--n-item-height:60px;--n-item-text-color:#ffffff;--n-font-size:20px" />
      </n-layout-sider>
      <n-layout-content content-style="padding: 5px;">
        <router-view></router-view>
      </n-layout-content>
    </n-layout>
    <!-- <n-layout-footer>成府路</n-layout-footer> -->
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'
import { useRouter, RouterLink } from "vue-router"
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
    const handleUpdateValue = (key: string, item: MenuOption) => {
      router.push(key)
    }
    return {
      activeKey: ref<string | null>(null),
      menuOptions,
      need_list,
      handleUpdateValue
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