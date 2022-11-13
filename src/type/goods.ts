// 商品接口
export interface IGoods {
    userId: number,   // 商品归属用户id
    id: number,   // 商品id
    title: string,   // 商品标题
    introduce: string   // 商品介绍
}

// 商品查询接口
export interface IQueryGoods {
    key: number,
    id: number,
    title: string,
    introduce: string
}

// 商品具体展示数据
export class GoodsPages {
    // 被选择的数据, 查询时用
    selected_data = {
        title: "",
        introduce: ""
    }
    // 展示的商品数据
    goods_list: IQueryGoods[] = []
}