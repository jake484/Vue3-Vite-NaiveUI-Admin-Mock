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
                <n-button @click="onSubmit">
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


// NaiveUI中列表的标题信息
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

        // 获取全部商品数据, 因为多个地方使用,所以封装为方法
        const p_getGoodsList = () => {
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
        }

        onMounted(() => {
            p_getGoodsList()  // 获取全部商品数据
        })

        const onSubmit = () => {
            // console.log(goods_data.selected_data.title)
            // console.log(goods_data.selected_data.introduce)
            let search_res: IQueryGoods[] = []
            if (goods_data.selected_data.title || goods_data.selected_data.introduce) {
                if (goods_data.selected_data.title) {
                    search_res = goods_data.goods_list.filter((value) => {
                        return value.title.indexOf(goods_data.selected_data.title) !== -1
                    })
                }
                else {
                    if (goods_data.selected_data.introduce) {
                        search_res = goods_data.goods_list.filter((value) => {
                            return value.introduce.indexOf(goods_data.selected_data.introduce) !== -1
                        })
                    }
                }
            }
            else {
                search_res = goods_data.goods_list
            }
            goods_data.goods_list = search_res
        }

        watch([() => goods_data.selected_data.title, () => goods_data.selected_data.introduce], () => {
            if (goods_data.selected_data.title === "" && goods_data.selected_data.introduce === "") {
                p_getGoodsList()
            }
        })
        return {
            ...toRefs(goods_data),
            columns: createColumns(),
            pagination: { pageSize: 12 },
            onSubmit
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