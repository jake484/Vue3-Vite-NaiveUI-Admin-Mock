<template>
  <div>
    <!-- 贴士 -->
    <n-alert title="贴士" type="info">
      这里没有完成视频中的需求，因为我没有问UP要源码，并且这部分的数据格式太难生成，同时这部分内容与前面的差距并不大，所以这里就仅放置了一个树形组件，以及它的显示。
    </n-alert>
    <!-- 树形组件 -->
    <n-tree block-line checkable cascade :data="data" :default-checked-keys="defaultCheckedKeys"
      @update:checked-keys="updateCheckedKeys" />
    <!-- 显示组件信息 -->
    <n-alert title="选择的数据" type="success" :model="authority">
      树形结构选择的数据为：{{ authority }}
    </n-alert>
  </div>
  <n-button @click="changeAuthority" size="large">返回角色列表</n-button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { useRoute,useRouter } from "vue-router";
import { AuthorityPage } from "@/type/authority";

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()   // 当前活跃的路由
    const params: any = route.params
    const authority_data = reactive(new AuthorityPage(params.id, params.authority))

    const changeAuthority = () => {
      router.push("role")
    }

    return {
      ...toRefs(authority_data),
      changeAuthority,
      // 树形组件格式
      data: [
        {
          label: 1,
          key: 1,
          children: [
            {
              label: 2,
              key: 2,
              children: [
                {
                  label: 3,
                  key: 3,
                },
                {
                  label: 4,
                  key: 4,
                },
              ]
            },
            {
              label: 5,
              key: 5,
              children: [
                {
                  label: 6,
                  key: 6,
                },
                {
                  label: 7,
                  key: 7,
                },
                {
                  label: 8,
                  key: 8,
                },
              ]
            }
          ]
        },
        {
          label: 9,
          key: 9,
          children: [
            {
              label: 10,
              key: 10,
              children: [
                {
                  label: 11,
                  key: 11,
                },
                {
                  label: 12,
                  key: 12,
                },
              ]
            },
            {
              label: 13,
              key: 13,
              children: [
                {
                  label: 14,
                  key: 14,
                },
                {
                  label: 15,
                  key: 15,
                },
                {
                  label: 16,
                  key: 16,
                },
              ]
            }
          ]
        },
      ],
      defaultCheckedKeys: ref([5]),
      updateCheckedKeys: (v: number[]) => {
        authority_data.authority = v
      }
    }
  }
}
)
</script>

<style lang="scss" scoped>
.btn {
  padding: 10px;
  padding-top: 10px;
}
</style>