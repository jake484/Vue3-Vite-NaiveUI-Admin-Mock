<template>
    <div>
        <n-form inline :label-width="100" :model="selected_data" class="good-search">
            <n-form-item label="商品名称" path="user.name" label-placement="left">
                <n-input v-model:value="selected_data.title" placeholder="请输入商品名称" />
            </n-form-item>
            <n-form-item label="商品详情" path="user.age" label-placement="left">
                <n-input v-model:value="selected_data.introduce" placeholder="请输入商品详情" />
            </n-form-item>
            <n-form-item label-placement="left">
                <n-button @click="handleValidateClick">
                    查询
                </n-button>
            </n-form-item>
        </n-form>
        <n-data-table :bordered="true" :single-line="false" :columns="columns" :data="goods_list"
            :pagination="pagination" />
    </div>
</template>

<script lang="ts">

import { computed, defineComponent, onMounted, reactive, toRefs, watch, h } from 'vue'
import { GoodsPages } from "@/type/goods";
import type { IQueryGoods } from "@/type/goods";
import { getGoodsList } from '@/request/api';
import { NTag, NButton, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

const createColumns = (): DataTableColumns<IQueryGoods> => {
    return [
        {
            title: 'ID',
            key: 'id'
        },
        {
            title: 'Title',
            key: 'title'
        },
        {
            title: 'Introduce',
            key: 'introduce'
        }
    ]
}

export default defineComponent({
    setup() {
        const goods_data = reactive(new GoodsPages())
        getGoodsList().then(res => {
            const gdata = res.data.data
            const len = gdata.length
            const data: IQueryGoods[] = new Array(len)
            for (var i = 0; i < len; i++) {
                data[i] = {
                    key: i,
                    id: gdata[i].id,
                    title: gdata[i].title,
                    introduce: gdata[i].introduce,
                }
            }
            goods_data.goods_list = data
        })
        return {
            ...toRefs(goods_data),
            columns: createColumns(),
            pagination: { pageSize: 12 }
        }
    }
})
</script>

<style lang ="scss" scoped>
.good-search {
    width: 49%;
    padding: 10px;
}
</style>